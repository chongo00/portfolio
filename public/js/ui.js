import { buildTree, layout, paint, readColors, fitCanvas, hashString } from './mondrian.js';

const root = document.documentElement;
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasIO = 'IntersectionObserver' in window;

// ------------------------------------------------------------------ tema

export function initTheme() {
  const buttons = document.querySelectorAll('[data-theme-toggle]');
  // El tema claro es el de la marca: solo cambia si el visitante lo pide.
  const current = () => (root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  const sync = () => {
    const dark = current() === 'dark';
    buttons.forEach((b) => {
      b.setAttribute('aria-label', dark ? b.dataset.labelLight : b.dataset.labelDark);
      b.setAttribute('aria-pressed', String(dark));
    });
    const meta = document.querySelectorAll('meta[name="theme-color"]');
    meta.forEach((m) => m.setAttribute('content', getComputedStyle(root).getPropertyValue('--paper').trim()));
  };
  buttons.forEach((b) =>
    b.addEventListener('click', () => {
      const next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem('cc-theme', next);
      } catch {}
      sync();
      window.dispatchEvent(new CustomEvent('themechange'));
    }),
  );
  sync();
}

// ---------------------------------------------------------- aviso flotante

let toastTimer = 0;
export function toast(message) {
  const el = document.querySelector('[data-toast]');
  if (!el) return;
  el.textContent = message;
  el.classList.add('is-on');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => el.classList.remove('is-on'), 2600);
}

export function initCopy() {
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const value = btn.dataset.copy;
      let ok = false;
      try {
        await navigator.clipboard.writeText(value);
        ok = true;
      } catch {
        const ta = document.createElement('textarea');
        ta.value = value;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try {
          ok = document.execCommand('copy');
        } catch {}
        ta.remove();
      }
      toast(ok ? btn.dataset.copied : btn.dataset.copyFail);
    });
  });
}

// ------------------------------------------------------------------ reloj

export function initClock() {
  const el = document.querySelector('[data-clock]');
  if (!el) return;
  const lang = el.dataset.lang === 'en' ? 'en-US' : 'es-ES';
  let fmt;
  let offset = '';
  try {
    fmt = new Intl.DateTimeFormat(lang, { timeZone: el.dataset.tz, hour: '2-digit', minute: '2-digit', hour12: lang === 'en-US' });
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: el.dataset.tz, timeZoneName: 'shortOffset' }).formatToParts(new Date());
    offset = parts.find((p) => p.type === 'timeZoneName')?.value || '';
  } catch {
    return;
  }
  const tick = () => {
    const now = new Date();
    el.textContent = `${fmt.format(now)}${offset ? ` (${offset})` : ''}`;
    el.setAttribute('datetime', now.toISOString());
    window.setTimeout(tick, 60000 - (now.getSeconds() * 1000 + now.getMilliseconds()) + 50);
  };
  tick();
}

// --------------------------------------------- títulos y cifras al entrar

export function initReveal() {
  const titles = document.querySelectorAll('.ink-wipe');
  const counters = document.querySelectorAll('[data-count]');
  if (!hasIO || reduced()) {
    titles.forEach((t) => t.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        if (e.target.dataset.count) countUp(e.target);
        else e.target.classList.add('is-in');
      });
    },
    { rootMargin: '0px 0px -12% 0px' },
  );
  titles.forEach((t) => io.observe(t));
  // La cifra real se queda en el HTML; solo se oculta hasta que se anima.
  counters.forEach((c) => {
    c.classList.add('is-pending');
    io.observe(c);
  });
}

function countUp(el) {
  const end = Number(el.dataset.count);
  el.classList.remove('is-pending');
  const dur = 1200;
  const t0 = performance.now();
  const step = (now) => {
    const k = Math.min(1, (now - t0) / dur);
    const eased = 1 - Math.pow(1 - k, 3);
    el.textContent = String(Math.round(end * eased));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// --------------------------------------- progreso y sección activa del menú

export function initScrollState() {
  const bar = document.querySelector('[data-progress]');
  if (bar) {
    let queued = false;
    const update = () => {
      queued = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.setProperty('--p', max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : '0');
    };
    window.addEventListener('scroll', () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  }

  const links = new Map([...document.querySelectorAll('[data-nav]')].map((a) => [a.dataset.nav, a]));
  if (!links.size || !hasIO) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        const link = links.get(e.target.id);
        if (!link) return;
        if (e.isIntersecting) {
          links.forEach((l) => {
            l.classList.remove('is-active');
            l.removeAttribute('aria-current');
          });
          link.classList.add('is-active');
          link.setAttribute('aria-current', 'location');
        } else if (link.classList.contains('is-active')) {
          link.classList.remove('is-active');
          link.removeAttribute('aria-current');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' },
  );
  links.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) io.observe(section);
  });
}

// ----------------------------------------------------------------- filtros

