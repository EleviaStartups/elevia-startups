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
export function renderDonut(canvas, data, options = {}) {
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
export function renderBarChart(canvas, data, options = {}) {
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
export function renderLineChart(canvas, series, options = {}) {
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
export function renderGroupedBar(canvas, data, options = {}) {
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
export function downloadCanvasPNG(canvas, filename = 'chart.png') {
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
export function destroyChart(canvas) {
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
