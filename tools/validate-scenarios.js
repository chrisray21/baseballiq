/* ============================================================
   Baseball IQ — scenario validator
   Catches "the graphic doesn't match the text" bugs before they
   ship. Run after editing any scenario file:

     node tools/validate-scenarios.js

   Checks are geometric, so they work for every position, not
   just the ones written so far.
   ============================================================ */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const JS = path.join(ROOT, 'js');

const scenarioFiles = fs.readdirSync(JS).filter(f => /^scenarios-.*\.js$/.test(f));
const src = fs.readFileSync(path.join(JS, 'field-data.js'), 'utf8')
  + '\n' + scenarioFiles.map(f => fs.readFileSync(path.join(JS, f), 'utf8')).join('\n')
  + '\nreturn { SPOTS, POSITIONS, SCENARIOS };';

const { SPOTS, POSITIONS, SCENARIOS } = new Function(src)();
const posCodes = new Set(POSITIONS.map(p => p.code));
const posHome = {};
POSITIONS.forEach(p => posHome[p.code] = p.home);

const HOME = SPOTS.home;
const errors = [];
const warnings = [];

function loc(v) {
  if (Array.isArray(v)) return v;
  if (SPOTS[v]) return SPOTS[v];
  if (posHome[v]) return posHome[v];
  return null;
}

/* Fair territory. Foul lines run from home plate at 45 degrees:
   right line y = 1020 - x, left line y = 220 + x. Fair territory is
   where BOTH y < 1020 - x and y < 220 + x (second base satisfies
   both). Margin is how many px inside the nearer line a point sits. */
function fairMargin(p) {
  return Math.min((1020 - p[0]) - p[1], (220 + p[0]) - p[1]);
}

/* Which side of a fielder a point lies on, from the fielder's own
   point of view while facing home plate. Positive = his right,
   negative = his left. In screen coords (x right, y down) a facing
   vector (dx,dy) has right-hand vector (-dy, dx). */
function fielderSide(code, point) {
  const f = posHome[code];
  if (!f) return null;
  const dx = HOME[0] - f[0], dy = HOME[1] - f[1];
  const L = Math.hypot(dx, dy) || 1;
  const rx = -dy / L, ry = dx / L;
  return (point[0] - f[0]) * rx + (point[1] - f[1]) * ry;
}

/* Words in scenario prose that assert a direction, mapped to the sign
   we expect fielderSide() to return for the ball's location. */
const RIGHT_PHRASES = [/to your right/i, /to his right/i, /backhand/i];
const LEFT_PHRASES  = [/to your left/i, /to his left/i];

SCENARIOS.forEach(sc => {
  const where = sc.id;
  const prose = [sc.title, sc.description].join(' ');

  if (!posCodes.has(sc.position)) errors.push(where + ': unknown position "' + sc.position + '"');

  sc.steps.forEach((step, i) => {
    const at = where + ' step#' + i;

    /* 1. every location reference must resolve */
    ['from', 'to'].forEach(k => {
      if (step[k] == null) return;
      if (!loc(step[k])) errors.push(at + ': unresolvable ' + k + ' "' + step[k] + '"');
    });
    (step.fielders || []).forEach(f => {
      if (!posCodes.has(f.who)) errors.push(at + ': unknown fielder "' + f.who + '"');
      if (!loc(f.to)) errors.push(at + ': unresolvable fielder destination "' + f.to + '"');
    });
    (step.runners || []).forEach(r => {
      if (!loc(r.from)) errors.push(at + ': unresolvable runner from "' + r.from + '"');
      if (!loc(r.to)) errors.push(at + ': unresolvable runner to "' + r.to + '"');
    });
    (step.flash || []).forEach(c => {
      if (!posCodes.has(c)) errors.push(at + ': unknown flash code "' + c + '"');
    });

    /* 2. batted balls must land in fair territory.
       kind: 'pitch' is exempt — a passed ball or wild pitch was never
       batted, and it belongs behind the plate in foul ground. */
    if (step.type === 'ball' && step.to && step.kind !== 'pitch' && step.kind !== 'foul') {
      const p = loc(step.to);
      if (p) {
        const m = fairMargin(p);
        if (m < 0) errors.push(at + ': ball lands in FOUL territory at ' + JSON.stringify(p));
        else if (m < 60) warnings.push(at + ': ball lands only ' + m.toFixed(0) + 'px inside the foul line at ' + JSON.stringify(p) + ' — may read as a foul-line hugger');
      }
    }

    /* 3. prose direction must match geometry */
    if (step.type === 'ball' && step.to) {
      const p = loc(step.to);
      const side = p ? fielderSide(sc.position, p) : null;
      if (side != null) {
        const saysRight = RIGHT_PHRASES.some(re => re.test(prose));
        const saysLeft = LEFT_PHRASES.some(re => re.test(prose));
        if (saysRight && side < 0) {
          errors.push(where + ': text says the ball is to the fielder\'s RIGHT, but it lands on his LEFT (side=' + side.toFixed(0) + ')');
        }
        if (saysLeft && side > 0) {
          errors.push(where + ': text says the ball is to the fielder\'s LEFT, but it lands on his RIGHT (side=' + side.toFixed(0) + ')');
        }
      }
    }

    /* 4. question shape */
    if (step.type === 'question') {
      if (!Array.isArray(step.options) || step.options.length < 2) errors.push(at + ': question needs at least 2 options');
      else if (!(step.answer >= 0 && step.answer < step.options.length)) errors.push(at + ': answer index out of range');
    }
  });
});