export function initFilters() {
  const buttons = [...document.querySelectorAll('[data-filter]')];
  if (!buttons.length) return;
  const items = [...document.querySelectorAll('[data-project]')];
  const more = document.querySelector('[data-more]');
  const empty = document.querySelector('[data-work-empty]');
  const count = document.querySelector('[data-work-count]');

  function apply(filter, animate = true) {
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === filter)));
    const before = new Map();
    if (animate && !reduced()) items.forEach((el) => !el.hidden && before.set(el, el.getBoundingClientRect()));

    let visible = 0;
    let visibleRows = 0;
    items.forEach((el) => {
      const show = filter === 'all' || el.dataset.cats.split(' ').includes(filter);
      el.hidden = !show;
      if (show) {
        visible++;
        if (el.classList.contains('row')) visibleRows++;
      }
    });
    if (more) more.hidden = visibleRows === 0;
    if (empty) empty.hidden = visible !== 0;
    if (count) count.textContent = (visible === 1 ? count.dataset.one : count.dataset.many).replace(/\d+/, String(visible));

    if (!animate || reduced()) return;
    // FLIP: cada proyecto se desliza desde donde estaba hasta su sitio nuevo.
    items.forEach((el) => {
      if (el.hidden) return;
      const old = before.get(el);
      if (old) {
        const now = el.getBoundingClientRect();
        const dy = old.top - now.top;
        if (Math.abs(dy) > 1) {
          el.animate([{ transform: `translateY(${dy}px)` }, { transform: 'none' }], { duration: 420, easing: 'cubic-bezier(0.76, 0, 0.24, 1)' });
        }
      } else {
        el.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'ease-out' });
      }
    });
  }

  buttons.forEach((b) => b.addEventListener('click', () => apply(b.dataset.filter)));

  // Un enlace a un proyecto oculto por el filtro vuelve a enseñarlo todo.
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#p-"]');
    if (!a) return;
    const target = document.querySelector(a.getAttribute('href'));
    if (target && target.hidden) apply('all', false);
  });
  if (location.hash.startsWith('#p-')) {
    const target = document.querySelector(location.hash);
    if (target && target.hidden) apply('all', false);
  }
}

// ---------------------------------------- ilustraciones solo cuando se ven

export function initPosters() {
  const posters = document.querySelectorAll('.poster');
  if (!posters.length) return;
  if (!hasIO) {
    posters.forEach((p) => p.classList.add('is-playing'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => e.target.classList.toggle('is-playing', e.isIntersecting));
  });
  posters.forEach((p) => io.observe(p));
}

// ------------------------------------------------------- miniaturas

export function initThumbs() {
  const canvases = [...document.querySelectorAll('canvas[data-thumb]')];
  if (!canvases.length) return;
  let colors = readColors();
  const state = new Map();

  function draw(c, t) {
    const s = state.get(c);
    const { w, h, dpr, aspect } = fitCanvas(c);
    if (!s.tree || Math.abs(s.aspect - aspect) > 0.05) {
      s.tree = buildTree(hashString(c.dataset.thumb), { depth: 4, aspect, stop: 0.22 });
      s.aspect = aspect;
    }
    paint(c.getContext('2d'), layout(s.tree, w, h, t, { amp: 0.14 }), colors, 2 * dpr);
  }

  function animate(c) {
    const s = state.get(c);
    if (s.raf || reduced()) return;
    const t0 = performance.now() - s.t * 1000;
    const loop = (now) => {
      s.t = (now - t0) / 1000;
      draw(c, s.t);
      s.raf = requestAnimationFrame(loop);
    };
    s.raf = requestAnimationFrame(loop);
  }
  function still(c) {
    const s = state.get(c);
    cancelAnimationFrame(s.raf);
    s.raf = 0;
  }

  canvases.forEach((c) => {
    state.set(c, { tree: null, aspect: 0, t: (hashString(c.dataset.thumb) % 1000) / 100, raf: 0 });
    draw(c, state.get(c).t);
    // La composición se mueve mientras el puntero está sobre su proyecto.
    const host = c.closest('[data-project]');
    if (host) {
      host.addEventListener('pointerenter', () => animate(c));
      host.addEventListener('pointerleave', () => still(c));
      host.addEventListener('focusin', () => animate(c));
      host.addEventListener('focusout', () => still(c));
    } else {
      animate(c);
    }
  });

  const redraw = () => {
    colors = readColors();
    canvases.forEach((c) => draw(c, state.get(c).t));
  };
  window.addEventListener('themechange', redraw);
  let rt = 0;
  window.addEventListener('resize', () => {
    window.clearTimeout(rt);
    rt = window.setTimeout(redraw, 150);
  }, { passive: true });
}

export function initPrint() {
  document.querySelectorAll('[data-print]').forEach((b) => b.addEventListener('click', () => window.print()));
}
