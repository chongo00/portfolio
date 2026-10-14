// Cursor propio: un contorno que gira y cambia de polígono cuando está quieto,
// y que se ajusta al borde de enlaces y botones cuando pasa por encima, para
// que siempre quede claro qué se puede pulsar. Solo con ratón y sin
// "reducir movimiento"; en táctil no existe.

const N = 72;
const TARGETS = 'a, button, [role="button"], summary, label[for]';
const IDLE_RADIUS = 15;
const MAX_W = 560;
const MAX_H = 380;
const PAD = 6;

function resample(poly) {
  const lens = poly.map((p, i) => {
    const q = poly[(i + 1) % poly.length];
    return Math.hypot(q.x - p.x, q.y - p.y);
  });
  const total = lens.reduce((a, b) => a + b, 0);
  const out = [];
  let seg = 0;
  let acc = 0;
  for (let i = 0; i < N; i++) {
    const d = (i * total) / N;
    while (seg < poly.length - 1 && acc + lens[seg] < d) acc += lens[seg++];
    const p = poly[seg];
    const q = poly[(seg + 1) % poly.length];
    const k = lens[seg] ? (d - acc) / lens[seg] : 0;
    out.push({ x: p.x + (q.x - p.x) * k, y: p.y + (q.y - p.y) * k });
  }
  return out;
}

function regular(sides) {
  const verts = [];
  for (let i = 0; i < sides; i++) {
    const a = -Math.PI / 2 + (i * Math.PI * 2) / sides;
    verts.push({ x: Math.cos(a), y: Math.sin(a) });
  }
  return resample(verts);
}

function circle() {
  return Array.from({ length: N }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI * 2) / N;
    return { x: Math.cos(a) * 0.86, y: Math.sin(a) * 0.86 };
  });
}

const SHAPES = [regular(3), regular(4), regular(5), regular(6), circle()];

// Desplazamiento de índices que menos retuerce el contorno al cambiar de forma.
function bestShift(from, to) {
  let best = 0;
  let bestCost = Infinity;
  for (let s = 0; s < N; s += 2) {
    let cost = 0;
    for (let i = 0; i < N; i += 3) {
      const a = from[i];
      const b = to[(i + s) % N];
      cost += (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
    }
    if (cost < bestCost) {
      bestCost = cost;
      best = s;
    }
  }
  return best;
}

export function initCursor() {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!fine.matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = document.querySelector('[data-cursor]');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const root = document.documentElement;

  const mouse = { x: -100, y: -100 };
  let visible = false;
  let hoverEl = null;
  let pressed = false;
  let scale = 1;
  let shapeIdx = 0;
  let nextShapeAt = performance.now() + 6000;
  let kind = '';
  let shift = 0;
  let pts = SHAPES[0].map((p) => ({ x: p.x * IDLE_RADIUS, y: p.y * IDLE_RADIUS }));
  let core = 5;
  let last = performance.now();
  let width = 0;
  let height = 0;

  function resize() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function pickTarget(el) {
    const t = el && el.closest ? el.closest(TARGETS) : null;
    if (!t || t.closest('[data-cursor="none"]')) return null;
    return t;
  }

  function hoverRect(el) {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return null;
    let x0 = r.left - PAD;
    let y0 = r.top - PAD;
    let w = r.width + PAD * 2;
    let h = r.height + PAD * 2;
    // En bloques enormes se encuadra solo la zona alrededor del puntero.
    if (w > MAX_W) {
      x0 = Math.min(Math.max(mouse.x - MAX_W / 2, x0), x0 + w - MAX_W);
      w = MAX_W;
    }
    if (h > MAX_H) {
      y0 = Math.min(Math.max(mouse.y - MAX_H / 2, y0), y0 + h - MAX_H);
      h = MAX_H;
    }
    return { x0, y0, x1: x0 + w, y1: y0 + h };
  }

  function idleTarget(now) {
    const a = (now / 1000) * 0.42;
    const c = Math.cos(a);
    const s = Math.sin(a);
    return SHAPES[shapeIdx].map(({ x, y }) => ({
      x: (x * c - y * s) * IDLE_RADIUS,
      y: (x * s + y * c) * IDLE_RADIUS,
    }));
  }

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    ctx.clearRect(0, 0, width, height);
    if (visible && document.visibilityState === 'visible') {
      let target = null;
      let nextKind = 'idle';
      if (hoverEl && hoverEl.isConnected) {
        const r = hoverRect(hoverEl);
        if (r) {
          target = resample([
            { x: r.x0 - mouse.x, y: r.y0 - mouse.y },
            { x: r.x1 - mouse.x, y: r.y0 - mouse.y },
            { x: r.x1 - mouse.x, y: r.y1 - mouse.y },
            { x: r.x0 - mouse.x, y: r.y1 - mouse.y },
          ]);
          nextKind = 'hover';
        }
      }
      if (!target) {
        if (now > nextShapeAt) {
          shapeIdx = (shapeIdx + 1 + Math.floor(Math.random() * (SHAPES.length - 1))) % SHAPES.length;
          nextShapeAt = now + 5000 + Math.random() * 4000;
          kind = '';
        }
        target = idleTarget(now);
        nextKind = 'idle' + shapeIdx;
      }
      if (nextKind !== kind) {
        shift = bestShift(pts, target);
        kind = nextKind;
      }
      const k = 1 - Math.exp(-dt * (nextKind === 'hover' ? 20 : 6));
      for (let i = 0; i < N; i++) {
        const t = target[(i + shift) % N];
        pts[i].x += (t.x - pts[i].x) * k;
        pts[i].y += (t.y - pts[i].y) * k;
      }
      scale += ((pressed ? 0.86 : 1) - scale) * (1 - Math.exp(-dt * 18));
      core += ((nextKind === 'hover' ? 3 : 5) - core) * (1 - Math.exp(-dt * 12));

      ctx.beginPath();
      pts.forEach((p, i) => {
        const x = mouse.x + p.x * scale;
        const y = mouse.y + p.y * scale;
        if (i) ctx.lineTo(x, y);
        else ctx.moveTo(x, y);
      });
      ctx.closePath();
      ctx.lineWidth = 1.6;
      ctx.strokeStyle = '#fff';
      ctx.stroke();

      let fill = '#fff';
      if (ctx.createConicGradient) {
        const g = ctx.createConicGradient(now / 700, mouse.x, mouse.y);
        g.addColorStop(0, '#ffffff');
        g.addColorStop(0.33, '#f2a900');
        g.addColorStop(0.66, '#0d6e63');
        g.addColorStop(1, '#ffffff');
        fill = g;
      }
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, core * scale, 0, Math.PI * 2);
      ctx.fillStyle = fill;
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }

  function onMove(e) {
    if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if (!visible) {
      visible = true;
      root.classList.add('cursor-on');
    }
    hoverEl = pickTarget(e.target);
  }

  function hide() {
    visible = false;
    hoverEl = null;
    root.classList.remove('cursor-on');
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerdown', (e) => {
    onMove(e);
    pressed = true;
  }, { passive: true });
  window.addEventListener('pointerup', () => (pressed = false), { passive: true });
  window.addEventListener('scroll', () => {
    if (visible) hoverEl = pickTarget(document.elementFromPoint(mouse.x, mouse.y));
  }, { passive: true, capture: true });
  document.documentElement.addEventListener('mouseleave', hide);
  window.addEventListener('blur', hide);
  fine.addEventListener?.('change', (e) => !e.matches && hide());
  requestAnimationFrame(frame);
}
