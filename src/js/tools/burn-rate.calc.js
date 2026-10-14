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
export function calcBurnRate({
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
export function calcScenarios(baseInputs, adjustments) {
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
