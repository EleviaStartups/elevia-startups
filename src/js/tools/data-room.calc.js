/**
 * data-room.calc.js — Elevia Startups
 * Data structure, progress calculation and folder hierarchy exporter for Data Room (Due Diligence).
 * No DOM, no UI.
 */

/**
 * Predefined structure of the Data Room checklist for startup Due Diligence.
 */
export const DEFAULT_DATA_ROOM_SECTIONS = [
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
export function createDefaultDataRoom() {
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
export function calcDataRoomStats(sections = []) {
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
export function generateFolderStructureText(sections = [], format = 'notion') {
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
