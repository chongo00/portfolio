// Todo el texto del sitio vive aquí, en los dos idiomas. Las páginas se
// generan a partir de este archivo con `npm run build`.
//
// Las cifras salen de `git log` de cada repositorio (commits propios) y de
// los mensajes de commit; si cambian, se actualizan aquí y en ningún otro sitio.
//
// Un texto puede ser una cadena o { es, en } cuando cambia con el idioma.

export const site = {
  url: 'https://christian-chongo.pages.dev',
  name: 'Christian G. de la Cruz Chongo',
  shortName: 'Christian Chongo',
  email: 'chongo00011170428@gmail.com',
  phone: '+53 55 73 52 34',
  whatsapp: 'https://wa.me/5355735234',
  linkedin: 'https://www.linkedin.com/in/christian-gilbbert-de-la-cruz-chongo-a824b3384',
  github: 'https://github.com/chongo00',
  githubHandle: 'chongo00',
  orcid: 'https://orcid.org/0009-0002-8736-4271',
  repo: 'https://github.com/chongo00/portfolio',
  timezone: 'America/Havana',
  updated: '2026-10',
};

// Textos de interfaz. Las claves son las mismas en los dos idiomas.
// El inglés es el idioma por defecto (vive en /), el español en /es/.
export const ui = {
  en: {
    lang: 'en',
    locale: 'en_US',
    otherLang: 'es',
    otherLangLabel: 'ES',
    home: '/',
    cv: '/cv/',
    title: 'Christian de la Cruz Chongo · Full stack software engineer',
    description:
      'Computer engineer and university lecturer in Villa Clara, Cuba. I build AI voice agents that take orders over the phone, web and mobile apps for businesses, and automations. Projects, experience and contact.',
    skip: 'Skip to content',
    nav: [
      { id: 'about', label: 'About' },
      { id: 'work', label: 'Work' },
      { id: 'services', label: 'Services' },
      { id: 'contact', label: 'Contact' },
    ],
    navAria: 'Main navigation',
    cvShort: 'CV',
    themeToDark: 'Switch to dark theme',
    themeToLight: 'Switch to light theme',
    langSwitch: 'Leer en español',
    boot: {
      mark: 'Christian Chongo',
      aria: 'Loading the portfolio',
      stages: ['waking up', 'reading the page', 'loading fonts', 'preparing projects', 'ready'],
      skip: 'click to skip',
    },
    curtain: 'loading',

    hero: {
      label: 'Full stack engineer and university lecturer · Villa Clara, Cuba',
      // Las palabras entre corchetes son las que reaccionan al pasar el ratón.
      h1: ['I build', '[software]', 'that', '[habla]', 'and', '[vende]', '.'],
      words: { software: 'software', habla: 'talks', vende: 'sells' },
      intro:
        'I build voice agents that answer calls and take orders, web and mobile apps for businesses, and automations that take hours of manual work off a team. I also teach computer architecture and network design at my university.',
      ctaWork: 'See what I have built',
      ctaTalk: 'Tell me about your project',
      photoAlt: 'Portrait of Christian de la Cruz Chongo',
      roles: 'full stack · voice ai · lecturer',
      status: 'Available for new projects',
      clockLabel: 'Time in Villa Clara',
    },

    stats: {
      label: 'In numbers',
      note: 'Counted with git log in each repository, October 2026.',
      items: [
        { value: 537, text: 'commits of my own across the six repositories of the BlindsBook ecosystem' },
        { value: 194, text: 'commits on TuMerkadito, from the first screen to the deploy' },
        { value: 17, text: 'product types the mobile app prices exactly like the web' },
        { value: 2, text: 'languages the voice agent takes an order in: English and Spanish' },
      ],
    },

    about: {
      label: ['01', 'About'],
      title: 'From the requirement to the system in production.',
      lead:
        'I graduated in Computer Engineering from Universidad Central "Marta Abreu" de Las Villas, where I now teach. I work remotely on systems that real businesses already use: AI phone desks, sales apps for technicians on the road, payment flows and admin panels. I take care of the whole system: database, API, interface, cloud deployment and the documentation someone else needs to maintain it.',
      rows: [
        {
          k: 'Now',
          v: 'Lecturer and software engineer at UCLV since September 2025, and full stack developer in the BlindsBook ecosystem since October 2025.',
        },
        {
          k: 'Education',
          v: 'Computer Engineering, Faculty of Mathematics, Physics and Computing at UCLV (2020 to 2025). Thesis: an IoT control system for business premises with ESP32, MQTT and Home Assistant.',
        },
        {
          k: 'How I work',
          v: 'SCRUM and RUP, pull request reviews on Azure DevOps, CI/CD pipelines and a written document for every system I hand over.',
        },
        {
          k: 'Languages',
          v: 'Native Spanish. English B1, certified by UCLV in 2025; the code, commits and documentation of my current projects are written in English.',
        },
      ],
    },

    exp: {
      label: ['02', 'Experience'],
      title: 'Software that is already at work.',
      now: 'now',
      earlier: 'Earlier',
    },

    work: {
      label: ['03', 'Work'],
      title: 'Projects.',
      lead:
        'The illustrated ones explain best what I do. Some belong to clients and their code is private; the public ones link to GitHub or to the live site.',
      filterLabel: 'Filter projects',
      filters: {
        all: 'All',
        voz: 'Voice & AI',
        app: 'Web & mobile',
        auto: 'Automation',
        datos: 'Data & IoT',
        creativo: 'Creative web',
      },
      empty: 'No projects in this category yet.',
      count: (n) => `${n} ${n === 1 ? 'project' : 'projects'}`,
      more: 'More projects',
      role: 'My part',
      code: 'view code',
      live: 'open site',
      private: 'private client code',
      local: 'no public repository',
      personal: 'personal project',
      commits: (n) => `${n} commits of mine`,
    },

    services: {
      label: ['04', 'Services'],
      title: 'What I can build for your business.',
      proof: 'I have done it in',
    },

    stack: {
      label: ['05', 'Tools'],
      title: 'What I work with.',
    },

    contact: {
      label: ['06', 'Contact'],
      title: ['Tell me what you want to', 'build.'],
      lead:
        'Write to me by email or WhatsApp with two or three lines about your business and what you need. I will reply with concrete questions or with a proposal.',
      copy: 'Copy email',
      copied: 'Email copied',
      copyFail: 'Could not copy it. Select it and copy it by hand.',
      write: 'Write an email',
      whatsapp: 'WhatsApp',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      orcid: 'ORCID',
      cvTitle: 'Résumé',
      cvView: 'View on the web',
      cvPdf: 'Download PDF',
      location: 'Villa Clara, Cuba · working remotely',
    },

    footer: {
      made: 'Designed and coded by hand in Villa Clara.',
      source: 'Source code',
      top: 'Back to top',
    },

    cvPage: {
      title: 'Résumé · Christian G. de la Cruz Chongo',
      description: 'Up to date résumé of Christian G. de la Cruz Chongo, full stack software engineer and university lecturer in Villa Clara, Cuba.',
      back: 'Back to the portfolio',
      print: 'Print',
      download: 'Download PDF',
      role: 'Full stack software engineer · University lecturer',
      profile: 'Profile',
      experience: 'Experience',
      projects: 'Selected projects',
      skills: 'Technical skills',
      education: 'Education',
      languages: 'Languages',
      updated: 'Updated October 2026',
      summary:
        'Full stack computer engineer and university lecturer. I work remotely on production systems: AI voice agents that answer calls and take orders in English and Spanish, mobile sales apps at parity with the web, Stripe payments and integrations with Azure, Twilio and WooCommerce. I also build marketplaces, offline point of sale apps, IoT systems and n8n automations, and I teach computer architecture and LAN design at UCLV. I own the whole system, from the database to the deployment and the documentation.',
      degree: 'Bachelor in Computer Engineering',
      school: 'Universidad Central "Marta Abreu" de Las Villas, Faculty of Mathematics, Physics and Computing',
      thesis: 'Thesis: design of an IoT control system for business premises (ESP32, MQTT, Home Assistant, Telegram bot).',
      langs: [
        ['Spanish', 'native'],
        ['English', 'B1, certified by UCLV (July 3, 2025)'],
      ],
    },

    notFound: {
      title: 'Page not found',
      text: 'This address does not exist, or I moved it. What you are looking for is probably on the home page.',
      back: 'Go to the home page',
    },
  },

  es: {
    lang: 'es',
    locale: 'es_ES',
    otherLang: 'en',
    otherLangLabel: 'EN',
    home: '/es/',
    cv: '/es/cv/',
    title: 'Christian de la Cruz Chongo · Ingeniero de software full stack',
    description:
      'Ingeniero informático y profesor universitario en Villa Clara, Cuba. Construyo agentes de voz con IA que toman pedidos por teléfono, apps web y móviles para negocios y automatizaciones. Proyectos, experiencia y contacto.',
    skip: 'Saltar al contenido',
    nav: [
      { id: 'about', label: 'Sobre mí' },
      { id: 'work', label: 'Trabajo' },
      { id: 'services', label: 'Servicios' },
      { id: 'contact', label: 'Contacto' },
    ],
    navAria: 'Navegación principal',
    cvShort: 'CV',
    themeToDark: 'Cambiar a tema oscuro',
    themeToLight: 'Cambiar a tema claro',
    langSwitch: 'Read in English',
    boot: {
      mark: 'Christian Chongo',
      aria: 'Cargando el portafolio',
      stages: ['despertando', 'leyendo la página', 'cargando tipografías', 'preparando proyectos', 'listo'],
      skip: 'pulsa para saltar',
    },
    curtain: 'cargando',

    hero: {
      label: 'Ingeniero full stack y profesor universitario · Villa Clara, Cuba',
      h1: ['Construyo', '[software]', 'que', '[habla]', 'y', '[vende]', '.'],
      words: { software: 'software', habla: 'habla', vende: 'vende' },
      intro:
        'Hago agentes de voz que atienden llamadas y toman pedidos, apps web y móviles para negocios, y automatizaciones que le quitan horas de trabajo manual a un equipo. Además enseño arquitectura de computadoras y diseño de redes en mi universidad.',
      ctaWork: 'Ver lo que he construido',
      ctaTalk: 'Contarme tu proyecto',
      photoAlt: 'Retrato de Christian de la Cruz Chongo',
      roles: 'full stack · voz con ia · profesor',
      status: 'Disponible para proyectos nuevos',
      clockLabel: 'Hora en Villa Clara',
    },

    stats: {
      label: 'En cifras',
      note: 'Contado con git log en cada repositorio, octubre de 2026.',
      items: [
        { value: 537, text: 'commits propios en los seis repositorios del ecosistema BlindsBook' },
        { value: 194, text: 'commits en TuMerkadito, de la primera pantalla al despliegue' },
        { value: 17, text: 'tipos de producto que la app móvil tasa igual que la web' },
        { value: 2, text: 'idiomas en los que el agente de voz toma un pedido: inglés y español' },
      ],
    },

    about: {
      label: ['01', 'Sobre mí'],
      title: 'Del requisito al sistema en producción.',
      lead:
        'Me gradué de Ingeniería Informática en la Universidad Central «Marta Abreu» de Las Villas, donde ahora doy clases. Trabajo en remoto en sistemas que ya usan negocios reales: centralitas con IA, apps de ventas para técnicos en la calle, pasarelas de pago y paneles de administración. Me ocupo del sistema completo: base de datos, API, interfaz, despliegue en la nube y la documentación para que otra persona pueda mantenerlo.',
      rows: [
        {
          k: 'Hoy',
          v: 'Profesor e ingeniero de software en la UCLV desde septiembre de 2025, y desarrollador full stack en el ecosistema BlindsBook desde octubre de 2025.',
        },
        {
          k: 'Formación',
          v: 'Ingeniería Informática, Facultad de Matemática, Física y Computación de la UCLV (2020 a 2025). Tesis: un sistema de control IoT para locales empresariales con ESP32, MQTT y Home Assistant.',
        },
        {
          k: 'Cómo trabajo',
          v: 'SCRUM y RUP, revisión por pull requests en Azure DevOps, pipelines de CI/CD y un documento escrito para cada sistema que entrego.',
        },
        {
          k: 'Idiomas',
          v: 'Español nativo. Inglés B1 certificado por la UCLV en 2025; el código, los commits y la documentación de mis proyectos actuales están en inglés.',
        },
      ],
    },

    exp: {
      label: ['02', 'Experiencia'],
      title: 'Software que ya está trabajando.',
      now: 'hoy',
      earlier: 'Antes',
    },

    work: {
      label: ['03', 'Trabajo'],
      title: 'Proyectos.',
      lead:
        'Los ilustrados son los que mejor explican lo que hago. Algunos son de clientes y su código es privado; los públicos enlazan a GitHub o al sitio en marcha.',
      filterLabel: 'Filtrar proyectos',
      filters: {
        all: 'Todo',
        voz: 'Voz e IA',
        app: 'Web y móvil',
        auto: 'Automatización',
        datos: 'Datos e IoT',
        creativo: 'Web creativa',
      },
      empty: 'No hay proyectos en esta categoría todavía.',
      count: (n) => `${n} ${n === 1 ? 'proyecto' : 'proyectos'}`,
      more: 'Más proyectos',
      role: 'Mi parte',
      code: 'ver código',
      live: 'abrir sitio',
      private: 'código privado del cliente',
      local: 'sin repositorio público',
      personal: 'proyecto personal',
      commits: (n) => `${n} commits míos`,
    },

    services: {
      label: ['04', 'Servicios'],
      title: 'Lo que puedo construir para tu negocio.',
      proof: 'Lo he hecho en',
    },

    stack: {
      label: ['05', 'Herramientas'],
      title: 'Con qué trabajo.',
    },

    contact: {
      label: ['06', 'Contacto'],
      title: ['Cuéntame qué quieres', 'construir.'],
      lead:
        'Escríbeme por email o WhatsApp con dos o tres líneas sobre tu negocio y lo que necesitas. Te contesto con preguntas concretas o con una propuesta.',
      copy: 'Copiar email',
      copied: 'Email copiado',
      copyFail: 'No se pudo copiar. Selecciónalo y cópialo a mano.',
      write: 'Escribir un email',
      whatsapp: 'WhatsApp',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      orcid: 'ORCID',
      cvTitle: 'Currículum',
      cvView: 'Ver en la web',
      cvPdf: 'Descargar PDF',
      location: 'Villa Clara, Cuba · trabajo en remoto',
    },

    footer: {
      made: 'Diseñado y programado a mano en Villa Clara.',
      source: 'Código fuente',
      top: 'Volver arriba',
    },

    cvPage: {
      title: 'Currículum · Christian G. de la Cruz Chongo',
      description: 'Currículum actualizado de Christian G. de la Cruz Chongo, ingeniero de software full stack y profesor universitario en Villa Clara, Cuba.',
      back: 'Volver al portafolio',
      print: 'Imprimir',
      download: 'Descargar PDF',
      role: 'Ingeniero de software full stack · Profesor universitario',
      profile: 'Perfil',
      experience: 'Experiencia',
      projects: 'Proyectos destacados',
      skills: 'Habilidades técnicas',
      education: 'Educación',
      languages: 'Idiomas',
      updated: 'Actualizado en octubre de 2026',
      summary:
        'Ingeniero informático full stack y profesor universitario. Trabajo en remoto en sistemas en producción: agentes de voz con IA que atienden llamadas y toman pedidos en inglés y español, apps móviles de ventas a la par de la web, pagos con Stripe e integraciones con Azure, Twilio y WooCommerce. También construyo marketplaces, puntos de venta offline, sistemas IoT y automatizaciones con n8n, y enseño arquitectura de computadoras y diseño de redes LAN en la UCLV. Me ocupo del sistema completo, desde la base de datos hasta el despliegue y la documentación.',
      degree: 'Ingeniería Informática',
      school: 'Universidad Central «Marta Abreu» de Las Villas, Facultad de Matemática, Física y Computación',
      thesis: 'Tesis: diseño de un sistema de control IoT para locales empresariales (ESP32, MQTT, Home Assistant, bot de Telegram).',
      langs: [
        ['Español', 'nativo'],
        ['Inglés', 'B1, certificado por la UCLV (3 de julio de 2025)'],
      ],
    },

    notFound: {
      title: 'Página no encontrada',
      text: 'Esta dirección no existe, o la moví. Lo que buscas seguramente está en la portada.',
      back: 'Ir a la portada',
    },
  },
};

