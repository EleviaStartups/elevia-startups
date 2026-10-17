/* AUTO-GENERADO por build.ps1 - no editar. Edita src/js/** y vuelve a ejecutar build.ps1 */
document.documentElement.classList.add('js');
(function(g){var defs={},cache={};g.__def=function(n,f){defs[n]=f;};g.__req=function(n){if(cache[n])return cache[n];var e={};cache[n]=e;if(!defs[n])throw new Error('Modulo no encontrado: '+n);defs[n](e);return e;};})(window);
__def('config', function(__exp){
/**
 * config.js — Elevia Startups
 * Centralized site configuration. Import from any ES module.
 *
 * Usage:
 *   const {SITE_CONFIG, TOOLS, NAV_LINKS, STORAGE_KEYS} = __req('config');
 */

// ---------------------------------------------------------------------------
// Site-level metadata
// ---------------------------------------------------------------------------

const SITE_CONFIG = {
  name: 'Elevia Startups',
  tagline: 'De la idea a una startup preparada para crecer',
  description:
    'Herramientas gratuitas para emprendedores y fundadores de startups: valida tu mercado, estructura tus objetivos, entiende tus finanzas y prepara tu investor deck.',
  baseUrl: '', // Set to '/repo-name' for GitHub Pages subpath, '' for root domain
  lang: 'es',
  locale: 'es-ES',
  email: '', // contact email — set when ready
  version: '1.0.0',
  storageVersion: 'v1', // bump when changing storage schema
};

// ---------------------------------------------------------------------------
// Navigation links
// ---------------------------------------------------------------------------

const NAV_LINKS = [
  {
    label: 'Inicio',
    href: '/index.html',
  },
  {
    label: 'Herramientas',
    href: '/pages/tools.html',
    children: [
      // Market & strategy
      {
        label: 'TAM / SAM / SOM',
        href: '/pages/tools/tam-sam-som.html',
        description: 'Estima el tamaño de tu mercado potencial',
        category: 'market',
      },
      {
        label: 'Creador de ICP',
        href: '/pages/tools/icp-creator.html',
        description: 'Define tu perfil de cliente ideal',
        category: 'market',
      },
      // Planning
      {
        label: 'Constructor de OKR',
        href: '/pages/tools/okr-builder.html',
        description: 'Estructura tus objetivos y resultados clave',
        category: 'planning',
      },
      // Finance & metrics
      {
        label: 'Valoración de startups',
        href: '/pages/tools/startup-valuation.html',
        description: 'Valora tu startup con 7 métodos',
        category: 'finance',
      },
      {
        label: 'Dilución de socios',
        href: '/pages/tools/dilution-calculator.html',
        description: 'Simula el impacto de una ronda en tu cap table',
        category: 'finance',
      },
      {
        label: 'CAC / LTV',
        href: '/pages/tools/cac-ltv.html',
        description: 'Calcula la economía unitaria de tus clientes',
        category: 'finance',
      },
      {
        label: 'Unit Economics y Retención',
        href: '/pages/tools/unit-economics.html',
        description: 'Rentabilidad unitaria, margen real y LTV con retención',
        category: 'finance',
      },
      {
        label: 'Burn Rate y Runway',
        href: '/pages/tools/burn-rate.html',
        description: 'Proyecta tu caja y autonomía financiera',
        category: 'finance',
      },
      // Fundraising
      {
        label: 'Estructurador de Data Room',
        href: '/pages/tools/data-room.html',
        description: 'Checklist y organización de documentos para Due Diligence',
        category: 'fundraising',
      },
    ],
  },
  {
    label: 'Guías',
    href: '/pages/guides.html',
    children: [
      {
        label: 'Cómo validar tu idea',
        href: '/pages/guides/validar-idea.html',
        description: 'Frameworks y técnicas para validar antes de construir',
      },
      {
        label: 'Fundraising 101',
        href: '/pages/guides/fundraising.html',
        description: 'Todo lo que necesitas saber antes de hablar con inversores',
      },
      {
        label: 'Métricas para inversores',
        href: '/pages/guides/metricas-inversores.html',
        description: 'Las métricas que todo inversor te pedirá',
      },
    ],
  },
  {
    label: 'Revisión de Decks',
    href: '/pages/deck-review.html',
    description: 'Feedback profesional estructurado para tu pitch deck de inversión',
  },
  {
    label: 'Mentoría',
    href: '/pages/mentoria.html',
    description: 'Acompañamiento 1-a-1 personalizado para founders y startups (servicio de pago)',
  },
  {
    label: 'Glosario',
    href: '/pages/glossary.html',
  },
  {
    label: 'Acerca de',
    href: '/pages/about.html',
  },
];

// ---------------------------------------------------------------------------
// Tool definitions
// ---------------------------------------------------------------------------

const TOOLS = [
  // ── Market & strategy ──────────────────────────────────────────────────────

  {
    id: 'tam-sam-som',
    name: 'TAM / SAM / SOM',
    shortName: 'Mercado',
    description:
      'Estima el tamaño de tu mercado potencial con métodos top-down o bottom-up.',
    longDescription: `
      Antes de construir cualquier producto, necesitas entender qué porción del mercado
      puedes capturar de forma realista. Esta calculadora te guía a través de los tres
      niveles clásicos de análisis de mercado:

      • **TAM (Total Addressable Market)**: el universo completo de ingresos disponibles
        si capturaras el 100 % del mercado global para tu categoría de producto o servicio.
        Establece el techo teórico de oportunidad.

      • **SAM (Serviceable Addressable Market)**: la fracción del TAM a la que puedes
        dirigirte realmente, limitada por tu modelo de negocio, geografía, idioma, canal
        de distribución y segmento de clientes. Es el mercado que "puedes servir".

      • **SOM (Serviceable Obtainable Market)**: la cuota de mercado que, de forma
        conservadora y realista, tu startup puede conquistar en los próximos 3–5 años,
        teniendo en cuenta la competencia existente, tus recursos y tu velocidad de
        crecimiento.

      La herramienta admite dos enfoques complementarios:

      **Top-down** — partes de estadísticas macroeconómicas de mercado (informes de
      Gartner, Statista, IDC, etc.) y aplicas filtros sucesivos hasta llegar a tu SOM.
      Es útil cuando existe abundante información sectorial publicada.

      **Bottom-up** — construyes el mercado desde la unidad mínima: precio × volumen de
      clientes alcanzables. Este enfoque es más robusto para inversores porque cada
      supuesto es auditable y defendible.

      Al final obtienes un resumen visual y exportable con los tres cifras, los supuestos
      empleados y la fuente de datos, listo para incluir en tu pitch deck o business plan.
    `.trim(),
    icon: 'target',
    category: 'market',
    categoryLabel: 'Mercado y estrategia',
    color: 'sage',
    href: '/pages/tools/tam-sam-som.html',
    keywords: ['TAM', 'SAM', 'SOM', 'mercado', 'tamaño de mercado'],
    metaTitle: 'Calculadora TAM SAM SOM — Elevia Startups',
    metaDescription:
      'Calcula el tamaño de tu mercado (TAM, SAM, SOM) con métodos top-down y bottom-up. Herramienta gratuita para startups.',
  },

  {
    id: 'icp-creator',
    name: 'Creador de ICP',
    shortName: 'ICP',
    description:
      'Define tu perfil de cliente ideal para B2C, B2B o B2B2C.',
    longDescription: `
      Conocer a tu cliente ideal con precisión es la base de cualquier estrategia de
      marketing, ventas y producto que funcione. El **Ideal Customer Profile (ICP)** es
      una descripción detallada del tipo de cliente que obtiene el máximo valor de tu
      solución, que permanece contigo, que te recomienda y que es rentable de atender.

      Esta herramienta te guía en la construcción de un ICP adaptado a tu modelo de
      negocio:

      • **B2C** — perfil demográfico, psicográfico y conductual del consumidor individual.
        Incluye edad, ingresos, hábitos digitales, motivaciones de compra, canales
        preferidos y principales puntos de dolor.

      • **B2B** — perfil de la empresa compradora (firmografía: sector, tamaño,
        facturación, madurez tecnológica) + perfil del decisor (cargo, objetivos
        profesionales, presupuesto a gestionar, objeciones típicas).

      • **B2B2C** — combina ambas dimensiones: la empresa intermediaria y el usuario
        final, con los criterios de evaluación de cada uno.

      El creador de ICP te hace las preguntas correctas en cada sección, valida la
      coherencia interna de tus supuestos y genera un documento estructurado que puedes
      compartir con tu equipo, adjuntar a un brief de marketing o presentar a inversores
      para demostrar que conoces a fondo tu mercado objetivo.
    `.trim(),
    icon: 'user-circle',
    category: 'market',
    categoryLabel: 'Mercado y estrategia',
    color: 'peach',
    href: '/pages/tools/icp-creator.html',
    keywords: ['ICP', 'cliente ideal', 'buyer persona', 'segmentación'],
    metaTitle: 'Creador de ICP — Elevia Startups',
    metaDescription:
      'Crea tu perfil de cliente ideal (ICP) adaptado a B2C, B2B o B2B2C. Valida tus hipótesis de cliente.',
  },

  // ── Planning ───────────────────────────────────────────────────────────────

  {
    id: 'okr-builder',
    name: 'Constructor de OKR',
    shortName: 'OKR',
    description:
      'Estructura tus objetivos, resultados clave e iniciativas con una interfaz visual.',
    longDescription: `
      Los **OKR (Objectives and Key Results)** son el sistema de gestión por objetivos
      adoptado por Google, Spotify, LinkedIn y miles de startups de alto crecimiento.
      Su potencia radica en conectar la ambición estratégica con métricas concretas y
      medibles que orientan el trabajo diario de cada equipo.

      El Constructor de OKR de Elevia te permite:

      • **Definir Objetivos** — declaraciones cualitativas, inspiradoras y con límite
        temporal que responden a "¿a dónde queremos llegar?". Cada objetivo debe motivar
        al equipo y ser alcanzable en el trimestre o año.

      • **Añadir Key Results** — entre 2 y 5 métricas cuantitativas por objetivo que
        responden a "¿cómo sabemos que hemos llegado?". Cada KR incluye valor inicial,
        valor objetivo y unidad de medida.

      • **Vincular Iniciativas** — las acciones o proyectos concretos que el equipo
        ejecutará para mover cada KR. Separa el "qué queremos lograr" del "cómo lo
        haremos".

      • **Registrar el progreso** — actualiza el porcentaje de avance de cada KR y
        visualiza de un vistazo la salud de tus OKR con indicadores de color.

      • **Organizar por ciclos** — agrupa tus OKR por trimestre o año y gestiona
        múltiples proyectos o áreas en paralelo.

      Todos los datos se guardan localmente en tu navegador. Puedes exportar el conjunto
      completo de OKR en formato JSON para importarlo en otras herramientas o hacer
      copias de seguridad.
    `.trim(),
    icon: 'target-check',
    category: 'planning',
    categoryLabel: 'Organización y planificación',
    color: 'lavender',
    href: '/pages/tools/okr-builder.html',
    keywords: ['OKR', 'objetivos', 'resultados clave', 'KPI', 'planificación'],
    metaTitle: 'Constructor de OKR — Elevia Startups',
    metaDescription:
      'Crea y gestiona tus OKR con una interfaz visual. Estructura objetivos, resultados clave e iniciativas.',
  },

  // ── Finance & metrics ──────────────────────────────────────────────────────

  {
    id: 'startup-valuation',
    name: 'Valoración de startups',
    shortName: 'Valoración',
    description:
      'Estima el valor de tu startup con 7 métodos: Berkus, Scorecard, DCF y más.',
    longDescription: `
      Una de las preguntas más difíciles —y más frecuentes— en cualquier negociación con
      inversores es: "¿cuánto vale tu startup?". Dado que las startups en etapas
      tempranas carecen de ingresos estables o activos tangibles significativos, la
      valoración es tanto un arte como una ciencia.

      Esta herramienta aplica los **7 métodos de valoración** más utilizados por
      inversores y fundadores, y te muestra un rango consensuado:

      1. **Método Berkus** — asigna un valor monetario (hasta 500 k€ por factor) a
         cinco elementos cualitativos de riesgo: idea, prototipo, equipo, relaciones
         estratégicas y tracción/ventas.

      2. **Scorecard Method** — compara tu startup con el rango de valoración medio de
         otras startups similares en tu sector/etapa y aplica un multiplicador basado en
         una puntuación ponderada de factores (equipo, mercado, producto, competencia…).

      3. **Risk Factor Summation** — parte de una valoración base y suma o resta hasta
         250 k€ por cada uno de los 12 factores de riesgo estándar definidos por la
         Ohio TechAngel Funds.

      4. **Venture Capital Method** — calcula la valoración pre-money a partir del
         retorno esperado por el inversor (ROI objetivo), la valoración futura estimada
         (exit value) y la dilución prevista en rondas posteriores.

      5. **Múltiplos de ingresos** — aplica múltiplos de mercado sobre tu ARR o ingresos
         proyectados, ajustados por tasa de crecimiento y margen bruto.

      6. **DCF simplificado** — descuenta los flujos de caja proyectados a 5 años usando
         una tasa de descuento elevada (típicamente 40–80 % para early-stage) y calcula
         el valor terminal.

      7. **First Chicago Method** — promedia ponderado de tres escenarios (pesimista,
         base, optimista) cada uno con su propio DCF y probabilidad asignada.

      Al final, la herramienta te muestra el rango de valoración resultante, un gráfico
      comparativo por método y una explicación de qué método aporta más credibilidad
      según la etapa de tu startup.
    `.trim(),
    icon: 'trending-up',
    category: 'finance',
    categoryLabel: 'Finanzas y métricas',
    color: 'lavender',
    href: '/pages/tools/startup-valuation.html',
    keywords: [
      'valoración',
      'startup',
      'Berkus',
      'DCF',
      'Scorecard',
      'pre-money',
      'post-money',
    ],
    metaTitle: 'Valoración de Startups — Elevia Startups',
    metaDescription:
      'Calcula la valoración de tu startup con 7 métodos: Berkus, Scorecard, Venture Capital, múltiplos, DCF y más.',
  },

  {
    id: 'dilution-calculator',
    name: 'Dilución de socios',
    shortName: 'Dilución',
    description:
      'Simula el impacto de una ronda de inversión en el cap table de tu startup.',
    longDescription: `
      Cada vez que tu startup cierra una ronda de financiación, los fundadores y los
      socios actuales ven reducida su participación porcentual. Este fenómeno se llama
      **dilución** y, aunque es natural y deseable cuando la empresa crece, es
      fundamental entenderlo antes de firmar cualquier term sheet.

      La Calculadora de Dilución de Elevia te permite:

      • **Construir tu cap table inicial** — introduce los socios fundadores, sus
        participaciones en acciones y porcentajes actuales, así como cualquier pool de
        opciones (ESOP) ya reservado.

      • **Configurar la ronda** — define el importe de inversión, la valoración
        pre-money acordada con el inversor y el porcentaje de ESOP adicional que se
        quiere crear.

      • **Ver el cap table post-ronda** — la herramienta calcula automáticamente la
        valoración post-money, el precio por acción, las nuevas acciones emitidas y el
        porcentaje de cada socio después de la ronda.

      • **Simular rondas sucesivas** — añade múltiples rondas (Seed, Serie A, Serie B…)
        y observa cómo evoluciona la participación de cada socio a lo largo del tiempo.

      • **Entender el impacto del ESOP** — visualiza si el pool de opciones se crea
        antes o después de la ronda (pre-money vs. post-money ESOP), algo que puede
        suponer varios puntos de dilución adicional para los fundadores.

      El resultado incluye una tabla comparativa antes/después y un gráfico de tarta
      interactivo para cada momento del cap table.
    `.trim(),
    icon: 'pie-chart',
    category: 'finance',
    categoryLabel: 'Finanzas y métricas',
    color: 'sage',
    href: '/pages/tools/dilution-calculator.html',
    keywords: [
      'dilución',
      'cap table',
      'ronda',
      'inversión',
      'pre-money',
      'post-money',
    ],
    metaTitle: 'Calculadora de Dilución — Elevia Startups',
    metaDescription:
      'Simula una ronda de inversión y calcula la dilución de los socios fundadores. Cap table antes y después.',
  },

  {
    id: 'cac-ltv',
    name: 'CAC / LTV',
    shortName: 'CAC/LTV',
    description:
      'Calcula el coste de adquisición de clientes y su valor económico a lo largo del tiempo.',
    longDescription: `
      El ratio **LTV:CAC** es una de las métricas más importantes para evaluar la
      salud y la escalabilidad de cualquier startup con modelo de negocio recurrente.
      Responde a una pregunta esencial: ¿cuánto vale un cliente durante toda su
      relación con tu empresa en comparación con lo que cuesta conseguirlo?

      • **CAC (Customer Acquisition Cost)** — coste total de marketing y ventas dividido
        entre el número de nuevos clientes conseguidos en un período. Esta herramienta
        te permite desglosarlo por canal (paid ads, content, sales outbound, referrals,
        eventos…) para identificar cuál es el más eficiente.

      • **LTV (Lifetime Value)** — valor económico total que un cliente genera durante
        toda su relación con tu empresa. Se calcula a partir del ticket medio, la
        frecuencia de compra o cuota mensual, el margen bruto y la tasa de churn (baja
        voluntaria).

      La calculadora te muestra:

      — **Ratio LTV:CAC** y si estás en el rango saludable (>3x para SaaS B2B, >1.5x
        para e-commerce).
      — **Payback period** — cuántos meses tardas en recuperar lo invertido en adquirir
        a un cliente.
      — **Análisis de sensibilidad** — cómo varía el LTV:CAC al modificar el churn, el
        ticket o el CAC por canal.
      — **Benchmark sectorial** — referencia de ratios típicos según tu modelo de
        negocio (SaaS, marketplace, DTC, B2B enterprise…).

      Ideal para preparar el apartado de "unit economics" de tu pitch deck.
    `.trim(),
    icon: 'users',
    category: 'finance',
    categoryLabel: 'Finanzas y métricas',
    color: 'peach',
    href: '/pages/tools/cac-ltv.html',
    keywords: [
      'CAC',
      'LTV',
      'coste adquisición',
      'valor cliente',
      'unit economics',
    ],
    metaTitle: 'Calculadora CAC y LTV — Elevia Startups',
    metaDescription:
      'Calcula el CAC y LTV de tu startup, analiza la rentabilidad por canal y optimiza tus métricas de cliente.',
  },

  {
    id: 'burn-rate',
    name: 'Burn Rate y Runway',
    shortName: 'Runway',
    description:
      'Proyecta tu caja mensual y calcula cuántos meses de autonomía tiene tu startup.',
    longDescription: `
      El **burn rate** es la velocidad a la que tu startup consume el capital disponible
      cada mes. El **runway** es el tiempo que te queda antes de quedarte sin caja.
      Son las dos métricas de supervivencia que cualquier fundador debe monitorizar
      con la misma atención que el pulso de un paciente.

      Esta herramienta te ayuda a:

      • **Calcular el burn rate neto y bruto** — el bruto es el total de gastos mensual;
        el neto descuenta los ingresos ya generados. Cuando el neto es negativo, tu
        startup ya es cash-flow positiva.

      • **Proyectar la caja a 12 meses** — introduce tu saldo inicial de caja, los
        ingresos proyectados mes a mes (con tasas de crecimiento configurables) y los
        costes fijos y variables esperados. La herramienta dibuja la curva de caja
        resultante.

      • **Comparar tres escenarios** — optimista (aceleras ventas o recortas costes),
        base (continuidad de tendencia actual) y conservador (ventas por debajo de lo
        esperado). Visualiza cuándo se agota la caja en cada escenario.

      • **Planificar la próxima ronda** — el gráfico marca automáticamente el punto en
        el que deberías estar cerrando tu próxima ronda (generalmente cuando quedan
        6 meses de runway) para no entrar en zona de riesgo.

      • **Análisis de partidas de gasto** — desglosa tus costes (nóminas, cloud,
        marketing, oficina, asesorías, etc.) y visualiza el peso de cada una sobre
        el burn total para identificar dónde optimizar.

      Ideal para preparar el apartado de "financials" y "use of funds" de tu pitch deck.
    `.trim(),
    icon: 'flame',
    category: 'finance',
    categoryLabel: 'Finanzas y métricas',
    color: 'peach',
    href: '/pages/tools/burn-rate.html',
    keywords: [
      'burn rate',
      'runway',
      'caja',
      'autonomía financiera',
      'proyección',
    ],
    metaTitle: 'Calculadora de Burn Rate y Runway — Elevia Startups',
    metaDescription:
      'Calcula el burn rate y runway de tu startup. Proyecta tu caja a 12 meses con escenarios optimista, base y conservador.',
  },
  {
    id: 'unit-economics',
    name: 'Unit Economics y Retención',
    shortName: 'Unit Economics',
    description:
      'Entiende tu rentabilidad unitaria, calcula el payback del CAC y proyecta tu LTV real con cohortes de retención.',
    longDescription: `
      Muchos founders confunden facturación con margen real. Esta herramienta desglosa la economía
      unitaria de cada cliente:
      
      • **Margen Bruto Unitario**: descuenta los costes variables directos (COGS como cloud, pasarelas y soporte) del ARPU mensual.
      • **Payback del CAC**: calcula el número de meses necesarios para recuperar la inversión en captar al cliente.
      • **Proyección de LTV a 12 meses**: modela los ingresos acumulados considerando la curva real de retención y churn mes a mes.
      • **Punto de equilibrio unitario**: visualiza cuándo la curva de flujo de caja individual cruza a terreno positivo.
    `.trim(),
    icon: 'diamond',
    category: 'finance',
    categoryLabel: 'Finanzas y métricas',
    color: 'peach',
    href: '/pages/tools/unit-economics.html',
    keywords: [
      'unit economics',
      'retención',
      'cac',
      'ltv',
      'payback',
      'arpu',
      'cogs',
      'margen bruto',
    ],
    metaTitle: 'Constructor de Unit Economics y Retención — Elevia Startups',
    metaDescription:
      'Calcula tu margen bruto unitario, período de recuperación (payback) del CAC y proyecta tu LTV real a 12 meses con cohortes de retención.',
  },
  {
    id: 'data-room',
    name: 'Estructurador de Data Room',
    shortName: 'Data Room',
    description:
      'Checklist interactivo y estructura de carpetas para preparar la Due Diligence con inversores sin estrés.',
    longDescription: `
      Prepara toda la documentación que un fondo de Venture Capital o Business Angel exigirá durante
      el proceso de Due Diligence:
      
      • **5 Áreas clave**: Legal/Societario, Financiero, Equipo, Producto/IP y Comercial.
      • **Control de estados**: marca cada documento como Pendiente, En proceso o Completado.
      • **Notas y enlaces**: asocia URLs seguras a carpetas de Google Drive, Notion o Dropbox.
      • **Exportación de estructura**: genera la jerarquía en texto con un clic para replicarla en tu gestor documental.
    `.trim(),
    icon: 'folder',
    category: 'fundraising',
    categoryLabel: 'Fundraising',
    color: 'lavender',
    href: '/pages/tools/data-room.html',
    keywords: [
      'data room',
      'due diligence',
      'inversores',
      'pacto de socios',
      'cap table',
      'auditoría',
      'fundraising',
    ],
    metaTitle: 'Estructurador de Data Room (Due Diligence) — Elevia Startups',
    metaDescription:
      'Checklist interactivo de Due Diligence para organizar toda la documentación societaria, legal, financiera y comercial antes de tu ronda.',
  },
];

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

const CATEGORIES = [
  { id: 'market',      label: 'Mercado y estrategia',          color: 'sage' },
  { id: 'planning',   label: 'Organización y planificación',   color: 'lavender' },
  { id: 'finance',    label: 'Finanzas y métricas',            color: 'peach' },
  { id: 'fundraising',label: 'Fundraising',                    color: 'lavender' },
];

// ---------------------------------------------------------------------------
// Versioned localStorage keys
// One key per tool — bump SITE_CONFIG.storageVersion to invalidate old data.
// ---------------------------------------------------------------------------

const STORAGE_KEYS = {
  tamSamSom:      `elevia_${SITE_CONFIG.storageVersion}_tam_sam_som`,
  okrProjects:    `elevia_${SITE_CONFIG.storageVersion}_okr_projects`,
  icpProfiles:    `elevia_${SITE_CONFIG.storageVersion}_icp_profiles`,
  valuation:      `elevia_${SITE_CONFIG.storageVersion}_valuation`,
  dilution:       `elevia_${SITE_CONFIG.storageVersion}_dilution`,
  cacLtv:         `elevia_${SITE_CONFIG.storageVersion}_cac_ltv`,
  burnRate:       `elevia_${SITE_CONFIG.storageVersion}_burn_rate`,
  unitEconomics:    'elevia_unit_economics',
  dataRoom:         'elevia_data_room',
  startupMetadata:  'elevia_startup_metadata',
};

__exp.SITE_CONFIG = SITE_CONFIG;
__exp.NAV_LINKS = NAV_LINKS;
__exp.TOOLS = TOOLS;
__exp.CATEGORIES = CATEGORIES;
__exp.STORAGE_KEYS = STORAGE_KEYS;
});
__def('nav', function(__exp){
/**
 * nav.js — Elevia Startups
 * Shared navigation & footer component.
 *
 * Usage (in every page):
 *   const {initNav, initFooter, BASE_PATH} = __req('nav');
 *   document.addEventListener('DOMContentLoaded', () => {
 *     initNav({ activePage: 'tools' });
 *     initFooter();
 *   });
 *
 * BASE_PATH can be overridden per-page for correct relative linking.
 * Default '' works for pages at /pages/*.html.
 * For pages at /pages/tools/*.html, override to '../'.
 * For /index.html at root, override to 'pages/'.
 */

// ---------------------------------------------------------------------------
// BASE_PATH — override per page before calling initNav / initFooter
// ---------------------------------------------------------------------------

/** @type {string} Relative prefix to reach /pages/ from the current page. */
let BASE_PATH = '';

/**
 * Override the base path for pages nested deeper in the directory tree.
 * @param {string} path - e.g. '' | '../' | '../../'
 */
function setBasePath(path) {
  BASE_PATH = path;
}

// ---------------------------------------------------------------------------
// Tool link definitions
// ---------------------------------------------------------------------------

/** All tool pages. */
const TOOLS = [
  { label: 'TAM / SAM / SOM',        href: 'tools/tam-sam-som.html',          icon: '📊' },
  { label: 'Unit Economics',          href: 'tools/unit-economics.html',       icon: '💎' },
  { label: 'Data Room Due Diligence', href: 'tools/data-room.html',            icon: '📁' },
  { label: 'OKR Builder',             href: 'tools/okr-builder.html',          icon: '🎯' },
  { label: 'ICP Creator',             href: 'tools/icp-creator.html',          icon: '🧑‍💼' },
  { label: 'Valoración Startup',      href: 'tools/startup-valuation.html',    icon: '💰' },
  { label: 'Dilución de Equity',      href: 'tools/dilution-calculator.html',  icon: '📉' },
  { label: 'CAC / LTV',               href: 'tools/cac-ltv.html',              icon: '📈' },
  { label: 'Burn Rate',               href: 'tools/burn-rate.html',            icon: '🔥' },
];

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Automatically determine the relative prefix to reach the site root.
 * Works for root (/), /pages/, and /pages/tools/ on both http: and file: protocols.
 */
function getRootPrefix() {
  if (BASE_PATH) return BASE_PATH;
  const path = window.location.pathname.replace(/\\/g, '/');
  if (path.includes('/pages/tools/')) {
    return '../../';
  } else if (path.includes('/pages/')) {
    return '../';
  } else {
    return './';
  }
}

/**
 * Resolve a page-relative href from root prefix.
 * @param {string} href
 * @returns {string}
 */
function resolve(href) {
  if (href.startsWith('#') || href.startsWith('http://') || href.startsWith('https://')) return href;
  const root = getRootPrefix();
  if (href === 'index.html' || href === './index.html') {
    return root + 'index.html';
  }
  // If href is like 'tools/tam-sam-som.html' or 'tools.html' or 'investor-deck.html'
  if (href.startsWith('pages/')) {
    return root + href;
  }
  return root + 'pages/' + href;
}

/**
 * Resolve an asset located at the site root (e.g. favicon.svg).
 * @param {string} relativePath
 * @returns {string}
 */
function resolveRoot(relativePath) {
  const root = getRootPrefix();
  return root + relativePath.replace(/^\.?\//, '');
}

/**
 * Returns true if the given href matches the current page URL.
 * @param {string} href
 * @returns {boolean}
 */
function isActive(href) {
  if (href.startsWith('#')) return false;
  const pathname = window.location.pathname.replace(/\\/g, '/');
  const normalised = href.replace(/^\.\.\//, '/pages/').replace(/^\.\//, '');
  return pathname.endsWith(normalised) || pathname.endsWith(href);
}

// ---------------------------------------------------------------------------
// CSS — injected once into <head>
// ---------------------------------------------------------------------------

const NAV_CSS = `
/* ===== Elevia Startups — Site Header (injected by nav.js) ===== */

/* --- Reset / tokens assumed from global CSS --- */
:root {
  --nav-height: 60px;
  --nav-bg: rgba(247, 245, 240, 0.94);
  --nav-bg-scrolled: rgba(255, 255, 255, 0.98);
  --nav-shadow: 0 1px 0 #E8E4DC;
  --nav-shadow-scrolled: 0 4px 24px rgba(0,0,0,.10);
  --nav-link-color: var(--color-ink, #202A36);
  --nav-link-hover: var(--color-ink, #202A36);
  --nav-active-color: var(--color-ink, #202A36);
  --nav-dropdown-bg: #ffffff;
  --nav-dropdown-shadow: 0 12px 40px rgba(0,0,0,.13);
  --nav-hamburger-color: var(--color-ink, #202A36);
  --nav-cta-bg: var(--color-ink, #202A36);
  --nav-cta-color: #fff;
  --nav-cta-hover-bg: #2D3A4A;
  --nav-mobile-bg: #ffffff;
  --nav-mobile-overlay: rgba(32,42,54,.45);
  --nav-z: 1000;
  --nav-transition: 220ms cubic-bezier(.4,0,.2,1);
}

/* --- Header shell --- */
.site-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: var(--nav-height);
  background: var(--nav-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  box-shadow: var(--nav-shadow);
  z-index: var(--nav-z);
  transition:
    box-shadow var(--nav-transition),
    background var(--nav-transition),
    border-color var(--nav-transition);
}

.site-header.scrolled {
  background: var(--nav-bg-scrolled);
  box-shadow: var(--nav-shadow-scrolled);
  border-color: rgba(0,0,0,.06);
}

/* --- Inner layout --- */
.nav-inner {
  display: flex;
  align-items: center;
  gap: 0;
  max-width: var(--container-xl, 1280px);
  height: 100%;
  margin: 0 auto;
  padding: 0 24px;
}

/* --- Logo --- */
.nav-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'Manrope', sans-serif;
  font-weight: 800;
  font-size: 1.2rem;
  color: var(--color-ink, #202A36);
  text-decoration: none;
  letter-spacing: -0.3px;
  flex-shrink: 0;
  margin-right: 36px;
  transition: opacity var(--nav-transition);
}
.nav-logo:hover { opacity: .82; }
.nav-logo-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 0;
}
.nav-logo-mark img {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: block;
  box-shadow: 0 2px 8px rgba(32,42,54,.15);
}
.nav-logo-text {
  display: inline-block;
  line-height: 1.2;
}
.nav-logo-text span {
  color: var(--nav-active-color);
}

/* --- Desktop nav links --- */
.nav-links {
  margin-right: auto;
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
}

@media (max-width: 1160px) {
  .nav-logo { margin-right: 16px; font-size: 1.08rem; gap: 8px; }
  .nav-logo-mark img { width: 26px; height: 26px; border-radius: 7px; }
  .nav-links { gap: 2px; }
}

@media (max-width: 980px) {
  .nav-links { display: none; }
}

.nav-links > li {
  position: relative;
}

.nav-links > li > a,
.nav-links > li > button.nav-dropdown-toggle {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  font-family: 'Manrope', sans-serif;
  font-size: .9rem;
  font-weight: 600;
  color: var(--nav-link-color);
  text-decoration: none;
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: color var(--nav-transition), background var(--nav-transition);
  white-space: nowrap;
}

@media (max-width: 1160px) {
  .nav-links > li > a,
  .nav-links > li > button.nav-dropdown-toggle {
    padding: 6px 9px;
    font-size: .82rem;
  }
}

.nav-links > li > a:hover,
.nav-links > li > button.nav-dropdown-toggle:hover {
  color: var(--nav-link-hover);
  background: rgba(216,201,240,.55);
}

.nav-links > li > a.active,
.nav-links > li > button.nav-dropdown-toggle.active {
  color: var(--nav-active-color);
}

/* Dropdown chevron */
.nav-dropdown-toggle .chevron {
  display: inline-block;
  width: 14px;
  height: 14px;
  transition: transform var(--nav-transition);
  flex-shrink: 0;
}
.nav-dropdown-toggle[aria-expanded="true"] .chevron {
  transform: rotate(180deg);
}

/* --- Dropdown panel --- */
.nav-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(-6px);
  width: 260px;
  background: var(--nav-dropdown-bg);
  border: 1px solid rgba(0,0,0,.08);
  border-radius: 14px;
  box-shadow: var(--nav-dropdown-shadow);
  padding: 8px;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition:
    opacity var(--nav-transition),
    transform var(--nav-transition),
    visibility var(--nav-transition);
  z-index: 10;
}

.nav-dropdown.open {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}

.nav-dropdown a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 8px;
  font-family: 'Manrope', sans-serif;
  font-size: .88rem;
  font-weight: 500;
  color: var(--nav-link-color);
  text-decoration: none;
  transition: background var(--nav-transition), color var(--nav-transition);
}

.nav-dropdown a:hover {
  background: rgba(216,201,240,.45);
  color: var(--nav-link-hover);
}

.nav-dropdown a.active {
  background: rgba(216,201,240,.75);
  color: var(--nav-active-color);
  font-weight: 700;
}

.nav-dropdown-icon {
  font-size: 1rem;
  width: 22px;
  text-align: center;
  flex-shrink: 0;
}

.nav-dropdown-divider {
  height: 1px;
  background: rgba(0,0,0,.07);
  margin: 6px 8px;
}

/* --- CTA button --- */
.nav-cta {
  display: inline-flex;
  align-items: center;
  margin-left: 16px;
  padding: 9px 18px;
  background: var(--nav-cta-bg);
  color: var(--nav-cta-color) !important;
  font-family: 'Manrope', sans-serif;
  font-size: .88rem;
  font-weight: 700;
  border-radius: 10px;
  text-decoration: none !important;
  white-space: nowrap;
  flex-shrink: 0;
  border: none;
  cursor: pointer;
  transition: background var(--nav-transition), transform 150ms ease, box-shadow var(--nav-transition);
  box-shadow: 0 2px 8px rgba(32,42,54,.18);
}
.nav-cta:hover {
  background: var(--nav-cta-hover-bg);
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(32,42,54,.22);
}
.nav-cta:active {
  transform: translateY(0);
}

@media (max-width: 1160px) {
  .nav-cta {
    padding: 7px 14px;
    font-size: .82rem;
  }
}

@media (max-width: 980px) {
  .nav-cta { display: none; }
}

/* --- Hamburger --- */
.nav-hamburger {
  display: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-left: auto;
  background: none;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: var(--nav-hamburger-color);
  transition: background var(--nav-transition);
  flex-shrink: 0;
}

.nav-hamburger:hover { background: rgba(0,0,0,.06); }

@media (max-width: 980px) {
  .nav-hamburger { display: flex; }
}

/* Hamburger SVG lines */
.hamburger-bar {
  transition: transform 220ms ease, opacity 150ms ease;
  transform-origin: center;
}
.site-header.menu-open .hb-top    { transform: translateY(6px) rotate(45deg);  }
.site-header.menu-open .hb-mid    { opacity: 0; transform: scaleX(0); }
.site-header.menu-open .hb-bottom { transform: translateY(-6px) rotate(-45deg); }

/* --- Mobile overlay --- */
.nav-mobile-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: var(--nav-mobile-overlay);
  z-index: calc(var(--nav-z) + 1);
  opacity: 0;
  transition: opacity var(--nav-transition);
}
.nav-mobile-overlay.visible {
  display: block;
}
.nav-mobile-overlay.active {
  opacity: 1;
}

/* --- Mobile menu panel --- */
.nav-mobile-panel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(320px, 88vw);
  background: var(--nav-mobile-bg);
  z-index: calc(var(--nav-z) + 2);
  display: flex;
  flex-direction: column;
  padding: 0 0 32px;
  transform: translateX(100%);
  visibility: hidden;
  pointer-events: none;
  transition: transform 280ms cubic-bezier(.4,0,.2,1), visibility 280ms;
  box-shadow: -8px 0 32px rgba(0,0,0,.14);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.nav-mobile-panel.open {
  transform: translateX(0);
  visibility: visible;
  pointer-events: auto;
}

/* Mobile panel header */
.nav-mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0,0,0,.07);
  flex-shrink: 0;
}

.nav-mobile-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'Manrope', sans-serif;
  font-weight: 800;
  font-size: 1.1rem;
  color: var(--color-ink, #202A36);
  text-decoration: none;
}
.nav-mobile-logo .nav-logo-mark img {
  width: 28px;
  height: 28px;
  border-radius: 7px;
  display: block;
}
.nav-mobile-logo .nav-logo-text span { color: var(--nav-active-color); }

.nav-mobile-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px; height: 36px;
  border: none;
  background: rgba(0,0,0,.05);
  border-radius: 8px;
  cursor: pointer;
  color: #3a3a4a;
  transition: background var(--nav-transition);
}
.nav-mobile-close:hover { background: rgba(0,0,0,.10); }

/* Mobile nav list */
.nav-mobile-list {
  list-style: none;
  margin: 12px 0 0;
  padding: 0 12px;
  flex: 1;
}

.nav-mobile-list a,
.nav-mobile-list .nav-mobile-group-label {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 12px;
  border-radius: 10px;
  font-family: 'Manrope', sans-serif;
  font-size: .95rem;
  font-weight: 600;
  color: var(--nav-link-color);
  text-decoration: none;
  transition: background var(--nav-transition), color var(--nav-transition);
}

.nav-mobile-list a:hover {
  background: rgba(216,201,240,.45);
  color: var(--nav-link-hover);
}

.nav-mobile-list a.active {
  background: rgba(216,201,240,.75);
  color: var(--nav-active-color);
}

.nav-mobile-group-label {
  font-size: .78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: #999;
  padding-top: 20px;
  padding-bottom: 6px;
  cursor: default;
  pointer-events: none;
}

.nav-mobile-tool-link {
  padding-left: 24px !important;
  font-weight: 500 !important;
  font-size: .9rem !important;
}

.nav-mobile-cta {
  margin: 16px 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 13px 20px;
  background: var(--nav-cta-bg);
  color: #fff !important;
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: .95rem;
  border-radius: 12px;
  text-decoration: none !important;
  box-shadow: 0 3px 14px rgba(91,76,219,.30);
  transition: background var(--nav-transition);
  flex-shrink: 0;
}
.nav-mobile-cta:hover { background: var(--nav-cta-hover-bg); }

/* --- Body offset when header is present --- */
body { padding-top: var(--nav-height); }

/* ===== Site Footer (tema claro, paleta Elevia) ===== */
.site-footer {
  background: var(--color-white, #FFFFFF);
  color: var(--color-ink-70, #4A5568);
  border-top: 1px solid var(--color-border, #E8E4DC);
  font-family: 'Manrope', sans-serif;
  padding: 56px 24px 32px;
  margin-top: 80px;
}
.footer-inner { max-width: var(--container-xl, 1280px); margin: 0 auto; }
.footer-top {
  display: grid;
  grid-template-columns: 1.4fr repeat(3, 1fr);
  gap: 40px 32px;
  margin-bottom: 40px;
}
@media (max-width: 860px) { .footer-top { grid-template-columns: 1fr 1fr; } }
@media (max-width: 520px) { .footer-top { grid-template-columns: 1fr; } }
.footer-brand .footer-logo {
  font-family: 'Manrope', sans-serif;
  font-weight: 800;
  font-size: 1.15rem;
  color: var(--color-ink, #202A36);
  text-decoration: none;
  display: inline-block;
  margin-bottom: 12px;
}
.footer-brand .footer-logo span { color: var(--color-ink, #202A36); }
.footer-brand p {
  font-size: .875rem;
  line-height: 1.65;
  max-width: 280px;
  color: var(--color-ink-70, #4A5568);
  margin: 0 0 16px;
}
.footer-col h4 {
  font-size: .78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .07em;
  color: var(--color-ink-50, #718096);
  margin: 0 0 14px;
}
.footer-col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 9px; }
.footer-col ul a {
  font-size: .875rem;
  color: var(--color-ink-70, #4A5568);
  text-decoration: none;
  transition: color 180ms ease;
}
.footer-col ul a:hover { color: var(--color-ink, #202A36); text-decoration: underline; }

/* Aviso de almacenamiento dentro del footer */
.site-footer .storage-notice {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: var(--color-lavender-light, #EDE6F7);
  border: 1px solid var(--color-lavender, #D8C9F0);
  border-radius: 14px;
  padding: 16px;
  margin-top: 4px;
}
.site-footer .storage-notice-icon { font-size: 1.25rem; flex-shrink: 0; margin-top: 1px; }
.site-footer .storage-notice-text { font-size: .8rem; line-height: 1.6; color: var(--color-ink-70, #4A5568); }
.site-footer .storage-notice-text strong { display: block; font-weight: 700; color: var(--color-ink, #202A36); margin-bottom: 2px; }

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding-top: 28px;
  border-top: 1px solid var(--color-border, #E8E4DC);
  font-size: .8rem;
  color: var(--color-ink-50, #718096);
}
.footer-legal-links { display: flex; gap: 20px; }
.footer-legal-links a { color: var(--color-ink-70, #4A5568); text-decoration: none; transition: color 180ms ease; }
.footer-legal-links a:hover { color: var(--color-ink, #202A36); text-decoration: underline; }
`;

// ---------------------------------------------------------------------------
// Inject CSS once
// ---------------------------------------------------------------------------

let cssInjected = false;

function injectCSS() {
  if (cssInjected) return;
  const style = document.createElement('style');
  style.id = 'elevia-nav-styles';
  style.textContent = NAV_CSS;
  document.head.appendChild(style);
  cssInjected = true;
}

// ---------------------------------------------------------------------------
// Build dropdown HTML
// ---------------------------------------------------------------------------

function buildDropdownHTML() {
  const items = TOOLS.map((tool) => {
    const href = resolve(tool.href);
    const activeClass = isActive(href) ? ' active' : '';
    return `
      <a href="${href}" class="${activeClass}">
        <span class="nav-dropdown-icon">${tool.icon}</span>
        ${tool.label}
      </a>`;
  }).join('');

  return `
    <div class="nav-dropdown" id="tools-dropdown" role="menu" aria-label="Herramientas">
      ${items}
      <div class="nav-dropdown-divider"></div>
      <a href="${resolve('tools.html')}">
        <span class="nav-dropdown-icon">🧰</span>
        Ver todas las herramientas
      </a>
    </div>`;
}

// ---------------------------------------------------------------------------
// Build mobile menu HTML
// ---------------------------------------------------------------------------

function buildMobileMenuHTML() {
  const toolLinks = TOOLS.map((tool) => {
    const href = resolve(tool.href);
    const activeClass = isActive(href) ? ' active' : '';
    return `
      <li>
        <a href="${href}" class="nav-mobile-tool-link${activeClass}">
          <span>${tool.icon}</span> ${tool.label}
        </a>
      </li>`;
  }).join('');

  return `
    <!-- Mobile overlay -->
    <div class="nav-mobile-overlay" id="nav-overlay" aria-hidden="true"></div>

    <!-- Mobile panel -->
    <nav class="nav-mobile-panel" id="nav-mobile-panel" aria-label="Menú de navegación móvil">
      <div class="nav-mobile-header">
        <a class="nav-mobile-logo" href="${resolve('index.html') || '/index.html'}" aria-label="Elevia Startups — Inicio">
          <span class="nav-logo-mark">
            <img src="${resolveRoot('favicon.svg')}" alt="" width="28" height="28" />
          </span>
          <span class="nav-logo-text">Elevia <span>Startups</span></span>
        </a>
        <button class="nav-mobile-close" id="nav-mobile-close" aria-label="Cerrar menú">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <ul class="nav-mobile-list" role="list">
        <li><a href="${resolve('index.html') || '/index.html'}" ${isActive('index.html') ? 'class="active"' : ''}>Inicio</a></li>
        <li class="nav-mobile-group-label" aria-hidden="true">Herramientas</li>
        ${toolLinks}
        <li><a href="${resolve('tools.html')}" ${isActive('tools.html') ? 'class="active"' : ''}>Ver todas las herramientas</a></li>
        <li class="nav-mobile-group-label" aria-hidden="true">Más</li>
        <li><a href="${resolve('investor-deck.html')}" ${isActive('investor-deck.html') ? 'class="active"' : ''}>Guía Investor Deck</a></li>
        <li><a href="${resolve('startup-report.html')}" ${isActive('startup-report.html') ? 'class="active"' : ''}>Mi Informe</a></li>
        <li><a href="${resolve('deck-review.html')}" ${isActive('deck-review.html') ? 'class="active"' : ''}>Revisión de Decks</a></li>
        <li><a href="${resolve('mentoria.html')}" ${isActive('mentoria.html') ? 'class="active"' : ''}>Mentoría para Startups <span class="badge badge-peach" style="font-size:0.68rem; padding: 2px 6px; margin-left: 6px;">De pago</span></a></li>
        <li><a href="${resolve('about.html')}" ${isActive('about.html') ? 'class="active"' : ''}>Acerca de</a></li>
      </ul>

      <a class="nav-mobile-cta" href="${resolve('tools.html')}">
        🚀 Explorar herramientas
      </a>
    </nav>`;
}

// ---------------------------------------------------------------------------
// Build header HTML
// ---------------------------------------------------------------------------

function buildHeaderHTML(activePage) {
  const navItems = [
    { label: 'Inicio',             href: 'index.html',        key: 'home' },
    { label: 'Guía Investor Deck', href: 'investor-deck.html', key: 'investor-deck' },
    { label: 'Mi Informe',         href: 'startup-report.html', key: 'startup-report' },
    { label: 'Revisión de Decks',  href: 'deck-review.html',  key: 'deck-review' },
    { label: 'Mentoría',           href: 'mentoria.html',     key: 'mentoria' },
    { label: 'Acerca de',          href: 'about.html',        key: 'about' },
  ];

  // Build standard desktop links (excluding Herramientas, injected separately)
  const desktopLinks = navItems.map(({ label, href, key }) => {
    const resolved = resolve(href);
    const active = (activePage === key || isActive(resolved)) ? ' active' : '';
    return `<li><a href="${resolved}" class="${active.trim()}">${label}</a></li>`;
  });

  // Insert Herramientas dropdown after Inicio
  const toolsActive = activePage === 'tools' || TOOLS.some(t => isActive(resolve(t.href)));
  desktopLinks.splice(1, 0, `
    <li>
      <button
        class="nav-dropdown-toggle${toolsActive ? ' active' : ''}"
        id="tools-toggle"
        aria-haspopup="true"
        aria-expanded="false"
        aria-controls="tools-dropdown"
      >
        Herramientas
        <svg class="chevron" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <polyline points="2,4 7,10 12,4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      ${buildDropdownHTML()}
    </li>`
  );

  return `
    <header class="site-header" id="site-header" role="banner">
      <div class="nav-inner">
        <!-- Logo -->
        <a class="nav-logo" href="${resolve('index.html') || '/index.html'}" aria-label="Elevia Startups — Inicio">
          <span class="nav-logo-mark">
            <img src="${resolveRoot('favicon.svg')}" alt="" width="30" height="30" />
          </span>
          <span class="nav-logo-text">Elevia <span>Startups</span></span>
        </a>

        <!-- Desktop navigation -->
        <ul class="nav-links" role="list">
          ${desktopLinks.join('')}
        </ul>

        <!-- CTA -->
        <a class="nav-cta" href="${resolve('tools.html')}">
          Explorar herramientas
        </a>

        <!-- Hamburger (mobile) -->
        <button
          class="nav-hamburger"
          id="nav-hamburger"
          aria-label="Abrir menú de navegación"
          aria-expanded="false"
          aria-controls="nav-mobile-panel"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <line class="hamburger-bar hb-top"    x1="3" y1="6"  x2="21" y2="6"  stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <line class="hamburger-bar hb-mid"    x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <line class="hamburger-bar hb-bottom" x1="3" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </header>

    ${buildMobileMenuHTML()}`;
}

// ---------------------------------------------------------------------------
// Wire up interactivity
// ---------------------------------------------------------------------------

function setupInteractivity() {
  const header      = document.getElementById('site-header');
  const hamburger   = document.getElementById('nav-hamburger');
  const mobilePanel = document.getElementById('nav-mobile-panel');
  const overlay     = document.getElementById('nav-overlay');
  const closeBtn    = document.getElementById('nav-mobile-close');
  const toolsToggle = document.getElementById('tools-toggle');
  const dropdown    = document.getElementById('tools-dropdown');

  // --- 1. Scroll class ---
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial check

  // --- 2. Mobile menu open/close helpers ---
  function openMobileMenu() {
    mobilePanel.classList.add('open');
    overlay.classList.add('visible');
    header.classList.add('menu-open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Cerrar menú de navegación');
    // Trigger overlay fade-in on next frame
    requestAnimationFrame(() => overlay.classList.add('active'));
    // Trap focus: move focus into panel
    closeBtn.focus();
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobilePanel.classList.remove('open');
    overlay.classList.remove('active');
    header.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menú de navegación');
    document.body.style.overflow = '';
    // Remove overlay display after transition
    setTimeout(() => overlay.classList.remove('visible'), 300);
    hamburger.focus();
  }

  // --- 3. Hamburger toggle ---
  hamburger.addEventListener('click', () => {
    const isOpen = mobilePanel.classList.contains('open');
    isOpen ? closeMobileMenu() : openMobileMenu();
  });

  // --- 4. Close on overlay click ---
  overlay.addEventListener('click', closeMobileMenu);

  // --- 5. Close on mobile close button ---
  closeBtn.addEventListener('click', closeMobileMenu);

  // --- 6. Close on Escape ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobilePanel.classList.contains('open')) {
        closeMobileMenu();
      }
      if (dropdown.classList.contains('open')) {
        closeDropdown();
        toolsToggle.focus();
      }
    }
  });

  // --- 7. Desktop dropdown ---
  function openDropdown() {
    dropdown.classList.add('open');
    toolsToggle.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown() {
    dropdown.classList.remove('open');
    toolsToggle.setAttribute('aria-expanded', 'false');
  }

  toolsToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.contains('open');
    isOpen ? closeDropdown() : openDropdown();
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!toolsToggle.contains(e.target) && !dropdown.contains(e.target)) {
      closeDropdown();
    }
  });

  // Close dropdown when focus leaves
  document.addEventListener('focusin', (e) => {
    if (!toolsToggle.contains(e.target) && !dropdown.contains(e.target)) {
      closeDropdown();
    }
  });

  // Keyboard navigation inside dropdown
  toolsToggle.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openDropdown();
      /** @type {HTMLAnchorElement|null} */
      const firstLink = dropdown.querySelector('a');
      if (firstLink) firstLink.focus();
    }
  });
}

