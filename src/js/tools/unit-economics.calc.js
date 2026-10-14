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
export function interpolateRetention12(milestones = {}) {
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
export function calcUnitEconomics(inputs = {}) {
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
export const UNIT_ECONOMICS_PRESETS = {
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