// Experiencia. `cv: true` hace que también salga en el currículum.
export const experience = [
  {
    id: 'blindsbook',
    org: 'BlindsBook',
    period: { en: 'Oct 2025 – now', es: 'oct 2025 – hoy' },
    current: true,
    en: {
      role: 'Full stack developer · remote',
      summary:
        'Management software for blinds and window covering companies: sales, orders, invoices, payments and phone service. I work on five of its systems.',
      bullets: [
        'Voice agent that answers calls, identifies the customer, books appointments and takes orders over the phone in English or Spanish, priced exactly like the web (Retell AI, Azure OpenAI, Azure Speech, Twilio).',
        'Mobile sales app in Vue 3 and Capacitor at parity with the web: quotes, orders, schedule, invoices and 17 priced product types. I migrated its backend from NestJS to ASP.NET Core (.NET 10) on Azure Container Apps.',
        'On the web platform (ASP.NET MVC): mandatory Stripe payment, account sign up with email verification and a panel to switch on the voice agent and the SMS (A2P) registration of each company.',
        'A .NET 10 integration API so a dealer can read quotes and orders from its WooCommerce store, and a Telegram bot that queries SQL Server in natural language.',
      ],
    },
    es: {
      role: 'Desarrollador full stack · remoto',
      summary:
        'Software de gestión para empresas de persianas y cortinas: ventas, órdenes, facturas, pagos y atención telefónica. Trabajo en cinco de sus sistemas.',
      bullets: [
        'Agente de voz que atiende llamadas, identifica al cliente, agenda citas y toma pedidos por teléfono en inglés o español, con el precio calculado igual que en la web (Retell AI, Azure OpenAI, Azure Speech, Twilio).',
        'App móvil de ventas en Vue 3 y Capacitor a la par de la web: cotizaciones, órdenes, agenda, facturas y 17 tipos de producto tasados. Migré su backend de NestJS a ASP.NET Core (.NET 10) en Azure Container Apps.',
        'En la plataforma web (ASP.NET MVC): pago obligatorio con Stripe, alta de cuentas con verificación por email y un panel para activar el agente de voz y el registro SMS (A2P) de cada empresa.',
        'API de integración en .NET 10 para que un distribuidor consulte cotizaciones y órdenes desde su tienda WooCommerce, y un bot de Telegram que consulta SQL Server en lenguaje natural.',
      ],
    },
    stack: ['C#', '.NET 10', 'ASP.NET MVC', 'Vue 3', 'Capacitor', 'TypeScript', 'SQL Server', 'Azure', 'Stripe', 'Twilio', 'Retell AI'],
    cv: true,
  },
  {
    id: 'uclv',
    org: { en: 'Universidad Central "Marta Abreu" de Las Villas', es: 'Universidad Central «Marta Abreu» de Las Villas' },
    period: { en: 'Sep 2025 – now', es: 'sept 2025 – hoy' },
    current: true,
    en: {
      role: 'Lecturer and software engineer · Computer Engineering',
      summary: 'I teach in the same degree I graduated from, and I do applied research.',
      bullets: [
        'Computer Architecture, second year: lectures and course assessment.',
        'LAN Design, fourth year: seven labs on designing and configuring networks in Cisco Packet Tracer, and their grading.',
        'Research: a systematic review on IoT in precision agriculture and a study on null values in database management systems (manuscripts, 2025).',
      ],
    },
    es: {
      role: 'Profesor e ingeniero de software · Ingeniería Informática',
      summary: 'Doy clases en la misma carrera de la que me gradué y hago investigación aplicada.',
      bullets: [
        'Arquitectura de Computadoras, en segundo año: clases y evaluación del curso.',
        'Diseño de Redes LAN, en cuarto año: siete laboratorios de diseño y configuración de redes en Cisco Packet Tracer, y su evaluación.',
        'Investigación: una revisión sistemática sobre IoT en la agricultura de precisión y un estudio sobre los valores nulos en los sistemas gestores de bases de datos (manuscritos, 2025).',
      ],
    },
    stack: [
      { en: 'Computer architecture', es: 'Arquitectura de computadoras' },
      { en: 'LAN design', es: 'Diseño de redes LAN' },
      'Cisco Packet Tracer',
      { en: 'Research methods', es: 'Metodología de la investigación' },
    ],
    link: { href: site.orcid, label: 'ORCID 0009-0002-8736-4271' },
    cv: true,
  },
  {
    id: 'movisoft',
    org: 'Movisoft',
    period: { en: '2025 – 2026', es: '2025 – 2026' },
    en: {
      role: 'Full stack developer · Villa Clara',
      summary: 'TuMerkadito: a marketplace and point of sale built for Cuba, where buyers and sellers talk over WhatsApp.',
      bullets: [
        'Vue 3 frontend with Pinia and Tailwind; Django 5 and Django REST Framework API on MySQL.',
        'Point of sale and sales reports (IPV), wholesale B2B flow, transfers between warehouses and mixed payments, covered by end to end tests.',
        'User, company and admin roles; Android app with Capacitor and deployments on Hostinger for staging and production.',
      ],
    },
    es: {
      role: 'Desarrollador full stack · Villa Clara',
      summary: 'TuMerkadito: marketplace y punto de venta pensado para Cuba, donde comprador y vendedor se escriben por WhatsApp.',
      bullets: [
        'Frontend en Vue 3 con Pinia y Tailwind; API en Django 5 y Django REST Framework sobre MySQL.',
        'Punto de venta e informes IPV, flujo mayorista B2B, transferencias entre almacenes y pagos mixtos, con pruebas de extremo a extremo.',
        'Roles de usuario, empresa y administrador; app Android con Capacitor y despliegues en Hostinger para laboratorio y producción.',
      ],
    },
    stack: ['Vue 3', 'Pinia', 'Tailwind', 'Django 5', 'DRF', 'MySQL', 'Capacitor'],
    cv: true,
  },
];

