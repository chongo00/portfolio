// Telón entre páginas (portada, currículum, cambio de idioma). Cubre la
// pantalla con una composición, navega, y la página nueva lo retira cuando
// ya tiene sus tipografías. Así el cambio de idioma no parpadea.
import { buildTree, layout, paint, readColors, fitCanvas, hashString } from './mondrian.js';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initCurtain() {
  const root = document.documentElement;
  const el = document.querySelector('[data-curtain]');
  if (!el) return;
  const canvas = el.querySelector('canvas');
  const targetEl = el.querySelector('[data-curtain-target]');
  const ctx = canvas.getContext('2d');
  let raf = 0;
  let tree = null;
  let t0 = 0;

  function loop(now) {
    const { w, h, dpr } = fitCanvas(canvas, 1.5);
    paint(ctx, layout(tree, w, h, (now - t0) / 1000, { amp: 0.13 }), readColors(), 2 * dpr);
    raf = requestAnimationFrame(loop);
  }

  function show(label) {
    targetEl.textContent = label;
    const { aspect } = fitCanvas(canvas, 1.5);
    tree = buildTree(hashString(label), { depth: 5, aspect, palette: 'dense', stop: 0.1 });
    t0 = performance.now();
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(loop);
    el.classList.add('is-in');
  }

  function hide() {
    el.classList.remove('is-in');
    root.classList.remove('curtain-arrive');
    window.setTimeout(() => cancelAnimationFrame(raf), 320);
  }

  // Llegada: la página anterior dejó el telón puesto.
  if (root.classList.contains('curtain-arrive')) {
    show(root.getAttribute('data-curtain-label') || location.pathname);
    const minWait = new Promise((r) => setTimeout(r, reduced() ? 0 : 380));
    const fonts = document.fonts ? document.fonts.ready.catch(() => {}) : Promise.resolve();
    Promise.all([minWait, fonts]).then(hide);
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-curtain]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target && a.target !== '_self') return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname) return;
    e.preventDefault();
    const label = url.pathname;
    try {
      sessionStorage.setItem('cc-curtain', label);
      sessionStorage.setItem('cc-booted', '1');
    } catch {}
    show(label);
    window.setTimeout(() => location.assign(url.href), reduced() ? 0 : 420);
  });

  // Volver con el botón "atrás" restaura la página desde la caché con el telón puesto.
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) hide();
  });
}