/* ---- 5. runner-animation checks ----
   These catch the case where the animation contradicts the result
   text: e.g. a scenario that says "picked off" while the runner is
   drawn retreating safely back to his base, or a tag claimed at a
   base the runner is nowhere near. Mirrors field.js's own path math. */

const BASE_ORDER = ['home', 'first', 'second', 'third', 'home'];

function basePath(from, to) {
  const isBase = n => BASE_ORDER.indexOf(n) !== -1;
  if (!isBase(from) || !isBase(to)) return null;
  const startIdx = from === 'home' ? 0 : BASE_ORDER.indexOf(from);
  let endIdx = to === 'home' ? 4 : BASE_ORDER.indexOf(to);
  if (endIdx <= startIdx) endIdx = BASE_ORDER.length - 1;
  return BASE_ORDER.slice(startIdx, endIdx + 1).map(n => SPOTS[n]);
}

function pointAtFraction(pts, t) {
  if (pts.length === 1) return pts[0];
  let total = 0;
  for (let i = 1; i < pts.length; i++) total += Math.hypot(pts[i][0]-pts[i-1][0], pts[i][1]-pts[i-1][1]);
  if (total === 0) return pts[0];
  let remaining = t * total;
  for (let i = 1; i < pts.length; i++) {
    const [x0,y0] = pts[i-1], [x1,y1] = pts[i];
    const seg = Math.hypot(x1-x0, y1-y0);
    if (remaining <= seg || i === pts.length - 1) {
      const st = seg === 0 ? 0 : remaining / seg;
      return [x0 + (x1-x0)*st, y0 + (y1-y0)*st];
    }
    remaining -= seg;
  }
  return pts[pts.length - 1];
}

/* Two different outs with two different correct pictures:
   - picked off / doubled off: the runner is caught in between, so he
     must be drawn clearly OFF a base.
   - caught stealing: the runner is tagged sliding in, so he must be
     drawn just SHORT of the bag, never past it. (Overshooting IS
     correct at first base, where runners legitimately run through,
     which is why that rule is scoped to the caught-stealing wording
     rather than applied to every out.) */
const PICKED_OFF = /picked off|doubled off/i;
const CAUGHT_STEALING = /caught stealing/i;

SCENARIOS.forEach(sc => {
  /* 5a. runner path continuity — the README requires the end T of one
     step to equal the start T of the next for the same runner, or the
     runner visibly teleports. */
  const lastT = {};
  const lastPath = {};
  sc.steps.forEach((step, i) => {
    (step.runners || []).forEach(r => {
      const from = r.fromT != null ? r.fromT : 0;
      const to = r.toT != null ? r.toT : 1;
      const key = r.id;
      if (lastT[key] != null && Math.abs(lastT[key] - from) > 0.001) {
        warnings.push(sc.id + ' step#' + i + ': runner "' + key + '" jumps from T=' + lastT[key] + ' to T=' + from + ' (runner will visibly teleport)');
      }
      lastT[key] = to;
      lastPath[key] = basePath(r.from, r.to) || [loc(r.from), loc(r.to)].filter(Boolean);
    });
  });

  /* 5b. the runner the result says was retired has to be drawn
     somewhere the tag could actually happen. */
  const result = sc.steps.find(s => s.type === 'result');
  if (!result) return;
  const verdict = [result.title, result.text].join(' ');
  const isPickoff = PICKED_OFF.test(verdict);
  const isCaughtStealing = CAUGHT_STEALING.test(verdict);
  if (!isPickoff && !isCaughtStealing) return;

  const lastBall = [...sc.steps].reverse().find(s => (s.type === 'throw' || s.type === 'ball') && s.to);
  const ballXY = lastBall ? loc(lastBall.to) : null;

  Object.keys(lastT).forEach(id => {
    const t = lastT[id];
    const pts = lastPath[id];
    if (!pts || !pts.length || !ballXY) return;
    const runnerXY = pointAtFraction(pts, t);
    const d = Math.hypot(runnerXY[0] - ballXY[0], runnerXY[1] - ballXY[1]);

    // You cannot tag a runner who isn't where the ball is.
    if (d > 90) {
      errors.push(sc.id + ': runner "' + id + '" ends ' + d.toFixed(0) + 'px from where the ball arrives, but the result claims he was tagged out there');
      return;
    }

    if (isPickoff) {
      const onABase = ['home','first','second','third'].some(k =>
        Math.hypot(runnerXY[0]-SPOTS[k][0], runnerXY[1]-SPOTS[k][1]) < 18);
      if (onABase) {
        errors.push(sc.id + ': result says picked off, but runner "' + id + '" is drawn safely ON a base (a pickoff has to catch him off it)');
      }
    }

    if (isCaughtStealing && t > 1.0) {
      errors.push(sc.id + ': result says caught stealing, but runner "' + id + '" is drawn past the bag at T=' + t + ' (a slide is tagged short of the base, not through it)');
    }
  });
});

