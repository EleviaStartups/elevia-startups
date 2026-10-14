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
export function calcCAC({ totalSpend, customersAcquired }) {
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
export function calcCACByChannel(channels) {
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
export function calcLTVSubscription({ avgMonthlyRevenue, grossMargin, monthlyChurn }) {
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
export function calcLTVSimple({
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
export function calcRatios({ ltv, cac, avgMonthlyRevenue, grossMargin }) {
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
