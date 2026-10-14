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
export function formatCurrency(value, currency = 'EUR', locale = 'es-ES') {
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
export function formatNumber(value, decimals = 0, locale = 'es-ES') {
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
export function formatPercent(value, decimals = 1) {
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
export function formatCompact(value, currency = 'EUR') {
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
export function parseUserNumber(str) {
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
export function clamp(value, min, max) {
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
export function formatDelta(value, currency = 'EUR') {
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
export function formatMonthYear(date) {
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
export function downloadFile(content, filename, mimeType = 'application/json') {
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
export function triggerPrint(printClass = 'print-mode') {
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