/* ---- 6. "lead runner" must mean the actual lead runner ----
   The lead runner is the one on the highest base already occupied,
   and he advances to the NEXT base. With runners on first and second
   the lead runner is on second heading to third — so calling the
   force at second "the lead runner" is wrong, even though it happens
   to be right when first base is the only one occupied. Easy mistake
   to carry from one scenario into the next, so check it. */
const NEXT_BASE = { first: 'second', second: 'third', third: 'home' };

SCENARIOS.forEach(sc => {
  const runners = (sc.situation && sc.situation.runners) || [];
  if (!runners.length) return;

  const occupied = ['first', 'second', 'third'].filter(b => runners.indexOf(b) !== -1);
  const leadFrom = occupied[occupied.length - 1];
  const leadTo = NEXT_BASE[leadFrom];

  const prose = JSON.stringify(sc);
  const re = /lead[- ]runner\s+(?:force\s+)?(?:at|to)\s+(first|second|third|home)/gi;
  let m;
  while ((m = re.exec(prose))) {
    const named = m[1].toLowerCase();
    if (named !== leadTo) {
      errors.push(sc.id + ': text says "' + m[0] + '", but with runners on ' + occupied.join(' and ')
        + ' the lead runner is on ' + leadFrom + ' advancing to ' + leadTo
        + ' — the play at ' + named + ' retires a trail runner, not the lead runner');
    }
  }
});

/* ---- 6b. runners must finish standing on a base ----
   A runner left frozen mid-baseline at the end of a play looks like a
   glitch. The only legitimate exception is a runner retired BETWEEN
   bases, which the result has to say out loud ("picked off",
   "doubled off") — otherwise it reads as an animation bug. */
const RETIRED_BETWEEN_BASES = /picked off|doubled off/i;

SCENARIOS.forEach(sc => {
  const res = sc.steps.find(s => s.type === 'result');
  const caughtOffBase = res && RETIRED_BETWEEN_BASES.test([res.title, res.text].join(' '));

  const lastT = {}, lastPath = {};
  sc.steps.forEach(step => (step.runners || []).forEach(r => {
    lastT[r.id] = r.toT != null ? r.toT : 1;
    lastPath[r.id] = basePath(r.from, r.to) || [loc(r.from), loc(r.to)].filter(Boolean);
  }));

  Object.keys(lastT).forEach(id => {
    const pts = lastPath[id];
    if (!pts || !pts.length) return;
    const p = pointAtFraction(pts, lastT[id]);
    const onBase = ['home','first','second','third'].some(b =>
      Math.hypot(p[0]-SPOTS[b][0], p[1]-SPOTS[b][1]) < 18);
    if (!onBase && !caughtOffBase) {
      errors.push(sc.id + ': runner "' + id + '" finishes at T=' + lastT[id] +
        ', stranded between bases. Runners must end on a base unless the result says they were picked off or doubled off.');
    }
  });
});

/* ---- 6c. on an out, the throw has to beat the runner ----
   Ball and runners share a step's duration, so without `ballArrivesAt`
   they land simultaneously — a tie, and a tie goes to the runner. Any
   scenario claiming an out at the base a throw arrives at must give
   that throw a head start. */
const CLAIMS_AN_OUT = /\bout\b|double play|force out|inning over|caught stealing|picked off/i;