/**
 * Automatically inject standard compliant favicons into <head> if not already present.
 */
function ensureFavicons() {
  if (typeof document === 'undefined' || !document.head) return;
  if (!document.querySelector('link[rel="apple-touch-icon"]')) {
    const link = document.createElement('link');
    link.rel = 'apple-touch-icon';
    link.sizes = '180x180';
    link.href = resolveRoot('apple-touch-icon.png');
    document.head.appendChild(link);
  }
  if (!document.querySelector('link[rel="icon"][type="image/svg+xml"]')) {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = resolveRoot('favicon.svg');
    document.head.appendChild(link);
  }
  if (!document.querySelector('link[rel="icon"][sizes="48x48"]')) {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.sizes = '48x48';
    link.href = resolveRoot('favicon-48x48.png');
    document.head.appendChild(link);
  }
  if (!document.querySelector('link[rel="icon"][sizes="96x96"]')) {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.sizes = '96x96';
    link.href = resolveRoot('favicon-96x96.png');
    document.head.appendChild(link);
  }
}

// ---------------------------------------------------------------------------
// Public: initNav
// ---------------------------------------------------------------------------

/**
 * Initializes the navigation header.
 * Call this in every page's DOMContentLoaded.
 *
 * @param {{ activePage?: string }} options
 *   activePage — one of: 'home' | 'tools' | 'investor-deck' | 'deck-review' | 'about'
 */
function initNav(options = {}) {
  const { activePage = '' } = options;

  injectCSS();
  ensureFavicons();

  const container = document.createElement('div');
  container.innerHTML = buildHeaderHTML(activePage);

  const newHeader = container.querySelector('#site-header');
  const mobileOverlay = container.querySelector('#nav-overlay');
  const mobilePanel = container.querySelector('#nav-mobile-panel');

  const existingHeader = document.getElementById('site-header');
  if (existingHeader && newHeader) {
    existingHeader.replaceWith(newHeader);
  } else if (newHeader) {
    document.body.insertBefore(newHeader, document.body.firstChild);
  }

  // Remove any previously injected overlay/panel if any
  document.getElementById('nav-overlay')?.remove();
  document.getElementById('nav-mobile-panel')?.remove();

  if (mobileOverlay) document.body.appendChild(mobileOverlay);
  if (mobilePanel) document.body.appendChild(mobilePanel);

  setupInteractivity();
}

