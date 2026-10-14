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
export function median(arr) {
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
export function calcBerkus(components) {
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
export function calcScorecard(referenceValuation, factors) {
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
export function calcVentureCapital({ exitValue, horizon, requiredMultiple, investment }) {
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
export function calcRevenueMultiples({ revenue, multipleMin, multipleMid, multipleMax, isRecurring }) {
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
export function calcDCF({ cashFlows, discountRate, terminalGrowthRate, cash = 0, debt = 0 }) {
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
export function calcRiskFactors({ baseValuation, factors }) {
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
export function calcComparables(transactions) {
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
export function getRecommendedMethods(stage) {
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
