import { site, ui, experience, earlier, projects, services, skills, marquee, cvProjects } from './content.mjs';
import { poster } from './posters.mjs';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const pick = (v, lang) => (v && typeof v === 'object' && !Array.isArray(v) && lang in v ? v[lang] : v);
const pdfName = (lang) => `/files/cv-christian-chongo-${lang}.pdf`;
const pad = (n) => String(n).padStart(2, '0');
const year = site.updated.slice(0, 4);

const icons = {
  theme: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/></svg>',
};

const FONTS = ['fraunces-latin', 'schibsted-latin'];
const MODULES = ['mondrian', 'boot', 'curtain', 'cursor', 'words', 'ui'];

function head(t, { path, altPath, title, description, boot, noindex = false }) {
  const url = site.url + path;
  const altUrl = site.url + altPath;
  const es = t.lang === 'es' ? url : altUrl;
  const en = t.lang === 'en' ? url : altUrl;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: t.lang === 'es' ? 'Ingeniero de software full stack y profesor universitario' : 'Full stack software engineer and university lecturer',
    url: site.url + '/',
    image: site.url + '/img/christian-720.jpg',
    email: 'mailto:' + site.email,
    address: { '@type': 'PostalAddress', addressLocality: 'Villa Clara', addressCountry: 'CU' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidad Central "Marta Abreu" de Las Villas' },
    worksFor: { '@type': 'CollegeOrUniversity', name: 'Universidad Central "Marta Abreu" de Las Villas' },
    sameAs: [site.github, site.linkedin, site.orcid],
  };
  // Script en línea: aplica el tema guardado y decide si se ve la pantalla de
  // carga antes del primer pintado. Sin preferencia guardada, el tema es claro.
  const inline = `(function(){var d=document.documentElement;d.classList.add('js');try{if(localStorage.getItem('cc-theme')==='dark')d.setAttribute('data-theme','dark')}catch(e){}var b=false,c=null;try{b=!sessionStorage.getItem('cc-booted');c=sessionStorage.getItem('cc-curtain');sessionStorage.removeItem('cc-curtain')}catch(e){}if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches){b=false}if(c){d.classList.add('curtain-arrive');d.setAttribute('data-curtain-label',c)}else if(b&&${boot ? 'true' : 'false'}){d.classList.add('booting')}setTimeout(function(){d.classList.remove('booting');d.classList.remove('curtain-arrive')},5000)})();`;
  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="en" href="${en}">
<link rel="alternate" hreflang="es" href="${es}">
<link rel="alternate" hreflang="x-default" href="${en}">`}
<meta name="author" content="${esc(site.name)}">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#f4eee1">
<meta property="og:type" content="profile">
<meta property="og:site_name" content="${esc(site.shortName)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.url}/img/og-${t.lang}.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${t.locale}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
${FONTS.map((f) => `<link rel="preload" href="/fonts/${f}.woff2" as="font" type="font/woff2" crossorigin>`).join('\n')}
<link rel="stylesheet" href="/css/site.css">
<script>${inline}</script>
<script type="module" src="/js/main.js"></script>
${MODULES.map((m) => `<link rel="modulepreload" href="/js/${m}.js">`).join('\n')}
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>`;
}

function chrome(t, { boot }) {
  const b = t.boot;
  const bootHtml = boot
    ? `<div class="boot" data-boot role="progressbar" aria-label="${esc(b.aria)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-valuetext="${esc(b.stages[0])}" data-stages="${esc(JSON.stringify(b.stages))}">
  <p class="boot__mark" aria-hidden="true">${esc(b.mark)}</p>
  <div class="boot__stage"><canvas class="boot__canvas" data-boot-canvas aria-hidden="true"></canvas></div>
  <div class="boot__readout" aria-hidden="true"><span class="boot__percent" data-boot-percent>0%</span><span class="boot__label" data-boot-label>${esc(b.stages[0])}</span></div>
  <div class="boot__bar" aria-hidden="true"><span data-boot-bar></span></div>
  <p class="boot__skip" aria-hidden="true">${esc(b.skip)}</p>
</div>`
    : '';
  return `${bootHtml}
<div class="curtain" data-curtain aria-hidden="true">
  <canvas class="curtain__canvas"></canvas>
  <div class="curtain__plate"><span class="curtain__caption">${esc(t.curtain)}</span><span class="curtain__target" data-curtain-target>&nbsp;</span></div>
</div>
<canvas class="cursor" data-cursor aria-hidden="true"></canvas>`;
}