// ---------------------------------------------------------------------------
// Build footer HTML
// ---------------------------------------------------------------------------

function buildFooterHTML() {
  const toolLinks = TOOLS.map(tool => `
    <li><a href="${resolve(tool.href)}">${tool.icon} ${tool.label}</a></li>
  `).join('');

  const year = new Date().getFullYear();

  return `
    <footer class="site-footer" id="site-footer" role="contentinfo">
      <div class="footer-inner">

        <div class="footer-top">

          <!-- Brand column -->
          <div class="footer-brand">
            <a class="footer-logo" href="${resolve('index.html') || '/index.html'}" style="display:inline-flex; align-items:center; gap:9px;">
              <span class="nav-logo-mark"><img src="${resolveRoot('favicon.svg')}" alt="" width="26" height="26" style="border-radius:6px; display:block;" /></span>
              <span>Elevia <span>Startups</span></span>
            </a>
            <p>
              Herramientas gratuitas para founders que quieren tomar mejores
              decisiones con datos reales. Todo funciona en tu navegador —
              sin registro, sin servidores.
            </p>
            <!-- Storage notice -->
            <div class="storage-notice" role="note" aria-label="Aviso sobre almacenamiento local">
              <div class="storage-notice-icon">🔒</div>
              <div class="storage-notice-text">
                <strong>Privacidad garantizada</strong>
                Todos tus datos se guardan exclusivamente en el
                <em>localStorage</em> de tu navegador. Nunca enviamos
                información a ningún servidor externo.
              </div>
            </div>
          </div>

          <!-- Herramientas column -->
          <div class="footer-col">
            <h4>Herramientas</h4>
            <ul>
              ${toolLinks}
            </ul>
          </div>

          <!-- Recursos column -->
          <div class="footer-col">
            <h4>Recursos y Servicios</h4>
            <ul>
              <li><a href="${resolve('startup-report.html')}">Mi Informe de Startup</a></li>
              <li><a href="${resolve('investor-deck.html')}">Guía Investor Deck</a></li>
              <li><a href="${resolve('deck-review.html')}">Revisión de Decks</a></li>
              <li><a href="${resolve('mentoria.html')}">Mentoría para Startups</a></li>
              <li><a href="${resolve('tools.html')}">Todas las herramientas</a></li>
            </ul>
          </div>

          <!-- Empresa column -->
          <div class="footer-col">
            <h4>Empresa</h4>
            <ul>
              <li><a href="${resolve('about.html')}">Acerca de</a></li>
              <li><a href="${resolve('privacy.html')}">Política de privacidad</a></li>
              <li><a href="${resolve('legal.html')}">Aviso legal</a></li>
            </ul>
          </div>

        </div><!-- /.footer-top -->

        <!-- Bottom bar -->
        <div class="footer-bottom">
          <span>© ${year} Elevia Startups. Hecho con ❤️ para founders hispanohablantes.</span>
          <nav class="footer-legal-links" aria-label="Navegación legal">
            <a href="${resolve('privacy.html')}">Privacidad</a>
            <a href="${resolve('legal.html')}">Aviso Legal</a>
            <a href="${resolve('about.html')}">Acerca de</a>
          </nav>
        </div>

      </div><!-- /.footer-inner -->
    </footer>`;
}

// ---------------------------------------------------------------------------
// Public: initFooter
// ---------------------------------------------------------------------------

/**
 * Injects the site footer at the end of <body>.
 * Includes navigation links, about/legal text, storage notice, and copyright.
 */
function initFooter() {
  const container = document.createElement('div');
  container.innerHTML = buildFooterHTML();
  const newFooter = container.querySelector('.site-footer');
  const existingFooter = document.getElementById('site-footer');

  if (existingFooter && newFooter) {
    existingFooter.replaceWith(newFooter);
  } else if (newFooter) {
    document.body.appendChild(newFooter);
  }
}

