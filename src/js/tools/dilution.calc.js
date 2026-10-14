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
export function calcDilution({ preMoney, investment, founders }) {
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