SCENARIOS.forEach(sc => {
  const res = sc.steps.find(s => s.type === 'result');
  if (!res || !CLAIMS_AN_OUT.test([res.title, res.text].join(' '))) return;

  const lastThrowIdx = sc.steps.map(s => s.type).lastIndexOf('throw');
  if (lastThrowIdx === -1) return;
  const step = sc.steps[lastThrowIdx];
  const destXY = loc(step.to);
  if (!destXY) return;
  const isBase = ['home','first','second','third'].some(b =>
    Math.hypot(destXY[0]-SPOTS[b][0], destXY[1]-SPOTS[b][1]) < 5);
  if (!isBase) return;

  // Only a runner still moving during THIS step can be beaten by this throw.
  (step.runners || []).forEach(r => {
    const pts = basePath(r.from, r.to) || [loc(r.from), loc(r.to)].filter(Boolean);
    if (!pts.length) return;
    const end = pointAtFraction(pts, r.toT != null ? r.toT : 1);
    const arrivesHere = Math.hypot(end[0]-destXY[0], end[1]-destXY[1]) < 25;
    if (arrivesHere && step.ballArrivesAt == null) {
      errors.push(sc.id + ': runner "' + r.id + '" reaches ' + step.to +
        ' in the same step the throw arrives, so they tie — and a tie goes to the runner. ' +
        'Add ballArrivesAt (e.g. 0.7) to that throw so the ball visibly beats him.');
    }
  });
});

/* 7. duplicate ids */
const seen = new Set();
SCENARIOS.forEach(sc => {
  if (seen.has(sc.id)) errors.push('duplicate scenario id: ' + sc.id);
  seen.add(sc.id);
});

/* ---- 8. cutoff alignment on a play at the plate ----
   Site-wide simplification: single cut only, 1B on balls to centre or
   right, 3B on balls to left. Middle infielders never take the cut on
   a throw home — they cover the base whoever left it. Machine-checked
   because it's easy to slip back into a double cut when writing the
   outfield positions. */
const LEFT_FIELD = ['shallowLeftField', 'shortLeftField', 'leftCenterGap', 'relayLeft'];
const CENTER_RIGHT_FIELD = ['shallowRightField', 'shortRightField', 'rightCenterGap', 'relayRight',
                            'shallowCenterField', 'shortCenterField', 'relayCenter'];

SCENARIOS.forEach(sc => {
  const throwsHome = sc.steps.some(s => s.type === 'throw' && s.to === 'home');
  if (!throwsHome) return;

  const cutMen = [];
  sc.steps.forEach(s => (s.fielders || []).forEach(f => {
    if (typeof f.to === 'string' && /^cutoff/.test(f.to)) cutMen.push(f.who);
  }));
  if (!cutMen.length) return;   // direct throw home, no cut man — fine

  const unique = [...new Set(cutMen)];
  if (unique.length > 1) {
    errors.push(sc.id + ': ' + unique.join(' and ') + ' both set up as cut men — double cuts are out of scope for this site, use a single cut');
  }

  unique.forEach(who => {
    if (who === '2B' || who === 'SS') {
      errors.push(sc.id + ': ' + who + ' is taking the cut on a throw home — middle infielders never take the cut; 1B cuts from centre/right, 3B from left');
      return;
    }
    // which outfield did the ball come from?
    const origins = sc.steps
      .filter(s => (s.type === 'throw' || s.type === 'ball') && typeof s.from === 'string')
      .map(s => s.from);
    const fromLeft = origins.some(o => LEFT_FIELD.indexOf(o) !== -1);
    const fromCenterRight = origins.some(o => CENTER_RIGHT_FIELD.indexOf(o) !== -1);

    if (who === '1B' && fromLeft && !fromCenterRight) {
      errors.push(sc.id + ': 1B is taking the cut on a ball to left field — 3B takes that one');
    }
    if (who === '3B' && fromCenterRight && !fromLeft) {
      errors.push(sc.id + ': 3B is taking the cut on a ball to centre/right — 1B takes those');
    }
  });
});

/* ---- report ---- */
console.log('Validated ' + SCENARIOS.length + ' scenarios from ' + scenarioFiles.join(', '));
if (warnings.length) {
  console.log('\nWARNINGS (' + warnings.length + '):');
  warnings.forEach(w => console.log('  ! ' + w));
}
if (errors.length) {
  console.log('\nERRORS (' + errors.length + '):');
  errors.forEach(e => console.log('  X ' + e));
  process.exit(1);
}
console.log('\nNo errors.');