// Etiqueta de sección: número en cursiva y nombre, en lugar de "01 / sobre mí".
function kicker([n, text], cls = '') {
  return `<p class="kicker${cls}"><span class="kicker__n">${esc(n)}</span><span class="kicker__t">${esc(text)}</span></p>`;
}

function brand(t, home) {
  return `<a class="brand" href="${t.home}"${home ? '' : ' data-curtain'}><span class="brand__mark" aria-hidden="true"><span></span><span></span><span></span></span><span class="brand__name">Christian <em>Chongo</em></span></a>`;
}

function header(t, { home, altHref, cvHref }) {
  const nav = t.nav
    .map(
      (n, i) =>
        `<a class="nav__link" href="${home ? '' : t.home}#${n.id}" data-nav="${n.id}"><span class="nav__num" aria-hidden="true">${pad(i + 1)}</span><span class="nav__label">${esc(n.label)}</span></a>`,
    )
    .join('');
  return `<header class="site-header" id="top">
  <div class="site-header__inner">
    ${brand(t, home)}
    <nav class="nav" aria-label="${esc(t.navAria)}">${nav}</nav>
    <div class="tools">
      <a class="tool" href="${cvHref}" data-curtain>${esc(t.cvShort)}</a>
      <a class="tool" href="${altHref}" hreflang="${t.otherLang}" lang="${t.otherLang}" data-curtain aria-label="${esc(t.langSwitch)}">${t.otherLangLabel}</a>
      <button class="tool tool--icon" type="button" data-theme-toggle data-label-dark="${esc(t.themeToDark)}" data-label-light="${esc(t.themeToLight)}" aria-label="${esc(t.themeToDark)}">${icons.theme}</button>
    </div>
  </div>
  <div class="progress" aria-hidden="true"><span data-progress></span></div>
</header>`;
}

function footer(t) {
  return `<footer class="site-footer">
  <p>© ${year} ${esc(site.name)}. ${esc(t.footer.made)} <a href="${site.repo}" target="_blank" rel="noopener">${esc(t.footer.source)}</a>.</p>
  <a class="site-footer__top" href="#top">${esc(t.footer.top)} <span aria-hidden="true">↑</span></a>
</footer>
<div class="toast" data-toast role="status" aria-live="polite"></div>`;
}

const chips = (list, lang, cls = '') => `<ul class="chips${cls}">${list.map((s) => `<li>${esc(pick(s, lang))}</li>`).join('')}</ul>`;

function heroTitle(t) {
  const words = {
    software: (w) =>
      `<span class="word word--code" data-word="code"><span class="word__fx" aria-hidden="true"><canvas class="word__canvas" data-fx="code"></canvas></span><span class="word__label">${esc(w)}</span></span>`,
    habla: (w) =>
      `<span class="word word--voice" data-word="voice"><span class="word__fx" aria-hidden="true"><canvas class="word__canvas" data-fx="wave"></canvas></span><span class="word__label">${esc(w)}</span></span>`,
    vende: (w) =>
      `<span class="word word--sell" data-word="sell"><span class="word__fx" aria-hidden="true"><canvas class="word__canvas" data-fx="tape"></canvas></span><span class="word__label">${esc(w)}</span></span>`,
  };
  const parts = t.hero.h1.map((part) => {
    const m = part.match(/^\[(.+)\]$/);
    return m ? words[m[1]](t.hero.words[m[1]]) : esc(part);
  });
  // El punto final viaja pegado a la última palabra para que nunca quede solo en una línea.
  if (t.hero.h1.at(-1) === '.') {
    parts.pop();
    parts.push(`<span class="hero__end">${parts.pop()}<span class="hero__dot">.</span></span>`);
  }
  return parts.join(' ');
}

