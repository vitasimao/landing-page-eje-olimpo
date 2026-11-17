import { locales } from './js/data/locales.js';

const gridNivel1 = document.getElementById('grid-nivel-1');
const gridNivel2 = document.getElementById('grid-nivel-2');

const WHATSAPP_NUMBER = "56912345678"; // Número simulado para portafolio

// 1. Configurar el botón superior de WhatsApp (Header)
const navWhatsapp = document.getElementById('nav-whatsapp');
if (navWhatsapp) {
  const msgHeader = encodeURIComponent("Hola, me interesa obtener información general y conocer la disponibilidad de locales en EJE — Olimpo.");
  navWhatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msgHeader}`;
  navWhatsapp.rel = "noopener noreferrer";
}
// 2. Configurar el enlace de WhatsApp inferior de forma dinámica
const ctaWhatsappBottom = document.getElementById('cta-whatsapp-bottom');
if (ctaWhatsappBottom) {
  const msgGeneral = encodeURIComponent("Hola, me gustaría agendar una visita en terreno o recibir información de los locales en EJE — Olimpo.");
  ctaWhatsappBottom.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msgGeneral}`;
}

// 3. Manejar el formulario de contacto redirigiendo a thank-you.html (Simulación para portafolio)
const leadForm = document.getElementById('lead-form');
if (leadForm) {
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.href = './thank-you.html';
  });
}

function crearTarjetaLocal(local) {
  const esArrendado = local.estado === "ARRENDADO";
  const esReserva = local.estado === "RESERVA FASE II";

  let spanClasses = "";
  if (local.esEsquina) {
    spanClasses = local.nivel === 1 ? "md:col-span-2 bg-[#FAF9F6]" : "md:col-span-3 bg-[#FAF9F6]";
  } else {
    spanClasses = "bg-white";
  }

  let badgeClasses = "border-neutral-900 text-neutral-900 bg-white";
  if (esArrendado) {
    badgeClasses = "border-neutral-200 text-neutral-400 bg-neutral-50";
  } else if (esReserva) {
    badgeClasses = "border-neutral-400 text-neutral-700 bg-white";
  }

  const mensajeWsp = encodeURIComponent(
    `Hola, me interesa recibir el dossier y tarifas de la ${local.nombre} (Nivel 0${local.nivel}) en EJE — Olimpo.`
  );

  return `
    <article class="group border border-neutral-300 ${spanClasses} hover:bg-[#FAF9F6] transition-colors duration-300 p-6 flex flex-col justify-between ${esArrendado ? 'opacity-65' : ''}">
      <div>
        <!-- Fila Superior: Solo el Estado -->
        <div class="flex items-center justify-end mb-4">
          <span class="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 border ${badgeClasses} shrink-0">
            ${local.estado}
          </span>
        </div>

        <!-- Título Principal en Grande y Metraje -->
        <div class="flex items-baseline justify-between gap-4 mb-3">
          <h4 class="text-lg font-medium tracking-wide uppercase text-neutral-900">
            ${local.nombre}
          </h4>
          <span class="text-sm font-mono text-neutral-900 shrink-0">
            ${local.superficie}
          </span>
        </div>

        <!-- Vocación Sugerida -->
        <p class="text-xs font-mono text-neutral-500 mb-3 leading-relaxed">
          ${local.vocacion}
        </p>

        <!-- Especificación Arquitectónica -->
        <p class="text-sm text-neutral-600 font-light leading-relaxed mb-6">
          ${local.detalle}
        </p>
      </div>

      <!-- Pie de Ficha -->
      <div class="pt-4 border-t border-neutral-200 flex items-center justify-between">
        <span class="text-[11px] font-mono text-neutral-400 uppercase">
          Nivel ${local.nivel} · ${local.nivel === 1 ? 'CALLE' : 'PASARELA VIDRIADA'}
        </span>
        ${
          esArrendado
            ? `<span class="text-xs font-mono uppercase tracking-wider text-neutral-400">No disponible</span>`
            : `<a href="https://wa.me/${WHATSAPP_NUMBER}?text=${mensajeWsp}" target="_blank" rel="noopener noreferrer" class="text-xs font-mono uppercase tracking-wider text-neutral-900 group-hover:underline underline-offset-4">
                ${esReserva ? 'Consultar →' : 'Solicitar Ficha →'}
              </a>`
        }
      </div>
    </article>
  `;
}

if (gridNivel1 && gridNivel2) {
  const nivel1 = locales.filter(l => l.nivel === 1);
  const nivel2 = locales.filter(l => l.nivel === 2);

  gridNivel1.innerHTML = nivel1.map(crearTarjetaLocal).join('');
  gridNivel2.innerHTML = nivel2.map(crearTarjetaLocal).join('');
}