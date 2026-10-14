// Comprueba que cada enlace y recurso local de las páginas generadas existe,
// y que cada ancla (#id) apunta a un id real.
//   node tools/check.mjs
import { readFile, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const pages = ['index.html', 'es/index.html', 'cv/index.html', 'es/cv/index.html', '404.html'];
const exists = (p) => stat(p).then(() => true, () => false);

let problems = 0;
const ids = {};
const html = {};
for (const page of pages) {
  html[page] = await readFile(join(pub, page), 'utf8');
  ids[page] = new Set([...html[page].matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
}

function pageFor(path) {
  if (path === '/' || path === '') return 'index.html';
  return path.replace(/^\//, '').replace(/\/$/, '/index.html');
}

for (const page of pages) {
  const refs = [...html[page].matchAll(/\s(?:href|src|srcset)="([^"]+)"/g)].flatMap((m) =>
    m[1].split(',').map((s) => s.trim().split(/\s+/)[0]),
  );
  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|data:)/.test(ref)) continue;
    const [path, hash] = ref.split('#');
    const target = path ? pageFor(path) : page;
    if (path && !(await exists(join(pub, path.endsWith('/') ? target : path.replace(/^\//, ''))))) {
      console.error(`✗ ${page}: no existe ${ref}`);
      problems++;
      continue;
    }
    if (hash && ids[target] && !ids[target].has(hash)) {
      console.error(`✗ ${page}: el ancla #${hash} no existe en ${target}`);
      problems++;
    }
  }
}

if (problems) {
  console.error(`\n${problems} problema(s).`);
  process.exit(1);
}
console.log('✓ enlaces, recursos y anclas correctos');