function hero(t) {
  const h = t.hero;
  return `<section class="hero" aria-labelledby="hero-title">
  <div class="hero__head">
    <p class="hero__label">${esc(h.label)}</p>
    <h1 class="hero__title" id="hero-title">${heroTitle(t)}</h1>
  </div>
  <div class="hero__grid">
    <div class="hero__intro">
      <p class="hero__lead">${esc(h.intro)}</p>
      <div class="hero__ctas">
        <a class="btn btn--ink" href="#work">${esc(h.ctaWork)}</a>
        <a class="btn" href="#contact">${esc(h.ctaTalk)}</a>
      </div>
    </div>
    <div class="hero__card">
      <picture class="hero__photo">
        <source srcset="/img/christian-360.webp 360w, /img/christian-720.webp 720w" sizes="(min-width: 64rem) 12rem, 9rem" type="image/webp">
        <img src="/img/christian-360.jpg" srcset="/img/christian-360.jpg 360w, /img/christian-720.jpg 720w" sizes="(min-width: 64rem) 12rem, 9rem" width="360" height="360" alt="${esc(h.photoAlt)}" fetchpriority="high">
      </picture>
      <div class="hero__meta">
        <p class="hero__roles">${esc(h.roles)}</p>
        <p class="status"><span class="status__dot" aria-hidden="true"></span>${esc(h.status)}</p>
        <p class="clock"><span class="clock__label">${esc(h.clockLabel)}</span> <time class="clock__time" data-clock data-tz="${site.timezone}" data-lang="${t.lang}">--:--</time></p>
      </div>
    </div>
  </div>
</section>`;
}

function marqueeBand() {
  const items = marquee.map((s) => `<span>${esc(s)}</span><i aria-hidden="true"></i>`).join('');
  return `<div class="marquee" aria-hidden="true"><div class="marquee__track"><div class="marquee__group">${items}</div><div class="marquee__group">${items}</div></div></div>`;
}

function stats(t) {
  const s = t.stats;
  const items = s.items
    .map(
      (it) =>
        `<li class="stat"><span class="stat__num" data-count="${it.value}">${it.value}</span><span class="stat__text">${esc(it.text)}</span></li>`,
    )
    .join('');
  return `<section class="stats" aria-label="${esc(s.label)}">
  <ul class="stats__list">${items}</ul>
  <p class="stats__note">${esc(s.note)}</p>
</section>`;
}

function about(t) {
  const a = t.about;
  const rows = a.rows.map((r) => `<div class="fact"><dt>${esc(r.k)}</dt><dd>${esc(r.v)}</dd></div>`).join('');
  return `<section class="section about" id="about" aria-labelledby="about-title">
  <div class="about__side">
    ${kicker(a.label)}
    <h2 class="title" id="about-title"><span class="ink-wipe">${esc(a.title)}</span></h2>
  </div>
  <div class="about__body">
    <p class="lead">${esc(a.lead)}</p>
    <dl class="facts">${rows}</dl>
  </div>
</section>`;
}

