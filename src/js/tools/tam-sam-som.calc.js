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
export function calcTopDown(inputs) {
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
export function calcBottomUp(inputs) {
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
export function generateScenarios(method, baseInputs) {
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
export function analyzeResults(results) {
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
