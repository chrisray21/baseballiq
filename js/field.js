/* ============================================================
   Baseball IQ — field.js
   Draws fielders/runners on the SVG, animates the ball, and
   draws route/throw lines. Exposes a single global: Field.
   Depends on SPOTS / POSITIONS from field-data.js.
   ============================================================ */

const Field = (() => {
  const NS = 'http://www.w3.org/2000/svg';
  let svg, layerRoutes, layerRunners, layerFielders, ballLayer, ballEl, shadowEl;

  // live state
  const fielderPos = {};   // code -> [x, y] (current location)
  const fielderEls = {};   // code -> <g> element
  const runnerEls = {};    // id -> <circle> element

  function el(tag, attrs) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  function lerp(a, b, t) { return a + (b - a) * t; }

  function resolveLoc(key) {
    if (Array.isArray(key)) return key;
    if (SPOTS[key]) return SPOTS[key];
    if (fielderPos[key]) return fielderPos[key];
    const pos = POSITIONS.find(p => p.code === key);
    if (pos) return pos.home;
    console.warn('Field: unknown location "' + key + '", defaulting to home plate');
    return SPOTS.home;
  }

  /* ---- base-path helper for runners ----
     Builds a polyline of points a runner travels between two named
     bases so advances follow the diamond instead of cutting across
     the infield. Falls back to a straight line for anything that
     isn't a plain base name (e.g. custom SPOTS keys). */
  function basePath(from, to) {
    const order = ['home', 'first', 'second', 'third', 'home'];
    const isBase = n => order.indexOf(n) !== -1;
    if (!isBase(from) || !isBase(to)) return null;
    const startIdx = from === 'home' ? 0 : order.indexOf(from);
    // prefer the trailing "home" (index 4, i.e. scoring) when running TO home
    let endIdx = to === 'home' ? 4 : order.indexOf(to);
    if (endIdx <= startIdx) endIdx = order.length - 1;
    const names = order.slice(startIdx, endIdx + 1);
    return names.map(n => SPOTS[n]);
  }

  function pathLength(pts) {
    let len = 0;
    for (let i = 1; i < pts.length; i++) {
      len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    }
    return len;
  }

  function pointAtFraction(pts, t) {
    if (pts.length === 1) return pts[0];
    const total = pathLength(pts);
    if (total === 0) return pts[0];
    let target = t * total;

    if (target < 0) {
      // extrapolate before the first segment
      const [x0, y0] = pts[0], [x1, y1] = pts[1];
      const segLen = Math.hypot(x1 - x0, y1 - y0) || 1;
      const ratio = target / segLen;
      return [x0 + (x0 - x1) * -ratio, y0 + (y0 - y1) * -ratio];
    }

    let remaining = target;
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
      const segLen = Math.hypot(x1 - x0, y1 - y0);
      if (remaining <= segLen || i === pts.length - 1) {
        const segT = segLen === 0 ? 0 : remaining / segLen;
        return [lerp(x0, x1, segT), lerp(y0, y1, segT)];
      }
      remaining -= segLen;
    }
    return pts[pts.length - 1];
  }

  function animate(duration, onFrame) {
    return new Promise(resolve => {
      if (!duration || duration <= 0) { onFrame(1); resolve(); return; }
      const start = performance.now();
      function frame(now) {
        const t = Math.min(1, (now - start) / duration);
        onFrame(t);
        if (t < 1) requestAnimationFrame(frame);
        else resolve();
      }
      requestAnimationFrame(frame);
    });
  }

  /* ---------------- setup ---------------- */

  function init() {
    svg = document.getElementById('field');
    layerRoutes = document.getElementById('layer-routes');
    layerRunners = document.getElementById('layer-runners');
    layerFielders = document.getElementById('layer-fielders');
    ballLayer = document.getElementById('layer-ball');
    ballEl = document.getElementById('ball');
    shadowEl = document.getElementById('ball-shadow');

    POSITIONS.forEach(pos => {
      const g = el('g', { class: 'fielder', 'data-code': pos.code });
      const dot = el('circle', { class: 'dot', r: 17 });
      const ring = el('circle', { class: 'ring', r: 23 });
      const label = el('text', { dy: '.5' });
      label.textContent = pos.code;
      g.appendChild(ring);
      g.appendChild(dot);
      g.appendChild(label);
      layerFielders.appendChild(g);
      fielderEls[pos.code] = g;
    });

    placeFielders();
  }

  function placeFielders() {
    POSITIONS.forEach(pos => {
      fielderPos[pos.code] = pos.home.slice();
      const g = fielderEls[pos.code];
      g.setAttribute('transform', 'translate(' + pos.home[0] + ',' + pos.home[1] + ')');
      g.classList.remove('flash', 'is-you');
    });
  }

  function clearDynamic() {
    layerRoutes.innerHTML = '';
    layerRunners.innerHTML = '';
    for (const id in runnerEls) delete runnerEls[id];
    ballLayer.setAttribute('hidden', '');
  }

  function setUserPosition(code) {
    POSITIONS.forEach(pos => fielderEls[pos.code].classList.remove('is-you'));
    if (fielderEls[code]) fielderEls[code].classList.add('is-you');
  }

  function reset(scenario) {
    placeFielders();
    clearDynamic();
    if (scenario && scenario.position) setUserPosition(scenario.position);
  }

  /* ---------------- runners ---------------- */

  function ensureRunner(id) {
    if (runnerEls[id]) return runnerEls[id];
    const c = el('circle', { class: 'runner', r: 9 });
    layerRunners.appendChild(c);
    runnerEls[id] = c;
    return c;
  }

  function placeRunnerAt(id, xy) {
    const c = ensureRunner(id);
    c.setAttribute('cx', xy[0]);
    c.setAttribute('cy', xy[1]);
  }

  function animateRunners(specs, duration) {
    if (!specs || !specs.length) return Promise.resolve();
    const prepared = specs.map(spec => {
      const pts = basePath(spec.from, spec.to) || [resolveLoc(spec.from), resolveLoc(spec.to)];
      const fromT = spec.fromT != null ? spec.fromT : 0;
      const toT = spec.toT != null ? spec.toT : 1;
      placeRunnerAt(spec.id, pointAtFraction(pts, fromT));
      return { id: spec.id, pts, fromT, toT };
    });
    return animate(duration, t => {
      prepared.forEach(p => {
        const localT = lerp(p.fromT, p.toT, t);
        placeRunnerAt(p.id, pointAtFraction(p.pts, localT));
      });
    });
  }

  /* ---------------- fielder movement ---------------- */

  function animateFielders(specs, duration) {
    if (!specs || !specs.length) return Promise.resolve();
    const prepared = specs.map(spec => ({
      code: spec.who,
      from: fielderPos[spec.who] || resolveLoc(spec.who),
      to: resolveLoc(spec.to)
    }));
    return animate(duration, t => {
      prepared.forEach(p => {
        const x = lerp(p.from[0], p.to[0], t);
        const y = lerp(p.from[1], p.to[1], t);
        fielderEls[p.code].setAttribute('transform', 'translate(' + x + ',' + y + ')');
        if (t === 1) fielderPos[p.code] = [x, y];
        else fielderPos[p.code] = [x, y];
      });
    });
  }

  function flashFielders(codes) {
    (codes || []).forEach(code => {
      if (fielderEls[code]) fielderEls[code].classList.add('flash');
    });
  }

  /* ---------------- routes + ball ---------------- */

  /* A step's ball/throw endpoint is sometimes a fielder's position code
     (e.g. to: 'SS') while that SAME fielder is also being relocated by
     step.fielders in the same step (e.g. the shortstop breaking to
     cover second while the ball is still in flight to him). resolveLoc()
     alone would return the fielder's CURRENT (pre-move) spot, so the
     ball would visibly land somewhere other than where the fielder's
     icon ends up. Route both through this instead of resolveLoc()
     directly whenever the endpoint is tied to a moving fielder. */
  function resolveEndpoint(key, step) {
    if (typeof key === 'string' && step && step.fielders) {
      const moving = step.fielders.find(f => f.who === key);
      if (moving) return resolveLoc(moving.to);
    }
    return resolveLoc(key);
  }

  function addRouteLine(fromXY, toXY, isThrow) {
    const [x1, y1] = fromXY;
    const [x2, y2] = toXY;
    const line = el('line', {
      class: isThrow ? 'route throw' : 'route',
      x1, y1, x2, y2
    });
    layerRoutes.appendChild(line);
  }

  // 'pitch' is a ball that was never batted — a passed ball or wild
  // pitch skipping back to the screen. Low and flat, and unlike a
  // batted ball it is allowed to end up in foul territory.
  // 'foul' is a batted ball that lands outside the lines — a foul
  // pop-up. Flies like a fly ball; exempt from the fair-territory check.
  const ARC_HEIGHT = { ground: 10, line: 30, fly: 85, pitch: 6, foul: 80 };

  function animateBall(fromXY, toXY, kind, duration) {
    const [x1, y1] = fromXY;
    const [x2, y2] = toXY;
    const arc = ARC_HEIGHT[kind] != null ? ARC_HEIGHT[kind] : ARC_HEIGHT.line;
    ballLayer.removeAttribute('hidden');
    return animate(duration, t => {
      const x = lerp(x1, x2, t);
      const y = lerp(y1, y2, t) - arc * Math.sin(Math.PI * t);
      ballEl.setAttribute('cx', x);
      ballEl.setAttribute('cy', y);
      const groundY = lerp(y1, y2, t);
      shadowEl.setAttribute('cx', x);
      shadowEl.setAttribute('cy', groundY);
      shadowEl.setAttribute('opacity', Math.max(0.12, 0.3 - (arc > 10 ? t * 0.15 : 0)));
    });
  }

  /* ---------------- public step runner ---------------- */

  /* Ball and runners share a step's duration, so by default they both
     finish at the same instant — which on a play at a base reads as a
     tie, and a tie goes to the runner. That is wrong for every scenario
     that ends in an out.

     `ballArrivesAt: 0.7` makes the ball complete its flight in 70% of
     the step while the runner keeps going for the full duration. The
     throw visibly beats him to the bag, and the runner still finishes
     standing ON the base rather than frozen short of it. */
  function ballFraction(step) {
    const f = step.ballArrivesAt;
    if (f == null) return 1;
    return Math.max(0.05, Math.min(1, f));
  }

  function playStep(step) {
    const duration = step.duration != null ? step.duration : 600;
    switch (step.type) {
      case 'ball': {
        const fromXY = resolveEndpoint(step.from, step);
        const toXY = resolveEndpoint(step.to, step);
        addRouteLine(fromXY, toXY, false);
        return Promise.all([
          animateBall(fromXY, toXY, step.kind, duration * ballFraction(step)),
          animateFielders(step.fielders, duration),
          animateRunners(step.runners, duration)
        ]);
      }
      case 'throw': {
        const fromXY = resolveEndpoint(step.from, step);
        const toXY = resolveEndpoint(step.to, step);
        addRouteLine(fromXY, toXY, true);
        return Promise.all([
          animateBall(fromXY, toXY, 'line', duration * ballFraction(step)),
          animateFielders(step.fielders, duration),
          animateRunners(step.runners, duration)
        ]);
      }
      case 'move':
        return Promise.all([
          animateFielders(step.fielders, duration),
          animateRunners(step.runners, duration)
        ]);
      default:
        return Promise.resolve();
    }
  }

  return {
    init,
    reset,
    placeFielders,
    setUserPosition,
    playStep,
    flashFielders,
    resolveLoc
  };
})();