function exp(t) {
  const e = t.exp;
  const jobs = experience
    .map((j) => {
      const c = j[t.lang];
      const link = j.link
        ? `<a class="link-ext job__link" href="${j.link.href}" target="_blank" rel="noopener">${esc(j.link.label)} <span aria-hidden="true">↗</span></a>`
        : '';
      return `<li class="job${j.current ? ' job--current' : ''}" id="job-${j.id}">
      <div class="job__when"><span>${esc(j.period[t.lang])}</span>${j.current ? `<span class="job__now"><span class="status__dot" aria-hidden="true"></span>${esc(e.now)}</span>` : ''}</div>
      <div class="job__body">
        <h3 class="job__org">${esc(pick(j.org, t.lang))}</h3>
        <p class="job__role">${esc(c.role)}</p>
        <p class="job__summary">${esc(c.summary)}</p>
        <ul class="job__bullets">${c.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
        ${chips(j.stack, t.lang, ' chips--sm')}
        ${link}
      </div>
    </li>`;
    })
    .join('');
  const prev = earlier
    .map((p) => {
      const c = p[t.lang];
      return `<li><p class="earlier__org">${esc(pick(p.org, t.lang))}</p><p class="earlier__role">${esc(c.role)}</p><p class="earlier__text">${esc(c.text)}</p></li>`;
    })
    .join('');
  return `<section class="section exp" id="experience" aria-labelledby="exp-title">
  <div class="section__head">
    ${kicker(e.label)}
    <h2 class="title" id="exp-title"><span class="ink-wipe">${esc(e.title)}</span></h2>
  </div>
  <ol class="jobs">${jobs}</ol>
  <div class="earlier">
    <h3 class="earlier__title">${esc(e.earlier)}</h3>
    <ul class="earlier__list">${prev}</ul>
  </div>
</section>`;
}

function projectLinks(p, w) {
  const out = [];
  if (p.links.live) out.push(`<a class="link-ext" href="${p.links.live}" target="_blank" rel="noopener">${esc(w.live)} <span aria-hidden="true">↗</span></a>`);
  if (p.links.repo) out.push(`<a class="link-ext" href="${p.links.repo}" target="_blank" rel="noopener">${esc(w.code)} <span aria-hidden="true">↗</span></a>`);
  if (p.links.private) out.push(`<span class="note-tag">${esc(w.private)}</span>`);
  if (p.links.local) out.push(`<span class="note-tag">${esc(w.local)}</span>`);
  if (p.links.personal) out.push(`<span class="note-tag">${esc(w.personal)}</span>`);
  if (p.commits) out.push(`<span class="note-tag note-tag--count">${esc(w.commits(p.commits))}</span>`);
  return out.join('');
}

function work(t) {
  const w = t.work;
  const featured = projects.filter((p) => p.poster);
  const rest = projects.filter((p) => !p.poster);
  const total = projects.length;
  const countFor = (cat) => (cat === 'all' ? total : projects.filter((p) => p.cats.includes(cat)).length);
  const filters = Object.entries(w.filters)
    .map(
      ([key, label]) =>
        `<button class="filter" type="button" data-filter="${key}" aria-pressed="${key === 'all'}">${esc(label)} <span class="filter__n">${countFor(key)}</span></button>`,
    )
    .join('');

  const feat = featured
    .map((p, i) => {
      const c = p[t.lang];
      return `<article class="feature${i % 2 ? ' feature--flip' : ''}" id="p-${p.id}" data-project data-cats="${p.cats.join(' ')}" aria-labelledby="p-${p.id}-name">
      <div class="feature__art">${poster(p.poster, t.lang)}</div>
      <div class="feature__body">
        <div class="feature__top"><span class="feature__num">${pad(i + 1)}</span><p class="feature__kicker">${esc(c.kicker)}</p></div>
        <h3 class="feature__name" id="p-${p.id}-name">${esc(pick(p.name, t.lang))}</h3>
        <p class="feature__line">${esc(c.line)}</p>
        <p class="feature__desc">${esc(c.desc)}</p>
        <p class="feature__role"><strong>${esc(w.role)}.</strong> ${esc(c.role)}</p>
        ${chips(p.stack, t.lang)}
        <div class="feature__links">${projectLinks(p, w)}</div>
      </div>
    </article>`;
    })
    .join('');

  const rows = rest
    .map((p, i) => {
      const c = p[t.lang];
      return `<li class="row" id="p-${p.id}" data-project data-cats="${p.cats.join(' ')}">
      <span class="row__num">${pad(featured.length + i + 1)}</span>
      <div class="row__main">
        <h4 class="row__name">${esc(pick(p.name, t.lang))}</h4>
        <p class="row__line">${esc(c.line)}</p>
        ${chips(p.stack, t.lang, ' chips--sm')}
      </div>
      <div class="row__side">
        <canvas class="thumb" data-thumb="${p.id}" aria-hidden="true"></canvas>
        <div class="row__links">${projectLinks(p, w)}</div>
      </div>
    </li>`;
    })
    .join('');

  return `<section class="section work" id="work" aria-labelledby="work-title">
  <div class="work__head">
    <div>
      ${kicker(w.label)}
      <h2 class="title" id="work-title"><span class="ink-wipe">${esc(w.title)}</span></h2>
      <p class="work__lead">${esc(w.lead)}</p>
    </div>
    <a class="link-ext work__gh" href="${site.github}" target="_blank" rel="noopener">github.com/${site.githubHandle} <span aria-hidden="true">↗</span></a>
  </div>
  <div class="work__bar">
    <div class="filters" role="group" aria-label="${esc(w.filterLabel)}">${filters}</div>
    <p class="work__count" data-work-count aria-live="polite" data-one="${esc(w.count(1))}" data-many="${esc(w.count(2))}">${esc(w.count(total))}</p>
  </div>
  <div class="featured">${feat}</div>
  <div class="more" data-more>
    <h3 class="more__title">${esc(w.more)}</h3>
    <ol class="rows">${rows}</ol>
  </div>
  <p class="work__empty" data-work-empty hidden>${esc(w.empty)}</p>
</section>`;
}