// Experiencia anterior, en formato compacto.
export const earlier = [
  {
    org: { en: 'MINEM Technology Park', es: 'Parque Tecnológico MINEM' },
    en: { role: 'Backend and RAG', text: 'Tutoring on RAG to generate business reports with generative AI models and vector databases.' },
    es: { role: 'Backend y RAG', text: 'Tutoría sobre RAG para generar reportes empresariales con modelos de IA generativa y bases de datos vectoriales.' },
  },
  {
    org: { en: 'Independent projects', es: 'Proyectos independientes' },
    en: { role: 'Automation with n8n', text: 'WhatsApp chatbots connected to databases, bots that generate posts and videos for social media, semantic YouTube search and MCP servers.' },
    es: { role: 'Automatización con n8n', text: 'Chatbots de WhatsApp conectados a bases de datos, bots que generan posts y vídeos para redes, buscadores semánticos de YouTube y servidores MCP.' },
  },
  {
    org: { en: 'SuMetApp · internship', es: 'SuMetApp · práctica profesional' },
    en: { role: 'Python and image processing', text: 'Desktop app for the crystallographic analysis of sugar samples, built as a team with Carlos Luis and Javier Bravo.' },
    es: { role: 'Python y procesamiento de imágenes', text: 'App de escritorio para el análisis cristalográfico de muestras de azúcar, hecha en equipo con Carlos Luis y Javier Bravo.' },
  },
];

