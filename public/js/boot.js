// Pantalla de carga. Solo aparece en la primera visita de la sesión.
// El porcentaje sigue hitos reales (DOM, tipografías, recursos) y la
// composición gana cortes a medida que avanza, así que el dibujo es el progreso.
import { buildTree, layout, paint, readColors, fitCanvas, hashString } from './mondrian.js';

const MIN_MS = 1300;
const MAX_MS = 4200;
const OUT_MS = 750;

export function initBoot() {
  const root = document.documentElement;
  const el = document.querySelector('[data-boot]');
  if (!el || !root.classList.contains('booting')) return Promise.resolve();

  const canvas = el.querySelector('[data-boot-canvas]');
  const pctEl = el.querySelector('[data-boot-percent]');
  const labelEl = el.querySelector('[data-boot-label]');
  const barEl = el.querySelector('[data-boot-bar]');
  const stages = JSON.parse(el.dataset.stages || '[]');
  const ctx = canvas.getContext('2d');
  const tree = buildTree(hashString('christian chongo'), { depth: 6, palette: 'dense', stop: 0.12 });
  const colors = readColors();
  const behind = document.querySelectorAll('body > header, body > main, body > footer');
  behind.forEach((n) => (n.inert = true));

  const t0 = performance.now();
  const hits = { dom: document.readyState !== 'loading', fonts: false, load: document.readyState === 'complete' };
  let shown = 0;
  let finishing = false;
  let done = false;
  let raf = 0;
  let resolve;
  const finished = new Promise((r) => (resolve = r));

  if (!hits.dom) document.addEventListener('DOMContentLoaded', () => (hits.dom = true), { once: true });
  if (!hits.load) window.addEventListener('load', () => (hits.load = true), { once: true });
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(
    () => (hits.fonts = true),
    () => (hits.fonts = true),
  );

  function stageFor(p) {
    if (p >= 1) return stages[4];
    if (p > 0.72) return stages[3];
    if (p > 0.46) return stages[2];
    if (p > 0.2) return stages[1];
    return stages[0];
  }

  function draw(now) {
    const { w, h, dpr } = fitCanvas(canvas);
    const rects = layout(tree, w, h, (now - t0) / 1000, { amp: 0.11, reveal: 0.25 + shown * 0.75 });
    paint(ctx, rects, colors, 2 * dpr);
  }

  function finish() {
    if (done) return;
    done = true;
    cancelAnimationFrame(raf);
    try {
      sessionStorage.setItem('cc-booted', '1');
    } catch {}
    el.classList.add('is-leaving');
    behind.forEach((n) => (n.inert = false));
    window.setTimeout(() => {
      root.classList.remove('booting');
      el.remove();
    }, OUT_MS);
    // La portada empieza a moverse mientras el telón sube, no después.
    window.setTimeout(resolve, OUT_MS * 0.45);
  }

  function frame(now) {
    const elapsed = now - t0;
    const earned = 0.12 + (hits.dom ? 0.28 : 0) + (hits.fonts ? 0.3 : 0) + (hits.load ? 0.3 : 0);
    const ready = hits.dom && hits.fonts && hits.load && elapsed >= MIN_MS;
    if (ready || elapsed >= MAX_MS) finishing = true;
    const timeCap = Math.min(0.94, 1 - Math.pow(1 - Math.min(1, elapsed / MIN_MS), 2.2));
    const goal = finishing ? 1 : Math.min(earned, timeCap);
    shown += (goal - shown) * (finishing ? 0.2 : 0.09);
    if (finishing && 1 - shown < 0.004) shown = 1;

    const pct = Math.round(shown * 100);
    pctEl.textContent = `${pct}%`;
    barEl.style.setProperty('--b', shown.toFixed(3));
    const stage = stageFor(shown);
    if (labelEl.textContent !== stage) {
      labelEl.textContent = stage;
      el.setAttribute('aria-valuetext', stage);
    }
    el.setAttribute('aria-valuenow', String(pct));
    draw(now);

    if (shown >= 1) {
      window.setTimeout(finish, 140);
      return;
    }
    raf = requestAnimationFrame(frame);
  }

  const skip = (e) => {
    if (e.type === 'keydown' && !['Escape', 'Enter', ' '].includes(e.key)) return;
    finishing = true;
    shown = 1;
    finish();
  };
  el.addEventListener('click', skip);
  window.addEventListener('keydown', skip);
  finished.then(() => window.removeEventListener('keydown', skip));

  raf = requestAnimationFrame(frame);
  return finished;
}
