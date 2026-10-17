// Copia public/ a _site/ para publicarlo también en GitHub Pages.
//   BASE_PATH=/portfolio node tools/mirror.mjs
//
// Desde algunos países (Cuba, por ejemplo) el dominio *.pages.dev no carga,
// pero *.github.io sí. GitHub Pages sirve el repositorio bajo /portfolio/,
// así que aquí se antepone BASE_PATH a cada ruta absoluta (/css/..., /es/...).
// Si el repositorio se llama chongo00.github.io, BASE_PATH queda vacío.
import { cp, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');
const out = join(root, '_site');
const base = (process.env.BASE_PATH || '').replace(/\/+$/, '');

// _headers y _redirects son de Cloudflare; GitHub Pages los ignoraría.
const skip = new Set(['_headers', '_redirects']);

await rm(out, { recursive: true, force: true });
await cp(pub, out, { recursive: true, filter: (src) => !skip.has(src.slice(pub.length + 1)) });

// "/x" pasa a "{base}/x"; "//dominio" y las URL completas no se tocan.
const prefix = (path) => (path.startsWith('/') && !path.startsWith('//') ? base + path : path);

async function* files(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* files(p);
    else yield p;
  }
}

let count = 0;
if (base) {
  for await (const file of files(out)) {
    let text;
    if (file.endsWith('.html')) {
      text = (await readFile(file, 'utf8'))
        .replace(/(\s(?:href|src)=")([^"]*)"/g, (_, attr, v) => `${attr}${prefix(v)}"`)
        .replace(/(\ssrcset=")([^"]*)"/g, (_, attr, v) =>
          `${attr}${v.split(',').map((s) => s.trim().replace(/^\S+/, prefix)).join(', ')}"`,
        );
    } else if (file.endsWith('.css')) {
      text = (await readFile(file, 'utf8')).replace(/url\((['"]?)(\/[^'")]*)\1\)/g, (_, q, v) => `url(${q}${prefix(v)}${q})`);
    } else continue;
    await writeFile(file, text, 'utf8');
    count++;
  }
}
// Sin este archivo GitHub Pages pasa el sitio por Jekyll.
await writeFile(join(out, '.nojekyll'), '');
console.log(`✓ _site/ listo (base "${base || '/'}", ${count} archivo(s) reescritos)`);
