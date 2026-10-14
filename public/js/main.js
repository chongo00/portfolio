import { initBoot } from './boot.js';
import { initCurtain } from './curtain.js';
import { initCursor } from './cursor.js';
import { initWords } from './words.js';
import {
  initTheme,
  initCopy,
  initClock,
  initReveal,
  initScrollState,
  initFilters,
  initPosters,
  initThumbs,
  initPrint,
} from './ui.js';

// Cada parte arranca por separado: si una falla, las demás siguen funcionando.
function safely(name, fn) {
  try {
    return fn();
  } catch (err) {
    console.error(`[${name}]`, err);
    return null;
  }
}

const lang = document.documentElement.lang === 'en' ? 'en' : 'es';

safely('theme', initTheme);
safely('curtain', initCurtain);
safely('cursor', initCursor);
safely('copy', initCopy);
safely('clock', initClock);
safely('scroll', initScrollState);
safely('filters', initFilters);
safely('posters', initPosters);
safely('thumbs', initThumbs);
safely('print', initPrint);
const words = safely('words', () => initWords(lang));

const booted = safely('boot', initBoot) || Promise.resolve();
booted.then(() => {
  safely('reveal', initReveal);
  if (words) safely('demo', () => words.demo());
});