__exp.setBasePath = setBasePath;
__exp.initNav = initNav;
__exp.initFooter = initFooter;
__exp.BASE_PATH = BASE_PATH;
});
__def('burn-rate.calc', function(__exp){
/**
 * burn-rate.calc.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Herramienta de cálculo de tasa de quema (burn rate) y runway para
 * Elevia Startups.
 *
 * Proyecta el flujo de caja mes a mes durante 12 meses, calcula el runway
 * y genera tres escenarios (base, conservador, optimista).
 *
 * Todos los mensajes de error y advertencia están en español.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Constantes ──────────────────────────────────────────────────────────────

/** Número de meses a proyectar. */
const PROJECTION_MONTHS = 12;

// ─── Helpers internos ────────────────────────────────────────────────────────

/**
 * Devuelve true si el valor es un número finito.
 * @param {unknown} v
 * @returns {boolean}
 */
function isFiniteNumber(v) {
  return typeof v === "number" && isFinite(v);
}

/**
 * Redondea a N decimales (por defecto 2).
 * @param {number} value
 * @param {number} [decimals=2]
 * @returns {number}
 */
function round(value, decimals = 2) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Suma los montos de un array de gastos.
 * @param {Array<{ amount: number }>} items
 * @returns {number}
 */
function sumAmounts(items) {
  return items.reduce((acc, item) => acc + (item.amount || 0), 0);
}

// ─── calcBurnRate ─────────────────────────────────────────────────────────────

/**
 * Calcula la tasa de quema mensual y proyecta el flujo de caja durante 12 meses.
 *
 * @param {{
 *   initialCash:      number,
 *   monthlyRevenue:   number,
 *   monthlyExpenses:  Array<{ category: string, amount: number }>,
 *   oneTimeEvents:    Array<{ month: number, amount: number, label: string }>
 * }} params
 *
 * @returns {{
 *   grossBurn:   number | null,   // Gastos fijos mensuales totales
 *   netBurn:     number | null,   // Quema neta = gastos - ingresos (positivo = quema)
 *   runway:      number | null,   // Meses hasta que el saldo llega a cero (null = no se agota)
 *   zeroMonth:   number | null,   // Mes (1-12) en que el saldo llega a cero
 *   projections: Array<{
 *     month:        number,
 *     revenue:      number,
 *     expenses:     number,
 *     netBurn:      number,
 *     cashBalance:  number,
 *     isNegative:   boolean
 *   }>,
 *   errors:   string[],
 *   warnings: string[]
 * }}
 */
function calcBurnRate({
  initialCash,
  monthlyRevenue,
  monthlyExpenses,
  oneTimeEvents = [],
}) {
  const errors = [];
  const warnings = [];

  const empty = {
    grossBurn: null,
    netBurn: null,
    runway: null,
    zeroMonth: null,
    projections: [],
    errors,
    warnings,
  };

  // ── Validación: caja inicial ──
  if (!isFiniteNumber(initialCash)) {
    errors.push('"Caja inicial" debe ser un número válido.');
  } else if (initialCash < 0) {
    errors.push('"Caja inicial" no puede ser negativa.');
  }

  // ── Validación: ingresos mensuales ──
  if (!isFiniteNumber(monthlyRevenue)) {
    errors.push('"Ingresos mensuales" debe ser un número válido.');
  } else if (monthlyRevenue < 0) {
    errors.push('"Ingresos mensuales" no puede ser negativo.');
  }

  // ── Validación: gastos mensuales ──
  if (!Array.isArray(monthlyExpenses)) {
    errors.push('"Gastos mensuales" debe ser un arreglo.');
  } else {
    monthlyExpenses.forEach((exp, i) => {
      const label = exp.category?.trim() || `Gasto ${i + 1}`;
      if (!isFiniteNumber(exp.amount)) {
        errors.push(`El monto de "${label}" debe ser un número válido.`);
      } else if (exp.amount < 0) {
        errors.push(`El monto de "${label}" no puede ser negativo.`);
      }
    });
  }

  // ── Validación: eventos únicos ──
  if (!Array.isArray(oneTimeEvents)) {
    errors.push('"Eventos únicos" debe ser un arreglo.');
  } else {
    oneTimeEvents.forEach((evt, i) => {
      const label = evt.label?.trim() || `Evento ${i + 1}`;
      if (
        !isFiniteNumber(evt.month) ||
        !Number.isInteger(evt.month) ||
        evt.month < 1 ||
        evt.month > PROJECTION_MONTHS
      ) {
        errors.push(
          `El mes de "${label}" debe ser un entero entre 1 y ${PROJECTION_MONTHS}.`
        );
      }
      if (!isFiniteNumber(evt.amount)) {
        errors.push(`El monto de "${label}" debe ser un número válido.`);
      }
    });
  }

  if (errors.length > 0) return empty;

  // ── Calcular gastos fijos totales (gross burn) ──
  const grossBurn = round(sumAmounts(monthlyExpenses), 2);
  const netBurn = round(grossBurn - monthlyRevenue, 2);

  // ── Agrupar eventos únicos por mes (1-indexed) ──
  /** @type {Map<number, number>} */
  const eventsByMonth = new Map();
  oneTimeEvents.forEach((evt) => {
    const prev = eventsByMonth.get(evt.month) || 0;
    eventsByMonth.set(evt.month, prev + evt.amount);
  });

  // ── Proyección mes a mes ──
  const projections = [];
  let cashBalance = initialCash;
  let runway = null;
  let zeroMonth = null;

  for (let month = 1; month <= PROJECTION_MONTHS; month++) {
    const eventAmount = eventsByMonth.get(month) || 0;

    // Gastos totales del mes (recurrentes + eventuales negativos)
    const monthExpenses = grossBurn + (eventAmount < 0 ? Math.abs(eventAmount) : 0);
    // Ingresos del mes (recurrentes + eventuales positivos)
    const monthRevenue = monthlyRevenue + (eventAmount > 0 ? eventAmount : 0);

    const monthNetBurn = round(monthExpenses - monthRevenue, 2);
    cashBalance = round(cashBalance - monthNetBurn, 2);
    const isNegative = cashBalance < 0;

    projections.push({
      month,
      revenue: round(monthRevenue, 2),
      expenses: round(monthExpenses, 2),
      netBurn: monthNetBurn,
      cashBalance,
      isNegative,
    });

    // Registrar el mes en que el saldo se agota (<= 0)
    if (cashBalance <= 0 && zeroMonth === null) {
      zeroMonth = month;
      // Runway aproximado: mes anterior + fracción del mes actual
      const prevBalance = cashBalance + monthNetBurn; // saldo antes del mes actual
      const fraction =
        monthNetBurn > 0 ? prevBalance / monthNetBurn : 0;
      runway = round(month - 1 + fraction, 2);
    }
  }

  // Si la caja no se agotó durante los 12 meses proyectados pero hay quema neta positiva:
  if (runway === null && netBurn > 0 && cashBalance > 0) {
    runway = round(PROJECTION_MONTHS + cashBalance / netBurn, 2);
  }

  // ── Advertencias ──
  if (initialCash === 0) {
    warnings.push(
      "La caja inicial es cero. La startup necesita financiamiento inmediato."
    );
  }

  if (netBurn <= 0) {
    warnings.push(
      "El negocio es cash-flow positivo en condiciones base. ¡Buen trabajo! Verifica los eventos únicos para confirmar que no haya meses negativos."
    );
  } else if (runway !== null && runway < 3) {
    warnings.push(
      `¡Alerta crítica! El runway es de solo ${round(runway, 1)} meses. Busca financiamiento de inmediato.`
    );
  } else if (runway !== null && runway < 6) {
    warnings.push(
      `El runway es de ${round(runway, 1)} meses. Se recomienda iniciar una ronda de financiamiento lo antes posible.`
    );
  } else if (runway !== null && runway < 12) {
    warnings.push(
      `El runway es de ${round(runway, 1)} meses. Considera comenzar a hablar con inversores en los próximos meses.`
    );
  }

  if (grossBurn > 0 && monthlyRevenue / grossBurn > 0.8 && monthlyRevenue < grossBurn) {
    warnings.push(
      "Los ingresos cubren más del 80% de los gastos. Estás cerca del punto de equilibrio."
    );
  }

  return {
    grossBurn,
    netBurn,
    runway,
    zeroMonth,
    projections,
    errors,
    warnings,
  };
}

// ─── calcScenarios ────────────────────────────────────────────────────────────

/**
 * Genera tres escenarios de burn rate: base, conservador y optimista.
 *
 * @param {{
 *   initialCash:     number,
 *   monthlyRevenue:  number,
 *   monthlyExpenses: Array<{ category: string, amount: number }>,
 *   oneTimeEvents:   Array<{ month: number, amount: number, label: string }>
 * }} baseInputs - Parámetros del escenario base.
 *
 * @param {{
 *   conservative: { revenueMultiplier: number, expenseMultiplier: number },
 *   optimistic:   { revenueMultiplier: number, expenseMultiplier: number }
 * }} adjustments - Multiplicadores para los escenarios alternativos.
 *
 * @returns {{
 *   base:         ReturnType<typeof calcBurnRate>,
 *   conservative: ReturnType<typeof calcBurnRate>,
 *   optimistic:   ReturnType<typeof calcBurnRate>,
 *   errors:       string[],
 *   warnings:     string[]
 * }}
 */
function calcScenarios(baseInputs, adjustments) {
  const errors = [];
  const warnings = [];

  // ── Validación de ajustes ──
  if (!adjustments || typeof adjustments !== "object") {
    errors.push('"adjustments" debe ser un objeto con propiedades conservative y optimistic.');
    return {
      base: calcBurnRate(baseInputs),
      conservative: { errors: [...errors], warnings: [], grossBurn: null, netBurn: null, runway: null, zeroMonth: null, projections: [] },
      optimistic: { errors: [...errors], warnings: [], grossBurn: null, netBurn: null, runway: null, zeroMonth: null, projections: [] },
      errors,
      warnings,
    };
  }

  /**
   * Aplica multiplicadores a los inputs base.
   * @param {number} revMult
   * @param {number} expMult
   * @returns {typeof baseInputs}
   */
  function applyMultipliers(revMult, expMult) {
    // Validar multiplicadores
    if (!isFiniteNumber(revMult) || revMult < 0) {
      errors.push(`"revenueMultiplier" debe ser un número no negativo (recibido: ${revMult}).`);
    }
    if (!isFiniteNumber(expMult) || expMult < 0) {
      errors.push(`"expenseMultiplier" debe ser un número no negativo (recibido: ${expMult}).`);
    }

    return {
      ...baseInputs,
      monthlyRevenue: round((baseInputs.monthlyRevenue || 0) * (isFiniteNumber(revMult) ? revMult : 1), 2),
      monthlyExpenses: (baseInputs.monthlyExpenses || []).map((exp) => ({
        ...exp,
        amount: round((exp.amount || 0) * (isFiniteNumber(expMult) ? expMult : 1), 2),
      })),
    };
  }

  const { conservative: cons = {}, optimistic: opt = {} } = adjustments;

  const conservativeInputs = applyMultipliers(
    cons.revenueMultiplier ?? 0.7,
    cons.expenseMultiplier ?? 1.2
  );

  const optimisticInputs = applyMultipliers(
    opt.revenueMultiplier ?? 1.4,
    opt.expenseMultiplier ?? 0.9
  );

  // ── Calcular los tres escenarios ──
  const base = calcBurnRate(baseInputs);
  const conservative = calcBurnRate(conservativeInputs);
  const optimistic = calcBurnRate(optimisticInputs);

  // ── Advertencias comparativas ──
  if (conservative.runway !== null && conservative.runway < 3) {
    warnings.push(
      `En el escenario conservador, el runway cae a ${round(conservative.runway, 1)} meses. Prepárate para un plan de contingencia.`
    );
  }

  if (optimistic.runway === null) {
    warnings.push(
      "En el escenario optimista el negocio no consume caja en los 12 meses proyectados."
    );
  }

  if (base.runway !== null && optimistic.runway !== null) {
    const diff = round(optimistic.runway - base.runway, 1);
    if (diff > 6) {
      warnings.push(
        `Existe una diferencia de ${diff} meses de runway entre el escenario base y el optimista. Las proyecciones tienen alta sensibilidad.`
      );
    }
  }

  return {
    base,
    conservative,
    optimistic,
    errors,
    warnings,
  };
}

__exp.calcBurnRate = calcBurnRate;
__exp.calcScenarios = calcScenarios;
});
__def('cac-ltv.calc', function(__exp){
/**
 * cac-ltv.calc.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Herramienta de cálculo de CAC (Costo de Adquisición de Clientes) y
 * LTV (Valor de Vida del Cliente) para Elevia Startups.
 *
 * Cubre modelos de suscripción y no-suscripción, análisis por canal
 * y métricas clave de eficiencia (ratio LTV/CAC, período de recuperación).
 *
 * Todos los mensajes de error y advertencia están en español.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Helpers internos ────────────────────────────────────────────────────────

/**
 * Devuelve true si el valor es un número finito válido.
 * @param {unknown} v
 * @returns {boolean}
 */
function isFiniteNumber(v) {
  return typeof v === "number" && isFinite(v);
}

/**
 * Redondea a N decimales (por defecto 4).
 * @param {number} value
 * @param {number} [decimals=4]
 * @returns {number}
 */
function round(value, decimals = 4) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Valida que un valor sea un número finito positivo.
 * Devuelve un mensaje de error en español o null si es válido.
 * @param {unknown} value
 * @param {string} fieldName  - Nombre legible del campo (en español)
 * @param {{ allowZero?: boolean }} [options]
 * @returns {string | null}
 */
function validatePositive(value, fieldName, { allowZero = false } = {}) {
  if (!isFiniteNumber(value)) {
    return `"${fieldName}" debe ser un número válido.`;
  }
  if (value < 0) {
    return `"${fieldName}" no puede ser negativo.`;
  }
  if (!allowZero && value === 0) {
    return `"${fieldName}" no puede ser cero.`;
  }
  return null;
}

// ─── calcCAC ─────────────────────────────────────────────────────────────────

/**
 * Calcula el Costo de Adquisición de Clientes (CAC) global.
 *
 * @param {{ totalSpend: number, customersAcquired: number }} params
 * @returns {{ cac: number | null, errors: string[], warnings: string[] }}
 */
function calcCAC({ totalSpend, customersAcquired }) {
  const errors = [];
  const warnings = [];

  const spendErr = validatePositive(totalSpend, "Gasto total", {
    allowZero: true,
  });
  if (spendErr) errors.push(spendErr);

  const custErr = validatePositive(customersAcquired, "Clientes adquiridos");
  if (custErr) errors.push(custErr);

  if (errors.length > 0) return { cac: null, errors, warnings };

  if (totalSpend === 0) {
    warnings.push(
      "El gasto total es cero. El CAC resultante es 0, lo cual puede no reflejar la realidad."
    );
  }

  const cac = round(totalSpend / customersAcquired, 4);

  if (cac < 1) {
    warnings.push(
      "El CAC calculado es menor a $1. Verifica que los valores ingresados sean correctos."
    );
  }

  return { cac, errors, warnings };
}

// ─── calcCACByChannel ─────────────────────────────────────────────────────────

/**
 * Calcula el CAC por canal de adquisición.
 *
 * @param {Array<{ name: string, spend: number, customers: number }>} channels
 * @returns {{
 *   channels: Array<{ name: string, cac: number, percent: number }>,
 *   totalSpend: number,
 *   totalCustomers: number,
 *   globalCac: number | null,
 *   errors: string[],
 *   warnings: string[]
 * }}
 */
function calcCACByChannel(channels) {
  const errors = [];
  const warnings = [];

  const empty = {
    channels: [],
    totalSpend: 0,
    totalCustomers: 0,
    globalCac: null,
    errors,
    warnings,
  };

  if (!Array.isArray(channels) || channels.length === 0) {
    errors.push("Debe proporcionar al menos un canal de adquisición.");
    return empty;
  }

  const validChannels = [];
  let totalSpend = 0;
  let totalCustomers = 0;

  channels.forEach((ch, i) => {
    const label = ch.name?.trim() || `Canal ${i + 1}`;

    const spendErr = validatePositive(ch.spend, `Gasto de "${label}"`, {
      allowZero: true,
    });
    const custErr = validatePositive(ch.customers, `Clientes de "${label}"`);

    if (spendErr) {
      errors.push(spendErr);
      return;
    }
    if (custErr) {
      // Si customers = 0 es un error de validación, lo registramos pero continuamos
      errors.push(custErr);
      return;
    }

    const cac = round(ch.spend / ch.customers, 4);
    totalSpend += ch.spend;
    totalCustomers += ch.customers;

    validChannels.push({ name: label, spend: ch.spend, customers: ch.customers, cac });
  });

  if (errors.length > 0) return { ...empty, errors };

  // Porcentaje del gasto total por canal
  const channelsResult = validChannels.map((ch) => ({
    name: ch.name,
    cac: ch.cac,
    percent: totalSpend > 0 ? round((ch.spend / totalSpend) * 100, 2) : 0,
  }));

  // CAC global ponderado
  const globalCac =
    totalCustomers > 0 ? round(totalSpend / totalCustomers, 4) : null;

  if (globalCac === null) {
    warnings.push("No se adquirieron clientes en total; no se puede calcular el CAC global.");
  }

  // Detectar canales con CAC muy superior al global
  if (globalCac !== null) {
    channelsResult.forEach((ch) => {
      if (ch.cac > globalCac * 3) {
        warnings.push(
          `El canal "${ch.name}" tiene un CAC de $${ch.cac}, que es más de 3 veces el CAC global ($${globalCac}). Considera optimizarlo o pausarlo.`
        );
      }
    });
  }

  return {
    channels: channelsResult,
    totalSpend,
    totalCustomers,
    globalCac,
    errors,
    warnings,
  };
}

// ─── calcLTVSubscription ──────────────────────────────────────────────────────

/**
 * Calcula el LTV para modelos de suscripción (SaaS / recurrente).
 *
 * Fórmula: LTV = (MRR por cliente × Margen Bruto%) / Churn mensual
 * Equivale a: (ingreso mensual neto por cliente) × (vida media del cliente en meses)
 *
 * @param {{
 *   avgMonthlyRevenue: number,   // Ingreso mensual promedio por cliente
 *   grossMargin:       number,   // Margen bruto en porcentaje (0–100)
 *   monthlyChurn:      number    // Tasa de churn mensual en porcentaje (0–100)
 * }} params
 *
 * @returns {{
 *   ltv:              number | null,
 *   avgLifetimeMonths: number | null,
 *   monthlyMargin:    number | null,
 *   errors:           string[],
 *   warnings:         string[]
 * }}
 */
function calcLTVSubscription({ avgMonthlyRevenue, grossMargin, monthlyChurn }) {
  const errors = [];
  const warnings = [];

  const empty = { ltv: null, avgLifetimeMonths: null, monthlyMargin: null, errors, warnings };

  // Validaciones
  const revErr = validatePositive(avgMonthlyRevenue, "Ingreso mensual promedio");
  if (revErr) errors.push(revErr);

  if (!isFiniteNumber(grossMargin)) {
    errors.push('"Margen bruto" debe ser un número válido.');
  } else if (grossMargin < 0 || grossMargin > 100) {
    errors.push('"Margen bruto" debe estar entre 0 y 100.');
  }

  if (!isFiniteNumber(monthlyChurn)) {
    errors.push('"Churn mensual" debe ser un número válido.');
  } else if (monthlyChurn < 0) {
    errors.push('"Churn mensual" no puede ser negativo.');
  } else if (monthlyChurn === 0) {
    errors.push(
      '"Churn mensual" no puede ser cero (causaría LTV infinito). Usa un valor muy pequeño si el churn es casi nulo.'
    );
  } else if (monthlyChurn >= 100) {
    errors.push('"Churn mensual" no puede ser 100% o más.');
  }

  if (errors.length > 0) return empty;

  const churnDecimal = monthlyChurn / 100;
  const marginDecimal = grossMargin / 100;

  const monthlyMargin = round(avgMonthlyRevenue * marginDecimal, 4);
  // Vida media del cliente en meses = 1 / churn_mensual
  const avgLifetimeMonths = round(1 / churnDecimal, 2);
  const ltv = round(monthlyMargin / churnDecimal, 4);

  // Advertencias
  if (monthlyChurn > 15) {
    warnings.push(
      `Un churn mensual del ${monthlyChurn}% es muy alto (>15%). Esto reduce significativamente el LTV.`
    );
  }
  if (grossMargin < 30) {
    warnings.push(
      `Un margen bruto del ${grossMargin}% es bajo (<30%). Considera estrategias para mejorar los márgenes.`
    );
  }
  if (avgLifetimeMonths < 3) {
    warnings.push(
      `La vida media del cliente es de solo ${avgLifetimeMonths} meses. Es muy difícil amortizar el costo de adquisición.`
    );
  }

  return { ltv, avgLifetimeMonths, monthlyMargin, errors, warnings };
}

// ─── calcLTVSimple ───────────────────────────────────────────────────────────

/**
 * Calcula el LTV para modelos sin suscripción (e-commerce, servicios, etc.).
 *
 * Fórmula: LTV = Valor Promedio de Orden × Frecuencia de Compra (anual) × Años × Margen Bruto%
 *
 * @param {{
 *   avgOrderValue:          number,  // Valor promedio por transacción
 *   purchaseFrequency:      number,  // Compras por año
 *   grossMargin:            number,  // Margen bruto en porcentaje (0–100)
 *   customerLifetimeYears:  number   // Años de vida activa del cliente
 * }} params
 *
 * @returns {{
 *   ltv:              number | null,
 *   annualRevenue:    number | null,
 *   totalRevenue:     number | null,
 *   errors:           string[],
 *   warnings:         string[]
 * }}
 */
function calcLTVSimple({
  avgOrderValue,
  purchaseFrequency,
  grossMargin,
  customerLifetimeYears,
}) {
  const errors = [];
  const warnings = [];

  const empty = { ltv: null, annualRevenue: null, totalRevenue: null, errors, warnings };

  const aovErr = validatePositive(avgOrderValue, "Valor promedio de orden");
  if (aovErr) errors.push(aovErr);

  const freqErr = validatePositive(purchaseFrequency, "Frecuencia de compra");
  if (freqErr) errors.push(freqErr);

  const yearsErr = validatePositive(customerLifetimeYears, "Años de vida del cliente");
  if (yearsErr) errors.push(yearsErr);

  if (!isFiniteNumber(grossMargin)) {
    errors.push('"Margen bruto" debe ser un número válido.');
  } else if (grossMargin < 0 || grossMargin > 100) {
    errors.push('"Margen bruto" debe estar entre 0 y 100.');
  }

  if (errors.length > 0) return empty;

  const marginDecimal = grossMargin / 100;
  const annualRevenue = round(avgOrderValue * purchaseFrequency, 4);
  const totalRevenue = round(annualRevenue * customerLifetimeYears, 4);
  const ltv = round(totalRevenue * marginDecimal, 4);

  // Advertencias
  if (customerLifetimeYears > 20) {
    warnings.push(
      "Una vida del cliente superior a 20 años puede ser irreal. Verifica el dato ingresado."
    );
  }
  if (grossMargin < 10) {
    warnings.push(
      `Un margen bruto del ${grossMargin}% es muy bajo (<10%). El LTV resultante puede ser insuficiente para cubrir el CAC.`
    );
  }

  return { ltv, annualRevenue, totalRevenue, errors, warnings };
}

// ─── calcRatios ───────────────────────────────────────────────────────────────

/**
 * Calcula el ratio LTV/CAC y el período de recuperación del CAC (payback period).
 *
 * Payback (meses) = CAC / (Ingreso mensual promedio × Margen Bruto%)
 *
 * @param {{
 *   ltv:               number,  // LTV calculado previamente
 *   cac:               number,  // CAC calculado previamente
 *   avgMonthlyRevenue: number,  // Ingreso mensual promedio por cliente
 *   grossMargin:       number   // Margen bruto en porcentaje (0–100)
 * }} params
 *
 * @returns {{
 *   ltvCacRatio:    number | null,
 *   paybackMonths:  number | null,
 *   rating:         'excelente' | 'bueno' | 'aceptable' | 'crítico' | null,
 *   errors:         string[],
 *   warnings:       string[]
 * }}
 */
function calcRatios({ ltv, cac, avgMonthlyRevenue, grossMargin }) {
  const errors = [];
  const warnings = [];

  const empty = { ltvCacRatio: null, paybackMonths: null, rating: null, errors, warnings };

  const ltvErr = validatePositive(ltv, "LTV");
  if (ltvErr) errors.push(ltvErr);

  const cacErr = validatePositive(cac, "CAC");
  if (cacErr) errors.push(cacErr);

  const revErr = validatePositive(avgMonthlyRevenue, "Ingreso mensual promedio");
  if (revErr) errors.push(revErr);

  if (!isFiniteNumber(grossMargin)) {
    errors.push('"Margen bruto" debe ser un número válido.');
  } else if (grossMargin <= 0 || grossMargin > 100) {
    errors.push('"Margen bruto" debe estar entre 0 (exclusivo) y 100.');
  }

  if (errors.length > 0) return empty;

  const ltvCacRatio = round(ltv / cac, 4);

  const monthlyMarginPerCustomer = avgMonthlyRevenue * (grossMargin / 100);
  const paybackMonths = round(cac / monthlyMarginPerCustomer, 2);

  // Rating del ratio LTV/CAC
  let rating = null;
  if (ltvCacRatio >= 5) {
    rating = "excelente";
  } else if (ltvCacRatio >= 3) {
    rating = "bueno";
  } else if (ltvCacRatio >= 1) {
    rating = "aceptable";
  } else {
    rating = "crítico";
  }

  // Advertencias basadas en benchmarks de la industria
  if (ltvCacRatio < 1) {
    warnings.push(
      `Ratio LTV/CAC de ${ltvCacRatio}x: estás perdiendo dinero en cada cliente adquirido. Acción urgente requerida.`
    );
  } else if (ltvCacRatio < 3) {
    warnings.push(
      `Ratio LTV/CAC de ${ltvCacRatio}x: por debajo del benchmark recomendado de 3x. Considera reducir el CAC o aumentar el LTV.`
    );
  }

  if (paybackMonths > 18) {
    warnings.push(
      `El período de recuperación del CAC es de ${paybackMonths} meses (>18). Esto puede generar problemas de flujo de caja en etapas tempranas.`
    );
  } else if (paybackMonths > 12) {
    warnings.push(
      `El período de recuperación del CAC es de ${paybackMonths} meses. El benchmark para SaaS es <12 meses.`
    );
  }

  if (ltvCacRatio > 10) {
    warnings.push(
      `Ratio LTV/CAC de ${ltvCacRatio}x: es muy alto. Podrías estar sub-invirtiendo en adquisición; considera escalar el gasto en marketing.`
    );
  }

  return { ltvCacRatio, paybackMonths, rating, errors, warnings };
}

__exp.calcCAC = calcCAC;
__exp.calcCACByChannel = calcCACByChannel;
__exp.calcLTVSubscription = calcLTVSubscription;
__exp.calcLTVSimple = calcLTVSimple;
__exp.calcRatios = calcRatios;
});
__def('data-room.calc', function(__exp){
/**
 * data-room.calc.js — Elevia Startups
 * Data structure, progress calculation and folder hierarchy exporter for Data Room (Due Diligence).
 * No DOM, no UI.
 */

/**
 * Predefined structure of the Data Room checklist for startup Due Diligence.
 */
const DEFAULT_DATA_ROOM_SECTIONS = [
  {
    id: 'legal',
    name: 'Legal / Societario',
    icon: '⚖️',
    description: 'Documentación societaria, estatutos, acuerdos entre fundadores y pactos con socios inversores.',
    items: [
      {
        id: 'pacto-socios',
        name: 'Pacto de socios (SHA)',
        description: 'Pacto de socios vigente, acuerdos parasociales y derechos de veto, arrastre (drag-along) y acompañamiento (tag-along).',
        status: 'pending', // 'pending' | 'in_progress' | 'completed'
        notes: '',
      },
      {
        id: 'escrituras',
        name: 'Escrituras de constitución y estatutos',
        description: 'Escritura de constitución de la sociedad mercantil, ampliaciones de capital inscritas en el Registro y estatutos vigentes.',
        status: 'pending',
        notes: '',
      },
      {
        id: 'cap-table',
        name: 'Cap Table detallado y actualizado',
        description: 'Tabla de capitalización con desglose de socios, número y clase de participaciones, porcentajes y notas convertibles o SAFEs vivos.',
        status: 'pending',
        notes: '',
      },
    ],
  },
  {
    id: 'finance',
    name: 'Financiero',
    icon: '📊',
    description: 'Histórico contable, balances, deudas financieras y modelo previsional a medio plazo.',
    items: [
      {
        id: 'cuentas-anuales',
        name: 'Cuentas anuales e histórico contable',
        description: 'Cuentas anuales depositadas en el Registro Mercantil de los últimos 2-3 ejercicios y balances de sumas y saldos actualizados.',
        status: 'pending',
        notes: '',
      },
      {
        id: 'proyecciones',
        name: 'Proyecciones financieras (3-5 años)',
        description: 'Modelo financiero detallado (PyG, flujo de caja, balance previsional) con hipótesis y drivers de crecimiento explicados.',
        status: 'pending',
        notes: '',
      },
      {
        id: 'detalle-deudas',
        name: 'Detalle de deudas y préstamos',
        description: 'Cuadro de amortización de préstamos bancarios, créditos participativos (ENISA, CDTI), avales públicos y líneas de crédito.',
        status: 'pending',
        notes: '',
      },
    ],
  },
  {
    id: 'team',
    name: 'Equipo',
    icon: '👥',
    description: 'Relación contractual de los founders, políticas de incentivación y acuerdos de dedicación.',
    items: [
      {
        id: 'contratos-founders',
        name: 'Contratos de fundadores y directivos',
        description: 'Contratos de alta dirección o prestación de servicios de los socios fundadores, régimen de dedicación y retribución.',
        status: 'pending',
        notes: '',
      },
      {
        id: 'acuerdos-vesting',
        name: 'Acuerdos de vesting y ESOP / Phantom Shares',
        description: 'Calendario de consolidación de participaciones de los fundadores (cliff/vesting) y reglamento del plan de opciones para empleados.',
        status: 'pending',
        notes: '',
      },
      {
        id: 'contratos-clave',
        name: 'Contratos clave y acuerdos de confidencialidad',
        description: 'Contratos del personal estratégico, acuerdos de confidencialidad (NDA), no competencia y cesión de propiedad de desarrollos.',
        status: 'pending',
        notes: '',
      },
    ],
  },
  {
    id: 'product',
    name: 'Producto / IP',
    icon: '💻',
    description: 'Propiedad industrial, marcas registradas, repositorios de código y licencias tecnológicas.',
    items: [
      {
        id: 'registro-marca',
        name: 'Registro de marca y nombres de dominio',
        description: 'Certificados de registro de marcas en OEPM / EUIPO, titularidad de dominios web corporativos y patentes o modelos de utilidad.',
        status: 'pending',
        notes: '',
      },
      {
        id: 'codigo-fuente',
        name: 'Código fuente y arquitectura técnica',
        description: 'Documentación técnica de arquitectura, dependencias y librerías open-source (compliance con licencias) e infraestructura cloud.',
        status: 'pending',
        notes: '',
      },
      {
        id: 'patentes',
        name: 'Patentes y cesión de propiedad intelectual (IP Assignment)',
        description: 'Documentos formales de cesión íntegra de la propiedad intelectual y software a favor exclusivo de la sociedad mercantil.',
        status: 'pending',
        notes: '',
      },
    ],
  },
  {
    id: 'commercial',
    name: 'Comercial',
    icon: '🤝',
    description: 'Contratos con clientes clave, métricas de tracción y funnel de ventas.',
    items: [
      {
        id: 'top-contratos',
        name: 'Top contratos de clientes y acuerdos marco',
        description: 'Contratos firmados con los principales clientes generadores de ingresos (top 5-10 cuentas), cartas de intenciones (LOIs) y pilotos.',
        status: 'pending',
        notes: '',
      },
      {
        id: 'metricas-unit-economics',
        name: 'Métricas operativas y Unit Economics',
        description: 'Reporte de cohortes de retención, CAC por canal, LTV, churn rate mensual, MRR/ARR y pipeline de oportunidades cualificadas.',
        status: 'pending',
        notes: '',
      },
    ],
  },
];

/**
 * Generates a clean clone of the default data room structure.
 * @returns {Array} Deep copy of sections
 */
function createDefaultDataRoom() {
  return JSON.parse(JSON.stringify(DEFAULT_DATA_ROOM_SECTIONS));
}

/**
 * Calculates statistics and completion progress across all sections and per category.
 * @param {Array} sections
 * @returns {{
 *   totalItems: number,
 *   completedCount: number,
 *   inProgressCount: number,
 *   pendingCount: number,
 *   progressPercent: number,
 *   categoryStats: Object
 * }}
 */
function calcDataRoomStats(sections = []) {
  let totalItems = 0;
  let completedCount = 0;
  let inProgressCount = 0;
  let pendingCount = 0;

  const categoryStats = {};

  sections.forEach(sec => {
    let secTotal = 0;
    let secCompleted = 0;
    let secInProgress = 0;
    let secPending = 0;

    (sec.items || []).forEach(item => {
      secTotal++;
      totalItems++;
      if (item.status === 'completed') {
        secCompleted++;
        completedCount++;
      } else if (item.status === 'in_progress') {
        secInProgress++;
        inProgressCount++;
      } else {
        secPending++;
        pendingCount++;
      }
    });

    const secProgress = secTotal > 0
      ? Math.round(((secCompleted + secInProgress * 0.5) / secTotal) * 100)
      : 0;

    categoryStats[sec.id] = {
      total: secTotal,
      completed: secCompleted,
      inProgress: secInProgress,
      pending: secPending,
      progressPercent: secProgress,
    };
  });

  const progressPercent = totalItems > 0
    ? Math.round(((completedCount + inProgressCount * 0.5) / totalItems) * 100)
    : 0;

  return {
    totalItems,
    completedCount,
    inProgressCount,
    pendingCount,
    progressPercent,
    categoryStats,
  };
}

/**
 * Generates a structured list format for pasting into Google Drive, Notion, Obsidian, or Email.
 *
 * @param {Array} sections
 * @param {'notion' | 'plain' | 'drive'} format
 * @returns {string} Formatted folder text
 */
function generateFolderStructureText(sections = [], format = 'notion') {
  const stats = calcDataRoomStats(sections);
  const lines = [];

  const dateStr = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (format === 'notion' || format === 'markdown') {
    lines.push(`# 📁 DATA ROOM — Due Diligence`);
    lines.push(`> Estado global: **${stats.progressPercent}% completado** (${stats.completedCount}/${stats.totalItems} documentos listos) — Actualizado: ${dateStr}\n`);

    sections.forEach((sec, idx) => {
      const catStats = stats.categoryStats[sec.id] || { completed: 0, total: 0 };
      lines.push(`## ${idx + 1}. ${sec.icon} ${sec.name} (${catStats.completed}/${catStats.total})`);
      (sec.items || []).forEach(item => {
        let statusBadge = '[ ]';
        let statusLabel = 'Pendiente';
        if (item.status === 'completed') {
          statusBadge = '[x]';
          statusLabel = 'Completado';
        } else if (item.status === 'in_progress') {
          statusBadge = '[-]';
          statusLabel = 'En proceso';
        }

        let itemLine = `- ${statusBadge} **${item.name}** — *(${statusLabel})*`;
        if (item.notes && item.notes.trim()) {
          itemLine += `\n  - 🔗 ${item.notes.trim()}`;
        }
        lines.push(itemLine);
      });
      lines.push('');
    });
  } else {
    // Clean hierarchical folder tree format
    lines.push(`DATA ROOM — Estructura de carpetas Due Diligence`);
    lines.push(`Progreso: ${stats.progressPercent}% (${stats.completedCount} de ${stats.totalItems} documentos preparados)\n`);

    sections.forEach((sec, idx) => {
      lines.push(`📁 ${idx + 1}. ${sec.name}`);
      (sec.items || []).forEach(item => {
        let icon = '⚪';
        if (item.status === 'completed') icon = '✅';
        else if (item.status === 'in_progress') icon = '⏳';

        let line = `   ├── ${icon} ${item.name}`;
        if (item.notes && item.notes.trim()) {
          line += ` [${item.notes.trim()}]`;
        }
        lines.push(line);
      });
      lines.push('');
    });
  }

  return lines.join('\n');
}

__exp.createDefaultDataRoom = createDefaultDataRoom;
__exp.calcDataRoomStats = calcDataRoomStats;
__exp.generateFolderStructureText = generateFolderStructureText;
__exp.DEFAULT_DATA_ROOM_SECTIONS = DEFAULT_DATA_ROOM_SECTIONS;
});
__def('dilution.calc', function(__exp){
/**
 * dilution.calc.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Herramienta de cálculo de dilución accionaria para Elevia Startups.
 * Calcula la tabla de capitalización (cap table) posterior a una inversión,
 * mostrando cómo se diluye la participación de cada fundador.
 *
 * Todos los mensajes de error y advertencia están en español.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Constantes ──────────────────────────────────────────────────────────────

/** Tolerancia para la comparación de sumas de porcentajes (punto flotante). */
const PERCENT_TOLERANCE = 0.01;

// ─── Helpers internos ────────────────────────────────────────────────────────

/**
 * Devuelve true si el valor es un número finito (no NaN, no Infinity).
 * @param {unknown} v
 * @returns {boolean}
 */
function isFiniteNumber(v) {
  return typeof v === "number" && isFinite(v);
}

/**
 * Redondea un número a N decimales.
 * @param {number} value
 * @param {number} [decimals=4]
 * @returns {number}
 */
function round(value, decimals = 4) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

// ─── Exportación principal ────────────────────────────────────────────────────

/**
 * Calcula la tabla de capitalización posterior a la inversión.
 *
 * @param {{
 *   preMoney:   number,
 *   investment: number,
 *   founders:   Array<{ name: string, percent: number }>
 * }} inputs
 *
 * @returns {{
 *   postMoney:       number | null,
 *   investorPercent: number | null,
 *   founders: Array<{
 *     name:        string,
 *     prePercent:  number,
 *     postPercent: number,
 *     dilution:    number   // puntos porcentuales perdidos
 *   }>,
 *   errors:   string[],
 *   warnings: string[]
 * }}
 */
function calcDilution({ preMoney, investment, founders }) {
  const errors = [];
  const warnings = [];

  // ── Resultado vacío reutilizable ──
  const empty = {
    postMoney: null,
    investorPercent: null,
    founders: [],
    errors,
    warnings,
  };

  // ── Validación: tipos y finitud ──
  if (!isFiniteNumber(preMoney)) {
    errors.push("La valoración pre-money debe ser un número válido.");
  }
  if (!isFiniteNumber(investment)) {
    errors.push("El monto de inversión debe ser un número válido.");
  }

  // ── Validación: valores negativos ──
  if (isFiniteNumber(preMoney) && preMoney < 0) {
    errors.push("La valoración pre-money no puede ser negativa.");
  }
  if (isFiniteNumber(investment) && investment < 0) {
    errors.push("El monto de inversión no puede ser negativo.");
  }

  // ── Validación: cero pre-money ──
  if (isFiniteNumber(preMoney) && preMoney === 0) {
    errors.push(
      "La valoración pre-money no puede ser cero (causaría división por cero)."
    );
  }

  // ── Validación: inversión cero ──
  if (isFiniteNumber(investment) && investment === 0) {
    warnings.push(
      "El monto de inversión es cero; no habrá dilución ni participación del inversor."
    );
  }

  // ── Validación: fundadores ──
  if (!Array.isArray(founders) || founders.length === 0) {
    errors.push("Debe proporcionar al menos un fundador.");
    return { ...empty };
  }

  const validatedFounders = [];
  founders.forEach((f, i) => {
    const label = f.name?.trim() || `Fundador ${i + 1}`;

    if (!isFiniteNumber(f.percent)) {
      errors.push(`El porcentaje de "${label}" no es un número válido.`);
      return;
    }
    if (f.percent < 0) {
      errors.push(`El porcentaje de "${label}" no puede ser negativo.`);
      return;
    }
    if (f.percent > 100) {
      errors.push(`El porcentaje de "${label}" no puede superar 100%.`);
      return;
    }

    validatedFounders.push({ name: label, percent: f.percent });
  });

  // Si ya hay errores de tipo/valor, no continuar.
  if (errors.length > 0) {
    return { ...empty, founders: [] };
  }

  // ── Validación: suma de porcentajes ≈ 100 ──
  const totalPercent = validatedFounders.reduce((acc, f) => acc + f.percent, 0);
  const diff = Math.abs(totalPercent - 100);

  if (diff > PERCENT_TOLERANCE) {
    errors.push(
      `Los porcentajes de los fundadores suman ${round(totalPercent, 2)}%, pero deben sumar exactamente 100%.`
    );
    return { ...empty, founders: [] };
  }

  // ── Advertencia por duplicados de nombre ──
  const names = validatedFounders.map((f) => f.name.toLowerCase());
  const hasDuplicates = names.length !== new Set(names).size;
  if (hasDuplicates) {
    warnings.push(
      "Existen fundadores con nombres duplicados. Verifica que la tabla sea correcta."
    );
  }

  // ── Cálculos principales ──
  const postMoney = preMoney + investment;

  // investorPercent = 0 cuando investment = 0 (protección ante división por cero ya cubierta)
  const investorPercent =
    postMoney === 0 ? 0 : round((investment / postMoney) * 100, 4);

  // Participación remanente para los fundadores colectivamente
  const founderRetainedFraction = 1 - investorPercent / 100;

  // Cap table por fundador
  const foundersResult = validatedFounders.map((f) => {
    const postPercent = round(f.percent * founderRetainedFraction, 4);
    const dilution = round(f.percent - postPercent, 4); // puntos porcentuales perdidos
    return {
      name: f.name,
      prePercent: f.percent,
      postPercent,
      dilution,
    };
  });

  // ── Advertencias de concentración ──
  if (investorPercent >= 50) {
    warnings.push(
      `El inversor obtiene ${round(investorPercent, 2)}% de la empresa. Considera si esta dilución es aceptable para la ronda.`
    );
  }

  if (investorPercent > 30) {
    warnings.push(
      "Una participación del inversor superior al 30% puede afectar el control y la gobernanza de la startup."
    );
  }

  return {
    postMoney,
    investorPercent,
    founders: foundersResult,
    errors,
    warnings,
  };
}

__exp.calcDilution = calcDilution;
});
__def('okr.calc', function(__exp){
/**
 * @file okr.calc.js
 * @module tools/okr.calc
 * @description Lógica de datos pura para la herramienta OKR de Elevia Startups.
 *              Sin dependencias de DOM. Exporta funciones de creación de estructuras
 *              de datos y cálculos de progreso para Objetivos y Resultados Clave.
 */

'use strict';

// ---------------------------------------------------------------------------
// Utilidades internas
// ---------------------------------------------------------------------------

/**
 * Genera un UUID v4. Usa crypto.randomUUID() cuando está disponible;
 * de lo contrario utiliza un generador de respaldo compatible.
 * @returns {string} UUID en formato estándar.
 */
function generateId() {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID();
  }

  // Respaldo: UUID v4 aleatorio sin dependencias externas
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Devuelve la fecha ISO actual como string.
 * @returns {string}
 */
function now() {
  return new Date().toISOString();
}

// ---------------------------------------------------------------------------
// Constantes de estado
// ---------------------------------------------------------------------------

/** @enum {string} Estados válidos para un Objetivo o Resultado Clave */
const STATUS = Object.freeze({
  SIN_INICIAR: 'sin-iniciar',
  EN_PROGRESO: 'en-progreso',
  EN_RIESGO: 'en-riesgo',
  COMPLETADO: 'completado',
});

/** @enum {string} Métricas predefinidas para un Resultado Clave */
const METRIC = Object.freeze({
  PORCENTAJE: 'porcentaje',
  NUMERO: 'numero',
  MONEDA: 'moneda',
  BOOLEANO: 'booleano',
  PERSONALIZADO: 'personalizado',
});

// ---------------------------------------------------------------------------
// Creación de estructuras de datos
// ---------------------------------------------------------------------------

/**
 * Crea una nueva Tarea/Iniciativa asociada a un Resultado Clave.
 *
 * @param {string} keyResultId - ID del KR al que pertenece esta tarea.
 * @param {string} [title='']  - Título inicial de la tarea.
 * @returns {{
 *   id: string,
 *   keyResultId: string,
 *   title: string,
 *   description: string,
 *   owner: string,
 *   deadline: string | null,
 *   completed: boolean,
 *   createdAt: string
 * }}
 */
function createTask(keyResultId, title = '') {
  if (typeof keyResultId !== 'string' || !keyResultId) {
    throw new Error('createTask: keyResultId debe ser un string no vacío.');
  }

  return {
    id: generateId(),
    keyResultId,
    title: String(title),
    description: '',
    owner: '',
    deadline: null,       // ISO date string o null
    completed: false,
    important: true,      // Importante (default true)
    urgent: true,         // Urgente (default true)
    createdAt: now(),
  };
}

/**
 * Crea un nuevo Resultado Clave (KR) con 3 tareas predeterminadas vacías.
 *
 * @param {string} objectiveId - ID del Objetivo al que pertenece este KR.
 * @param {string} [title='']  - Título inicial del KR.
 * @returns {{
 *   id: string,
 *   objectiveId: string,
 *   title: string,
 *   description: string,
 *   owner: string,
 *   deadline: string | null,
 *   status: string,
 *   metric: string,
 *   targetValue: number,
 *   currentValue: number,
 *   unit: string,
 *   tasks: Array<object>
 * }}
 */
function createKeyResult(objectiveId, title = '') {
  if (typeof objectiveId !== 'string' || !objectiveId) {
    throw new Error('createKeyResult: objectiveId debe ser un string no vacío.');
  }

  const id = generateId();

  return {
    id,
    objectiveId,
    title: String(title),
    description: '',
    owner: '',
    deadline: null,                 // ISO date string o null
    status: STATUS.SIN_INICIAR,
    metric: METRIC.PORCENTAJE,
    targetValue: 100,               // valor objetivo por defecto
    currentValue: 0,                // valor actual inicial
    unit: '%',
    tasks: [
      createTask(id),
      createTask(id),
      createTask(id),
    ],
  };
}

/**
 * Crea un nuevo Objetivo con 3 Resultados Clave predeterminados vacíos.
 *
 * @param {string} [title=''] - Título inicial del objetivo.
 * @returns {{
 *   id: string,
 *   title: string,
 *   description: string,
 *   owner: string,
 *   deadline: string | null,
 *   status: string,
 *   keyResults: Array<object>,
 *   createdAt: string
 * }}
 */
function createObjective(title = '') {
  const id = generateId();

  return {
    id,
    title: String(title),
    description: '',
    owner: '',
    deadline: null,                 // ISO date string o null
    status: STATUS.SIN_INICIAR,
    keyResults: [
      createKeyResult(id),
      createKeyResult(id),
      createKeyResult(id),
    ],
    createdAt: now(),
  };
}

// ---------------------------------------------------------------------------
// Cálculos de progreso
// ---------------------------------------------------------------------------

/**
 * Calcula el progreso de un Resultado Clave basándose en currentValue / targetValue.
 * El progreso NO se calcula a partir del estado de las tareas.
 *
 * @param {object} keyResult - Objeto KR con { currentValue, targetValue }.
 * @returns {number} Progreso entre 0 y 100 (redondeado a 2 decimales).
 */
function calcKRProgress(keyResult) {
  const target = Number(keyResult?.targetValue);
  const current = Number(keyResult?.currentValue);

  // Sin objetivo definido o con objetivo nulo → progreso 0
  if (!Number.isFinite(target) || target === 0) return 0;
  if (!Number.isFinite(current)) return 0;

  // Clamp entre 0 y 100
  const raw = (current / target) * 100;
  return Math.min(100, Math.max(0, parseFloat(raw.toFixed(2))));
}

/**
 * Calcula el progreso global de un Objetivo como la media aritmética
 * del progreso de todos sus Resultados Clave.
 *
 * @param {object} objective - Objeto Objetivo con { keyResults: KR[] }.
 * @returns {number} Progreso entre 0 y 100 (redondeado a 2 decimales).
 */
function calcObjectiveProgress(objective) {
  const krs = objective?.keyResults;

  if (!Array.isArray(krs) || krs.length === 0) return 0;

  const total = krs.reduce((sum, kr) => sum + calcKRProgress(kr), 0);
  const average = total / krs.length;

  return parseFloat(average.toFixed(2));
}

/**
 * Devuelve una etiqueta de estado según el valor de progreso.
 *
 * Rangos:
 *   - 0          → 'sin-iniciar'
 *   - 1 – 49     → 'en-riesgo'      (menos de la mitad)
 *   - 50 – 99    → 'en-progreso'
 *   - 100        → 'completado'
 *
 * @param {number} progress - Valor de progreso entre 0 y 100.
 * @returns {'sin-iniciar'|'en-progreso'|'en-riesgo'|'completado'}
 */
function getProgressStatus(progress) {
  const p = Number(progress);

  if (!Number.isFinite(p) || p <= 0) return STATUS.SIN_INICIAR;
  if (p >= 100) return STATUS.COMPLETADO;
  if (p >= 50) return STATUS.EN_PROGRESO;
  return STATUS.EN_RIESGO;
}

// ---------------------------------------------------------------------------
// Utilidades de ordenamiento
// ---------------------------------------------------------------------------

/**
 * Reordena un elemento dentro de un array moviendo el índice `fromIndex`
 * a `toIndex`. Devuelve un nuevo array (inmutable; no muta el original).
 *
 * @template T
 * @param {T[]}   arr       - Array de origen.
 * @param {number} fromIndex - Índice actual del elemento a mover.
 * @param {number} toIndex   - Índice destino del elemento.
 * @returns {T[]} Nuevo array reordenado.
 */
function reorderArray(arr, fromIndex, toIndex) {
  if (!Array.isArray(arr)) {
    throw new TypeError('reorderArray: el primer argumento debe ser un array.');
  }

  const len = arr.length;

  if (
    fromIndex < 0 || fromIndex >= len ||
    toIndex   < 0 || toIndex   >= len
  ) {
    throw new RangeError(
      `reorderArray: índices fuera de rango (from=${fromIndex}, to=${toIndex}, length=${len}).`
    );
  }

  if (fromIndex === toIndex) return [...arr];

  const result = [...arr];
  const [item] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, item);

  return result;
}

// ---------------------------------------------------------------------------
// Serialización y parseo del proyecto
// ---------------------------------------------------------------------------

/**
 * Serializa un proyecto OKR completo a JSON.
 * Añade metadatos de versión y timestamp de exportación.
 *
 * @param {object} project - Objeto del proyecto con { id, name, objectives, ... }.
 * @returns {string} JSON serializado.
 */
function serializeProject(project) {
  if (!project || typeof project !== 'object') {
    throw new TypeError('serializeProject: se esperaba un objeto de proyecto.');
  }

  const payload = {
    _meta: {
      version: '1.0.0',
      exportedAt: now(),
      app: 'Elevia Startups – OKR Tool',
    },
    ...project,
  };

  return JSON.stringify(payload, null, 2);
}

/**
 * Parsea y valida un JSON de proyecto OKR.
 * Lanza un error descriptivo si el JSON está malformado o faltan campos clave.
 *
 * @param {string} json - Cadena JSON a parsear.
 * @returns {object} Objeto de proyecto validado (sin el campo _meta).
 * @throws {SyntaxError}  Si el JSON está malformado.
 * @throws {TypeError}    Si la estructura del proyecto no es válida.
 */
function parseProject(json) {
  if (typeof json !== 'string' || !json.trim()) {
    throw new TypeError('parseProject: se esperaba una cadena JSON no vacía.');
  }

  let parsed;
  try {
    parsed = JSON.parse(json);
  } catch (e) {
    throw new SyntaxError(`parseProject: JSON inválido → ${e.message}`);
  }

  if (typeof parsed !== 'object' || parsed === null) {
    throw new TypeError('parseProject: el JSON no representa un objeto.');
  }

  // Extraer metadatos sin mutar el objeto de proyecto
  const { _meta, ...project } = parsed; // eslint-disable-line no-unused-vars

  // Validaciones mínimas de estructura
  if (typeof project.id !== 'string' || !project.id) {
    throw new TypeError('parseProject: el proyecto no contiene un "id" válido.');
  }

  if (!Array.isArray(project.objectives)) {
    throw new TypeError('parseProject: "objectives" debe ser un array.');
  }

  // Validación superficial de cada objetivo
  for (const [i, obj] of project.objectives.entries()) {
    if (typeof obj.id !== 'string' || !obj.id) {
      throw new TypeError(
        `parseProject: objetivo en índice ${i} no tiene un "id" válido.`
      );
    }
    if (!Array.isArray(obj.keyResults)) {
      throw new TypeError(
        `parseProject: objetivo "${obj.id}" debe tener un array "keyResults".`
      );
    }
  }

  return project;
}

/**
 * Clasifica todas las tareas de un proyecto en los 4 cuadrantes de la Matriz de Eisenhower:
 * - CI: Hacer ahora (Importante & Urgente)
 * - CII: Planificar (Importante & No urgente)
 * - CIII: Delegar (No importante & Urgente)
 * - CIV: Dejar de hacer (No importante & No urgente)
 *
 * @param {object} project - Proyecto OKR
 * @returns {{
 *   ci: Array<object>,
 *   cii: Array<object>,
 *   ciii: Array<object>,
 *   civ: Array<object>,
 *   total: number
 * }}
 */
function getEisenhowerClassification(project) {
  const res = { ci: [], cii: [], ciii: [], civ: [], total: 0 };
  if (!project || !Array.isArray(project.objectives)) return res;

  project.objectives.forEach((obj, objIdx) => {
    (obj.keyResults || []).forEach((kr, krIdx) => {
      (kr.tasks || []).forEach((task, taskIdx) => {
        res.total++;
        const important = task.important !== false;
        const urgent = task.urgent !== false;

        const item = {
          task,
          objIdx,
          krIdx,
          taskIdx,
          objTitle: obj.title,
          krTitle: kr.title,
          objNumber: objIdx + 1,
          krNumber: `${objIdx + 1}.${krIdx + 1}`,
        };

        if (important && urgent) {
          res.ci.push(item);
        } else if (important && !urgent) {
          res.cii.push(item);
        } else if (!important && urgent) {
          res.ciii.push(item);
        } else {
          res.civ.push(item);
        }
      });
    });
  });

  return res;
}

__exp.createTask = createTask;
__exp.createKeyResult = createKeyResult;
__exp.createObjective = createObjective;
__exp.calcKRProgress = calcKRProgress;
__exp.calcObjectiveProgress = calcObjectiveProgress;
__exp.getProgressStatus = getProgressStatus;
__exp.reorderArray = reorderArray;
__exp.serializeProject = serializeProject;
__exp.parseProject = parseProject;
__exp.getEisenhowerClassification = getEisenhowerClassification;
__exp.STATUS = STATUS;
__exp.METRIC = METRIC;
});
__def('tam-sam-som.calc', function(__exp){
/**
 * @file tam-sam-som.calc.js
 * @description Pure ES module for TAM/SAM/SOM market-size calculations.
 *              No DOM, no UI. All messages in Spanish.
 *
 * Methods supported:
 *   - Top-Down:  Start from a known reference market and slice percentages.
 *   - Bottom-Up: Start from a customer count, apply percentages and ARPU.
 *
 * Exported API:
 *   calcTopDown(inputs)            → { tam, sam, som, errors, warnings }
 *   calcBottomUp(inputs)           → { tam, sam, som, errors, warnings }
 *   generateScenarios(method, baseInputs) → { conservative, base, optimistic }
 *   analyzeResults(results)        → string[]
 */

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Returns true if a value is a finite, positive number (> 0).
 * @param {*} v
 * @returns {boolean}
 */
function isPositiveFinite(v) {
  return typeof v === 'number' && Number.isFinite(v) && v > 0;
}

/**
 * Returns true if a value is a finite number within [0, 100].
 * @param {*} v
 * @returns {boolean}
 */
function isValidPercent(v) {
  return typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 100;
}

/**
 * Clamps a value between min and max.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Builds the empty result structure.
 * @returns {{ tam: number, sam: number, som: number, errors: string[], warnings: string[] }}
 */
function emptyResult() {
  return {
    tam: 0,
    sam: 0,
    som: 0,
    tamUsers: 0,
    samUsers: 0,
    somUsers: 0,
    hasMonetary: true,
    hasUsers: false,
    inputMode: 'currency',
    ticketAverage: 0,
    errors: [],
    warnings: [],
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Calculates TAM/SAM/SOM using the top-down method.
 *
 * Logic:
 *   If inputMode === 'currency':
 *     TAM = referenceMarket
 *     SAM = TAM × (samPercent / 100)
 *     SOM = SAM × (somPercent / 100)
 *     If ticketAverage > 0, tamUsers = TAM / ticketAverage, etc.
 *   If inputMode === 'users':
 *     tamUsers = usersCount
 *     samUsers = tamUsers × (samPercent / 100)
 *     somUsers = samUsers × (somPercent / 100)
 *     If ticketAverage > 0, TAM = tamUsers × ticketAverage, etc.
 *
 * @param {{
 *   referenceMarket?: number, // Reference market size (TAM in currency)
 *   samPercent: number,      // % of TAM that is SAM (0-100)
 *   somPercent: number,      // % of SAM that is SOM (0-100)
 *   inputMode?: 'currency'|'users', // How TAM is specified
 *   usersCount?: number,     // Total potential users in TAM
 *   ticketAverage?: number,  // Average annual spend / ticket in currency
 * }} inputs
 * @returns {{ tam: number, sam: number, som: number, tamUsers: number, samUsers: number, somUsers: number, hasMonetary: boolean, hasUsers: boolean, errors: string[], warnings: string[] }}
 */
function calcTopDown(inputs) {
  const result = emptyResult();
  const {
    referenceMarket,
    samPercent,
    somPercent,
    inputMode = 'currency',
    usersCount,
    ticketAverage,
  } = inputs ?? {};

  result.inputMode = inputMode;

  // ── Validation ────────────────────────────────────────────────────────────
  if (inputMode === 'users') {
    if (!isPositiveFinite(usersCount)) {
      result.errors.push('El total de usuarios potenciales debe ser un número positivo mayor que cero.');
    }
  } else {
    if (!isPositiveFinite(referenceMarket)) {
      result.errors.push('El mercado de referencia debe ser un número positivo mayor que cero.');
    }
  }

  if (!isValidPercent(samPercent)) {
    result.errors.push('El porcentaje del SAM debe estar entre 0 y 100.');
  }
  if (!isValidPercent(somPercent)) {
    result.errors.push('El porcentaje del SOM debe estar entre 0 y 100.');
  }

  // Stop early if there are blocking errors.
  if (result.errors.length > 0) return result;

  // ── Calculation ───────────────────────────────────────────────────────────
  let tam = 0;
  let sam = 0;
  let som = 0;
  let tamUsers = 0;
  let samUsers = 0;
  let somUsers = 0;
  let hasMonetary = true;
  let hasUsers = false;
  const ticket = isPositiveFinite(ticketAverage) ? ticketAverage : 0;

  if (inputMode === 'users') {
    tamUsers = usersCount;
    samUsers = tamUsers * (samPercent / 100);
    somUsers = samUsers * (somPercent / 100);
    hasUsers = true;

    if (ticket > 0) {
      tam = tamUsers * ticket;
      sam = samUsers * ticket;
      som = somUsers * ticket;
      hasMonetary = true;
    } else {
      tam = tamUsers;
      sam = samUsers;
      som = somUsers;
      hasMonetary = false;
    }
  } else {
    // currency mode
    tam = referenceMarket;
    sam = tam * (samPercent / 100);
    som = sam * (somPercent / 100);
    hasMonetary = true;

    if (ticket > 0) {
      tamUsers = tam / ticket;
      samUsers = sam / ticket;
      somUsers = som / ticket;
      hasUsers = true;
    } else {
      hasUsers = false;
    }
  }

  result.tam = tam;
  result.sam = sam;
  result.som = som;
  result.tamUsers = tamUsers;
  result.samUsers = samUsers;
  result.somUsers = somUsers;
  result.hasMonetary = hasMonetary;
  result.hasUsers = hasUsers;
  result.ticketAverage = ticket;

  // ── Business-rule validation ──────────────────────────────────────────────
  if (som > sam) {
    result.errors.push('El SOM no puede ser mayor que el SAM. Revisa los porcentajes ingresados.');
  }
  if (sam > tam) {
    result.errors.push('El SAM no puede ser mayor que el TAM. Revisa los porcentajes ingresados.');
  }

  // Warnings
  if (som > sam * 0.5 && sam > 0) {
    result.warnings.push(
      'El SOM supera el 50 % del SAM. Esta estimación de captura de mercado es muy agresiva; considera revisarla.'
    );
  }
  if (samPercent < 1) {
    result.warnings.push(
      'El porcentaje del SAM es muy bajo (< 1 %). Verifica que el mercado de referencia y el segmento objetivo estén correctamente definidos.'
    );
  }
  if (somPercent < 0.5) {
    result.warnings.push(
      'El porcentaje del SOM es muy bajo (< 0.5 %). Si es intencional, asegúrate de que refleje tu realidad operativa.'
    );
  }

  return result;
}

/**
 * Calculates TAM/SAM/SOM using the bottom-up method.
 *
 * Logic:
 *   TAM = totalPotentialCustomers  × avgAnnualRevenuePerCustomer
 *   SAM = TAM × (addressablePercent / 100)
 *   SOM = SAM × (capturePercent / 100)
 *
 * @param {{
 *   totalPotentialCustomers: number,
 *   addressablePercent: number,            // % of customers that can be served → SAM
 *   avgAnnualRevenuePerCustomer: number,   // ARPU in currency units / year
 *   capturePercent: number,                // % of SAM that is SOM
 * }} inputs
 * @returns {{ tam: number, sam: number, som: number, tamUsers: number, samUsers: number, somUsers: number, errors: string[], warnings: string[] }}
 */
function calcBottomUp(inputs) {
  const result = emptyResult();
  const {
    totalPotentialCustomers,
    addressablePercent,
    avgAnnualRevenuePerCustomer,
    capturePercent,
  } = inputs ?? {};

  // ── Validation ────────────────────────────────────────────────────────────
  if (!isPositiveFinite(totalPotentialCustomers)) {
    result.errors.push('El total de clientes potenciales debe ser un número positivo mayor que cero.');
  }
  if (!isValidPercent(addressablePercent)) {
    result.errors.push('El porcentaje de clientes alcanzables (SAM) debe estar entre 0 y 100.');
  }
  if (!isPositiveFinite(avgAnnualRevenuePerCustomer)) {
    result.errors.push(
      'El ingreso promedio anual por cliente (ARPU) debe ser un número positivo mayor que cero.'
    );
  }
  if (!isValidPercent(capturePercent)) {
    result.errors.push('El porcentaje de captura (SOM) debe estar entre 0 y 100.');
  }

  if (result.errors.length > 0) return result;

  // ── Calculation ───────────────────────────────────────────────────────────
  const tamUsers = totalPotentialCustomers;
  const samUsers = tamUsers * (addressablePercent / 100);
  const somUsers = samUsers * (capturePercent / 100);
  const tam = tamUsers * avgAnnualRevenuePerCustomer;
  const sam = samUsers * avgAnnualRevenuePerCustomer;
  const som = somUsers * avgAnnualRevenuePerCustomer;

  result.tam = tam;
  result.sam = sam;
  result.som = som;
  result.tamUsers = tamUsers;
  result.samUsers = samUsers;
  result.somUsers = somUsers;
  result.hasMonetary = true;
  result.hasUsers = true;
  result.inputMode = 'bottom-up';
  result.ticketAverage = avgAnnualRevenuePerCustomer;

  // ── Business-rule validation ──────────────────────────────────────────────
  if (som > sam) {
    result.errors.push('El SOM no puede ser mayor que el SAM. Revisa el porcentaje de captura.');
  }
  if (sam > tam) {
    // Logically impossible with valid percents, but guard anyway.
    result.errors.push('El SAM no puede ser mayor que el TAM. Revisa el porcentaje de clientes alcanzables.');
  }

  // Warnings
  if (som > sam * 0.5 && sam > 0) {
    result.warnings.push(
      'El SOM supera el 50 % del SAM. Esta estimación de captura de mercado es muy agresiva; considera revisarla.'
    );
  }
  if (addressablePercent < 1) {
    result.warnings.push(
      'El porcentaje de clientes alcanzables es muy bajo (< 1 %). Verifica la segmentación de tu mercado objetivo.'
    );
  }
  if (capturePercent < 0.5) {
    result.warnings.push(
      'El porcentaje de captura del SOM es muy bajo (< 0.5 %). Asegúrate de que refleje tu realidad operativa.'
    );
  }
  if (totalPotentialCustomers < 100) {
    result.warnings.push(
      'El número de clientes potenciales es muy pequeño (< 100). Confirma que el mercado total esté bien definido.'
    );
  }

  return result;
}

/**
 * Generates three scenario variants — conservative, base, and optimistic —
 * by scaling the percentage inputs.
 *
 * Scaling rules:
 *   Conservative:
 *     top-down  → samPercent × 0.7,  somPercent × 0.5
 *     bottom-up → addressablePercent × 0.7, capturePercent × 0.5
 *   Base:        inputs unchanged
 *   Optimistic:
 *     top-down  → samPercent × 1.3 (capped at 100), somPercent × 2 (capped at 100)
 *     bottom-up → addressablePercent × 1.3 (capped at 100), capturePercent × 2 (capped at 100)
 *
 * Each scenario object contains { inputs, results } where results is the output
 * of the corresponding calc function.
 *
 * @param {'top-down'|'bottom-up'} method
 * @param {object} baseInputs
 * @returns {{ conservative: object, base: object, optimistic: object }}
 */
function generateScenarios(method, baseInputs) {
  if (method !== 'top-down' && method !== 'bottom-up') {
    throw new Error(`Método no reconocido: "${method}". Use "top-down" o "bottom-up".`);
  }

  const calcFn = method === 'top-down' ? calcTopDown : calcBottomUp;

  /**
   * Builds a scaled copy of baseInputs and runs the calc function.
   * @param {number} percentScale  Multiplier for the first percentage field.
   * @param {number} captureScale  Multiplier for the second (capture) percentage field.
   * @returns {{ inputs: object, results: object }}
   */
  function buildScenario(percentScale, captureScale) {
    let scenarioInputs;

    if (method === 'top-down') {
      scenarioInputs = {
        ...baseInputs,
        samPercent: clamp((baseInputs.samPercent ?? 0) * percentScale, 0, 100),
        somPercent: clamp((baseInputs.somPercent ?? 0) * captureScale, 0, 100),
      };
    } else {
      // bottom-up
      scenarioInputs = {
        ...baseInputs,
        addressablePercent: clamp((baseInputs.addressablePercent ?? 0) * percentScale, 0, 100),
        capturePercent: clamp((baseInputs.capturePercent ?? 0) * captureScale, 0, 100),
      };
    }

    return {
      inputs: scenarioInputs,
      results: calcFn(scenarioInputs),
    };
  }

  return {
    conservative: buildScenario(0.7, 0.5),
    base: {
      inputs: { ...baseInputs },
      results: calcFn(baseInputs),
    },
    optimistic: buildScenario(1.3, 2.0),
  };
}

/**
 * Analyses TAM/SAM/SOM results and returns contextual warnings and insights
 * to help founders interpret their numbers.
 *
 * @param {{ tam: number, sam: number, som: number }} results
 * @returns {string[]} Array of warning/insight messages in Spanish.
 */
function analyzeResults(results) {
  const insights = [];
  const { tam, sam, som } = results ?? {};

  // ── Guard: must be non-negative finite numbers ────────────────────────────
  if (
    !Number.isFinite(tam) ||
    !Number.isFinite(sam) ||
    !Number.isFinite(som) ||
    tam < 0 || sam < 0 || som < 0
  ) {
    insights.push('Los resultados contienen valores inválidos. Revisa los datos de entrada.');
    return insights;
  }

  // ── Hard business rules ───────────────────────────────────────────────────
  if (som > sam) {
    insights.push('Error: el SOM es mayor que el SAM, lo cual es matemáticamente incorrecto.');
  }
  if (sam > tam) {
    insights.push('Error: el SAM es mayor que el TAM, lo cual es matemáticamente incorrecto.');
  }

  // ── Ratio analysis ────────────────────────────────────────────────────────
  if (tam > 0) {
    const samRatio = sam / tam;
    const somRatio = som / tam;

    if (samRatio > 0.8) {
      insights.push(
        'El SAM representa más del 80 % del TAM. Verifica que la segmentación del mercado sea realista.'
      );
    }
    if (somRatio > 0.3) {
      insights.push(
        'El SOM representa más del 30 % del TAM total. Las estimaciones de captura tan altas son difíciles de justificar ante inversores en etapas tempranas.'
      );
    }
    if (somRatio < 0.001 && som > 0) {
      insights.push(
        'El SOM es menor al 0.1 % del TAM. Asegúrate de que tus metas de captura sean lo suficientemente ambiciosas para demostrar viabilidad.'
      );
    }
  }

  if (sam > 0) {
    const somOfSam = som / sam;

    // High capture warning
    if (somOfSam > 0.5) {
      insights.push(
        'El SOM supera el 50 % del SAM. Esta estimación de captura de mercado es muy agresiva; considera revisarla.'
      );
    }
    // Healthy range feedback
    if (somOfSam >= 0.01 && somOfSam <= 0.1) {
      insights.push(
        'El SOM está entre el 1 % y el 10 % del SAM, un rango razonable para startups en etapa temprana.'
      );
    }
  }

  // ── Absolute-size insights ────────────────────────────────────────────────
  if (som > 0 && som < 10_000) {
    insights.push(
      'El SOM proyectado es menor a $10,000. Evalúa si el tamaño del mercado justifica la inversión necesaria.'
    );
  }
  if (tam > 1_000_000_000) {
    insights.push(
      'El TAM supera los $1,000 millones. Los mercados muy grandes pueden parecer atractivos, pero asegúrate de que tu segmentación SAM/SOM sea suficientemente específica.'
    );
  }
  if (som >= 1_000_000 && som < 10_000_000) {
    insights.push(
      'Un SOM en el rango de $1M–$10M es generalmente atractivo para inversores ángel y rondas pre-seed.'
    );
  }
  if (som >= 10_000_000) {
    insights.push(
      'Un SOM mayor a $10M puede ser atractivo para VCs, pero asegúrate de respaldar las proyecciones con datos sólidos.'
    );
  }

  // ── Zero-value observations ───────────────────────────────────────────────
  if (tam === 0) {
    insights.push('El TAM es cero. Ingresa un mercado de referencia válido para obtener análisis.');
  }
  if (sam === 0 && tam > 0) {
    insights.push('El SAM es cero. El segmento objetivo no está definido o los porcentajes son demasiado bajos.');
  }
  if (som === 0 && sam > 0) {
    insights.push('El SOM es cero. Define un porcentaje de captura mayor que cero para proyectar ingresos alcanzables.');
  }

  return insights;
}

__exp.calcTopDown = calcTopDown;
__exp.calcBottomUp = calcBottomUp;
__exp.generateScenarios = generateScenarios;
__exp.analyzeResults = analyzeResults;
});
__def('unit-economics.calc', function(__exp){
/**
 * unit-economics.calc.js — Elevia Startups
 * Pure calculation logic for Unit Economics & Customer Retention (LTV projection).
 * No DOM, no UI. All error/warning messages in Spanish.
 */

/**
 * Validates whether a value is a positive finite number (or zero).
 * @param {*} v
 * @returns {boolean}
 */
function isNonNegative(v) {
  return typeof v === 'number' && Number.isFinite(v) && v >= 0;
}

/**
 * Validates whether a value is a strictly positive finite number (> 0).
 * @param {*} v
 * @returns {boolean}
 */
function isPositive(v) {
  return typeof v === 'number' && Number.isFinite(v) && v > 0;
}

/**
 * Clamps a number between min and max.
 * @param {number} val
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

/**
 * Interpolates retention percentages for 12 months given milestone values at M1, M3, M6, M12.
 * @param {{ m1?: number, m3?: number, m6?: number, m12?: number }} milestones
 * @returns {number[]} Array of 13 elements (index 0 is M0 = 100%, index 1..12 is M1..M12 %)
 */
function interpolateRetention12(milestones = {}) {
  const m1 = clamp(Number(milestones.m1 ?? 90), 0, 100);
  const m3 = clamp(Number(milestones.m3 ?? 75), 0, m1);
  const m6 = clamp(Number(milestones.m6 ?? 60), 0, m3);
  const m12 = clamp(Number(milestones.m12 ?? 45), 0, m6);

  const rates = [100]; // M0 = 100%

  // M1
  rates[1] = m1;

  // Linear interpolation M1 -> M3 (M2)
  rates[2] = Math.round((m1 + (m3 - m1) * (1 / 2)) * 10) / 10;
  rates[3] = m3;

  // Linear interpolation M3 -> M6 (M4, M5)
  rates[4] = Math.round((m3 + (m6 - m3) * (1 / 3)) * 10) / 10;
  rates[5] = Math.round((m3 + (m6 - m3) * (2 / 3)) * 10) / 10;
  rates[6] = m6;

  // Linear interpolation M6 -> M12 (M7..M11)
  for (let m = 7; m <= 11; m++) {
    const frac = (m - 6) / 6;
    rates[m] = Math.round((m6 + (m12 - m6) * frac) * 10) / 10;
  }
  rates[12] = m12;

  return rates;
}

/**
 * Calculates Unit Economics & 12-Month LTV Projection.
 *
 * @param {{
 *   cac: number,           // Customer Acquisition Cost (€)
 *   arpu: number,          // Average Revenue Per User/Customer per month (€)
 *   cogs: number,          // Monthly Cost of Goods Sold per User (€)
 *   retention?: number[] | { m1?: number, m3?: number, m6?: number, m12?: number }, // 12-month array or milestones
 * }} inputs
 * @returns {{
 *   unitGrossMargin: number,
 *   grossMarginPercent: number,
 *   simplePaybackMonths: number | null,
 *   realBreakEvenMonth: number | null,
 *   ltv12Months: number,
 *   ltvCacRatio: number | null,
 *   monthlyBreakdown: Array<{
 *     month: number,
 *     retentionPct: number,
 *     monthlyMargin: number,
 *     cumulativeMargin: number,
 *     cumulativeNetCashFlow: number,
 *     isPositive: boolean
 *   }>,
 *   errors: string[],
 *   warnings: string[],
 * }}
 */
function calcUnitEconomics(inputs = {}) {
  const cac = Number(inputs.cac) || 0;
  const arpu = Number(inputs.arpu) || 0;
  const cogs = Number(inputs.cogs) || 0;

  const errors = [];
  const warnings = [];

  if (!isNonNegative(cac)) {
    errors.push('El CAC debe ser un valor numérico positivo o cero.');
  }
  if (!isNonNegative(arpu)) {
    errors.push('El ARPU debe ser un valor numérico positivo o cero.');
  }
  if (!isNonNegative(cogs)) {
    errors.push('El COGS (costes variables) debe ser un valor numérico positivo o cero.');
  }

  // Unit gross margin
  const unitGrossMargin = arpu - cogs;
  const grossMarginPercent = arpu > 0 ? (unitGrossMargin / arpu) * 100 : 0;

  if (unitGrossMargin < 0) {
    errors.push('El Margen Bruto Unitario es negativo (COGS > ARPU). Pierdes dinero con cada usuario antes de recuperar el CAC.');
  } else if (unitGrossMargin === 0 && arpu > 0) {
    warnings.push('El Margen Bruto Unitario es exactamente 0 €. No hay margen disponible para amortizar el CAC.');
  } else if (grossMarginPercent > 0 && grossMarginPercent < 50) {
    warnings.push(`Margen bruto unitario bajo (${grossMarginPercent.toFixed(1)} %). Para modelos digitales se suele buscar > 70-80 % para absorber CAC y costes fijos.`);
  }

  // Retention rates M0..M12
  let retentionRates = [];
  if (Array.isArray(inputs.retention) && inputs.retention.length >= 13) {
    retentionRates = inputs.retention.map(r => clamp(Number(r) || 0, 0, 100));
  } else if (inputs.retention && typeof inputs.retention === 'object') {
    retentionRates = interpolateRetention12(inputs.retention);
  } else {
    retentionRates = interpolateRetention12({ m1: 90, m3: 75, m6: 60, m12: 45 });
  }

  // Simple theoretical linear payback (without churn)
  const simplePaybackMonths = (unitGrossMargin > 0 && cac > 0)
    ? Math.round((cac / unitGrossMargin) * 10) / 10
    : (cac === 0 ? 0 : null);

  // Month-by-month cash flow simulation (M0..M12)
  // M0: Initial customer acquisition: cash flow = -CAC
  const monthlyBreakdown = [];
  let cumMargin = 0;
  let realBreakEvenMonth = null;

  monthlyBreakdown.push({
    month: 0,
    retentionPct: 100,
    monthlyMargin: 0,
    cumulativeMargin: 0,
    cumulativeNetCashFlow: -cac,
    isPositive: -cac >= 0,
  });

  for (let m = 1; m <= 12; m++) {
    const retPct = retentionRates[m] ?? 0;
    const activeFraction = retPct / 100;
    const mMargin = unitGrossMargin > 0 ? unitGrossMargin * activeFraction : unitGrossMargin;
    cumMargin += mMargin;
    const netCash = cumMargin - cac;

    if (realBreakEvenMonth === null && netCash >= 0) {
      // Linear interpolation within the month for exact precision
      const prevNet = monthlyBreakdown[m - 1].cumulativeNetCashFlow;
      if (prevNet < 0 && mMargin > 0) {
        const fraction = (-prevNet) / mMargin;
        realBreakEvenMonth = Math.round(((m - 1) + fraction) * 10) / 10;
      } else {
        realBreakEvenMonth = m;
      }
    }

    monthlyBreakdown.push({
      month: m,
      retentionPct: retPct,
      monthlyMargin: Math.round(mMargin * 100) / 100,
      cumulativeMargin: Math.round(cumMargin * 100) / 100,
      cumulativeNetCashFlow: Math.round(netCash * 100) / 100,
      isPositive: netCash >= 0,
    });
  }

  const ltv12Months = Math.round(cumMargin * 100) / 100;
  const ltvCacRatio = cac > 0 ? Math.round((ltv12Months / cac) * 100) / 100 : null;

  // Additional warnings & insights
  if (cac > 0 && ltv12Months < cac) {
    warnings.push(`El LTV proyectado a 12 meses (${ltv12Months.toFixed(2)} €) no recupera el CAC (${cac.toFixed(2)} €). Ratio LTV/CAC: ${(ltvCacRatio ?? 0).toFixed(2)}×.`);
  } else if (ltvCacRatio !== null && ltvCacRatio < 3) {
    warnings.push(`Ratio LTV/CAC de ${ltvCacRatio.toFixed(1)}×. Es inferior al estándar recomendado de 3.0× para startups en crecimiento.`);
  } else if (ltvCacRatio !== null && ltvCacRatio >= 3) {
    // Healthy
  }

  if (realBreakEvenMonth !== null && realBreakEvenMonth > 12) {
    warnings.push('El punto de equilibrio unitario supera los 12 meses. Requiere una elevada caja para financiar el crecimiento.');
  }

  return {
    unitGrossMargin: Math.round(unitGrossMargin * 100) / 100,
    grossMarginPercent: Math.round(grossMarginPercent * 10) / 10,
    simplePaybackMonths,
    realBreakEvenMonth,
    ltv12Months,
    ltvCacRatio,
    monthlyBreakdown,
    errors,
    warnings,
  };
}

/**
 * Standard templates for quick demonstration.
 */
const UNIT_ECONOMICS_PRESETS = {
  saasB2b: {
    label: 'SaaS B2B (Ticket medio)',
    cac: 450,
    arpu: 95,
    cogs: 15,
    retention: { m1: 96, m3: 90, m6: 82, m12: 70 },
  },
  b2cSubscription: {
    label: 'Suscripción B2C',
    cac: 40,
    arpu: 14.99,
    cogs: 2.50,
    retention: { m1: 85, m3: 65, m6: 48, m12: 32 },
  },
  ecommerce: {
    label: 'E-commerce recurrente',
    cac: 35,
    arpu: 45,
    cogs: 26,
    retention: { m1: 60, m3: 40, m6: 28, m12: 18 },
  },
};

__exp.interpolateRetention12 = interpolateRetention12;
__exp.calcUnitEconomics = calcUnitEconomics;
__exp.UNIT_ECONOMICS_PRESETS = UNIT_ECONOMICS_PRESETS;
});
__def('valuation.calc', function(__exp){
/**
 * valuation.calc.js
 * Elevia Startups — Módulo de Cálculo de Valoración
 *
 * Pure ES module (sin dependencias DOM).
 * Exporta funciones de cálculo para los 7 métodos de valoración de startups.
 * Todos los mensajes de error/advertencia están en español.
 *
 * @module valuation.calc
 */

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calcula la mediana de un array numérico.
 * @param {number[]} arr
 * @returns {number}
 */
function median(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * Redondea un número a N decimales.
 * @param {number} value
 * @param {number} [decimals=2]
 * @returns {number}
 */
function round(value, decimals = 2) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Comprueba si un valor es un número finito y válido (no NaN, no Infinity).
 * @param {*} v
 * @returns {boolean}
 */
function isValidNumber(v) {
  return typeof v === 'number' && isFinite(v) && !isNaN(v);
}

// ─────────────────────────────────────────────────────────────────────────────
// MÉTODO 1 — BERKUS METHOD
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Método Berkus: suma ponderada de hasta 5 componentes cualitativos.
 *
 * @param {Array<{ name: string, value: number, maxValue: number }>} components
 * @returns {{
 *   total: number,
 *   components: Array<{ name: string, value: number, maxValue: number, percent: number }>,
 *   warnings: string[]
 * }}
 */
function calcBerkus(components) {
  const warnings = [];

  // Validación de entrada
  if (!Array.isArray(components) || components.length === 0) {
    warnings.push('No se proporcionaron componentes para el método Berkus.');
    return { total: 0, components: [], warnings };
  }

  let total = 0;
  const enriched = [];

  for (let i = 0; i < components.length; i++) {
    const comp = components[i];
    const name = comp.name ?? `Componente ${i + 1}`;

    // Validar value
    const value = isValidNumber(comp.value) ? Math.max(0, comp.value) : 0;
    if (!isValidNumber(comp.value) || comp.value < 0) {
      warnings.push(`El valor de "${name}" no es válido o es negativo; se usará 0.`);
    }

    // Validar maxValue
    const maxValue = isValidNumber(comp.maxValue) && comp.maxValue > 0
      ? comp.maxValue
      : 500_000; // valor por defecto estándar Berkus ($500k por componente)
    if (!isValidNumber(comp.maxValue) || comp.maxValue <= 0) {
      warnings.push(`El valor máximo de "${name}" no es válido; se usará $500,000 por defecto.`);
    }

    // Advertencia si el valor supera el máximo permitido
    const cappedValue = Math.min(value, maxValue);
    if (value > maxValue) {
      warnings.push(`El valor de "${name}" ($${value.toLocaleString('es')}) supera el máximo permitido ($${maxValue.toLocaleString('es')}); se ha limitado al máximo.`);
    }

    // Porcentaje relativo al maxValue del componente
    const percent = round((cappedValue / maxValue) * 100, 1);

    total += cappedValue;
    enriched.push({ name, value: cappedValue, maxValue, percent });
  }

  // Advertencia si la valoración es 0
  if (total === 0) {
    warnings.push('La valoración total resultante es $0. Revisa los valores ingresados.');
  }

  return {
    total: round(total, 0),
    components: enriched,
    warnings,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// MÉTODO 2 — SCORECARD METHOD
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Método Scorecard (Bill Payne): multiplica la valoración de referencia por un
 * multiplicador compuesto de factores ponderados y puntuados.
 *
 * @param {number} referenceValuation  Valoración de referencia del mercado/región.
 * @param {Array<{ name: string, weight: number, score: number }>} factors
 *   - weight: porcentaje de importancia (0–100), la suma debe ser 100.
 *   - score:  comparación con el promedio (0 = muy por debajo, 1 = promedio, >1 = por encima).
 * @returns {{
 *   multiplier: number,
 *   valuation: number,
 *   weightSum: number,
 *   errors: string[],
 *   warnings: string[]
 * }}
 */
function calcScorecard(referenceValuation, factors) {
  const errors = [];
  const warnings = [];

  // Validar valoración de referencia
  if (!isValidNumber(referenceValuation) || referenceValuation <= 0) {
    errors.push('La valoración de referencia debe ser un número positivo.');
  }

  // Validar array de factores
  if (!Array.isArray(factors) || factors.length === 0) {
    errors.push('Se requiere al menos un factor para el método Scorecard.');
  }

  if (errors.length > 0) {
    return { multiplier: 0, valuation: 0, weightSum: 0, errors, warnings };
  }

  let weightSum = 0;
  let multiplier = 0;

  for (let i = 0; i < factors.length; i++) {
    const f = factors[i];
    const name = f.name ?? `Factor ${i + 1}`;

    const weight = isValidNumber(f.weight) ? f.weight : 0;
    const score = isValidNumber(f.score) ? f.score : 0;

    if (!isValidNumber(f.weight) || f.weight < 0) {
      warnings.push(`La ponderación de "${name}" no es válida; se usará 0.`);
    }
    if (!isValidNumber(f.score) || f.score < 0) {
      warnings.push(`La puntuación de "${name}" no es válida; se usará 0.`);
    }
    if (f.score > 2) {
      warnings.push(`La puntuación de "${name}" (${f.score}) es inusualmente alta (>2). Verifica si el valor es correcto.`);
    }

    weightSum += weight;
    // Contribución = (peso / 100) × score
    multiplier += (weight / 100) * score;
  }

  // Validar que la suma de pesos sea 100 (tolerancia ±0.5)
  const weightSumRounded = round(weightSum, 2);
  if (Math.abs(weightSumRounded - 100) > 0.5) {
    errors.push(`La suma de las ponderaciones es ${weightSumRounded}%, pero debe ser exactamente 100%. Diferencia: ${round(Math.abs(weightSumRounded - 100), 2)}%.`);
    return { multiplier: 0, valuation: 0, weightSum: weightSumRounded, errors, warnings };
  }

  if (Math.abs(weightSumRounded - 100) > 0) {
    warnings.push(`La suma de ponderaciones (${weightSumRounded}%) difiere ligeramente de 100%. Se ha aceptado el valor dentro del margen de tolerancia.`);
  }

  const valuation = round(referenceValuation * multiplier, 0);
  if (valuation <= 0) {
    warnings.push('La valoración resultante es $0 o negativa. Revisa las puntuaciones asignadas.');
  }

  return {
    multiplier: round(multiplier, 4),
    valuation,
    weightSum: weightSumRounded,
    errors,
    warnings,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// MÉTODO 3 — VENTURE CAPITAL METHOD
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Método del Capital de Riesgo (VC Method): calcula la valoración pre-money y
 * post-money a partir del valor de salida esperado y el múltiplo requerido.
 *
 * @param {{
 *   exitValue: number,
 *   horizon: number,
 *   requiredMultiple: number,
 *   investment: number
 * }} params
 * @returns {{
 *   postMoney: number,
 *   preMoney: number,
 *   investorPercent: number,
 *   errors: string[]
 * }}
 */
function calcVentureCapital({ exitValue, horizon, requiredMultiple, investment }) {
  const errors = [];

  if (!isValidNumber(exitValue) || exitValue <= 0) {
    errors.push('El valor de salida (exit value) debe ser un número positivo.');
  }
  if (!isValidNumber(requiredMultiple) || requiredMultiple <= 0) {
    errors.push('El múltiplo requerido debe ser un número positivo mayor que 0.');
  }
  if (!isValidNumber(investment) || investment < 0) {
    errors.push('La inversión debe ser un número no negativo.');
  }
  if (!isValidNumber(horizon) || horizon <= 0) {
    errors.push('El horizonte temporal (años hasta la salida) debe ser un número positivo.');
  }

  if (errors.length > 0) {
    return { postMoney: 0, preMoney: 0, investorPercent: 0, errors };
  }

  // postMoney = exitValue / requiredMultiple
  const postMoney = exitValue / requiredMultiple;

  // preMoney = postMoney - investment
  const preMoney = postMoney - investment;

  if (preMoney < 0) {
    errors.push(`La valoración pre-money resultante es negativa ($${round(preMoney, 0).toLocaleString('es')}). La inversión supera el valor post-money. Reduce la inversión o aumenta el valor de salida/múltiplo.`);
    return { postMoney: round(postMoney, 0), preMoney: round(preMoney, 0), investorPercent: 0, errors };
  }

  // investorPercent = investment / postMoney (evitar división por 0)
  const investorPercent = postMoney > 0 ? round((investment / postMoney) * 100, 2) : 0;

  if (investorPercent > 75) {
    errors.push(`El porcentaje del inversor (${investorPercent}%) es extremadamente alto. Considera renegociar los términos.`);
  }

  return {
    postMoney: round(postMoney, 0),
    preMoney: round(preMoney, 0),
    investorPercent,
    errors,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// MÉTODO 4 — REVENUE MULTIPLES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Método de Múltiplos de Ingresos: aplica rangos de múltiplos a los ingresos
 * actuales o proyectados para obtener un rango de valoración.
 *
 * @param {{
 *   revenue: number,
 *   multipleMin: number,
 *   multipleMid: number,
 *   multipleMax: number,
 *   isRecurring: boolean
 * }} params
 * @returns {{
 *   valuationMin: number,
 *   valuationMid: number,
 *   valuationMax: number,
 *   errors: string[]
 * }}
 */
function calcRevenueMultiples({ revenue, multipleMin, multipleMid, multipleMax, isRecurring }) {
  const errors = [];

  if (!isValidNumber(revenue) || revenue < 0) {
    errors.push('Los ingresos deben ser un número no negativo.');
  }
  if (!isValidNumber(multipleMin) || multipleMin < 0) {
    errors.push('El múltiplo mínimo debe ser un número no negativo.');
  }
  if (!isValidNumber(multipleMid) || multipleMid < 0) {
    errors.push('El múltiplo medio debe ser un número no negativo.');
  }
  if (!isValidNumber(multipleMax) || multipleMax < 0) {
    errors.push('El múltiplo máximo debe ser un número no negativo.');
  }

  if (errors.length > 0) {
    return { valuationMin: 0, valuationMid: 0, valuationMax: 0, errors };
  }

  // Validar orden lógico de múltiplos
  if (multipleMin > multipleMid) {
    errors.push(`El múltiplo mínimo (${multipleMin}×) no puede ser mayor que el múltiplo medio (${multipleMid}×).`);
  }
  if (multipleMid > multipleMax) {
    errors.push(`El múltiplo medio (${multipleMid}×) no puede ser mayor que el múltiplo máximo (${multipleMax}×).`);
  }
  if (multipleMin > multipleMax) {
    errors.push(`El múltiplo mínimo (${multipleMin}×) no puede ser mayor que el múltiplo máximo (${multipleMax}×).`);
  }

  if (errors.length > 0) {
    return { valuationMin: 0, valuationMid: 0, valuationMax: 0, errors };
  }

  // Los ingresos recurrentes (ARR/MRR) suelen recibir múltiplos más altos
  // Este factor ya debe estar reflejado en los múltiplos que ingresa el usuario,
  // pero lo documentamos como nota informativa.
  if (revenue === 0) {
    errors.push('Los ingresos son $0. No es posible calcular valoración por múltiplos con ingresos nulos. Considera usar el método Berkus o Scorecard.');
    return { valuationMin: 0, valuationMid: 0, valuationMax: 0, errors };
  }

  return {
    valuationMin: round(revenue * multipleMin, 0),
    valuationMid: round(revenue * multipleMid, 0),
    valuationMax: round(revenue * multipleMax, 0),
    errors,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// MÉTODO 5 — DISCOUNTED CASH FLOW (DCF)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Método DCF (Flujo de Caja Descontado): descuenta flujos de caja libre futuros
 * y calcula el valor terminal mediante el modelo de Gordon.
 *
 * @param {{
 *   cashFlows: number[],
 *   discountRate: number,
 *   terminalGrowthRate: number,
 *   cash: number,
 *   debt: number
 * }} params
 * @returns {{
 *   presentValues: number[],
 *   pvSum: number,
 *   terminalValue: number,
 *   pvTerminal: number,
 *   enterpriseValue: number,
 *   equityValue: number,
 *   errors: string[]
 * }}
 */
function calcDCF({ cashFlows, discountRate, terminalGrowthRate, cash = 0, debt = 0 }) {
  const errors = [];

  if (!Array.isArray(cashFlows) || cashFlows.length === 0) {
    errors.push('Se requiere al menos un año de flujo de caja libre para el cálculo DCF.');
  } else {
    cashFlows.forEach((cf, i) => {
      if (!isValidNumber(cf)) {
        errors.push(`El flujo de caja del año ${i + 1} no es un número válido.`);
      }
    });
  }

  if (!isValidNumber(discountRate) || discountRate <= 0) {
    errors.push('La tasa de descuento debe ser un porcentaje positivo (ej. 25 para 25%).');
  }
  if (!isValidNumber(terminalGrowthRate)) {
    errors.push('La tasa de crecimiento terminal debe ser un número válido.');
  }
  
  const cleanCash = isValidNumber(cash) ? cash : 0;
  if (cleanCash < 0) {
    errors.push('El efectivo y equivalentes debe ser un número no negativo.');
  }
  const cleanDebt = isValidNumber(debt) ? debt : 0;
  if (cleanDebt < 0) {
    errors.push('La deuda total debe ser un número no negativo.');
  }

  if (errors.length > 0) {
    return {
      presentValues: [], pvSum: 0, terminalValue: 0,
      pvTerminal: 0, enterpriseValue: 0, equityValue: 0, errors,
    };
  }

  // Las tasas se reciben como porcentajes (ej. 25 → 0.25)
  const r = discountRate / 100;
  const g = terminalGrowthRate / 100;

  // Condición clave del modelo Gordon: g < r
  if (g >= r) {
    errors.push(
      `La tasa de crecimiento terminal (${terminalGrowthRate}%) debe ser menor que la tasa de descuento (${discountRate}%). ` +
      `De lo contrario, el valor terminal diverge hacia el infinito.`
    );
    return {
      presentValues: [], pvSum: 0, terminalValue: 0,
      pvTerminal: 0, enterpriseValue: 0, equityValue: 0, errors,
    };
  }

  const n = cashFlows.length;

  // Calcular valores presentes de cada flujo de caja
  const presentValues = cashFlows.map((cf, i) => {
    const year = i + 1;
    return round(cf / Math.pow(1 + r, year), 2);
  });

  const pvSum = round(presentValues.reduce((acc, pv) => acc + pv, 0), 2);

  // Valor terminal (Gordon Growth Model): TV = CF_n × (1 + g) / (r - g)
  const lastCF = cashFlows[n - 1];
  const terminalValue = round((lastCF * (1 + g)) / (r - g), 0);

  // Valor presente del valor terminal
  const pvTerminal = round(terminalValue / Math.pow(1 + r, n), 0);

  // Enterprise Value = PV de flujos + PV del valor terminal
  const enterpriseValue = round(pvSum + pvTerminal, 0);

  // Equity Value = Enterprise Value + Efectivo - Deuda
  const equityValue = round(enterpriseValue + cleanCash - cleanDebt, 0);

  if (equityValue < 0) {
    errors.push(
      `El valor de capital (equity) resultante es negativo ($${equityValue.toLocaleString('es')}). ` +
      `Esto puede indicar que la deuda supera el valor de la empresa o que los flujos de caja son insuficientes.`
    );
  }

  return {
    presentValues,
    pvSum,
    terminalValue,
    pvTerminal,
    enterpriseValue,
    equityValue,
    errors,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// MÉTODO 6 — RISK FACTOR SUMMATION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Método de Suma de Factores de Riesgo: ajusta una valoración base sumando o
 * restando montos según el nivel de riesgo de cada factor evaluado.
 *
 * Convención estándar para el ajuste de cada factor:
 *   +500,000 → muy por encima del promedio
 *   +250,000 → por encima del promedio
 *        0   → en línea con el promedio
 *   -250,000 → por debajo del promedio
 *   -500,000 → muy por debajo del promedio
 *
 * @param {{
 *   baseValuation: number,
 *   factors: Array<{ name: string, adjustment: number }>
 * }} params
 * @returns {{
 *   totalAdjustment: number,
 *   finalValuation: number,
 *   factors: Array<{ name: string, adjustment: number, direction: string }>,
 *   errors: string[]
 * }}
 */
function calcRiskFactors({ baseValuation, factors }) {
  const errors = [];

  if (!isValidNumber(baseValuation) || baseValuation <= 0) {
    errors.push('La valoración base debe ser un número positivo.');
  }
  if (!Array.isArray(factors) || factors.length === 0) {
    errors.push('Se requiere al menos un factor de riesgo para este método.');
  }

  if (errors.length > 0) {
    return { totalAdjustment: 0, finalValuation: 0, factors: [], errors };
  }

  let totalAdjustment = 0;
  const enrichedFactors = [];

  for (let i = 0; i < factors.length; i++) {
    const f = factors[i];
    const name = f.name ?? `Factor ${i + 1}`;
    const adjustment = isValidNumber(f.adjustment) ? f.adjustment : 0;

    if (!isValidNumber(f.adjustment)) {
      errors.push(`El ajuste del factor "${name}" no es válido; se usará 0.`);
    }

    totalAdjustment += adjustment;

    // Dirección semántica para la UI
    const direction =
      adjustment > 0 ? 'positivo' :
      adjustment < 0 ? 'negativo' :
      'neutro';

    enrichedFactors.push({ name, adjustment, direction });
  }

  const finalValuation = round(baseValuation + totalAdjustment, 0);

  if (finalValuation <= 0) {
    errors.push(
      `La valoración final resultante es $0 o negativa ($${finalValuation.toLocaleString('es')}). ` +
      `Los ajustes de riesgo negativos superan la valoración base. Revisa los factores ingresados.`
    );
  }

  return {
    totalAdjustment: round(totalAdjustment, 0),
    finalValuation,
    factors: enrichedFactors,
    errors,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// MÉTODO 7 — COMPARABLE TRANSACTIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Método de Transacciones Comparables: calcula estadísticas descriptivas
 * de un conjunto de rondas/transacciones de referencia.
 *
 * @param {Array<{
 *   name: string,
 *   sector: string,
 *   stage: string,
 *   geography: string,
 *   date: string,
 *   valuation: number,
 *   multiple: number,
 *   notes: string
 * }>} transactions
 * @returns {{
 *   count: number,
 *   min: number,
 *   max: number,
 *   median: number,
 *   mean: number,
 *   range: [number, number],
 *   warnings: string[]
 * }}
 */
function calcComparables(transactions) {
  const warnings = [];

  if (!Array.isArray(transactions) || transactions.length === 0) {
    warnings.push('No se proporcionaron transacciones comparables. Agrega al menos una para obtener estadísticas.');
    return { count: 0, min: 0, max: 0, median: 0, mean: 0, range: [0, 0], warnings };
  }

  // Filtrar transacciones con valoración válida
  const valid = transactions.filter((t, i) => {
    if (!isValidNumber(t.valuation) || t.valuation <= 0) {
      warnings.push(`La transacción "${t.name ?? `#${i + 1}`}" tiene una valoración inválida o negativa y fue excluida del análisis.`);
      return false;
    }
    return true;
  });

  if (valid.length === 0) {
    warnings.push('Ninguna de las transacciones proporcionadas tiene una valoración válida. No se pueden calcular estadísticas.');
    return { count: 0, min: 0, max: 0, median: 0, mean: 0, range: [0, 0], warnings };
  }

  if (valid.length < 3) {
    warnings.push(`Solo hay ${valid.length} transacción(es) válida(s). Se recomienda contar con al menos 3 comparables para obtener estadísticas representativas.`);
  }

  const valuations = valid.map(t => t.valuation);
  const min = round(Math.min(...valuations), 0);
  const max = round(Math.max(...valuations), 0);
  const mean = round(valuations.reduce((a, b) => a + b, 0) / valuations.length, 0);
  const med = round(median(valuations), 0);

  // Detectar outliers simples (valor > 3× la mediana o < mediana/3)
  valuations.forEach((v, i) => {
    const t = valid[i];
    if (med > 0 && (v > med * 3 || v < med / 3)) {
      warnings.push(
        `La transacción "${t.name ?? `#${i + 1}`}" ($${v.toLocaleString('es')}) parece ser un valor atípico (outlier) ` +
        `respecto a la mediana ($${med.toLocaleString('es')}). Considera si es adecuado incluirla.`
      );
    }
  });

  return {
    count: valid.length,
    min,
    max,
    median: med,
    mean,
    range: [min, max],
    warnings,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER — MÉTODOS RECOMENDADOS POR ETAPA
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Devuelve los IDs de los métodos de valoración recomendados según la etapa
 * de desarrollo de la startup.
 *
 * IDs de métodos:
 *   'berkus'       → Método Berkus
 *   'scorecard'    → Método Scorecard
 *   'vc'           → Método del Capital de Riesgo
 *   'multiples'    → Múltiplos de Ingresos
 *   'dcf'          → Flujo de Caja Descontado
 *   'risk-factors' → Suma de Factores de Riesgo
 *   'comparables'  → Transacciones Comparables
 *
 * @param {'idea'|'pre-seed'|'seed'|'growth'|'series-a'|'consolidated'} stage
 * @returns {string[]}
 */
function getRecommendedMethods(stage) {
  const recommendations = {
    'idea': [
      'berkus',       // Ideal para etapas muy tempranas sin ingresos
      'scorecard',    // Valoración cualitativa basada en el equipo y mercado
      'risk-factors', // Ajuste por factores de riesgo sobre una base estimada
    ],
    'pre-seed': [
      'berkus',
      'scorecard',
      'risk-factors',
      'comparables',  // Si hay datos de mercado disponibles
    ],
    'seed': [
      'scorecard',
      'risk-factors',
      'vc',           // Empieza a tener sentido si hay tracción y proyecciones
      'comparables',
    ],
    'growth': [
      'vc',
      'multiples',    // Ya existen ingresos para aplicar múltiplos
      'comparables',
      'risk-factors',
    ],
    'series-a': [
      'vc',
      'multiples',
      'comparables',
      'dcf',          // Proyecciones más maduras permiten un DCF razonable
    ],
    'consolidated': [
      'dcf',
      'multiples',
      'comparables',
    ],
  };

  const normalizedStage = String(stage).toLowerCase().trim();
  const methods = recommendations[normalizedStage];

  if (!methods) {
    // Etapa desconocida: devolver todos los métodos
    return ['berkus', 'scorecard', 'vc', 'multiples', 'dcf', 'risk-factors', 'comparables'];
  }

  return methods;
}

__exp.median = median;
__exp.calcBerkus = calcBerkus;
__exp.calcScorecard = calcScorecard;
__exp.calcVentureCapital = calcVentureCapital;
__exp.calcRevenueMultiples = calcRevenueMultiples;
__exp.calcDCF = calcDCF;
__exp.calcRiskFactors = calcRiskFactors;
__exp.calcComparables = calcComparables;
__exp.getRecommendedMethods = getRecommendedMethods;
});
__def('charts', function(__exp){
/**
 * @file charts.js
 * @module utils/charts
 * @description Lightweight, production-quality chart rendering utilities for
 *   Elevia Startups using only the HTML Canvas 2D API. Supports animated
 *   donut, horizontal bar, line, and grouped-bar charts with:
 *   - Device-pixel-ratio (retina) awareness
 *   - requestAnimationFrame easing animations
 *   - Window resize redraw
 *   - Accessible aria-label attributes
 *   - Graceful empty-data handling (shows "Sin datos suficientes")
 *   - PNG export
 */

/* ─────────────────────────────────────────────────────────────────────────────
   ELEVIA DESIGN-SYSTEM TOKENS
   These mirror the CSS custom properties defined in the project's design system
   so charts stay visually consistent with the rest of the UI.
───────────────────────────────────────────────────────────────────────────── */

/** @type {string[]} Default accessible colour palette drawn from Elevia's brand. */
const ELEVIA_PALETTE = [
  '#B9D8C2', // Verde salvia
  '#D8C9F0', // Lavanda pastel
  '#F0C6A8', // Melocotón pastel
  '#7CB993', // Salvia medio
  '#A48DD4', // Lavanda medio
  '#D4885A', // Melocotón medio
  '#202A36', // Azul tinta
  '#4A5568', // Tinta suave
];

/** Font face matching the Elevia design system. */
const FONT_FAMILY = "'Manrope', 'Inter', system-ui, sans-serif";

/** Neutral text colour for labels / titles. */
const TEXT_COLOR = '#202A36';

/** Muted text colour for secondary values and axes. */
const TEXT_MUTED = '#718096';

/** Grid and track lines background. */
const TRACK_BG = '#F0EDE6';

/** Light background for "no data" overlays. */
const EMPTY_BG = '#F7F5F0';

/** Border radius used in bar-chart bars (pixels). */
const BAR_RADIUS = 6;

/* ─────────────────────────────────────────────────────────────────────────────
   INTERNAL REGISTRY
   Maps each canvas element to its cleanup teardown function so that
   destroyChart() can correctly remove resize listeners and cancel animations.
───────────────────────────────────────────────────────────────────────────── */

/** @type {WeakMap<HTMLCanvasElement, { destroy: () => void }>} */
const _registry = new WeakMap();

/* ─────────────────────────────────────────────────────────────────────────────
   HELPERS – DPR / SIZING
───────────────────────────────────────────────────────────────────────────── */

/**
 * Scales a canvas for the current device pixel ratio so charts appear crisp
 * on retina / high-DPI screens.  Must be called every time the canvas is
 * resized.
 *
 * @param {HTMLCanvasElement} canvas
 * @returns {{ ctx: CanvasRenderingContext2D, w: number, h: number, dpr: number }}
 */
function _setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  // Physical pixel size
  canvas.width  = Math.round(rect.width  * dpr);
  canvas.height = Math.round(rect.height * dpr);

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  return {
    ctx,
    w:   rect.width,
    h:   rect.height,
    dpr,
  };
}

/**
 * Returns CSS logical dimensions without altering canvas state.
 *
 * @param {HTMLCanvasElement} canvas
 * @returns {{ w: number, h: number }}
 */
function _logicalSize(canvas) {
  const rect = canvas.getBoundingClientRect();
  return { w: rect.width, h: rect.height };
}

/* ─────────────────────────────────────────────────────────────────────────────
   HELPERS – ANIMATION
───────────────────────────────────────────────────────────────────────────── */

/**
 * Cubic ease-out easing function.
 * @param {number} t – Progress in [0, 1].
 * @returns {number}
 */
function _easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Runs a single animation loop from 0 → 1 over `duration` ms.
 *
 * @param {number} duration  – Animation duration in milliseconds.
 * @param {(progress: number) => void} onFrame – Called with eased progress.
 * @param {() => void} [onComplete] – Called once when animation finishes.
 * @returns {() => void} Cancel function.
 */
function _animate(duration, onFrame, onComplete) {
  // If reduced motion, headless/testing environment, or duration <= 0, draw frame 1 immediately
  const isReduced = typeof window !== 'undefined' &&
    ((window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) ||
     window.__disableAnimations ||
     navigator.webdriver);

  if (duration <= 0 || isReduced) {
    onFrame(1);
    if (onComplete) onComplete();
    return function cancel() {};
  }

  let start = null;
  let rafId = null;
  let cancelled = false;

  function step(ts) {
    if (cancelled) return;
    if (start === null) start = ts;

    const elapsed  = ts - start;
    const raw      = Math.min(elapsed / duration, 1);
    const progress = _easeOut(raw);

    onFrame(progress);

    if (raw < 1) {
      rafId = requestAnimationFrame(step);
    } else {
      onFrame(1); // guarantee final frame is exactly 1
      if (onComplete) onComplete();
    }
  }

  rafId = requestAnimationFrame(step);

  return function cancel() {
    cancelled = true;
    if (rafId !== null) cancelAnimationFrame(rafId);
  };
}

/* ─────────────────────────────────────────────────────────────────────────────
   HELPERS – DRAWING PRIMITIVES
───────────────────────────────────────────────────────────────────────────── */

/**
 * Draws a rounded rectangle path (does NOT fill/stroke – caller does that).
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {number} r – Corner radius.
 */
function _roundRect(ctx, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y,     x + w, y + r,     r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x,     y + h, x,     y + h - r, r);
  ctx.lineTo(x,     y + r);
  ctx.arcTo(x,     y,     x + r, y,         r);
  ctx.closePath();
}

/**
 * Renders a centred "Sin datos suficientes" placeholder on the canvas.
 *
 * @param {HTMLCanvasElement} canvas
 */
function _drawEmpty(canvas) {
  const { ctx, w, h } = _setupCanvas(canvas);

  ctx.fillStyle = EMPTY_BG;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle   = TEXT_MUTED;
  ctx.font        = `500 14px ${FONT_FAMILY}`;
  ctx.textAlign   = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Sin datos suficientes', w / 2, h / 2);

  canvas.setAttribute('aria-label', 'Sin datos suficientes');
}

/**
 * Draws a chart title above the plot area.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {string} title
 * @param {number} w – Canvas logical width.
 */
function _drawTitle(ctx, title, w) {
  ctx.save();
  ctx.fillStyle   = TEXT_COLOR;
  ctx.font        = `700 14px ${FONT_FAMILY}`;
  ctx.textAlign   = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(title, w / 2, 8);
  ctx.restore();
}

/* ─────────────────────────────────────────────────────────────────────────────
   HELPERS – VALIDATION
───────────────────────────────────────────────────────────────────────────── */

/**
 * Returns true if `data` is a non-empty array with at least one positive value.
 *
 * @param {Array} data
 * @param {(item: any) => number} [getValue]
 * @returns {boolean}
 */
function _hasData(data, getValue = (d) => d.value) {
  if (!Array.isArray(data) || data.length === 0) return false;
  return data.some((d) => getValue(d) > 0);
}

/* ─────────────────────────────────────────────────────────────────────────────
   PUBLIC API – renderDonut
───────────────────────────────────────────────────────────────────────────── */

/**
 * Renders an animated donut / pie chart on a canvas element.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {{ label: string, value: number, color?: string }[]} data
 * @param {{ title?: string, showLegend?: boolean, animated?: boolean }} [options]
 */
function renderDonut(canvas, data, options = {}) {
  // Teardown any previous chart on this canvas
  destroyChart(canvas);

  // Validate
  if (!canvas || !_hasData(data)) {
    if (canvas) _drawEmpty(canvas);
    return;
  }

  const {
    title       = '',
    showLegend  = true,
    animated    = false,
    centerLabel = 'Total',
    formatValue = null,
  } = options;

  // Assign default colours
  const segments = data.map((d, i) => ({
    ...d,
    color: d.color || ELEVIA_PALETTE[i % ELEVIA_PALETTE.length],
  }));

  const total = segments.reduce((s, d) => s + d.value, 0);

  // ── Draw function ──────────────────────────────────────────────────────────
  function draw(progress) {
    const { ctx, w, h } = _setupCanvas(canvas);

    ctx.clearRect(0, 0, w, h);

    const titleH = title ? 28 : 0;

    // Detect if column width would cause label collisions (< 360px wide or long labels)
    ctx.font = `500 11px ${FONT_FAMILY}`;
    const maxHalfW = (w / 2) - 30;
    const forceSingleCol = w < 360 || segments.some(seg => {
      const pct = ((seg.value / total) * 100).toFixed(1) + '%';
      return ctx.measureText(`${seg.label} – ${pct}`).width > maxHalfW;
    });

    const legendRowH = 19;
    const legendRows = forceSingleCol ? segments.length : Math.ceil(segments.length / 2);
    const legendH    = showLegend ? legendRows * legendRowH + 8 : 0;
    const chartH     = h - titleH - legendH;
    const cx         = w / 2;
    const cy         = titleH + chartH / 2;
    const outerR     = Math.min(w * 0.42, chartH * 0.42);
    const innerR     = outerR * 0.55; // donut hole ratio
    const GAP        = 0.012;         // radians gap between segments

    if (title) _drawTitle(ctx, title, w);

    // Draw segments
    let startAngle = -Math.PI / 2; // start at 12 o'clock
    const endTarget = startAngle + 2 * Math.PI * progress;

    segments.forEach((seg) => {
      const slice    = (seg.value / total) * 2 * Math.PI * progress;
      const endAngle = Math.min(startAngle + slice - GAP, endTarget);

      if (slice <= GAP) { startAngle += slice; return; }

      ctx.beginPath();
      ctx.moveTo(cx + outerR * Math.cos(startAngle), cy + outerR * Math.sin(startAngle));
      ctx.arc(cx, cy, outerR, startAngle, endAngle);
      ctx.arc(cx, cy, innerR, endAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();

      startAngle += slice;
    });

    // Centre label: total
    if (progress >= 0.95) {
      ctx.save();
      ctx.fillStyle    = TEXT_COLOR;
      ctx.font         = `700 ${Math.max(12, Math.round(outerR * 0.28))}px ${FONT_FAMILY}`;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      const labelText  = typeof formatValue === 'function'
        ? formatValue(total)
        : total.toLocaleString('es-ES');
      ctx.fillText(labelText, cx, cy - 8);
      ctx.font         = `500 ${Math.max(10, Math.round(outerR * 0.16))}px ${FONT_FAMILY}`;
      ctx.fillStyle    = TEXT_MUTED;
      ctx.fillText(centerLabel, cx, cy + outerR * 0.22);
      ctx.restore();
    }

    // Legend
    if (showLegend) {
      const startY  = h - legendH + 6;
      ctx.font      = `500 11px ${FONT_FAMILY}`;
      ctx.textBaseline = 'middle';

      segments.forEach((seg, i) => {
        const col  = forceSingleCol ? 0 : (i % 2);
        const row  = forceSingleCol ? i : Math.floor(i / 2);
        const colW = forceSingleCol ? w : (w / 2);
        const lx   = 10 + col * colW;
        const ly   = startY + row * legendRowH;
        const pct  = ((seg.value / total) * 100).toFixed(1) + '%';
        const fullText = `${seg.label} – ${pct}`;
        const maxTextW = colW - 32;

        let displayText = fullText;
        if (ctx.measureText(displayText).width > maxTextW) {
          let l = seg.label;
          while (l.length > 2 && ctx.measureText(`${l}… – ${pct}`).width > maxTextW) {
            l = l.slice(0, -1);
          }
          displayText = `${l}… – ${pct}`;
        }

        // Colour swatch
        ctx.fillStyle = seg.color;
        _roundRect(ctx, lx, ly + 2, 9, 9, 2.5);
        ctx.fill();

        // Label
        ctx.fillStyle = TEXT_COLOR;
        ctx.textAlign = 'left';
        ctx.fillText(displayText, lx + 14, ly + 7);
      });
    }
  }

  // ── Set aria-label ─────────────────────────────────────────────────────────
  canvas.setAttribute(
    'aria-label',
    title
      ? `Gráfico donut: ${title}. ${segments.map((s) => `${s.label}: ${s.value}`).join(', ')}.`
      : `Gráfico donut. ${segments.map((s) => `${s.label}: ${s.value}`).join(', ')}.`,
  );
  canvas.setAttribute('role', 'img');

  // ── Animation & resize ─────────────────────────────────────────────────────
  let cancelAnim = null;

  function start() {
    if (cancelAnim) cancelAnim();
    if (animated) {
      cancelAnim = _animate(220, draw);
    } else {
      draw(1);
    }
  }

  const onResize = () => start();
  window.addEventListener('resize', onResize);

  start();

  _registry.set(canvas, {
    destroy() {
      if (cancelAnim) cancelAnim();
      window.removeEventListener('resize', onResize);
    },
  });
}

/* ─────────────────────────────────────────────────────────────────────────────
   PUBLIC API – renderBarChart
───────────────────────────────────────────────────────────────────────────── */

/**
 * Renders an animated horizontal bar chart.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {{ label: string, value: number, max: number, color?: string }[]} data
 * @param {{ title?: string, format?: (v: number) => string, animated?: boolean }} [options]
 */
function renderBarChart(canvas, data, options = {}) {
  destroyChart(canvas);

  if (!canvas || !_hasData(data)) {
    if (canvas) _drawEmpty(canvas);
    return;
  }

  const {
    title    = '',
    format   = (v) => v.toLocaleString('es-ES'),
    animated = false,
  } = options;

  const items = data.map((d, i) => ({
    ...d,
    color: d.color || ELEVIA_PALETTE[i % ELEVIA_PALETTE.length],
  }));

  // ── Draw function ──────────────────────────────────────────────────────────
  function draw(progress) {
    const { ctx, w, h } = _setupCanvas(canvas);
    ctx.clearRect(0, 0, w, h);

    const titleH    = title ? 28 : 0;

    // Medición dinámica del ancho de etiquetas para que nunca se corten
    ctx.font = `500 12px ${FONT_FAMILY}`;
    let maxLabelW = 60;
    items.forEach((item) => {
      const metrics = ctx.measureText(item.label || '');
      if (metrics.width > maxLabelW) maxLabelW = metrics.width;
    });
    // Limitar el ancho de etiquetas para reservar al menos 40% del ancho para las barras
    const maxAllowedLabelW = Math.round(w * 0.40);
    const padLeft   = Math.min(Math.round(maxLabelW + 16), maxAllowedLabelW);

    let maxValW = 50;
    items.forEach((item) => {
      const vText = format(item.value);
      const metrics = ctx.measureText(vText);
      if (metrics.width > maxValW) maxValW = metrics.width;
    });
    const padRight  = Math.max(Math.round(maxValW + 16), 65);
    const padBottom = 8;
    const barAreaW  = Math.max(w - padLeft - padRight, 40);
    const barAreaH  = h - titleH - padBottom;
    const rowH      = barAreaH / items.length;
    const barH      = Math.min(rowH * 0.48, 22);

    if (title) _drawTitle(ctx, title, w);

    items.forEach((item, i) => {
      const ratio   = Math.min(item.value / item.max, 1) * progress;
      const barW    = barAreaW * ratio;
      const x       = padLeft;
      const y       = titleH + i * rowH + (rowH - barH) / 2;

      // Fondo de la pista
      ctx.fillStyle = TRACK_BG;
      _roundRect(ctx, x, y, barAreaW, barH, BAR_RADIUS);
      ctx.fill();

      // Barra rellena
      if (barW > 1) {
        ctx.fillStyle = item.color;
        _roundRect(ctx, x, y, barW, barH, BAR_RADIUS);
        ctx.fill();
      }

      // Etiqueta (izquierda) con recorte elíptico si excede el espacio disponible
      ctx.fillStyle    = TEXT_COLOR;
      ctx.font         = `500 12px ${FONT_FAMILY}`;
      ctx.textAlign    = 'right';
      ctx.textBaseline = 'middle';
      const availableLabelW = padLeft - 12;
      let displayLabel = item.label || '';
      if (ctx.measureText(displayLabel).width > availableLabelW) {
        while (displayLabel.length > 3 && ctx.measureText(displayLabel + '…').width > availableLabelW) {
          displayLabel = displayLabel.slice(0, -1);
        }
        displayLabel += '…';
      }
      ctx.fillText(displayLabel, padLeft - 8, y + barH / 2);

      // Valor (derecha)
      if (progress >= 0.98) {
        ctx.fillStyle = TEXT_MUTED;
        ctx.font      = `600 12px ${FONT_FAMILY}`;
        ctx.textAlign = 'left';
        ctx.fillText(format(item.value), x + barAreaW + 8, y + barH / 2);
      }
    });
  }

  canvas.setAttribute(
    'aria-label',
    title
      ? `Gráfico de barras: ${title}. ${items.map((d) => `${d.label}: ${format(d.value)}`).join(', ')}.`
      : `Gráfico de barras. ${items.map((d) => `${d.label}: ${format(d.value)}`).join(', ')}.`,
  );
  canvas.setAttribute('role', 'img');

  let cancelAnim = null;

  function start() {
    if (cancelAnim) cancelAnim();
    if (animated) {
      cancelAnim = _animate(200, draw);
    } else {
      draw(1);
    }
  }

  const onResize = () => start();
  window.addEventListener('resize', onResize);

  start();

  _registry.set(canvas, {
    destroy() {
      if (cancelAnim) cancelAnim();
      window.removeEventListener('resize', onResize);
    },
  });
}

/* ─────────────────────────────────────────────────────────────────────────────
   PUBLIC API – renderLineChart
───────────────────────────────────────────────────────────────────────────── */

/**
 * Renders an animated line chart for time-series data.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {{ label: string, values: number[], color?: string }[]} series
 * @param {{
 *   labels:  string[],
 *   title?:  string,
 *   yAxis?:  { format?: (v: number) => string },
 *   animated?: boolean
 * }} [options]
 */
function renderLineChart(canvas, series, options = {}) {
  destroyChart(canvas);

  const hasValues = Array.isArray(series) &&
    series.length > 0 &&
    series.some((s) => Array.isArray(s.values) && s.values.some((v) => v > 0));

  if (!canvas || !hasValues) {
    if (canvas) _drawEmpty(canvas);
    return;
  }

  const {
    labels   = [],
    title    = '',
    yAxis    = {},
    animated = false,
  } = options;

  const formatY = yAxis.format || ((v) => v.toLocaleString('es-ES'));

  const allSeries = series.map((s, i) => ({
    ...s,
    color: s.color || ELEVIA_PALETTE[i % ELEVIA_PALETTE.length],
  }));

  // Compute global min/max across all series for consistent Y axis
  const allValues = allSeries.flatMap((s) => s.values);
  const dataMin   = Math.min(...allValues);
  const dataMax   = Math.max(...allValues);
  const yRange    = dataMax - dataMin || 1;

  // Nice Y-axis ticks (4 ticks)
  const TICK_COUNT = 4;
  const tickStep   = _niceStep(yRange / TICK_COUNT);
  const yMin       = Math.floor(dataMin / tickStep) * tickStep;
  const yMax       = yMin + tickStep * TICK_COUNT;

  // ── Draw function ──────────────────────────────────────────────────────────
  function draw(progress) {
    const { ctx, w, h } = _setupCanvas(canvas);
    ctx.clearRect(0, 0, w, h);

    const titleH  = title ? 28 : 0;
    const padLeft = 52;  // Y-axis label room
    const padBot  = 36;  // X-axis label room
    const padTop  = titleH + 8;
    const padRight = 16;

    const plotW   = w - padLeft - padRight;
    const plotH   = h - padTop - padBot;

    if (title) _drawTitle(ctx, title, w);

    // Helper: map a data value to canvas Y coordinate
    const toY = (v) => padTop + plotH - ((v - yMin) / (yMax - yMin)) * plotH;
    // Helper: map index to canvas X coordinate
    const pointCount = labels.length || (allSeries[0]?.values.length ?? 0);
    const toX = (i) => padLeft + (i / Math.max(pointCount - 1, 1)) * plotW;

    // ── Horizontal grid lines & Y-axis labels
    ctx.strokeStyle = TRACK_BG;
    ctx.lineWidth   = 1;
    ctx.setLineDash([4, 4]);

    for (let t = 0; t <= TICK_COUNT; t++) {
      const yVal = yMin + t * tickStep;
      const yPx  = toY(yVal);

      ctx.beginPath();
      ctx.moveTo(padLeft, yPx);
      ctx.lineTo(padLeft + plotW, yPx);
      ctx.stroke();

      ctx.fillStyle    = TEXT_MUTED;
      ctx.font         = `400 10px ${FONT_FAMILY}`;
      ctx.textAlign    = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(formatY(yVal), padLeft - 6, yPx);
    }
    ctx.setLineDash([]);

    // ── X-axis labels
    ctx.fillStyle    = TEXT_MUTED;
    ctx.font         = `400 10px ${FONT_FAMILY}`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'top';

    const xLabelStep = Math.ceil(pointCount / Math.floor(plotW / 50));
    for (let i = 0; i < pointCount; i++) {
      if (i % xLabelStep !== 0 && i !== pointCount - 1) continue;
      const lbl = labels[i] ?? String(i + 1);
      ctx.fillText(lbl, toX(i), padTop + plotH + 6);
    }

    // ── Series lines & fills
    allSeries.forEach((s) => {
      const pts = s.values;
      // Number of points to draw based on animation progress
      const drawUntil = Math.max(1, Math.ceil(pts.length * progress));

      // Gradient fill under line
      const grad = ctx.createLinearGradient(0, padTop, 0, padTop + plotH);
      grad.addColorStop(0, s.color + '44');
      grad.addColorStop(1, s.color + '00');

      ctx.beginPath();
      ctx.moveTo(toX(0), toY(pts[0]));
      for (let i = 1; i < drawUntil; i++) {
        // Smooth bezier
        const x0 = toX(i - 1), y0 = toY(pts[i - 1]);
        const x1 = toX(i),     y1 = toY(pts[i]);
        const cpx = (x0 + x1) / 2;
        ctx.bezierCurveTo(cpx, y0, cpx, y1, x1, y1);
      }
      // Close for fill
      const lastI = drawUntil - 1;
      ctx.lineTo(toX(lastI), padTop + plotH);
      ctx.lineTo(toX(0), padTop + plotH);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Stroke the line
      ctx.beginPath();
      ctx.moveTo(toX(0), toY(pts[0]));
      for (let i = 1; i < drawUntil; i++) {
        const x0 = toX(i - 1), y0 = toY(pts[i - 1]);
        const x1 = toX(i),     y1 = toY(pts[i]);
        const cpx = (x0 + x1) / 2;
        ctx.bezierCurveTo(cpx, y0, cpx, y1, x1, y1);
      }
      ctx.strokeStyle = s.color;
      ctx.lineWidth   = 2.5;
      ctx.lineJoin    = 'round';
      ctx.stroke();

      // Dot at last visible point
      const dotI = drawUntil - 1;
      ctx.beginPath();
      ctx.arc(toX(dotI), toY(pts[dotI]), 4, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth   = 2;
      ctx.stroke();
    });

    // ── Legend (bottom-right corner)
    if (allSeries.length > 1 && progress >= 0.98) {
      ctx.font      = `500 11px ${FONT_FAMILY}`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'left';
      let lx = padLeft + plotW - allSeries.reduce((acc, s) => acc + ctx.measureText(s.label).width + 22, 0);
      allSeries.forEach((s) => {
        ctx.fillStyle = s.color;
        ctx.fillRect(lx, padTop + plotH + 20, 10, 3);
        ctx.fillStyle = TEXT_COLOR;
        ctx.fillText(s.label, lx + 14, padTop + plotH + 21);
        lx += ctx.measureText(s.label).width + 26;
      });
    }
  }

  canvas.setAttribute(
    'aria-label',
    title
      ? `Gráfico de líneas: ${title}. ${allSeries.map((s) => `${s.label}: ${s.values.join(', ')}`).join('; ')}.`
      : `Gráfico de líneas. ${allSeries.map((s) => `${s.label}: ${s.values.join(', ')}`).join('; ')}.`,
  );
  canvas.setAttribute('role', 'img');

  let cancelAnim = null;

  function start() {
    if (cancelAnim) cancelAnim();
    if (animated) {
      cancelAnim = _animate(220, draw);
    } else {
      draw(1);
    }
  }

  const onResize = () => start();
  window.addEventListener('resize', onResize);

  start();

  _registry.set(canvas, {
    destroy() {
      if (cancelAnim) cancelAnim();
      window.removeEventListener('resize', onResize);
    },
  });
}

/* ─────────────────────────────────────────────────────────────────────────────
   PUBLIC API – renderGroupedBar
───────────────────────────────────────────────────────────────────────────── */

/**
 * Renders an animated grouped (vertical) bar chart.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {{
 *   labels:   string[],
 *   datasets: { label: string, values: number[], color?: string }[]
 * }} data
 * @param {{ title?: string, format?: (v: number) => string, animated?: boolean }} [options]
 */
function renderGroupedBar(canvas, data, options = {}) {
  destroyChart(canvas);

  const hasData =
    data &&
    Array.isArray(data.labels) &&
    data.labels.length > 0 &&
    Array.isArray(data.datasets) &&
    data.datasets.length > 0 &&
    data.datasets.some((ds) => ds.values.some((v) => v > 0));

  if (!canvas || !hasData) {
    if (canvas) _drawEmpty(canvas);
    return;
  }

  const {
    title    = '',
    format   = (v) => v.toLocaleString('es-ES'),
    animated = false,
  } = options;

  const datasets = data.datasets.map((ds, i) => ({
    ...ds,
    color: ds.color || ELEVIA_PALETTE[i % ELEVIA_PALETTE.length],
  }));

  // Global max for Y scale
  const allValues = datasets.flatMap((ds) => ds.values);
  const dataMax   = Math.max(...allValues) || 1;
  const TICK_COUNT = 4;
  const tickStep  = _niceStep(dataMax / TICK_COUNT);
  const yMax      = tickStep * Math.ceil(dataMax / tickStep);

  // ── Draw function ──────────────────────────────────────────────────────────
  function draw(progress) {
    const { ctx, w, h } = _setupCanvas(canvas);
    ctx.clearRect(0, 0, w, h);

    const titleH   = title ? 28 : 0;
    const padLeft  = 52;
    const padBot   = 48; // group labels + legend
    const padTop   = titleH + 8;
    const padRight = 16;
    const plotW    = w - padLeft - padRight;
    const plotH    = h - padTop - padBot;

    if (title) _drawTitle(ctx, title, w);

    const toY = (v) => padTop + plotH - (v / yMax) * plotH;

    // ── Y-axis grid
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = TRACK_BG;
    ctx.lineWidth   = 1;

    for (let t = 0; t <= TICK_COUNT; t++) {
      const yVal = (t / TICK_COUNT) * yMax;
      const yPx  = toY(yVal);

      ctx.beginPath();
      ctx.moveTo(padLeft, yPx);
      ctx.lineTo(padLeft + plotW, yPx);
      ctx.stroke();

      ctx.fillStyle    = TEXT_MUTED;
      ctx.font         = `400 10px ${FONT_FAMILY}`;
      ctx.textAlign    = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(format(yVal), padLeft - 6, yPx);
    }
    ctx.setLineDash([]);

    // ── Bars
    const groupCount = data.labels.length;
    const groupW     = plotW / groupCount;
    const groupPad   = groupW * 0.15;
    const barW       = (groupW - groupPad * 2) / datasets.length;

    data.labels.forEach((lbl, gi) => {
      const groupX = padLeft + gi * groupW + groupPad;

      datasets.forEach((ds, di) => {
        const val    = ds.values[gi] ?? 0;
        const barH   = (val / yMax) * plotH * progress;
        const bx     = groupX + di * barW;
        const by     = padTop + plotH - barH;

        ctx.fillStyle = ds.color;
        _roundRect(ctx, bx + 1, by, Math.max(barW - 2, 1), barH, Math.min(BAR_RADIUS, barW / 2));
        ctx.fill();
      });

      // Group label
      ctx.fillStyle    = TEXT_MUTED;
      ctx.font         = `400 11px ${FONT_FAMILY}`;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(lbl, padLeft + gi * groupW + groupW / 2, padTop + plotH + 6);
    });

    // ── Legend
    if (progress >= 0.98) {
      const legY   = padTop + plotH + 26;
      const legPad = 12;
      let   lx     = padLeft;

      ctx.font         = `500 11px ${FONT_FAMILY}`;
      ctx.textBaseline = 'middle';
      ctx.textAlign    = 'left';

      datasets.forEach((ds) => {
        const tw = ctx.measureText(ds.label).width;

        // Swatch
        ctx.fillStyle = ds.color;
        _roundRect(ctx, lx, legY + 1, 10, 10, 3);
        ctx.fill();

        ctx.fillStyle = TEXT_COLOR;
        ctx.fillText(ds.label, lx + 14, legY + 6);

        lx += tw + 14 + legPad;
      });
    }
  }

  canvas.setAttribute(
    'aria-label',
    title
      ? `Gráfico de barras agrupadas: ${title}.`
      : 'Gráfico de barras agrupadas.',
  );
  canvas.setAttribute('role', 'img');

  let cancelAnim = null;

  function start() {
    if (cancelAnim) cancelAnim();
    if (animated) {
      cancelAnim = _animate(220, draw);
    } else {
      draw(1);
    }
  }

  const onResize = () => start();
  window.addEventListener('resize', onResize);

  start();

  _registry.set(canvas, {
    destroy() {
      if (cancelAnim) cancelAnim();
      window.removeEventListener('resize', onResize);
    },
  });
}

/* ─────────────────────────────────────────────────────────────────────────────
   PUBLIC API – downloadCanvasPNG
───────────────────────────────────────────────────────────────────────────── */

/**
 * Exports the current canvas content as a PNG and triggers a browser download.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {string} [filename='chart.png']
 */
function downloadCanvasPNG(canvas, filename = 'chart.png') {
  if (!canvas) return;

  try {
    const dataURL = canvas.toDataURL('image/png');
    const a       = document.createElement('a');
    a.href        = dataURL;
    a.download    = filename.endsWith('.png') ? filename : `${filename}.png`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (err) {
    console.error('[Elevia/charts] downloadCanvasPNG failed:', err);
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   PUBLIC API – destroyChart
───────────────────────────────────────────────────────────────────────────── */

/**
 * Cancels any running animation and removes resize listeners associated with
 * this canvas.  Call this before re-rendering a chart or removing the canvas
 * from the DOM to avoid memory leaks.
 *
 * @param {HTMLCanvasElement} canvas
 */
function destroyChart(canvas) {
  if (!canvas) return;

  const entry = _registry.get(canvas);
  if (entry) {
    entry.destroy();
    _registry.delete(canvas);
  }

  // Also clear the canvas surface
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   PRIVATE HELPER – _niceStep
   Computes a "nice" round step value for axis ticks.
───────────────────────────────────────────────────────────────────────────── */

/**
 * Returns a "nice" round number ≥ `roughStep` suitable for chart tick spacing.
 * E.g. _niceStep(23) → 25,  _niceStep(110) → 200.
 *
 * @param {number} roughStep
 * @returns {number}
 */
function _niceStep(roughStep) {
  if (roughStep <= 0) return 1;
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const residual  = roughStep / magnitude;

  if (residual <= 1)   return magnitude;
  if (residual <= 2)   return 2 * magnitude;
  if (residual <= 2.5) return 2.5 * magnitude;
  if (residual <= 5)   return 5 * magnitude;
  return 10 * magnitude;
}

__exp.renderDonut = renderDonut;
__exp.renderBarChart = renderBarChart;
__exp.renderLineChart = renderLineChart;
__exp.renderGroupedBar = renderGroupedBar;
__exp.downloadCanvasPNG = downloadCanvasPNG;
__exp.destroyChart = destroyChart;
});
__def('format', function(__exp){
/**
 * @file format.js
 * @module utils/format
 * @description Formatting and export utility functions for the Elevia Startups platform.
 *
 * Covers:
 *  - Currency / number / percentage / compact formatting  (Intl-based, locale-aware)
 *  - User-input parsing (handles both comma and period as decimal separator)
 *  - Delta display with sign
 *  - Month–year formatting in Spanish
 *  - Browser file download trigger
 *  - Print dialog trigger
 *
 * All functions are defensive: NaN, null, undefined, and ±Infinity are handled
 * gracefully and return a safe, human-readable fallback string (or 0/null for
 * numeric return values).
 */

// ─── Internal helpers ────────────────────────────────────────────────────────

/**
 * Returns true when a value is a finite, non-null number we can format.
 * @param {*} v
 * @returns {boolean}
 */
function _isFiniteNumber(v) {
  return typeof v === 'number' && isFinite(v) && !isNaN(v);
}

/**
 * Coerces a value to a finite number or returns null.
 * @param {*} v
 * @returns {number|null}
 */
function _toFinite(v) {
  const n = Number(v);
  return _isFiniteNumber(n) ? n : null;
}

// ─── Currency formatting ──────────────────────────────────────────────────────

/**
 * Formats a number as currency using the browser's Intl API.
 *
 * @param {number} value      - The amount to format.
 * @param {string} currency   - ISO 4217 code (default: 'EUR').
 * @param {string} locale     - BCP 47 locale tag (default: 'es-ES').
 * @returns {string}          - Formatted currency string, e.g. '1.250,00 €'.
 *                              Returns '—' for non-finite inputs.
 *
 * @example
 * formatCurrency(1250)           // '1.250,00 €'
 * formatCurrency(9.99, 'USD', 'en-US') // '$9.99'
 */
function formatCurrency(value, currency = 'EUR', locale = 'es-ES') {
  const n = _toFinite(value);
  if (n === null) return '—';

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: Math.abs(n) >= 1000 ? 0 : 2,
      maximumFractionDigits: Math.abs(n) >= 1000 ? 0 : 2,
    }).format(n);
  } catch {
    // Fallback if currency code or locale is invalid
    return `${n.toFixed(2)} ${currency}`;
  }
}

// ─── Number formatting ────────────────────────────────────────────────────────

/**
 * Formats a number with thousand separators and an optional decimal count.
 *
 * @param {number} value    - The number to format.
 * @param {number} decimals - Decimal places (default: 0).
 * @param {string} locale   - BCP 47 locale tag (default: 'es-ES').
 * @returns {string}        - Formatted number string, e.g. '1.250.000'.
 *                            Returns '—' for non-finite inputs.
 *
 * @example
 * formatNumber(1250000)       // '1.250.000'
 * formatNumber(3.14159, 2)    // '3,14'
 */
function formatNumber(value, decimals = 0, locale = 'es-ES') {
  const n = _toFinite(value);
  if (n === null) return '—';

  const safeDecimals = Math.max(0, Math.floor(Number(decimals) || 0));

  try {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: safeDecimals,
      maximumFractionDigits: safeDecimals,
    }).format(n);
  } catch {
    return n.toFixed(safeDecimals);
  }
}

// ─── Percentage formatting ────────────────────────────────────────────────────

/**
 * Formats a decimal or whole percentage value as a human-readable string.
 * Values ≤ 1 are treated as fractions (0.25 → '25,0 %'); values > 1 are
 * treated as already-expressed percentages (25 → '25,0 %').
 *
 * @param {number} value    - The percentage value.
 * @param {number} decimals - Decimal places (default: 1).
 * @returns {string}        - e.g. '12,5 %'. Returns '—' for non-finite inputs.
 *
 * @example
 * formatPercent(0.125)    // '12,5 %'
 * formatPercent(12.5)     // '12,5 %'
 * formatPercent(100, 0)   // '100 %'
 */
function formatPercent(value, decimals = 1) {
  const n = _toFinite(value);
  if (n === null) return '—';

  const safeDecimals = Math.max(0, Math.floor(Number(decimals) || 0));
  // Detect fraction vs. already-percentage representation
  const pct = Math.abs(n) <= 1 ? n * 100 : n;

  try {
    return new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: safeDecimals,
      maximumFractionDigits: safeDecimals,
    }).format(pct) + ' %';
  } catch {
    return pct.toFixed(safeDecimals) + ' %';
  }
}

// ─── Compact / abbreviated formatting ────────────────────────────────────────

/**
 * Abbreviates a large number using K / M / MM suffixes (Spanish convention).
 * Optionally appends a currency symbol.
 *
 * Thresholds:
 *   < 1 000           → formatted as-is (e.g. '850')
 *   1 000 – 999 999   → 'K'  (e.g. '1,5K€')
 *   1 000 000+        → 'M'  (e.g. '2,3M€')
 *   1 000 000 000+    → 'MM' (e.g. '1,2MM€')
 *
 * @param {number} value      - The number to abbreviate.
 * @param {string} [currency] - Optional ISO 4217 code. Pass null/''/false to
 *                              omit the symbol entirely.
 * @returns {string}          - Compact string, e.g. '1,5M€'. Returns '—' for
 *                              non-finite inputs.
 *
 * @example
 * formatCompact(1500000)          // '1,5M€'
 * formatCompact(2300000000)       // '2,3MM€'
 * formatCompact(750000, 'USD')    // '750K$'  (uses $ symbol)
 * formatCompact(500, null)        // '500'
 */
function formatCompact(value, currency = 'EUR') {
  const n = _toFinite(value);
  if (n === null) return '—';

  // Derive the currency symbol to append
  let symbol = '';
  if (currency) {
    const SYMBOLS = { EUR: '€', USD: '$', GBP: '£' };
    symbol = SYMBOLS[currency?.toUpperCase()] ?? currency;
  }

  const abs = Math.abs(n);
  const sign = n < 0 ? '-' : '';

  /**
   * Formats the divided number with up to 1 decimal place, strips trailing
   * '.0' so '2.0M' becomes '2M', uses Spanish comma as decimal separator.
   * @param {number} divided
   * @returns {string}
   */
  const fmt = (divided) => {
    const rounded = Math.round(divided * 10) / 10; // 1 decimal
    const str = rounded.toFixed(1).replace('.', ',');
    // Remove unnecessary ',0' suffix (2,0 → 2)
    return str.endsWith(',0') ? str.slice(0, -2) : str;
  };

  let compactStr;
  if (abs >= 1_000_000_000) {
    compactStr = `${fmt(abs / 1_000_000_000)}MM`;
  } else if (abs >= 1_000_000) {
    compactStr = `${fmt(abs / 1_000_000)}M`;
  } else if (abs >= 1_000) {
    compactStr = `${fmt(abs / 1_000)}K`;
  } else {
    compactStr = String(Math.round(abs));
  }

  return `${sign}${compactStr}${symbol}`;
}

// ─── User input parsing ───────────────────────────────────────────────────────

/**
 * Parses a user-entered number string, tolerating both comma and period as
 * the decimal separator.  Strips currency symbols, spaces, and thousands
 * separators before parsing.
 *
 * Heuristic:
 *  - If the string contains BOTH '.' and ',' the one appearing last is
 *    treated as the decimal separator.
 *  - If only one separator appears and it groups exactly 3 digits at the end
 *    it is treated as a thousands separator, otherwise as a decimal separator.
 *
 * @param {string} str - Raw user input, e.g. '1.250,99' or '1,250.99'.
 * @returns {number|null} - Parsed finite number or null if unparseable.
 *
 * @example
 * parseUserNumber('1.250,99')   // 1250.99
 * parseUserNumber('1,250.99')   // 1250.99
 * parseUserNumber('3,14')       // 3.14
 * parseUserNumber('abc')        // null
 * parseUserNumber('')           // null
 */
function parseUserNumber(str) {
  if (str === null || str === undefined) return null;
  if (typeof str === 'number') return _isFiniteNumber(str) ? str : null;

  // Strip whitespace, currency symbols, and percent signs
  let s = String(str).trim().replace(/[€$£%\s]/g, '');
  if (s === '' || s === '-' || s === '+') return null;

  const hasDot   = s.includes('.');
  const hasComma = s.includes(',');

  if (hasDot && hasComma) {
    // e.g. '1.250,99' (ES) or '1,250.99' (EN)
    const lastDot   = s.lastIndexOf('.');
    const lastComma = s.lastIndexOf(',');
    if (lastComma > lastDot) {
      // Comma is decimal: remove dots (thousands), replace comma with dot
      s = s.replace(/\./g, '').replace(',', '.');
    } else {
      // Dot is decimal: remove commas (thousands)
      s = s.replace(/,/g, '');
    }
  } else if (hasComma && !hasDot) {
    // Only comma: could be thousands ('1,250') or decimal ('3,14')
    const parts = s.split(',');
    if (parts.length === 2 && parts[1].length === 3 && /^\d+$/.test(parts[1])) {
      // Looks like a thousands separator → remove it
      s = s.replace(',', '');
    } else {
      // Treat as decimal separator
      s = s.replace(',', '.');
    }
  } else if (hasDot && !hasComma) {
    // Only dot: could be thousands ('1.250') or decimal ('3.14')
    const parts = s.split('.');
    if (parts.length === 2 && parts[1].length === 3 && /^\d+$/.test(parts[1])) {
      // Looks like a thousands separator → remove it
      s = s.replace('.', '');
    }
    // Otherwise leave as-is (standard JS number with dot decimal)
  }

  const n = parseFloat(s);
  return _isFiniteNumber(n) ? n : null;
}

// ─── Clamp ────────────────────────────────────────────────────────────────────

/**
 * Clamps a number between an inclusive minimum and maximum.
 *
 * @param {number} value - The number to clamp.
 * @param {number} min   - Lower bound.
 * @param {number} max   - Upper bound.
 * @returns {number}     - Clamped value. Returns min if value is non-finite.
 *
 * @example
 * clamp(150, 0, 100)   // 100
 * clamp(-5, 0, 100)    // 0
 * clamp(50, 0, 100)    // 50
 */
function clamp(value, min, max) {
  const n   = _toFinite(value) ?? min;
  const lo  = _toFinite(min)   ?? -Infinity;
  const hi  = _toFinite(max)   ??  Infinity;
  return Math.min(Math.max(n, lo), hi);
}

// ─── Delta formatting ─────────────────────────────────────────────────────────

/**
 * Returns a signed, currency-formatted delta string for displaying changes.
 * Positive values get a '+' prefix; negative values get '−' (minus sign).
 *
 * @param {number} value      - The delta amount.
 * @param {string} [currency] - ISO 4217 code appended as symbol (default: 'EUR').
 *                              Pass null to omit currency.
 * @returns {string}          - e.g. '+1.250,00 €' / '−500,00 €' / '—'.
 *
 * @example
 * formatDelta(1250)        // '+1.250,00 €'
 * formatDelta(-500)        // '−500,00 €'
 * formatDelta(0)           // '0,00 €'
 */
function formatDelta(value, currency = 'EUR') {
  const n = _toFinite(value);
  if (n === null) return '—';

  if (currency) {
    const formatted = formatCurrency(Math.abs(n), currency, 'es-ES');
    if (n > 0)  return `+${formatted}`;
    if (n < 0)  return `\u2212${formatted}`;  // Unicode minus sign
    return formatted; // zero — no sign
  }

  const formatted = formatNumber(Math.abs(n), 2);
  if (n > 0)  return `+${formatted}`;
  if (n < 0)  return `\u2212${formatted}`;
  return formatted;
}

// ─── Month–year formatting ────────────────────────────────────────────────────

/**
 * Formats a Date (or date-like value) as a Spanish month–year string.
 * Uses long month names in lowercase as is conventional in Spanish prose.
 *
 * @param {Date|string|number} date - Any value accepted by the Date constructor.
 * @returns {string} - e.g. 'octubre 2026'. Returns '—' for invalid dates.
 *
 * @example
 * formatMonthYear(new Date('2026-10-11'))  // 'octubre 2026'
 * formatMonthYear('2024-01-01')            // 'enero 2024'
 */
function formatMonthYear(date) {
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return '—';

  try {
    return new Intl.DateTimeFormat('es-ES', {
      month: 'long',
      year:  'numeric',
    }).format(d);
  } catch {
    // Manual fallback
    const MONTHS = [
      'enero','febrero','marzo','abril','mayo','junio',
      'julio','agosto','septiembre','octubre','noviembre','diciembre',
    ];
    return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  }
}

// ─── File download trigger ────────────────────────────────────────────────────

/**
 * Triggers a file download in the browser by creating a temporary anchor
 * element with a Blob object URL.  The anchor is cleaned up immediately after
 * the click is dispatched.
 *
 * @param {string} content   - File content as a string (JSON, CSV, etc.).
 * @param {string} filename  - The suggested download filename.
 * @param {string} mimeType  - MIME type (default: 'application/json').
 * @returns {void}
 *
 * @example
 * downloadFile(JSON.stringify(data, null, 2), 'report.json');
 * downloadFile(csvString, 'export.csv', 'text/csv');
 */
function downloadFile(content, filename, mimeType = 'application/json') {
  if (content === null || content === undefined) {
    console.warn('[Elevia] downloadFile: content is null/undefined — aborting.');
    return;
  }
  if (!filename) {
    console.warn('[Elevia] downloadFile: filename is required — using "download".');
    filename = 'download';
  }

  let blob;
  try {
    blob = new Blob([content], { type: mimeType });
  } catch (err) {
    console.error('[Elevia] downloadFile: Blob creation failed.', err);
    return;
  }

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href     = url;
  anchor.download = filename;
  anchor.style.display = 'none';

  document.body.appendChild(anchor);
  anchor.click();

  // Revoke the object URL after a short delay to allow the download to begin
  setTimeout(() => {
    URL.revokeObjectURL(url);
    anchor.remove();
  }, 150);
}

// ─── Print trigger ────────────────────────────────────────────────────────────

/**
 * Adds a CSS class to <body>, opens the browser print dialog, then removes
 * the class whether the user prints or cancels.  This allows print-specific
 * stylesheet rules to be scoped to the class.
 *
 * @param {string} printClass - Class to temporarily add to <body>
 *                              (default: 'print-mode').
 * @returns {void}
 *
 * @example
 * triggerPrint();              // adds 'print-mode', prints, removes class
 * triggerPrint('report-print');
 */
function triggerPrint(printClass = 'print-mode') {
  const body = document.body;

  if (printClass) body.classList.add(printClass);

  // Use afterprint event to clean up the class after the dialog closes
  const cleanup = () => {
    if (printClass) body.classList.remove(printClass);
    window.removeEventListener('afterprint', cleanup);
  };
  window.addEventListener('afterprint', cleanup);

  // Belt-and-suspenders: also clean up if print was never triggered
  // (e.g., in environments where window.print() is a no-op)
  setTimeout(() => {
    if (printClass) body.classList.remove(printClass);
    window.removeEventListener('afterprint', cleanup);
  }, 5000);

  window.print();
}

__exp.formatCurrency = formatCurrency;
__exp.formatNumber = formatNumber;
__exp.formatPercent = formatPercent;
__exp.formatCompact = formatCompact;
__exp.parseUserNumber = parseUserNumber;
__exp.clamp = clamp;
__exp.formatDelta = formatDelta;
__exp.formatMonthYear = formatMonthYear;
__exp.downloadFile = downloadFile;
__exp.triggerPrint = triggerPrint;
});
__def('storage', function(__exp){
/**
 * @fileoverview storage.js — Elevia Startups
 * A clean abstraction layer over localStorage.
 *
 * All Elevia keys use the prefix "elevia_" to namespace our data and
 * avoid collisions with third-party scripts on the same origin.
 *
 * Designed to be swappable: replace this module's internals with
 * Supabase, IndexedDB, or any other backend without touching tool code.
 */

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Namespace prefix applied to every key managed by this module. */
const ELEVIA_PREFIX = 'elevia_';

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Resolves the full storage key, adding the Elevia prefix if not present.
 * This keeps callers from needing to know about the prefix themselves.
 *
 * @param {string} key
 * @returns {string}
 */
function resolveKey(key) {
  return key.startsWith(ELEVIA_PREFIX) ? key : `${ELEVIA_PREFIX}${key}`;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Checks whether localStorage is available and writable in the current
 * environment. Some browsers disable storage in private/incognito mode or
 * when the user has blocked site data.
 *
 * @returns {boolean}
 */
function isStorageAvailable() {
  try {
    const testKey = `${ELEVIA_PREFIX}__storage_test__`;
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Saves data to localStorage with error handling.
 * The value is JSON-serialised before writing, so any JSON-compatible type
 * (object, array, string, number, boolean, null) is accepted.
 *
 * Common failure modes handled:
 *  - QuotaExceededError  — storage is full
 *  - SecurityError       — storage blocked by browser policy
 *  - JSON.stringify fail — circular references, BigInt, etc.
 *
 * @param {string} key  - Storage key (the "elevia_" prefix is added automatically)
 * @param {any}    data - Data to persist
 * @returns {{ success: boolean, error?: string }}
 */
function saveData(key, data) {
  if (!key || typeof key !== 'string') {
    return { success: false, error: 'Invalid key: must be a non-empty string.' };
  }

  let serialised;
  try {
    serialised = JSON.stringify(data);
  } catch (err) {
    return { success: false, error: `Serialisation failed: ${err.message}` };
  }

  try {
    localStorage.setItem(resolveKey(key), serialised);
    return { success: true };
  } catch (err) {
    // DOMException name is the most reliable way to identify quota errors
    // across browsers (Chrome: QuotaExceededError, Firefox: NS_ERROR_DOM_QUOTA_REACHED)
    const isQuota =
      err instanceof DOMException &&
      (err.name === 'QuotaExceededError' ||
        err.name === 'NS_ERROR_DOM_QUOTA_REACHED');

    return {
      success: false,
      error: isQuota
        ? 'Storage quota exceeded. Free up space by removing unused data.'
        : `Storage write failed: ${err.message}`,
    };
  }
}

/**
 * Loads data from localStorage.
 * Returns `defaultValue` when the key does not exist or the stored value
 * cannot be parsed (e.g. corrupted JSON written by an older version).
 *
 * @param {string} key          - Storage key (prefix added automatically)
 * @param {any}    [defaultValue=null] - Fallback when key is absent or unreadable
 * @returns {any}
 */
function loadData(key, defaultValue = null) {
  if (!key || typeof key !== 'string') return defaultValue;

  try {
    const raw = localStorage.getItem(resolveKey(key));
    if (raw === null) return defaultValue; // key not found
    return JSON.parse(raw);
  } catch {
    // Corrupted entry — treat as if the key does not exist
    return defaultValue;
  }
}

/**
 * Removes a single key from localStorage.
 * Silently succeeds even if the key does not exist or storage is unavailable.
 *
 * @param {string} key - Storage key (prefix added automatically)
 * @returns {void}
 */
function removeData(key) {
  if (!key || typeof key !== 'string') return;
  try {
    localStorage.removeItem(resolveKey(key));
  } catch {
    // Non-critical — best-effort removal
  }
}

/**
 * Returns all storage keys that belong to Elevia (i.e. start with "elevia_").
 * Useful for building export/import features or debugging stored state.
 *
 * @returns {string[]} Full localStorage keys (including the prefix)
 */
function listEleviaKeys() {
  const keys = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(ELEVIA_PREFIX)) {
        keys.push(k);
      }
    }
  } catch {
    // Storage unavailable — return empty list
  }
  return keys;
}

/**
 * Exports all Elevia data as a pretty-printed JSON string.
 * The exported object maps each full storage key to its parsed value.
 *
 * Example output:
 * ```json
 * {
 *   "elevia_burn_rate": { "monthly": 12000 },
 *   "elevia_cap_table": [ ... ]
 * }
 * ```
 *
 * Returns an empty JSON object string ("{}") when nothing is stored or
 * storage is unavailable.
 *
 * @returns {string}
 */
function exportAllData() {
  const snapshot = {};
  const keys = listEleviaKeys();

  for (const fullKey of keys) {
    try {
      const raw = localStorage.getItem(fullKey);
      // Store the parsed value so the export is human-readable JSON
      snapshot[fullKey] = raw !== null ? JSON.parse(raw) : null;
    } catch {
      // If a value is unparseable, export its raw string to preserve it
      try {
        snapshot[fullKey] = localStorage.getItem(fullKey);
      } catch {
        // Skip unreadable entries
      }
    }
  }

  try {
    return JSON.stringify(snapshot, null, 2);
  } catch {
    return '{}';
  }
}

/**
 * Imports Elevia data from a JSON string (e.g. previously exported via
 * `exportAllData`). Only keys prefixed with "elevia_" are written; any
 * other keys present in the JSON are silently ignored for safety.
 *
 * Each valid entry is written individually so a single quota error
 * doesn't block the entire import — partial success is reported via
 * the `imported` count.
 *
 * @param {string} jsonString - JSON-encoded object of { [eleviaKey]: value }
 * @returns {{ success: boolean, imported: number, error?: string }}
 */
function importAllData(jsonString) {
  if (typeof jsonString !== 'string' || jsonString.trim() === '') {
    return { success: false, imported: 0, error: 'Input must be a non-empty string.' };
  }

  let parsed;
  try {
    parsed = JSON.parse(jsonString);
  } catch (err) {
    return { success: false, imported: 0, error: `Invalid JSON: ${err.message}` };
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    return {
      success: false,
      imported: 0,
      error: 'Import data must be a JSON object, not an array or primitive.',
    };
  }

  let imported = 0;
  const errors = [];

  for (const [key, value] of Object.entries(parsed)) {
    // Security guard: only import Elevia-namespaced keys
    if (!key.startsWith(ELEVIA_PREFIX)) continue;

    try {
      localStorage.setItem(key, JSON.stringify(value));
      imported++;
    } catch (err) {
      errors.push(`${key}: ${err.message}`);
    }
  }

  if (errors.length > 0) {
    return {
      success: imported > 0, // partial success if at least one key was written
      imported,
      error: `Some entries could not be imported: ${errors.join('; ')}`,
    };
  }

  return { success: true, imported };
}

__exp.isStorageAvailable = isStorageAvailable;
__exp.saveData = saveData;
__exp.loadData = loadData;
__exp.removeData = removeData;
__exp.listEleviaKeys = listEleviaKeys;
__exp.exportAllData = exportAllData;
__exp.importAllData = importAllData;
});