function servicesSection(t) {
  const s = t.services;
  const byId = Object.fromEntries(projects.map((p) => [p.id, p]));
  const cells = services
    .map((sv, i) => {
      const c = sv[t.lang];
      const proof = sv.proof
        .map((id) => `<a href="#p-${id}" data-project-link="${id}">${esc(pick(byId[id].name, t.lang))}</a>`)
        .join(', ');
      return `<article class="service${sv.size ? ` service--${sv.size}` : ''}">
      <span class="service__num">${pad(i + 1)}</span>
      <h3 class="service__title">${esc(c.title)}</h3>
      <p class="service__text">${esc(c.text)}</p>
      <p class="service__proof">${esc(s.proof)} ${proof}.</p>
    </article>`;
    })
    .join('');
  return `<section class="section services" id="services" aria-labelledby="services-title">
  <div class="section__head">
    ${kicker(s.label)}
    <h2 class="title" id="services-title"><span class="ink-wipe">${esc(s.title)}</span></h2>
  </div>
  <div class="services__grid">${cells}</div>
</section>`;
}

function stackSection(t) {
  const s = t.stack;
  const groups = skills
    .map((g) => `<div class="stack__group"><h3 class="stack__name">${esc(g[t.lang])}</h3><ul>${g.items.map((i) => `<li>${esc(pick(i, t.lang))}</li>`).join('')}</ul></div>`)
    .join('');
  return `<section class="section stack" id="tools" aria-labelledby="stack-title">
  <div class="section__head">
    ${kicker(s.label)}
    <h2 class="title" id="stack-title"><span class="ink-wipe">${esc(s.title)}</span></h2>
  </div>
  <div class="stack__grid">${groups}</div>
</section>`;
}

