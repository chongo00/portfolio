# Portfolio · Christian G. de la Cruz Chongo

Personal portfolio of a full stack software engineer and university lecturer from Villa Clara, Cuba.
Static site in English and Spanish, with a printable résumé and downloadable PDFs.
No framework and no dependencies: Node renders the HTML and Cloudflare Pages serves it.

**Live:** https://christian-chongo.pages.dev (English) · https://christian-chongo.pages.dev/es/ (español)

---

## Cambiar el contenido

Todo el texto está en **`src/content.mjs`**, en los dos idiomas:

| Qué | Dónde |
|---|---|
| Datos de contacto, URL del sitio, ORCID, repo | `site` |
| Textos de cada sección, titular, botones | `ui.en` / `ui.es` |
| Cifras de la franja de números | `ui.*.stats` (salen de `git log`, actualízalas a mano) |
| Experiencia (BlindsBook, UCLV, Movisoft) | `experience` y `earlier` |
| Proyectos y filtros | `projects` (`cats`: `voz`, `app`, `auto`, `datos`, `creativo`) |
| Servicios | `services` |
| Herramientas | `skills` y `marquee` |
| Proyectos que salen en el CV | `cvProjects` |

Los proyectos con ilustración propia llevan `poster`; sus dibujos están en `src/posters.mjs`.
Un proyecto sin `poster` va a la lista de "más proyectos" con una composición generada a partir de su `id`.

Después de editar:

```sh
npm run capture   # regenera páginas, PDF del CV e imágenes para redes
npm run dev       # http://127.0.0.1:4321
```

`npm run build` regenera solo las páginas (más rápido, sin PDF). Falla si algún
texto lleva una raya larga (—) o si hay un enlace roto.

`npm run capture` necesita Chrome o Edge instalado (lo busca solo; si no,
`CHROME_PATH=ruta npm run capture`).

## Rutas

| Ruta | Página |
|---|---|
| `/` | Portafolio en inglés (por defecto) |
| `/es/` | Portafolio en español |
| `/cv/`, `/es/cv/` | Currículum imprimible |
| `/files/cv-christian-chongo-{en,es}.pdf` | Currículum en PDF |

Las direcciones antiguas en `/en/` redirigen a la raíz (`public/_redirects`).
El tema claro es el de siempre; el oscuro solo se activa con el botón y se recuerda.

## Publicar

```sh
npm run deploy
```

Construye y sube `public/` al proyecto `christian-chongo` de Cloudflare Pages
(configurado en `wrangler.toml`). La primera vez pide iniciar sesión en
Cloudflare en el navegador.

## Estructura

```
src/          contenido y plantillas (lo que se edita)
tools/        build, servidor local, comprobación de enlaces, captura de PDF
public/       lo que se publica; los .html se generan, no se editan a mano
  css/site.css   estilos, tema claro y oscuro, impresión del CV
  js/            animaciones e interacción (módulos sin compilar)
  fonts/         Fraunces, Schibsted Grotesk e IBM Plex Mono (alojadas aquí)
  files/         PDF del currículum
```

## Animaciones

- **Pantalla de carga** (`js/boot.js`): solo en la primera visita de la sesión;
  se salta con clic, Enter o Escape.
- **Telón** (`js/curtain.js`): al cambiar de idioma o ir al CV.
- **Cursor** (`js/cursor.js`): solo con ratón.
- **Palabras del titular** (`js/words.js`): al pasar el ratón; en táctil se turnan solas.
  Se dibujan en canvas para que el `<h1>` contenga solo el titular.

Con "reducir movimiento" activado en el sistema no hay pantalla de carga, ni
cursor propio, ni animaciones en bucle.

## Créditos

Inspirado en el espíritu de [cosmiclatte.is-a.dev](https://cosmiclatte.is-a.dev/).
El código, el diseño y las ilustraciones de este sitio son propios.
Tipografías: Fraunces, Schibsted Grotesk e IBM Plex Mono, todas con licencia SIL Open Font License.
