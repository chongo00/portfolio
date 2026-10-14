// Genera las páginas estáticas a partir de src/content.mjs.
//   node tools/build.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderHome, renderCV, render404 } from '../src/render.mjs';
import { site } from '../src/content.mjs';

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

// El inglés vive en la raíz y el español en /es/.
const pages = {
  'index.html': renderHome('en'),
  'es/index.html': renderHome('es'),
  'cv/index.html': renderCV('en'),
  'es/cv/index.html': renderCV('es'),
  '404.html': render404(),
};

const today = new Date().toISOString().slice(0, 10);
const urls = ['/', '/es/', '/cv/', '/es/cv/'];
pages['sitemap.xml'] = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${site.url}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
// Las direcciones antiguas en /en/ (cuando el español era la portada) siguen funcionando.
pages['_redirects'] = `/en /  301
/en/ /  301
/en/cv /cv/  301
/en/cv/ /cv/  301
/en/* /:splat  301
`;
pages['robots.txt'] = `User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap.xml
`;

let failed = false;
for (const [file, html] of Object.entries(pages)) {
  // Regla de estilo del texto: nada de rayas largas (U+2014).
  if (file.endsWith('.html') && html.includes('—')) {
    console.error(`✗ ${file} contiene una raya larga (—). Usa coma, punto o dos puntos.`);
    failed = true;
  }
  const dest = join(pub, file);
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, html, 'utf8');
  console.log(`✓ ${file}  ${(Buffer.byteLength(html) / 1024).toFixed(1)} KB`);
}
if (failed) process.exit(1);
