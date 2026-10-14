/**
 * config.js — Elevia Startups
 * Centralized site configuration. Import from any ES module.
 *
 * Usage:
 *   import { SITE_CONFIG, TOOLS, NAV_LINKS, STORAGE_KEYS } from '/src/js/config.js';
 */

// ---------------------------------------------------------------------------
// Site-level metadata
// ---------------------------------------------------------------------------

export const SITE_CONFIG = {
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

export const NAV_LINKS = [
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

export const TOOLS = [
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

export const CATEGORIES = [
  { id: 'market',      label: 'Mercado y estrategia',          color: 'sage' },
  { id: 'planning',   label: 'Organización y planificación',   color: 'lavender' },
  { id: 'finance',    label: 'Finanzas y métricas',            color: 'peach' },
  { id: 'fundraising',label: 'Fundraising',                    color: 'lavender' },
];

// ---------------------------------------------------------------------------
// Versioned localStorage keys
// One key per tool — bump SITE_CONFIG.storageVersion to invalidate old data.
// ---------------------------------------------------------------------------

export const STORAGE_KEYS = {
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
