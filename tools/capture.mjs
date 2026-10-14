// Genera con Chrome sin ventana:
//   - los PDF del currículum (public/files/cv-christian-chongo-{es,en}.pdf)
//   - las imágenes para compartir en redes (public/img/og-{es,en}.png)
//   - el icono para iPhone (public/img/apple-touch-icon.png)
// Ejecutar después de `node tools/build.mjs`:
//   node tools/capture.mjs
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { startServer } from './serve.mjs';
import { ui, site } from '../src/content.mjs';

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const PORT = 4399;
const base = `http://127.0.0.1:${PORT}`;

const CHROME = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((p) => p && existsSync(p));
if (!CHROME) {
  console.error('No encuentro Chrome ni Edge. Indica la ruta con CHROME_PATH.');
  process.exit(1);
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

function ogPage(lang) {
  const t = ui[lang];
  const words = t.hero.words;
  const parts = t.hero.h1.map((p) => {
    const m = p.match(/^\[(.+)\]$/);
    if (!m) return esc(p);
    const cls = { software: 'w-code', habla: 'w-voice', vende: 'w-sell' }[m[1]];
    return `<span class="${cls}">${esc(words[m[1]])}</span>`;
  });
  if (t.hero.h1.at(-1) === '.') {
    parts.pop();
    parts.push(`<i class="nowrap">${parts.pop()}<b>.</b></i>`);
  }
  const title = parts.join(' ');
  return `<!doctype html><html lang="${lang}" data-theme="light"><head><meta charset="utf-8"><link rel="stylesheet" href="/css/site.css">
<style>
  html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:var(--paper)}
  .og{box-sizing:border-box;width:1200px;height:630px;border:14px solid var(--ink);display:grid;grid-template-columns:1fr 330px}
  .og__main{display:flex;flex-direction:column;justify-content:space-between;padding:48px 56px}
  .og__label{font-size:22px;font-weight:600}
  .og__title{font-family:var(--serif);font-size:98px;font-weight:600;line-height:.98;letter-spacing:-.035em;max-width:11ch}
  .og__title span{display:inline-block;padding:0 .1em;font-style:italic;font-weight:500;transform:skewX(-6deg)}
  .og__title b{font-weight:600;color:var(--sea)}
  .og__title .nowrap{white-space:nowrap;font-style:normal}
  .w-code{background:var(--ink);color:var(--paper)}
  .w-voice{background:var(--sea);color:var(--on-sea)}
  .w-sell{background:var(--sun);color:var(--on-sun)}
  .og__foot{display:flex;justify-content:space-between;gap:24px;font-size:21px;font-weight:700;white-space:nowrap}
  .og__side{border-left:14px solid var(--ink);background:var(--ink);display:grid;grid-template-rows:330px 1fr}
  .og__side img{width:330px;height:330px;object-fit:cover}
  .og__side canvas{width:316px;height:272px;display:block;border-top:14px solid var(--ink)}
</style></head><body>
<div class="og">
  <div class="og__main">
    <p class="og__label">${esc(t.hero.label)}</p>
    <h1 class="og__title">${title}</h1>
    <div class="og__foot"><span>${esc(t.cvPage.role)}</span><span>${site.url.replace('https://', '')}</span></div>
  </div>
  <div class="og__side"><img src="/img/christian-720.jpg" alt=""><canvas data-thumb="og-${lang}"></canvas></div>
</div>
<script type="module">
  import { buildTree, layout, paint, readColors, fitCanvas, hashString } from '/js/mondrian.js';
  const c = document.querySelector('canvas');
  const { w, h, aspect } = fitCanvas(c, 1);
  paint(c.getContext('2d'), layout(buildTree(hashString(c.dataset.thumb), { depth: 4, aspect }), w, h, 1.3), readColors(), 4);
</script>
</body></html>`;
}

const iconPage = `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;width:180px;height:180px;overflow:hidden;background:#17140f}</style></head>
<body><svg width="180" height="180" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" fill="#17140f"/><rect x="6" y="6" width="28" height="52" fill="#0d6e63"/><rect x="38" y="6" width="20" height="24" fill="#f2a900"/><rect x="38" y="34" width="20" height="24" fill="#f4eee1"/></svg></body></html>`;

function run(args) {
  return new Promise((resolve, reject) => {
    const p = spawn(CHROME, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    let err = '';
    p.stderr.on('data', (d) => (err += d));
    p.on('error', reject);
    p.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`Chrome salió con ${code}\n${err.slice(-800)}`))));
  });
}

const server = await startServer({
  port: PORT,
  extra: { '/__og/es': ogPage('es'), '/__og/en': ogPage('en'), '/__icon': iconPage },
});
const profile = await mkdtemp(join(tmpdir(), 'cc-capture-'));
const common = ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check', `--user-data-dir=${profile}`, '--virtual-time-budget=6000', '--run-all-compositor-stages-before-draw'];

try {
  await mkdir(join(pub, 'files'), { recursive: true });
  for (const lang of ['es', 'en']) {
    const out = join(pub, 'files', `cv-christian-chongo-${lang}.pdf`);
    await run([...common, '--no-pdf-header-footer', `--print-to-pdf=${out}`, `${base}${ui[lang].cv}`]);
    console.log(`✓ ${out}`);
    const og = join(pub, 'img', `og-${lang}.png`);
    await run([...common, '--force-device-scale-factor=1', '--window-size=1200,630', `--screenshot=${og}`, `${base}/__og/${lang}`]);
    console.log(`✓ ${og}`);
  }
  const icon = join(pub, 'img', 'apple-touch-icon.png');
  await run([...common, '--force-device-scale-factor=1', '--window-size=180,180', `--screenshot=${icon}`, `${base}/__icon`]);
  console.log(`✓ ${icon}`);
} finally {
  server.close();
  await rm(profile, { recursive: true, force: true }).catch(() => {});
}