// Proyectos. `poster` indica que tiene ilustración propia (ver posters.mjs);
// los demás reciben una composición generada a partir de su id.
// links: repo, live, private (de un cliente), local (sin repo público), personal.
export const projects = [
  {
    id: 'callcenter',
    name: 'CallCenter AI',
    cats: ['voz', 'auto'],
    poster: 'callcenter',
    commits: 76,
    links: { private: true },
    stack: ['Retell AI', 'Node.js', 'TypeScript', 'ASP.NET', 'SQL Server', 'Azure'],
    en: {
      kicker: 'BlindsBook · voice agent',
      line: 'A voice agent that takes blinds orders over the phone.',
      desc: 'The dealer calls and dictates sizes, colors and options; the agent builds the quote at the same price as the web, reads it back and sends the PDF. It answers in the caller\'s language, resumes the order if the call drops and routes each number to its company.',
      role: 'The agent backend, the full order flow, the bilingual read back and the tests that check the phone price against the web price.',
    },
    es: {
      kicker: 'BlindsBook · agente de voz',
      line: 'Un agente de voz que toma pedidos de persianas por teléfono.',
      desc: 'El distribuidor llama, dicta medidas, colores y opciones, y el agente arma la cotización con el mismo precio que la web, se la lee de vuelta y le envía el PDF. Contesta en el idioma de quien llama, retoma el pedido si la llamada se corta y enruta cada número a su empresa.',
      role: 'Backend del agente, el flujo de pedido completo, la lectura bilingüe y las pruebas que comparan el precio por teléfono con el de la web.',
    },
  },
  {
    id: 'receptionist',
    name: 'Receptionist IA',
    cats: ['voz'],
    poster: 'receptionist',
    links: { repo: 'https://github.com/chongo00/ReceptionistIA' },
    stack: ['TypeScript', 'Express', 'Azure OpenAI', 'Azure Speech', 'Twilio', 'Docker'],
    en: {
      kicker: 'Phone receptionist',
      line: 'Answers, recognizes the customer and books the appointment.',
      desc: 'It asks for the language, identifies the customer by phone number or name and books a quote, installation or repair with a date said in plain words. A state machine drives the conversation and handles up to 20 simultaneous calls isolated per session. It also exposes an endpoint that detects window frames in photos.',
      role: 'The whole service: dialogue, neural voice, telephony, vision OCR and the roughly 200 MB Docker image.',
    },
    es: {
      kicker: 'Recepcionista telefónica',
      line: 'Contesta, reconoce al cliente y agenda la cita.',
      desc: 'Pregunta el idioma, identifica al cliente por su número o su nombre y agenda cotización, instalación o reparación con la fecha dicha en lenguaje natural. Una máquina de estados guía la conversación y aguanta hasta 20 llamadas simultáneas aisladas por sesión. Trae además un endpoint que detecta marcos de ventana en fotos.',
      role: 'Todo el servicio: diálogo, voz neuronal, telefonía, OCR con visión y la imagen Docker de unos 200 MB.',
    },
  },
  {
    id: 'mobile',
    name: 'BlindsBook Mobile',
    cats: ['app'],
    poster: 'mobile',
    commits: 236,
    links: { private: true },
    stack: ['Vue 3', 'Capacitor', 'Tailwind', 'ASP.NET Core', 'SQL Server', 'Azure'],
    en: {
      kicker: 'BlindsBook · sales app',
      line: 'The sales app, in the technician\'s pocket.',
      desc: 'Quotes, orders, invoices, payments and schedule at parity with the web: 17 product types with the same price calculation, directions to the customer\'s house and calls from their record. Android and iOS from a single codebase.',
      role: 'The mobile client and the backend migration from NestJS to ASP.NET Core (.NET 10) deployed on Azure Container Apps.',
    },
    es: {
      kicker: 'BlindsBook · app de ventas',
      line: 'La app de ventas, en el bolsillo del técnico.',
      desc: 'Cotizaciones, órdenes, facturas, pagos y agenda a la par de la web: 17 tipos de producto con el mismo cálculo de precio, la ruta hasta la casa del cliente y llamadas desde su ficha. Android e iOS desde una sola base de código.',
      role: 'El cliente móvil y la migración del backend de NestJS a ASP.NET Core (.NET 10) desplegado en Azure Container Apps.',
    },
  },
  {
    id: 'tumerkadito',
    name: 'TuMerkadito',
    cats: ['app'],
    poster: 'market',
    commits: 194,
    links: { live: 'https://tumerkadito.com/' },
    stack: ['Vue 3', 'Pinia', 'Tailwind', 'Django 5', 'DRF', 'MySQL', 'Capacitor'],
    en: {
      kicker: 'Movisoft · marketplace and POS',
      line: 'A marketplace and point of sale made for Cuba.',
      desc: 'Businesses list their products, customers find them by category or distance and message them on WhatsApp, with no payment gateway needed. Each company runs inventory, warehouses, transfers, wholesale orders and its point of sale from its own panel, with sales reports and an Android app that keeps working with a weak connection.',
      role: 'Frontend, API, point of sale and reports, end to end tests, Android app and deployments.',
    },
    es: {
      kicker: 'Movisoft · marketplace y TPV',
      line: 'Marketplace y punto de venta hecho para Cuba.',
      desc: 'Los negocios publican productos, los clientes los encuentran por categoría o cercanía y les escriben por WhatsApp, sin pasarela de pago. Cada empresa lleva inventario, almacenes, transferencias, ventas mayoristas y su punto de venta desde su panel, con informes de ventas y una app Android pensada para conexiones débiles.',
      role: 'Frontend, API, punto de venta e informes, pruebas de extremo a extremo, app Android y despliegues.',
    },
  },
  {
    id: 'drapery',
    name: 'Drapery Calculator',
    cats: ['app', 'datos'],
    poster: 'drapery',
    commits: 81,
    links: { repo: 'https://github.com/chongo00/Drapery-Calculator-Vue' },
    stack: ['Vue 3', 'Ionic', 'Capacitor', 'OCR', 'GPT-4o Vision'],
    en: {
      kicker: 'BlindsBook · calculator',
      line: 'Works out the fabric for a drape from the window itself.',
      desc: 'A mobile app for the technician who measures: the photo is taken with a calibrated camera, a three level OCR cascade reads the frame and the app works out width, drop and fabric panels.',
      role: 'Version 2 of the app, the OCR chain and the guide to publish on Google Play and the App Store.',
    },
    es: {
      kicker: 'BlindsBook · calculadora',
      line: 'Calcula la tela de una cortina a partir de la ventana.',
      desc: 'App móvil para el técnico que mide: toma la foto con la cámara calibrada, un OCR en cascada de tres niveles lee el marco y la app calcula ancho, caída y paños de tela.',
      role: 'Versión 2 de la app, la cadena de OCR y la guía para publicar en Google Play y App Store.',
    },
  },
  {
    id: 'iot',
    name: { en: 'IoT control for business premises', es: 'Control IoT para locales empresariales' },
    cats: ['datos'],
    poster: 'iot',
    links: { local: true },
    stack: ['ESP32', 'ESP32-CAM', 'MQTT', 'Home Assistant', 'Node-RED', 'Telegram', 'C++'],
    en: {
      kicker: 'Thesis · UCLV',
      line: 'Four zones of a business that watch themselves and save energy.',
      desc: 'Warehouse, office, reception and sales each run on an ESP32 with temperature, gas, flame, water, light and motion sensors, plus a camera for surveillance. Everything reports over MQTT to Home Assistant, which drives lights and climate by rules and sends critical alerts and remote control through a Telegram bot.',
      role: 'Architecture, firmware for each zone, wiring diagrams, Home Assistant and Node-RED automations, and the device budget.',
    },
    es: {
      kicker: 'Tesis · UCLV',
      line: 'Cuatro zonas de un negocio que se vigilan solas y ahorran energía.',
      desc: 'Almacén, oficina, recepción y ventas funcionan cada una con un ESP32 y sensores de temperatura, gas, llama, agua, luz y movimiento, más una cámara de vigilancia. Todo informa por MQTT a Home Assistant, que maneja luces y climatización por reglas y envía alertas críticas y control remoto por un bot de Telegram.',
      role: 'Arquitectura, firmware de cada zona, esquemas de conexión, automatizaciones en Home Assistant y Node-RED, y el presupuesto de dispositivos.',
    },
  },
  {
    id: 'inventory',
    name: 'Inventory & Sales Pro',
    cats: ['app'],
    poster: 'pos',
    links: { repo: 'https://github.com/chongo00/inventory-sales-pro' },
    stack: ['React', 'TypeScript', 'Electron', 'Capacitor', 'Recharts', 'jsPDF'],
    en: {
      kicker: 'Offline point of sale',
      line: 'Inventory and sales that keep working when the internet does not.',
      desc: 'Products in CUP and USD, sales in cash, by transfer or on credit with customer debts to collect, live profit dashboard and PDF invoices and reports. All data stays on the device, and the same code ships as web, Windows desktop and Android apps.',
      role: 'The whole app, its offline storage and the three builds.',
    },
    es: {
      kicker: 'Punto de venta offline',
      line: 'Inventario y ventas que siguen funcionando cuando internet no.',
      desc: 'Productos en CUP y USD, ventas en efectivo, por transferencia o fiadas con deudas por cobrar, panel de ganancias al momento y facturas e informes en PDF. Los datos se quedan en el dispositivo y el mismo código sale como web, app de escritorio para Windows y app Android.',
      role: 'Toda la app, el almacenamiento offline y las tres versiones.',
    },
  },

  {
    id: 'bbweb',
    name: 'BlindsBook Web',
    cats: ['app'],
    commits: 100,
    links: { private: true },
    stack: ['ASP.NET MVC 5', 'Entity Framework', 'Stripe', 'SQL Server', 'Azure Pipelines'],
    en: { line: 'Stripe payments, account sign up with email verification and the panel that switches on the voice agent and the SMS registration of each company.' },
    es: { line: 'Pagos con Stripe, alta de cuentas con verificación por email y el panel que activa el agente de voz y el registro SMS de cada empresa.' },
  },
  {
    id: 'integration',
    name: 'BlindsBook Integration API',
    cats: ['auto'],
    links: { private: true },
    stack: ['.NET 10', 'Docker', 'SQL Server', 'Azure API Management'],
    en: { line: 'Read only API so a dealer with a WooCommerce store can fetch quotes, sale orders and work orders, with subscription based authentication.' },
    es: { line: 'API de solo lectura para que un distribuidor con tienda WooCommerce consulte cotizaciones, órdenes y órdenes de trabajo, con autenticación por suscripción.' },
  },
  {
    id: 'sqlbot',
    name: 'MCP SQL Bot',
    cats: ['voz', 'auto'],
    links: { local: true },
    stack: ['Node.js', 'Telegram', 'SQL Server', 'MCP'],
    en: { line: 'Natural language queries to SQL Server from Telegram, with safe predefined queries, API key, rate limiting and an audit log.' },
    es: { line: 'Consultas a SQL Server en lenguaje natural desde Telegram, con consultas predefinidas seguras, API key, límite de peticiones y registro de auditoría.' },
  },
  {
    id: 'photopack',
    name: 'PhotoPack Manager',
    cats: ['app'],
    links: { repo: 'https://github.com/chongo00/PhotoPack-Manager' },
    stack: ['React', 'TypeScript', 'Capacitor', 'Tailwind'],
    en: { line: 'Photo pack manager for photo studios: clients, photos, print status and JSON backups, fully offline with an Android app.' },
    es: { line: 'Gestión de packs de fotos para estudios fotográficos: clientes, fotos, estados de impresión y copia de seguridad en JSON, todo offline y con app Android.' },
  },
  {
    id: 'organizer',
    name: 'Organizador IA',
    cats: ['voz', 'auto'],
    links: { repo: 'https://github.com/chongo00/Organizador-IA' },
    stack: ['React', 'Gemini', 'Vite', 'Electron'],
    en: { line: 'Reads the file names in a folder, the AI proposes how to group them and writes the Bash or PowerShell script that creates the folders and moves the files.' },
    es: { line: 'Lee los nombres de una carpeta, la IA propone cómo agruparlos y genera el script de Bash o PowerShell que crea las carpetas y mueve los archivos.' },
  },
  {
    id: 'sensorflow',
    name: 'SensorFlow Analytics',
    cats: ['datos'],
    links: { repo: 'https://github.com/chongo00/sensorflow-analytics' },
    stack: ['React', 'Recharts', 'Electron', 'Capacitor'],
    en: { line: 'Monitoring and analysis of several sensor channels over time, with different calibration parameters for each analysis model.' },
    es: { line: 'Monitoreo y análisis de varios canales de sensores en el tiempo, con parámetros de calibración distintos para cada modelo de análisis.' },
  },
  {
    id: 'n8n',
    name: { en: 'n8n automations', es: 'Automatizaciones n8n' },
    cats: ['auto'],
    links: { repo: 'https://github.com/chongo00/Proyectos-n8n' },
    stack: ['n8n', 'WhatsApp', 'MCP', { en: 'AI APIs', es: 'APIs de IA' }],
    en: { line: 'WhatsApp chatbots backed by a database, bots that publish AI generated content, a semantic YouTube search and a shorts generator.' },
    es: { line: 'Chatbots de WhatsApp con base de datos, bots que publican contenido generado con IA, buscador semántico de YouTube y un generador de shorts.' },
  },
  {
    id: 'cryptobot',
    name: 'CryptoBot UI',
    cats: ['datos'],
    links: { local: true },
    stack: ['React', 'TypeScript', 'Recharts', 'Tailwind'],
    en: { line: 'Interface for an algorithmic trading bot: markets, signals with stop loss and take profit, strategy editor and risk rules. Runs on simulated data.' },
    es: { line: 'Interfaz para un bot de trading algorítmico: mercados, señales con stop loss y take profit, editor de estrategias y reglas de riesgo. Funciona con datos simulados.' },
  },
  {
    id: 'sumetapp',
    name: 'SuMetApp',
    cats: ['datos'],
    links: { repo: 'https://github.com/chongo00/Seumetapp' },
    stack: ['Python', 'Flet', 'PostgreSQL', 'MVC'],
    en: { line: 'Crystallographic analysis of sugar: image editing, histograms, grain labeling, PDF reports and results stored in PostgreSQL.' },
    es: { line: 'Análisis cristalográfico de azúcar: edición de imágenes, histogramas, etiquetado de granos, informes en PDF y resultados guardados en PostgreSQL.' },
  },
  {
    id: 'hyrule',
    name: 'Diario de Hyrule',
    cats: ['creativo', 'app'],
    links: { personal: true },
    stack: ['JavaScript', 'Canvas', 'Capacitor', 'Android', 'Cloudflare Workers', 'Durable Objects'],
    en: { line: 'Installable app (PWA and Android) with eight mini games on my own canvas engine, offline music, native Android widgets and a scoreboard synced between two phones with Durable Objects.' },
    es: { line: 'App instalable (PWA y Android) con ocho minijuegos sobre un motor de canvas propio, música offline, widgets nativos de Android y un marcador sincronizado entre dos teléfonos con Durable Objects.' },
  },
  {
    id: 'universe',
    name: { en: 'A piece of universe', es: 'Un pedacito de universo' },
    cats: ['creativo'],
    links: { personal: true },
    stack: ['JavaScript', 'Canvas', 'Web Audio', 'Pages Functions'],
    en: { line: 'An interactive page with a puzzle at the entrance, a canvas starfield, letters, a notebook and a mailbox backed by Cloudflare Pages Functions.' },
    es: { line: 'Página interactiva con un rompecabezas de entrada, cielo de estrellas en canvas, cartas, cuaderno y un buzón que guarda mensajes con Cloudflare Pages Functions.' },
  },
  {
    id: 'caverna',
    name: 'Caverna',
    cats: ['creativo'],
    links: { repo: 'https://github.com/chongo00/caverna-', live: 'https://chongo00.github.io/caverna-/' },
    stack: ['React', 'TypeScript', 'Framer Motion', 'Tailwind'],
    en: { line: 'An interactive night scene: eight butterflies that reveal song lyrics when touched, a Neruda sonnet and a playlist.' },
    es: { line: 'Una página interactiva de noche: ocho mariposas que revelan versos de canciones al tocarlas, un soneto de Neruda y una playlist.' },
  },
  {
    id: 'portfolio',
    name: { en: 'This portfolio', es: 'Este portafolio' },
    cats: ['creativo'],
    links: { repo: site.repo },
    stack: ['Node.js', 'Canvas', 'CSS', 'Cloudflare Pages'],
    en: { line: 'A small static generator in Node with no dependencies: two languages, the loading screen and page curtain drawn on canvas, the cursor, and the résumé printed to PDF with Chrome.' },
    es: { line: 'Un pequeño generador estático en Node sin dependencias: dos idiomas, pantalla de carga y telón dibujados en canvas, el cursor y el currículum impreso a PDF con Chrome.' },
  },
];

