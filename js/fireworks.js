/* ============================================================
   Baseball IQ — fireworks.js
   A short particle burst on the #fx canvas, fired on a correct
   answer. Self-contained: exposes window.Fireworks.burst().
   ============================================================ */

const Fireworks = (() => {
  const canvas = document.getElementById('fx');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let particles = [];
  let rafId = null;
  let dpr = window.devicePixelRatio || 1;

  const COLORS = ['#35c46a', '#f0b429', '#4ea8de', '#e05c4b', '#ffffff'];

  function resize() {
    if (!canvas) return;
    dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  function spawnBurst(cx, cy, count) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
      const speed = 2.4 + Math.random() * 4.2;
      particles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 45 + Math.random() * 25,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        size: 2 + Math.random() * 2.5
      });
    }
  }

  function tick() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.life++;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.06; // gravity
      p.vx *= 0.985;
      const t = p.life / p.maxLife;
      const alpha = Math.max(0, 1 - t);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    particles = particles.filter(p => p.life < p.maxLife);
    ctx.globalAlpha = 1;
    if (particles.length) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = null;
    }
  }

  function burst(originX, originY) {
    if (!ctx) return;
    const cx = originX != null ? originX : window.innerWidth / 2;
    const cy = originY != null ? originY : window.innerHeight / 3;

    // a small cluster of bursts for a fuller effect
    spawnBurst(cx, cy, 40);
    setTimeout(() => spawnBurst(cx - 60, cy + 20, 26), 120);
    setTimeout(() => spawnBurst(cx + 60, cy + 10, 26), 220);

    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  return { burst };
})();