function contact(t) {
  const c = t.contact;
  const link = (href, k, v) =>
    `<li><a href="${href}" target="_blank" rel="noopener"><span class="contact__k">${esc(k)}</span><span class="contact__v">${esc(v)}</span><span class="contact__arrow" aria-hidden="true">↗</span></a></li>`;
  return `<section class="section contact" id="contact" aria-labelledby="contact-title">
  <div class="contact__main">
    ${kicker(c.label, ' kicker--inv')}
    <h2 class="contact__title" id="contact-title">${esc(c.title[0])} <em>${esc(c.title[1])}</em></h2>
    <p class="contact__lead">${esc(c.lead)}</p>
    <div class="contact__email">
      <a class="email" href="mailto:${site.email}" aria-label="${esc(c.write)}: ${site.email}">${site.email.replace('@', '<wbr>@')}</a>
      <button class="btn btn--paper" type="button" data-copy="${site.email}" data-copied="${esc(c.copied)}" data-copy-fail="${esc(c.copyFail)}">${esc(c.copy)}</button>
    </div>
  </div>
  <ul class="contact__links">
    ${link(site.whatsapp, c.whatsapp, site.phone)}
    ${link(site.linkedin, c.linkedin, 'christian-gilbbert-de-la-cruz-chongo')}
    ${link(site.github, c.github, '@' + site.githubHandle)}
    ${link(site.orcid, c.orcid, '0009-0002-8736-4271')}
  </ul>
  <div class="contact__cv">
    <p class="contact__k">${esc(c.cvTitle)}</p>
    <div class="contact__cv-links">
      <a class="btn" href="${t.cv}" data-curtain>${esc(c.cvView)}</a>
      <a class="btn btn--ink" href="${pdfName(t.lang)}" download>${esc(c.cvPdf)}</a>
    </div>
  </div>
  <p class="contact__loc">${esc(c.location)}</p>
</section>`;
}

export function renderHome(lang) {
  const t = ui[lang];
  const other = ui[t.otherLang];
  return `${head(t, { path: t.home, altPath: other.home, title: t.title, description: t.description, boot: true })}
<body>
<a class="skip" href="#main">${esc(t.skip)}</a>
${chrome(t, { boot: true })}
${header(t, { home: true, altHref: other.home, cvHref: t.cv })}
<main class="page" id="main">
${hero(t)}
${marqueeBand()}
${stats(t)}
${about(t)}
${exp(t)}
${work(t)}
${servicesSection(t)}
${stackSection(t)}
${contact(t)}
</main>
${footer(t)}
</body>
</html>
`;
}

// ---------------------------------------------------------------- currículum

