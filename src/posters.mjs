// Ilustraciones de los proyectos destacados. Cada una explica qué hace el
// proyecto en una imagen, sin fingir ser una captura de pantalla.
// Los colores salen de clases CSS (p-ink, p-paper...) para que el tema oscuro
// las invierta solo. Las animaciones viven en site.css bajo `.poster`.

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function svg(name, label, body) {
  return `<svg class="poster poster--${name}" viewBox="0 0 480 360" role="img" aria-label="${esc(label)}" focusable="false"><title>${esc(label)}</title><rect class="p-paper" width="480" height="360"/>${body}</svg>`;
}

function text(x, y, s, cls = 'p-text', extra = '') {
  return `<text class="${cls}" x="${x}" y="${y}"${extra}>${esc(s)}</text>`;
}

// Generador determinista para que el HTML no cambie entre builds.
function seeded(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const copy = {
  callcenter: {
    es: {
      label: 'Llamada entrante: el agente escucha el pedido y responde con la cotización lista.',
      bar: 'llamada entrante · pedido',
      caller: ['tres roller shades de', '48 × 60, en blanco'],
      agent: ['Cotización Q-1042 lista.', 'Te la envío en PDF.'],
      doc: 'Q-1042.pdf enviado',
    },
    en: {
      label: 'Incoming call: the agent listens to the order and replies with the quote ready.',
      bar: 'incoming call · order',
      caller: ['three roller shades,', '48 × 60, in white'],
      agent: ['Quote Q-1042 is ready.', 'Sending it as a PDF.'],
      doc: 'Q-1042.pdf sent',
    },
  },
  receptionist: {
    es: {
      label: 'Flujo de la llamada: idioma, cliente, tipo de cita, fecha, confirmación y cita creada.',
      title: 'flujo de la llamada',
      nodes: ['idioma', 'cliente', 'tipo de cita', 'fecha y hora', 'confirmar', 'cita creada'],
      calls: 'hasta 20 llamadas a la vez',
    },
    en: {
      label: 'Call flow: language, customer, appointment type, date, confirmation and booked appointment.',
      title: 'call flow',
      nodes: ['language', 'customer', 'appointment', 'date & time', 'confirm', 'booked'],
      calls: 'up to 20 calls at once',
    },
  },
  mobile: {
    es: {
      label: 'La misma cotización en la app móvil y en la web, con el mismo total.',
      quote: 'Cotización Q-2207',
      web: 'web',
      total: 'total',
      rows: ['Roller', 'Drapery', 'Shutter', 'Vertical'],
      types: '17 tipos de producto',
    },
    en: {
      label: 'The same quote in the mobile app and on the web, with the same total.',
      quote: 'Quote Q-2207',
      web: 'web',
      total: 'total',
      rows: ['Roller', 'Drapery', 'Shutter', 'Vertical'],
      types: '17 product types',
    },
  },
  market: {
    es: {
      label: 'Catálogo de productos de negocios cercanos y una conversación por WhatsApp entre comprador y vendedor.',
      search: 'buscar cerca de ti',
      items: ['café', 'arroz', 'aceite', 'pan', 'jabón', 'frijoles'],
      ask: '¿Tienen café?',
      reply: 'Sí, pasa hoy',
    },
    en: {
      label: 'Product catalog from nearby businesses and a WhatsApp chat between buyer and seller.',
      search: 'search near you',
      items: ['coffee', 'rice', 'oil', 'bread', 'soap', 'beans'],
      ask: 'Got coffee?',
      reply: 'Yes, come by today',
    },
  },
  drapery: {
    es: {
      label: 'Una ventana detectada por la cámara, con sus medidas leídas y la tela calculada.',
      width: 'ancho 48″',
      drop: 'caída 60″',
      result: '→ 4 paños de tela',
      scan: 'leyendo marco',
    },
    en: {
      label: 'A window detected by the camera, with its sizes read and the fabric worked out.',
      width: 'width 48″',
      drop: 'drop 60″',
      result: '→ 4 fabric panels',
      scan: 'reading frame',
    },
  },
  iot: {
    en: {
      label: 'Floor plan of a business with four zones, sensors reporting to Home Assistant and alerts sent to the phone.',
      rooms: ['warehouse', 'office', 'reception', 'sales'],
      hub: 'Home Assistant',
      bus: 'mqtt',
      phone: 'telegram',
      alert: ['alert · warehouse', 'smoke detected'],
      info: ['office', 'lights off'],
      temp: '24.6 °C',
    },
    es: {
      label: 'Plano de un negocio con cuatro zonas, sensores que informan a Home Assistant y alertas que llegan al teléfono.',
      rooms: ['almacén', 'oficina', 'recepción', 'ventas'],
      hub: 'Home Assistant',
      bus: 'mqtt',
      phone: 'telegram',
      alert: ['alerta · almacén', 'humo detectado'],
      info: ['oficina', 'luces apagadas'],
      temp: '24.6 °C',
    },
  },
  pos: {
    en: {
      label: 'A sales receipt printing, with prices in Cuban pesos, payment methods and the app working without a connection.',
      items: [['rice 5 lb', '1 250'], ['oil 1 L', '890'], ['coffee 250 g', '640']],
      total: ['total CUP', '2 780'],
      pay: ['cash', 'transfer', 'on credit'],
      offline: 'offline · saved',
      profit: 'profit today',
    },
    es: {
      label: 'Un ticket de venta imprimiéndose, con precios en pesos cubanos, formas de pago y la app funcionando sin conexión.',
      items: [['arroz 5 lb', '1 250'], ['aceite 1 L', '890'], ['café 250 g', '640']],
      total: ['total CUP', '2 780'],
      pay: ['efectivo', 'transferencia', 'fiado'],
      offline: 'sin red · guardado',
      profit: 'ganancia de hoy',
    },
  },
};

function callcenter(t) {
  const rand = seeded(42);
  let bars = '';
  for (let i = 0; i < 27; i++) {
    const x = 26 + i * 16.4;
    const d = (0.45 + rand() * 0.7).toFixed(2);
    const dl = (-rand() * 1.2).toFixed(2);
    bars += `<rect class="p-sea bar" x="${x.toFixed(1)}" y="78" width="10" height="72" style="--d:${d}s;--dl:${dl}s"/>`;
  }
  return svg(
    'callcenter',
    t.label,
    `<rect class="p-ink" width="480" height="52"/>
    <circle class="p-sun pulse" cx="30" cy="26" r="7"/>
    ${text(48, 31, t.bar, 'p-text p-text--inv')}
    ${text(410, 31, '00:42', 'p-text p-text--inv')}
    ${bars}
    <line class="p-line" x1="0" y1="168" x2="480" y2="168"/>
    <g class="s1">
      <rect class="p-paper2 p-stroke" x="24" y="186" width="250" height="58"/>
      ${text(38, 210, t.caller[0])}${text(38, 230, t.caller[1])}
    </g>
    <g class="s2">
      <rect class="p-sea p-stroke" x="186" y="256" width="270" height="58"/>
      ${text(200, 280, t.agent[0], 'p-text p-text--on-sea')}${text(200, 300, t.agent[1], 'p-text p-text--on-sea')}
    </g>
    <g class="s3">
      <rect class="p-sun p-stroke" x="24" y="268" width="146" height="34"/>
      ${text(36, 290, t.doc, 'p-text p-text--sm')}
    </g>`,
  );
}

function receptionist(t) {
  const pos = [
    [28, 78], [184, 78], [340, 78],
    [340, 196], [184, 196], [28, 196],
  ];
  const w = 112;
  const h = 52;
  let nodes = '';
  let links = '';
  pos.forEach(([x, y], i) => {
    const last = i === pos.length - 1;
    nodes += `<g class="node${last ? ' node--done' : ''}" style="--i:${i}">
      <rect class="node__box p-stroke" x="${x}" y="${y}" width="${w}" height="${h}"/>
      <text class="node__label p-text" x="${x + w / 2}" y="${y + 31}" text-anchor="middle">${esc(t.nodes[i])}</text>
    </g>`;
    if (i < pos.length - 1) {
      const [nx, ny] = pos[i + 1];
      let x1, y1, x2, y2;
      if (ny === y) {
        const dir = nx > x ? 1 : -1;
        x1 = dir > 0 ? x + w : x;
        x2 = dir > 0 ? nx : nx + w;
        y1 = y2 = y + h / 2;
      } else {
        x1 = x2 = x + w / 2;
        y1 = y + h;
        y2 = ny;
      }
      links += `<line class="link" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="--i:${i}"/>`;
    }
  });
  const rand = seeded(7);
  let cells = '';
  for (let i = 0; i < 20; i++) {
    const cx = 28 + (i % 10) * 15;
    const cy = 300 + Math.floor(i / 10) * 15;
    cells += `<rect class="cell" x="${cx}" y="${cy}" width="11" height="11" style="--d:${(1.2 + rand() * 2.4).toFixed(2)}s;--dl:${(-rand() * 3).toFixed(2)}s"/>`;
  }
  return svg(
    'receptionist',
    t.label,
    `${text(28, 44, t.title, 'p-text p-text--muted')}
    ${links}${nodes}
    ${cells}
    ${text(190, 318, t.calls, 'p-text p-text--sm')}`,
  );
}

function mobile(t) {
  const prices = ['$ 286', '$ 512', '$ 334', '$ 152'];
  let phoneRows = '';
  let webRows = '';
  t.rows.forEach((r, i) => {
    const s = `s${Math.min(i + 1, 4)}`;
    phoneRows += `<g class="${s}">
      <rect class="${i % 2 ? 'p-sun' : 'p-sea'}" x="58" y="${112 + i * 40}" width="8" height="24"/>
      ${text(74, 129 + i * 40, r, 'p-text p-text--sm')}
      ${text(194, 129 + i * 40, prices[i], 'p-text p-text--sm', ' text-anchor="end"')}
    </g>`;
    webRows += `<g class="${s}">
      ${text(278, 148 + i * 28, r, 'p-text p-text--sm')}
      ${text(446, 148 + i * 28, prices[i], 'p-text p-text--sm', ' text-anchor="end"')}
      <line class="p-hair" x1="278" y1="${156 + i * 28}" x2="446" y2="${156 + i * 28}"/>
    </g>`;
  });
  return svg(
    'mobile',
    t.label,
    `<rect class="p-paper2" x="236" y="0" width="244" height="360"/>
    <rect class="p-paper p-stroke p-stroke--thick" x="40" y="22" width="172" height="316" rx="22"/>
    <rect class="p-ink" x="104" y="34" width="44" height="7" rx="3"/>
    <rect class="p-ink" x="52" y="56" width="148" height="40"/>
    ${text(62, 81, t.quote, 'p-text p-text--sm p-text--inv')}
    ${phoneRows}
    <g class="s4 total"><rect class="p-sun p-stroke" x="52" y="282" width="148" height="38"/>
      ${text(62, 306, t.total, 'p-text p-text--sm')}${text(192, 306, '$ 1 284', 'p-text p-text--sm p-text--bold', ' text-anchor="end"')}</g>
    <g class="eq"><rect class="p-ink" x="220" y="168" width="22" height="5"/><rect class="p-ink" x="220" y="180" width="22" height="5"/></g>
    <rect class="p-paper p-stroke" x="264" y="84" width="196" height="232"/>
    <rect class="p-ink" x="264" y="84" width="196" height="26"/>
    <circle class="p-paper" cx="278" cy="97" r="4"/><circle class="p-paper" cx="292" cy="97" r="4"/><circle class="p-paper" cx="306" cy="97" r="4"/>
    ${text(446, 102, t.web, 'p-text p-text--sm p-text--inv', ' text-anchor="end"')}
    ${webRows}
    <g class="s4 total"><rect class="p-sun p-stroke" x="274" y="268" width="176" height="36"/>
      ${text(284, 291, t.total, 'p-text p-text--sm')}${text(440, 291, '$ 1 284', 'p-text p-text--sm p-text--bold', ' text-anchor="end"')}</g>
    ${text(264, 50, t.types, 'p-text p-text--muted')}`,
  );
}

function market(t) {
  const shapes = [
    (x, y) => `<circle class="p-sea" cx="${x + 40}" cy="${y + 40}" r="22"/>`,
    (x, y) => `<rect class="p-ink" x="${x + 20}" y="${y + 20}" width="40" height="40"/>`,
    (x, y) => `<polygon class="p-sun" points="${x + 40},${y + 16} ${x + 64},${y + 60} ${x + 16},${y + 60}"/>`,
    (x, y) => `<rect class="p-sun" x="${x + 14}" y="${y + 28}" width="52" height="26" rx="13"/>`,
    (x, y) => `<rect class="p-sea" x="${x + 22}" y="${y + 18}" width="36" height="44"/>`,
    (x, y) => `<circle class="p-ink" cx="${x + 30}" cy="${y + 42}" r="12"/><circle class="p-ink" cx="${x + 52}" cy="${y + 36}" r="12"/>`,
  ];
  let tiles = '';
  t.items.forEach((name, i) => {
    const x = 24 + (i % 3) * 92;
    const y = 82 + Math.floor(i / 3) * 132;
    tiles += `<g class="tile" style="--i:${i}">
      <rect class="p-paper p-stroke" x="${x}" y="${y}" width="80" height="118"/>
      ${shapes[i](x, y)}
      <line class="p-hair" x1="${x}" y1="${y + 82}" x2="${x + 80}" y2="${y + 82}"/>
      ${text(x + 8, y + 104, name, 'p-text p-text--sm')}
    </g>`;
  });
  return svg(
    'market',
    t.label,
    `<rect class="p-paper p-stroke" x="24" y="24" width="264" height="38"/>
    <circle class="p-line p-line--thin" cx="44" cy="43" r="7"/><line class="p-line p-line--thin" x1="49" y1="48" x2="55" y2="54"/>
    ${text(64, 48, t.search, 'p-text p-text--sm p-text--muted')}
    ${tiles}
    <g class="pin"><path class="p-sun p-stroke" d="M116 52c-11 0-19 8-19 18 0 13 19 30 19 30s19-17 19-30c0-10-8-18-19-18z"/><circle class="p-paper" cx="116" cy="70" r="6"/></g>
    <rect class="p-paper2" x="306" y="0" width="174" height="360"/>
    <line class="p-line" x1="306" y1="0" x2="306" y2="360"/>
    <g class="s1"><rect class="p-paper p-stroke" x="320" y="96" width="140" height="42"/>${text(332, 122, t.ask, 'p-text p-text--sm')}</g>
    <g class="s2"><rect class="p-sea p-stroke" x="334" y="152" width="134" height="42"/>${text(346, 178, t.reply, 'p-text p-text--sm p-text--on-sea')}</g>
    <g class="s3"><rect class="p-ink" x="320" y="214" width="62" height="10"/><rect class="p-ink" x="320" y="230" width="104" height="10"/><rect class="p-sun" x="320" y="246" width="40" height="10"/></g>`,
  );
}

function drapery(t) {
  const bracket = (x, y, dx, dy) =>
    `<path class="p-line p-line--sun bracket" d="M${x} ${y + dy * 22}V${y}H${x + dx * 22}"/>`;
  return svg(
    'drapery',
    t.label,
    `<path class="p-line p-line--thin" d="M24 54V24h30M456 54V24h-30M24 306v30h30M456 306v30h-30"/>
    <line class="p-line p-line--thin" x1="120" y1="44" x2="340" y2="44"/>
    <line class="p-line p-line--thin" x1="120" y1="36" x2="120" y2="52"/><line class="p-line p-line--thin" x1="340" y1="36" x2="340" y2="52"/>
    <rect class="p-paper" x="186" y="34" width="88" height="20"/>
    ${text(230, 49, t.width, 'p-text p-text--sm', ' text-anchor="middle"')}
    <line class="p-line p-line--thin" x1="368" y1="70" x2="368" y2="290"/>
    <line class="p-line p-line--thin" x1="360" y1="70" x2="376" y2="70"/><line class="p-line p-line--thin" x1="360" y1="290" x2="376" y2="290"/>
    <rect class="p-paper" x="372" y="170" width="84" height="20"/>
    ${text(380, 185, t.drop, 'p-text p-text--sm')}
    <rect class="p-paper2 p-stroke p-stroke--frame" x="120" y="70" width="220" height="220"/>
    <line class="p-line" x1="230" y1="70" x2="230" y2="290"/><line class="p-line" x1="120" y1="180" x2="340" y2="180"/>
    <g class="scan"><rect class="p-sun" x="120" y="70" width="220" height="3"/><rect class="p-sun scan__glow" x="120" y="54" width="220" height="16"/></g>
    ${bracket(110, 60, 1, 1)}${bracket(350, 60, -1, 1)}${bracket(110, 300, 1, -1)}${bracket(350, 300, -1, -1)}
    <rect class="p-ink" x="24" y="312" width="226" height="30"/>
    ${text(36, 332, t.result, 'p-text p-text--sm p-text--inv')}
    ${text(268, 332, t.scan, 'p-text p-text--sm p-text--muted blink')}`,
  );
}

function iot(t) {
  const rooms = [
    [24, 24], [176, 24],
    [24, 180], [176, 180],
  ];
  const rand = seeded(11);
  let body = `<rect class="p-paper2" x="24" y="24" width="304" height="312"/>`;
  rooms.forEach(([x, y], i) => {
    body += text(x + 12, y + 24, t.rooms[i], 'p-text p-text--sm');
    for (let k = 0; k < 3; k++) {
      const cx = x + 30 + rand() * 100;
      const cy = y + 52 + rand() * 80;
      body += `<circle class="${k ? 'p-sea' : 'p-sun'} sensor" cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="6" style="--dl:${(-rand() * 2).toFixed(2)}s"/>`;
    }
    body += `<line class="link link--bus" x1="${x + 76}" y1="${y + 78}" x2="340" y2="82" style="--i:${i}"/>`;
  });
  // Paredes con huecos de puerta.
  body += `<path class="p-line p-line--wall" d="M24 24h304v312H24z"/>
    <path class="p-line p-line--wall" d="M176 24v58M176 116v124M176 274v62M24 180h52M106 180h112M248 180h80"/>
    <g class="cam"><rect class="p-ink" x="128" y="36" width="26" height="16"/><circle class="p-paper" cx="141" cy="44" r="4"/></g>`;
  return svg(
    'iot',
    t.label,
    `${body}
    <rect class="p-ink" x="340" y="58" width="128" height="46"/>
    ${text(404, 86, t.hub, 'p-text p-text--sm p-text--inv', ' text-anchor="middle"')}
    ${text(340, 46, t.bus, 'p-text p-text--sm p-text--muted')}
    ${text(340, 140, t.phone, 'p-text p-text--sm p-text--muted')}
    <g class="s1"><rect class="p-sun p-stroke" x="340" y="152" width="128" height="52"/>${text(348, 173, t.alert[0], 'p-text p-text--xs')}${text(348, 192, t.alert[1], 'p-text p-text--xs p-text--bold')}</g>
    <g class="s2"><rect class="p-paper p-stroke" x="340" y="214" width="128" height="52"/>${text(348, 235, t.info[0], 'p-text p-text--xs')}${text(348, 254, t.info[1], 'p-text p-text--xs p-text--bold')}</g>
    <g class="s3"><rect class="p-sea" x="340" y="278" width="128" height="58"/>${text(404, 316, t.temp, 'p-text p-text--big p-text--on-sea', ' text-anchor="middle"')}</g>`,
  );
}

function pos(t) {
  const lines = t.items
    .map(([name, price], i) => `<g class="s${i + 1}">${text(62, 132 + i * 34, name, 'p-text p-text--sm')}${text(230, 132 + i * 34, price, 'p-text p-text--sm', ' text-anchor="end"')}<line class="p-hair" x1="62" y1="${142 + i * 34}" x2="230" y2="${142 + i * 34}"/></g>`)
    .join('');
  const pays = t.pay
    .map((p, i) => `<g class="pay" style="--i:${i}"><rect class="pay__box p-stroke" x="286" y="${150 + i * 40}" width="170" height="30"/>${text(298, 170 + i * 40, p, 'p-text p-text--sm pay__label')}</g>`)
    .join('');
  const rand = seeded(3);
  let bars = '';
  for (let i = 0; i < 7; i++) {
    const h = 18 + rand() * 30;
    bars += `<rect class="p-sea grow" x="${286 + i * 24}" y="${330 - h}" width="16" height="${h.toFixed(0)}" style="--dl:${(i * 0.08).toFixed(2)}s"/>`;
  }
  return svg(
    'pos',
    t.label,
    `<rect class="p-ink" x="36" y="24" width="220" height="56"/>
    <rect class="p-paper2" x="56" y="66" width="180" height="6"/>
    <circle class="p-sun pulse" cx="232" cy="44" r="6"/>
    <g class="receipt">
      <path class="p-paper p-stroke" d="M58 72h176v248l-11 10-11-10-11 10-11-10-11 10-11-10-11 10-11-10-11 10-11-10-11 10-11-10-11 10-11-10-11 10-11-10-11 10-11-10z"/>
      ${lines}
      <g class="s4"><rect class="p-sun" x="62" y="240" width="168" height="30"/>${text(70, 260, t.total[0], 'p-text p-text--sm p-text--bold')}${text(224, 260, t.total[1], 'p-text p-text--sm p-text--bold', ' text-anchor="end"')}</g>
    </g>
    <g><rect class="p-paper p-stroke" x="286" y="24" width="84" height="36"/><rect class="p-ink" x="370" y="24" width="86" height="36"/>
      ${text(328, 47, 'CUP', 'p-text p-text--bold', ' text-anchor="middle"')}${text(413, 47, 'USD', 'p-text p-text--bold p-text--inv', ' text-anchor="middle"')}</g>
    <path class="p-line p-line--thin" d="M290 92c14-12 34-12 48 0M297 100c9-7 25-7 34 0"/><circle class="p-ink" cx="314" cy="108" r="3"/><line class="p-line p-line--sun" x1="288" y1="114" x2="340" y2="84"/>
    ${text(350, 104, t.offline, 'p-text p-text--xs')}
    ${pays}
    ${text(286, 282, t.profit, 'p-text p-text--xs p-text--muted')}
    ${bars}`,
  );
}

const builders = { callcenter, receptionist, mobile, market, drapery, iot, pos };

export function poster(name, lang) {
  return builders[name](copy[name][lang]);
}
