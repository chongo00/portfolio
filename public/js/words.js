// Las tres palabras del titular. Cada una enseña de qué va mi trabajo:
// "software" deja ver código real del tipo que escribo, "habla" se convierte
// en una onda de voz y "vende" en una cinta de caja. Con ratón se encienden al
// pasar por encima; en táctil van turnándose mientras el titular está a la vista.
// Todo se dibuja en canvas para que el texto del <h1> siga siendo solo el titular.

const CODE = `// order desk: roller shades by phone
const quote = await desk.price({
  product: 'roller', width: 48, height: 60,
  color: 'white', mount: 'inside',
});
await dealer.send(quote.pdf);

[HttpPost("auth/switch-company")]
public IActionResult Switch(int companyId)
{
    var token = _jwt.Issue(User, companyId);
    return Ok(new { token });
}

class Producto(models.Model):
    nombre = models.CharField(max_length=120)
    precio = models.DecimalField(max_digits=10)
    empresa = models.ForeignKey(Empresa)

if (call.language === 'es') agent.say(t('confirmar'));
mqtt.publish('local/luces', JSON.stringify({ on: false }));
`.split('\n');

const TAPE = {
  es: ['+ $ 286.00', 'Q-2207 aprobada', '+ 1 250 CUP', 'orden #4821', '+ $ 1 284.50', 'factura pagada', '+ 640 CUP', 'cotización enviada'],
  en: ['+ $ 286.00', 'Q-2207 approved', '+ 1 250 CUP', 'order #4821', '+ $ 1 284.50', 'invoice paid', '+ 640 CUP', 'quote sent'],
};

function fit(canvas) {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = Math.max(1, Math.round(rect.width * dpr));
  const h = Math.max(1, Math.round(rect.height * dpr));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  return { w, h, dpr };
}

// Un efecto es una función de dibujo que se repite mientras la palabra está encendida.
function effect(canvas, paint, still) {
  const ctx = canvas.getContext('2d');
  let raf = 0;
  let t0 = 0;
  const frame = (now) => {
    const size = fit(canvas);
    ctx.clearRect(0, 0, size.w, size.h);
    paint(ctx, size, (now - t0) / 1000);
    if (!still) raf = requestAnimationFrame(frame);
  };
  return {
    start() {
      cancelAnimationFrame(raf);
      t0 = performance.now();
      raf = requestAnimationFrame(frame);
    },
    stop() {
      cancelAnimationFrame(raf);
    },
  };
}

function cssVar(el, name, fallback) {
  return getComputedStyle(el).getPropertyValue(name).trim() || fallback;
}

// Líneas de texto que suben, como un terminal o una cinta de caja.
function scroller(lines, { align, colorVar, alpha, sizeK, speed }) {
  return (word) => (ctx, { w, h, dpr }, t) => {
    const fs = Math.max(8 * dpr, h * sizeK);
    const lh = fs * 1.45;
    const total = lines.length * lh;
    const off = (t * speed * dpr) % total;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = cssVar(word, colorVar, '#fff');
    ctx.font = `500 ${fs}px "IBM Plex Mono", ui-monospace, monospace`;
    ctx.textAlign = align;
    ctx.textBaseline = 'top';
    const x = align === 'right' ? w - fs * 0.6 : fs * 0.4;
    for (let y = -off, i = 0; y < h; y += lh, i++) ctx.fillText(lines[i % lines.length], x, y);
    ctx.globalAlpha = 1;
  };
}

function wave(word) {
  return (ctx, { w, h, dpr }, t) => {
    ctx.fillStyle = cssVar(word, '--on-sea', '#fff');
    ctx.globalAlpha = 0.32;
    const bars = Math.max(12, Math.round(w / (7 * dpr)));
    const bw = w / bars;
    for (let i = 0; i < bars; i++) {
      const x = i / bars;
      const env = Math.sin(Math.PI * x);
      const v =
        0.55 * Math.abs(Math.sin(x * 9 + t * 5.1)) +
        0.3 * Math.abs(Math.sin(x * 23 - t * 7.3)) +
        0.15 * Math.abs(Math.sin(x * 51 + t * 11));
      const bh = Math.max(2 * dpr, h * 0.86 * env * v);
      ctx.fillRect(i * bw + bw * 0.2, (h - bh) / 2, bw * 0.6, bh);
    }
    ctx.globalAlpha = 1;
  };
}

export function initWords(lang) {
  const words = [...document.querySelectorAll('.hero [data-word]')];
  if (!words.length) return null;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const painters = {
    code: scroller(CODE, { align: 'left', colorVar: '--paper', alpha: 0.42, sizeK: 0.075, speed: 14 }),
    tape: scroller(TAPE[lang] || TAPE.en, { align: 'right', colorVar: '--on-sun', alpha: 0.42, sizeK: 0.085, speed: 22 }),
    wave,
  };
  const fx = new Map();
  words.forEach((w) => {
    const canvas = w.querySelector('[data-fx]');
    if (canvas) fx.set(w, effect(canvas, painters[canvas.dataset.fx](w), reduced));
  });

  function on(w) {
    w.classList.add('is-on');
    fx.get(w)?.start();
  }
  function off(w) {
    w.classList.remove('is-on');
    // Se deja de dibujar cuando ya terminó de desvanecerse.
    window.setTimeout(() => !w.classList.contains('is-on') && fx.get(w)?.stop(), 320);
  }

  let cycling = false;
  let timer = 0;
  let index = 0;

  function cycle() {
    words.forEach(off);
    on(words[index % words.length]);
    index++;
    timer = window.setTimeout(cycle, 2300);
  }
  function stopCycle() {
    window.clearTimeout(timer);
    words.forEach(off);
  }

  if (canHover) {
    words.forEach((w) => {
      w.addEventListener('pointerenter', () => {
        stopCycle();
        on(w);
      });
      w.addEventListener('pointerleave', () => off(w));
    });
  } else if (!reduced) {
    // En táctil la animación se alterna sola, pero solo con el titular a la vista.
    const title = document.querySelector('.hero__title');
    if ('IntersectionObserver' in window && title) {
      new IntersectionObserver((entries) => {
        const visible = entries[0].isIntersecting;
        if (visible && !cycling) {
          cycling = true;
          cycle();
        } else if (!visible && cycling) {
          cycling = false;
          stopCycle();
        }
      }).observe(title);
    }
  }

  return {
    // Una pasada al terminar de cargar, para que se note que las palabras reaccionan.
    demo() {
      if (!canHover || reduced) return;
      words.forEach((w, i) => {
        window.setTimeout(() => on(w), 250 + i * 900);
        window.setTimeout(() => {
          if (!w.matches(':hover')) off(w);
        }, 250 + i * 900 + 1100);
      });
    },
  };
}