export function renderCV(lang) {
  const t = ui[lang];
  const other = ui[t.otherLang];
  const p = t.cvPage;
  const byId = Object.fromEntries(projects.map((x) => [x.id, x]));

  const jobs = experience
    .filter((j) => j.cv)
    .map((j) => {
      const c = j[lang];
      return `<article class="cv-item">
        <header class="cv-item__head"><h3>${esc(pick(j.org, lang))} <span class="cv-item__role">· ${esc(c.role)}</span></h3><span class="cv-item__when">${esc(j.period[lang])}</span></header>
        <p class="cv-item__summary">${esc(c.summary)}</p>
        <ul>${c.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
      </article>`;
    })
    .join('');
  const prev = earlier
    .map((e) => `<li><strong>${esc(pick(e.org, lang))}</strong> · ${esc(e[lang].role)}. ${esc(e[lang].text)}</li>`)
    .join('');
  const projs = cvProjects
    .map((id) => {
      const x = byId[id];
      const link = x.links.live || x.links.repo;
      const pretty = link ? link.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';
      return `<li><strong>${esc(pick(x.name, lang))}</strong>. ${esc(x[lang].line)} <span class="cv-muted">${esc(x.stack.map((i) => pick(i, lang)).join(', '))}${pretty ? ` · <a href="${link}">${esc(pretty)}</a>` : ''}</span></li>`;
    })
    .join('');
  const skillRows = skills.map((g) => `<div><dt>${esc(g[lang])}</dt><dd>${esc(g.items.map((i) => pick(i, lang)).join(', '))}</dd></div>`).join('');
  const langs = p.langs.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');

  return `${head(t, { path: t.cv, altPath: other.cv, title: p.title, description: p.description, boot: false })}
<body class="cv-body">
<a class="skip" href="#cv">${esc(t.skip)}</a>
${chrome(t, { boot: false })}
<div class="cv-toolbar" id="top">
  <a class="tool" href="${t.home}" data-curtain><span aria-hidden="true">←</span> ${esc(p.back)}</a>
  <div class="cv-toolbar__right">
    <a class="tool" href="${other.cv}" hreflang="${t.otherLang}" lang="${t.otherLang}" data-curtain aria-label="${esc(t.langSwitch)}">${t.otherLangLabel}</a>
    <button class="tool" type="button" data-print>${esc(p.print)}</button>
    <a class="tool tool--ink" href="${pdfName(lang)}" download>${esc(p.download)}</a>
    <button class="tool tool--icon" type="button" data-theme-toggle data-label-dark="${esc(t.themeToDark)}" data-label-light="${esc(t.themeToLight)}" aria-label="${esc(t.themeToDark)}">${icons.theme}</button>
  </div>
</div>
<main class="cv" id="cv">
  <header class="cv-head">
    <img class="cv-head__photo" src="/img/christian-360.jpg" width="360" height="360" alt="${esc(t.hero.photoAlt)}">
    <div class="cv-head__id">
      <h1>${esc(site.name)}</h1>
      <p class="cv-head__role">${esc(p.role)}</p>
      <ul class="cv-head__contact">
        <li><a href="mailto:${site.email}">${site.email}</a></li>
        <li><a href="${site.whatsapp}">${esc(site.phone)}</a></li>
        <li>Villa Clara, Cuba</li>
        <li><a href="${site.url}${t.home}">${site.url.replace('https://', '')}</a></li>
        <li><a href="${site.github}">github.com/${site.githubHandle}</a></li>
        <li><a href="${site.linkedin}">linkedin.com/in/christian-gilbbert-de-la-cruz-chongo</a></li>
        <li><a href="${site.orcid}">orcid.org/0009-0002-8736-4271</a></li>
      </ul>
    </div>
  </header>
  <section class="cv-sec"><h2>${esc(p.profile)}</h2><p>${esc(p.summary)}</p></section>
  <section class="cv-sec"><h2>${esc(p.experience)}</h2>${jobs}<ul class="cv-prev">${prev}</ul></section>
  <section class="cv-sec"><h2>${esc(p.projects)}</h2><ul class="cv-projects">${projs}</ul></section>
  <section class="cv-sec"><h2>${esc(p.skills)}</h2><dl class="cv-dl">${skillRows}</dl></section>
  <div class="cv-cols">
    <section class="cv-sec"><h2>${esc(p.education)}</h2><p><strong>${esc(p.degree)}</strong> · 2020 – 2025<br>${esc(p.school)}</p><p class="cv-muted">${esc(p.thesis)}</p></section>
    <section class="cv-sec"><h2>${esc(p.languages)}</h2><dl class="cv-dl">${langs}</dl></section>
  </div>
  <p class="cv-updated">${esc(p.updated)}</p>
</main>
</body>
</html>
`;
}

// ---------------------------------------------------------------------- 404

export function render404() {
  const en = ui.en.notFound;
  const es = ui.es.notFound;
  const t = ui.en;
  return `${head(t, { path: '/404', altPath: '/404', title: `${en.title} · ${site.shortName}`, description: en.text, boot: false, noindex: true })}
<body class="nf-body">
${chrome(t, { boot: false })}
<main class="nf" id="main">
  <canvas class="nf__art" data-thumb="page-not-found" aria-hidden="true"></canvas>
  <div class="nf__text">
    ${kicker(['404', site.shortName])}
    <h1>${esc(en.title)}</h1>
    <p>${esc(en.text)}</p>
    <a class="btn btn--ink" href="/">${esc(en.back)}</a>
    <p lang="es" class="nf__alt">${esc(es.text)} <a href="/es/">${esc(es.back)}</a></p>
  </div>
</main>
</body>
</html>
`;
}
