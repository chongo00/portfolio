// Servidor local para ver el sitio igual que en Cloudflare Pages.
//   node tools/serve.mjs            -> http://127.0.0.1:4321
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

async function resolveFile(pathname) {
  const clean = normalize(decodeURIComponent(pathname)).replace(/^([/\\])+/, '');
  if (clean.startsWith('..')) return null;
  let file = join(pub, clean);
  try {
    const s = await stat(file);
    if (s.isDirectory()) file = join(file, 'index.html');
    await stat(file);
    return file;
  } catch {
    return null;
  }
}

/** `extra` permite servir páginas que no existen en disco (las usa capture.mjs). */
export function startServer({ port = 4321, extra = {} } = {}) {
  const server = createServer(async (req, res) => {
    const { pathname } = new URL(req.url, 'http://localhost');
    if (extra[pathname]) {
      res.writeHead(200, { 'content-type': TYPES['.html'] });
      res.end(extra[pathname]);
      return;
    }
    const file = await resolveFile(pathname);
    if (!file) {
      // Igual que Pages: /cv sin barra redirige a /cv/.
      if (!pathname.endsWith('/') && (await resolveFile(pathname + '/'))) {
        res.writeHead(308, { location: pathname + '/' });
        res.end();
        return;
      }
      res.writeHead(404, { 'content-type': TYPES['.html'] });
      res.end(await readFile(join(pub, '404.html')).catch(() => 'Not found'));
      return;
    }
    res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
    res.end(await readFile(file));
  });
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve(server)));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const port = Number(process.env.PORT) || 4321;
  await startServer({ port });
  console.log(`Sirviendo public/ en http://127.0.0.1:${port}`);
}