// Servicios. `proof` apunta a ids de proyectos que lo demuestran.
export const services = [
  {
    id: 'voz',
    size: 'wide',
    en: { title: 'AI phone service', text: 'An agent that answers, understands the customer in English or Spanish, books appointments or takes orders and records everything in your system.' },
    es: { title: 'Atención telefónica con IA', text: 'Un agente que contesta, entiende al cliente en inglés o español, agenda citas o toma pedidos y lo deja todo registrado en tu sistema.' },
    proof: ['callcenter', 'receptionist'],
  },
  {
    id: 'apps',
    en: { title: 'Web and mobile apps', text: 'Dashboards, points of sale, marketplaces and apps for your field team, shipped to Android and iOS from a single codebase.' },
    es: { title: 'Apps web y móviles', text: 'Paneles, puntos de venta, marketplaces y apps para tu equipo en la calle, publicadas en Android e iOS desde una sola base de código.' },
    proof: ['mobile', 'tumerkadito'],
  },
  {
    id: 'auto',
    en: { title: 'Automation and integrations', text: 'n8n workflows, WhatsApp and Telegram bots, and connections between your system and Stripe, Twilio, WooCommerce or whatever you already use.' },
    es: { title: 'Automatización e integraciones', text: 'Workflows en n8n, bots de WhatsApp y Telegram, y conexiones entre tu sistema y Stripe, Twilio, WooCommerce o lo que ya uses.' },
    proof: ['n8n', 'integration'],
  },
  {
    id: 'iot',
    en: { title: 'IoT and sensors', text: 'ESP32 devices, sensors and cameras reporting over MQTT to Home Assistant, with rules, dashboards and alerts on your phone.' },
    es: { title: 'IoT y sensores', text: 'Dispositivos ESP32, sensores y cámaras que informan por MQTT a Home Assistant, con reglas, paneles y alertas en tu teléfono.' },
    proof: ['iot', 'sensorflow'],
  },
  {
    id: 'rag',
    en: { title: 'AI on your own data', text: 'Semantic search and RAG to query your documents and generate reports, or to ask your database questions in plain language.' },
    es: { title: 'IA sobre tus datos', text: 'Búsqueda semántica y RAG para consultar tus documentos y generar reportes, o preguntarle a tu base de datos en lenguaje normal.' },
    proof: ['sqlbot', 'organizer'],
  },
];

