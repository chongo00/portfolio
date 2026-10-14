// Composiciones tipo Mondrian: un árbol de cortes (BSP) generado a partir de
// una semilla. Los cortes oscilan con el tiempo, así que la misma composición
// "respira" sin cambiar de identidad. La usan la pantalla de carga, el telón,
// las miniaturas de proyectos y el 404.

export function hashString(text) {
  let h = 2166136261;
  for (const ch of String(text)) {
    h ^= ch.codePointAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const TONES = {
  // Proporciones de color: casi todo papel y tinta, acentos escasos.
  default: [['paper', 0.46], ['ink', 0.24], ['paper2', 0.14], ['sea', 0.09], ['sun', 0.07]],
  dense: [['ink', 0.42], ['paper', 0.34], ['paper2', 0.08], ['sea', 0.09], ['sun', 0.07]],
};

function pickTone(r, palette) {
  let x = r();
  for (const [tone, w] of palette) {
    if ((x -= w) <= 0) return tone;
  }
  return palette[0][0];
}

/**
 * Construye el árbol una sola vez. `aspect` es ancho/alto del lienzo, para que
 * los cortes sigan la forma del área y no salgan tiras finísimas.
 */
export function buildTree(seed, { depth = 5, aspect = 1, stop = 0.18, palette = 'default' } = {}) {
  const r = rng(seed);
  const tones = TONES[palette] || TONES.default;
  function node(level, w, h) {
    if (level === depth || (level > 1 && r() < stop * (level / depth))) {
      return { leaf: true, level, tone: pickTone(r, tones) };
    }
    const ratioWH = w / h;
    const vertical = ratioWH > 1.3 ? true : ratioWH < 0.77 ? false : r() < 0.5;
    const ratio = 0.3 + r() * 0.4;
    const a = vertical ? node(level + 1, w * ratio, h) : node(level + 1, w, h * ratio);
    const b = vertical ? node(level + 1, w * (1 - ratio), h) : node(level + 1, w, h * (1 - ratio));
    return { leaf: false, level, vertical, ratio, phase: r() * Math.PI * 2, speed: 0.55 + r() * 0.9, a, b, tone: a.tone };
  }
  return node(0, aspect, 1);
}

function firstTone(n) {
  while (!n.leaf) n = n.a;
  return n.tone;
}

/**
 * Devuelve los rectángulos visibles en el instante `t` (segundos).
 * `reveal` (0..1) limita la profundidad: con poco progreso se ven pocos cortes.
 */
export function layout(tree, w, h, t = 0, { amp = 0.1, reveal = 1 } = {}) {
  const out = [];
  const maxLevel = reveal >= 1 ? Infinity : reveal * 6;
  (function walk(n, x, y, cw, ch) {
    if (n.leaf || n.level >= maxLevel) {
      out.push({ x, y, w: cw, h: ch, tone: n.leaf ? n.tone : firstTone(n) });
      return;
    }
    const k = Math.min(0.82, Math.max(0.18, n.ratio + Math.sin(t * n.speed + n.phase) * amp));
    if (n.vertical) {
      const s = cw * k;
      walk(n.a, x, y, s, ch);
      walk(n.b, x + s, y, cw - s, ch);
    } else {
      const s = ch * k;
      walk(n.a, x, y, cw, s);
      walk(n.b, x, y + s, cw, ch - s);
    }
  })(tree, 0, 0, w, h);
  return out;
}

export function readColors(el = document.documentElement) {
  const cs = getComputedStyle(el);
  const v = (name) => cs.getPropertyValue(name).trim();
  return {
    paper: v('--paper'),
    paper2: v('--paper-2'),
    ink: v('--ink'),
    sea: v('--sea'),
    sun: v('--sun'),
  };
}

/** Pinta los rectángulos con líneas de tinta entre ellos, como en un Mondrian. */
export function paint(ctx, rects, colors, line) {
  const { width, height } = ctx.canvas;
  ctx.fillStyle = colors.ink;
  ctx.fillRect(0, 0, width, height);
  const half = line / 2;
  for (const r of rects) {
    const x0 = Math.round(r.x + half);
    const y0 = Math.round(r.y + half);
    const x1 = Math.round(r.x + r.w - half);
    const y1 = Math.round(r.y + r.h - half);
    if (x1 <= x0 || y1 <= y0) continue;
    ctx.fillStyle = colors[r.tone] || colors.paper;
    ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
  }
}

/** Ajusta el tamaño interno del canvas a su tamaño en pantalla. */
export function fitCanvas(canvas, maxDpr = 2) {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(maxDpr, window.devicePixelRatio || 1);
  const w = Math.max(1, Math.round(rect.width * dpr));
  const h = Math.max(1, Math.round(rect.height * dpr));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  return { w, h, dpr, aspect: rect.width / Math.max(1, rect.height) };
}