export const skills = [
  { en: 'Frontend', es: 'Frontend', items: ['Vue 3', 'React', 'TypeScript', 'Ionic', 'Capacitor', 'Tailwind', 'Pinia', 'Leaflet', 'Flet'] },
  { en: 'Backend', es: 'Backend', items: [{ en: 'C# and .NET 10', es: 'C# y .NET 10' }, 'ASP.NET MVC', 'NestJS', 'Express', 'Django 5', 'Laravel', 'Python', 'PHP'] },
  { en: 'Voice and AI', es: 'Voz e IA', items: ['Retell AI', 'Azure OpenAI', 'Azure Speech', 'Twilio', 'Gemini', 'RAG', 'Embeddings', 'MCP'] },
  { en: 'Data', es: 'Datos', items: ['SQL Server', { en: 'PostgreSQL and PostGIS', es: 'PostgreSQL y PostGIS' }, 'MySQL', 'Neo4j', { en: 'Vector databases', es: 'Bases vectoriales' }] },
  { en: 'Cloud and delivery', es: 'Nube y entrega', items: ['Azure', 'Azure DevOps', 'Docker', 'Cloudflare', 'Hostinger', 'Git', 'CI/CD'] },
  { en: 'IoT and networks', es: 'IoT y redes', items: ['ESP32', 'MQTT', 'Home Assistant', 'Node-RED', 'n8n', { en: 'Telegram bots', es: 'Bots de Telegram' }, 'Cisco Packet Tracer'] },
];

// Lo que pasa por la cinta que separa las secciones.
export const marquee = [
  'Vue 3', '.NET 10', 'Azure', 'Retell AI', 'Django', 'Twilio', 'Stripe', 'Capacitor',
  'SQL Server', 'n8n', 'TypeScript', 'Python', 'Docker', 'ESP32',
];

// Proyectos que van en el currículum, en este orden.
export const cvProjects = ['callcenter', 'receptionist', 'mobile', 'tumerkadito', 'drapery', 'iot', 'inventory'];
