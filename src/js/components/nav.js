/**
 * nav.js — Elevia Startups
 * Shared navigation & footer component.
 *
 * Usage (in every page):
 *   import { initNav, initFooter, BASE_PATH } from '../components/nav.js';
 *   document.addEventListener('DOMContentLoaded', () => {
 *     initNav({ activePage: 'tools' });
 *     initFooter();
 *   });
 *
 * BASE_PATH can be overridden per-page for correct relative linking.
 * Default '' works for pages at /pages/*.html.
 * For pages at /pages/tools/*.html, override to '../'.
 * For /index.html at root, override to 'pages/'.
 */

// ---------------------------------------------------------------------------
// BASE_PATH — override per page before calling initNav / initFooter
// ---------------------------------------------------------------------------

/** @type {string} Relative prefix to reach /pages/ from the current page. */
export let BASE_PATH = '';

/**
 * Override the base path for pages nested deeper in the directory tree.
 * @param {string} path - e.g. '' | '../' | '../../'
 */
export function setBasePath(path) {
  BASE_PATH = path;
}

// ---------------------------------------------------------------------------
// Tool link definitions
// ---------------------------------------------------------------------------

/** All tool pages. */
const TOOLS = [
  { label: 'TAM / SAM / SOM',        href: 'tools/tam-sam-som.html',          icon: '📊' },
  { label: 'Unit Economics',          href: 'tools/unit-economics.html',       icon: '💎' },
  { label: 'Data Room Due Diligence', href: 'tools/data-room.html',            icon: '📁' },
  { label: 'OKR Builder',             href: 'tools/okr-builder.html',          icon: '🎯' },
  { label: 'ICP Creator',             href: 'tools/icp-creator.html',          icon: '🧑‍💼' },
  { label: 'Valoración Startup',      href: 'tools/startup-valuation.html',    icon: '💰' },
  { label: 'Dilución de Equity',      href: 'tools/dilution-calculator.html',  icon: '📉' },
  { label: 'CAC / LTV',               href: 'tools/cac-ltv.html',              icon: '📈' },
  { label: 'Burn Rate',               href: 'tools/burn-rate.html',            icon: '🔥' },
];

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Automatically determine the relative prefix to reach the site root.
 * Works for root (/), /pages/, and /pages/tools/ on both http: and file: protocols.
 */
function getRootPrefix() {
  if (BASE_PATH) return BASE_PATH;
  const path = window.location.pathname.replace(/\\/g, '/');
  if (path.includes('/pages/tools/')) {
    return '../../';
  } else if (path.includes('/pages/')) {
    return '../';
  } else {
    return './';
  }
}

/**
 * Resolve a page-relative href from root prefix.
 * @param {string} href
 * @returns {string}
 */
function resolve(href) {
  if (href.startsWith('#') || href.startsWith('http://') || href.startsWith('https://')) return href;
  const root = getRootPrefix();
  if (href === 'index.html' || href === './index.html') {
    return root + 'index.html';
  }
  // If href is like 'tools/tam-sam-som.html' or 'tools.html' or 'investor-deck.html'
  if (href.startsWith('pages/')) {
    return root + href;
  }
  return root + 'pages/' + href;
}

/**
 * Resolve an asset located at the site root (e.g. favicon.svg).
 * @param {string} relativePath
 * @returns {string}
 */
function resolveRoot(relativePath) {
  const root = getRootPrefix();
  return root + relativePath.replace(/^\.?\//, '');
}

/**
 * Returns true if the given href matches the current page URL.
 * @param {string} href
 * @returns {boolean}
 */
function isActive(href) {
  if (href.startsWith('#')) return false;
  const pathname = window.location.pathname.replace(/\\/g, '/');
  const normalised = href.replace(/^\.\.\//, '/pages/').replace(/^\.\//, '');
  return pathname.endsWith(normalised) || pathname.endsWith(href);
}

// ---------------------------------------------------------------------------
// CSS — injected once into <head>
// ---------------------------------------------------------------------------

const NAV_CSS = `
/* ===== Elevia Startups — Site Header (injected by nav.js) ===== */

/* --- Reset / tokens assumed from global CSS --- */
:root {
  --nav-height: 60px;
  --nav-bg: rgba(247, 245, 240, 0.94);
  --nav-bg-scrolled: rgba(255, 255, 255, 0.98);
  --nav-shadow: 0 1px 0 #E8E4DC;
  --nav-shadow-scrolled: 0 4px 24px rgba(0,0,0,.10);
  --nav-link-color: var(--color-ink, #202A36);
  --nav-link-hover: var(--color-ink, #202A36);
  --nav-active-color: var(--color-ink, #202A36);
  --nav-dropdown-bg: #ffffff;
  --nav-dropdown-shadow: 0 12px 40px rgba(0,0,0,.13);
  --nav-hamburger-color: var(--color-ink, #202A36);
  --nav-cta-bg: var(--color-ink, #202A36);
  --nav-cta-color: #fff;
  --nav-cta-hover-bg: #2D3A4A;
  --nav-mobile-bg: #ffffff;
  --nav-mobile-overlay: rgba(32,42,54,.45);
  --nav-z: 1000;
  --nav-transition: 220ms cubic-bezier(.4,0,.2,1);
}

/* --- Header shell --- */
.site-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: var(--nav-height);
  background: var(--nav-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  box-shadow: var(--nav-shadow);
  z-index: var(--nav-z);
  transition:
    box-shadow var(--nav-transition),
    background var(--nav-transition),
    border-color var(--nav-transition);
}

.site-header.scrolled {
  background: var(--nav-bg-scrolled);
  box-shadow: var(--nav-shadow-scrolled);
  border-color: rgba(0,0,0,.06);
}

/* --- Inner layout --- */
.nav-inner {
  display: flex;
  align-items: center;
  gap: 0;
  max-width: var(--container-xl, 1280px);
  height: 100%;
  margin: 0 auto;
  padding: 0 24px;
}

/* --- Logo --- */
.nav-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'Manrope', sans-serif;
  font-weight: 800;
  font-size: 1.2rem;
  color: var(--color-ink, #202A36);
  text-decoration: none;
  letter-spacing: -0.3px;
  flex-shrink: 0;
  margin-right: 36px;
  transition: opacity var(--nav-transition);
}
.nav-logo:hover { opacity: .82; }
.nav-logo-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 0;
}
.nav-logo-mark img {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: block;
  box-shadow: 0 2px 8px rgba(32,42,54,.15);
}
.nav-logo-text {
  display: inline-block;
  line-height: 1.2;
}
.nav-logo-text span {
  color: var(--nav-active-color);
}

/* --- Desktop nav links --- */
.nav-links {
  margin-right: auto;
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
}

@media (max-width: 1160px) {
  .nav-logo { margin-right: 16px; font-size: 1.08rem; gap: 8px; }
  .nav-logo-mark img { width: 26px; height: 26px; border-radius: 7px; }
  .nav-links { gap: 2px; }
}

@media (max-width: 980px) {
  .nav-links { display: none; }
}

.nav-links > li {
  position: relative;
}

.nav-links > li > a,
.nav-links > li > button.nav-dropdown-toggle {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  font-family: 'Manrope', sans-serif;
  font-size: .9rem;
  font-weight: 600;
  color: var(--nav-link-color);
  text-decoration: none;
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: color var(--nav-transition), background var(--nav-transition);
  white-space: nowrap;
}

@media (max-width: 1160px) {
  .nav-links > li > a,
  .nav-links > li > button.nav-dropdown-toggle {
    padding: 6px 9px;
    font-size: .82rem;
  }
}

.nav-links > li > a:hover,
.nav-links > li > button.nav-dropdown-toggle:hover {
  color: var(--nav-link-hover);
  background: rgba(216,201,240,.55);
}

.nav-links > li > a.active,
.nav-links > li > button.nav-dropdown-toggle.active {
  color: var(--nav-active-color);
}

/* Dropdown chevron */
.nav-dropdown-toggle .chevron {
  display: inline-block;
  width: 14px;
  height: 14px;
  transition: transform var(--nav-transition);
  flex-shrink: 0;
}
.nav-dropdown-toggle[aria-expanded="true"] .chevron {
  transform: rotate(180deg);
}

/* --- Dropdown panel --- */
.nav-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(-6px);
  width: 260px;
  background: var(--nav-dropdown-bg);
  border: 1px solid rgba(0,0,0,.08);
  border-radius: 14px;
  box-shadow: var(--nav-dropdown-shadow);
  padding: 8px;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition:
    opacity var(--nav-transition),
    transform var(--nav-transition),
    visibility var(--nav-transition);
  z-index: 10;
}

.nav-dropdown.open {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}

.nav-dropdown a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 8px;
  font-family: 'Manrope', sans-serif;
  font-size: .88rem;
  font-weight: 500;
  color: var(--nav-link-color);
  text-decoration: none;
  transition: background var(--nav-transition), color var(--nav-transition);
}

.nav-dropdown a:hover {
  background: rgba(216,201,240,.45);
  color: var(--nav-link-hover);
}

.nav-dropdown a.active {
  background: rgba(216,201,240,.75);
  color: var(--nav-active-color);
  font-weight: 700;
}

.nav-dropdown-icon {
  font-size: 1rem;
  width: 22px;
  text-align: center;
  flex-shrink: 0;
}

.nav-dropdown-divider {
  height: 1px;
  background: rgba(0,0,0,.07);
  margin: 6px 8px;
}

/* --- CTA button --- */
.nav-cta {
  display: inline-flex;
  align-items: center;
  margin-left: 16px;
  padding: 9px 18px;
  background: var(--nav-cta-bg);
  color: var(--nav-cta-color) !important;
  font-family: 'Manrope', sans-serif;
  font-size: .88rem;
  font-weight: 700;
  border-radius: 10px;
  text-decoration: none !important;
  white-space: nowrap;
  flex-shrink: 0;
  border: none;
  cursor: pointer;
  transition: background var(--nav-transition), transform 150ms ease, box-shadow var(--nav-transition);
  box-shadow: 0 2px 8px rgba(32,42,54,.18);
}
.nav-cta:hover {
  background: var(--nav-cta-hover-bg);
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(32,42,54,.22);
}
.nav-cta:active {
  transform: translateY(0);
}

@media (max-width: 1160px) {
  .nav-cta {
    padding: 7px 14px;
    font-size: .82rem;
  }
}

@media (max-width: 980px) {
  .nav-cta { display: none; }
}

/* --- Hamburger --- */
.nav-hamburger {
  display: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-left: auto;
  background: none;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: var(--nav-hamburger-color);
  transition: background var(--nav-transition);
  flex-shrink: 0;
}

.nav-hamburger:hover { background: rgba(0,0,0,.06); }

@media (max-width: 980px) {
  .nav-hamburger { display: flex; }
}

/* Hamburger SVG lines */
.hamburger-bar {
  transition: transform 220ms ease, opacity 150ms ease;
  transform-origin: center;
}
.site-header.menu-open .hb-top    { transform: translateY(6px) rotate(45deg);  }
.site-header.menu-open .hb-mid    { opacity: 0; transform: scaleX(0); }
.site-header.menu-open .hb-bottom { transform: translateY(-6px) rotate(-45deg); }

/* --- Mobile overlay --- */
.nav-mobile-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: var(--nav-mobile-overlay);
  z-index: calc(var(--nav-z) + 1);
  opacity: 0;
  transition: opacity var(--nav-transition);
}
.nav-mobile-overlay.visible {
  display: block;
}
.nav-mobile-overlay.active {
  opacity: 1;
}

/* --- Mobile menu panel --- */
.nav-mobile-panel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(320px, 88vw);
  background: var(--nav-mobile-bg);
  z-index: calc(var(--nav-z) + 2);
  display: flex;
  flex-direction: column;
  padding: 0 0 32px;
  transform: translateX(100%);
  visibility: hidden;
  pointer-events: none;
  transition: transform 280ms cubic-bezier(.4,0,.2,1), visibility 280ms;
  box-shadow: -8px 0 32px rgba(0,0,0,.14);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.nav-mobile-panel.open {
  transform: translateX(0);
  visibility: visible;
  pointer-events: auto;
}

/* Mobile panel header */
.nav-mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0,0,0,.07);
  flex-shrink: 0;
}

.nav-mobile-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'Manrope', sans-serif;
  font-weight: 800;
  font-size: 1.1rem;
  color: var(--color-ink, #202A36);
  text-decoration: none;
}
.nav-mobile-logo .nav-logo-mark img {
  width: 28px;
  height: 28px;
  border-radius: 7px;
  display: block;
}
.nav-mobile-logo .nav-logo-text span { color: var(--nav-active-color); }

.nav-mobile-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px; height: 36px;
  border: none;
  background: rgba(0,0,0,.05);
  border-radius: 8px;
  cursor: pointer;
  color: #3a3a4a;
  transition: background var(--nav-transition);
}
.nav-mobile-close:hover { background: rgba(0,0,0,.10); }

/* Mobile nav list */
.nav-mobile-list {
  list-style: none;
  margin: 12px 0 0;
  padding: 0 12px;
  flex: 1;
}

.nav-mobile-list a,
.nav-mobile-list .nav-mobile-group-label {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 12px;
  border-radius: 10px;
  font-family: 'Manrope', sans-serif;
  font-size: .95rem;
  font-weight: 600;
  color: var(--nav-link-color);
  text-decoration: none;
  transition: background var(--nav-transition), color var(--nav-transition);
}

.nav-mobile-list a:hover {
  background: rgba(216,201,240,.45);
  color: var(--nav-link-hover);
}

.nav-mobile-list a.active {
  background: rgba(216,201,240,.75);
  color: var(--nav-active-color);
}

.nav-mobile-group-label {
  font-size: .78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: #999;
  padding-top: 20px;
  padding-bottom: 6px;
  cursor: default;
  pointer-events: none;
}

.nav-mobile-tool-link {
  padding-left: 24px !important;
  font-weight: 500 !important;
  font-size: .9rem !important;
}

.nav-mobile-cta {
  margin: 16px 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 13px 20px;
  background: var(--nav-cta-bg);
  color: #fff !important;
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: .95rem;
  border-radius: 12px;
  text-decoration: none !important;
  box-shadow: 0 3px 14px rgba(91,76,219,.30);
  transition: background var(--nav-transition);
  flex-shrink: 0;
}
.nav-mobile-cta:hover { background: var(--nav-cta-hover-bg); }

/* --- Body offset when header is present --- */
body { padding-top: var(--nav-height); }

/* ===== Site Footer (tema claro, paleta Elevia) ===== */
.site-footer {
  background: var(--color-white, #FFFFFF);
  color: var(--color-ink-70, #4A5568);
  border-top: 1px solid var(--color-border, #E8E4DC);
  font-family: 'Manrope', sans-serif;
  padding: 56px 24px 32px;
  margin-top: 80px;
}
.footer-inner { max-width: var(--container-xl, 1280px); margin: 0 auto; }
.footer-top {
  display: grid;
  grid-template-columns: 1.4fr repeat(3, 1fr);
  gap: 40px 32px;
  margin-bottom: 40px;
}
@media (max-width: 860px) { .footer-top { grid-template-columns: 1fr 1fr; } }
@media (max-width: 520px) { .footer-top { grid-template-columns: 1fr; } }
.footer-brand .footer-logo {
  font-family: 'Manrope', sans-serif;
  font-weight: 800;
  font-size: 1.15rem;
  color: var(--color-ink, #202A36);
  text-decoration: none;
  display: inline-block;
  margin-bottom: 12px;
}
.footer-brand .footer-logo span { color: var(--color-ink, #202A36); }
.footer-brand p {
  font-size: .875rem;
  line-height: 1.65;
  max-width: 280px;
  color: var(--color-ink-70, #4A5568);
  margin: 0 0 16px;
}
.footer-col h4 {
  font-size: .78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .07em;
  color: var(--color-ink-50, #718096);
  margin: 0 0 14px;
}
.footer-col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 9px; }
.footer-col ul a {
  font-size: .875rem;
  color: var(--color-ink-70, #4A5568);
  text-decoration: none;
  transition: color 180ms ease;
}
.footer-col ul a:hover { color: var(--color-ink, #202A36); text-decoration: underline; }

/* Aviso de almacenamiento dentro del footer */
.site-footer .storage-notice {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: var(--color-lavender-light, #EDE6F7);
  border: 1px solid var(--color-lavender, #D8C9F0);
  border-radius: 14px;
  padding: 16px;
  margin-top: 4px;
}
.site-footer .storage-notice-icon { font-size: 1.25rem; flex-shrink: 0; margin-top: 1px; }
.site-footer .storage-notice-text { font-size: .8rem; line-height: 1.6; color: var(--color-ink-70, #4A5568); }
.site-footer .storage-notice-text strong { display: block; font-weight: 700; color: var(--color-ink, #202A36); margin-bottom: 2px; }

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding-top: 28px;
  border-top: 1px solid var(--color-border, #E8E4DC);
  font-size: .8rem;
  color: var(--color-ink-50, #718096);
}
.footer-legal-links { display: flex; gap: 20px; }
.footer-legal-links a { color: var(--color-ink-70, #4A5568); text-decoration: none; transition: color 180ms ease; }
.footer-legal-links a:hover { color: var(--color-ink, #202A36); text-decoration: underline; }
`;

// ---------------------------------------------------------------------------
// Inject CSS once
// ---------------------------------------------------------------------------

let cssInjected = false;

function injectCSS() {
  if (cssInjected) return;
  const style = document.createElement('style');
  style.id = 'elevia-nav-styles';
  style.textContent = NAV_CSS;
  document.head.appendChild(style);
  cssInjected = true;
}

// ---------------------------------------------------------------------------
// Build dropdown HTML
// ---------------------------------------------------------------------------

function buildDropdownHTML() {
  const items = TOOLS.map((tool) => {
    const href = resolve(tool.href);
    const activeClass = isActive(href) ? ' active' : '';
    return `
      <a href="${href}" class="${activeClass}">
        <span class="nav-dropdown-icon">${tool.icon}</span>
        ${tool.label}
      </a>`;
  }).join('');

  return `
    <div class="nav-dropdown" id="tools-dropdown" role="menu" aria-label="Herramientas">
      ${items}
      <div class="nav-dropdown-divider"></div>
      <a href="${resolve('tools.html')}">
        <span class="nav-dropdown-icon">🧰</span>
        Ver todas las herramientas
      </a>
    </div>`;
}

// ---------------------------------------------------------------------------
// Build mobile menu HTML
// ---------------------------------------------------------------------------

function buildMobileMenuHTML() {
  const toolLinks = TOOLS.map((tool) => {
    const href = resolve(tool.href);
    const activeClass = isActive(href) ? ' active' : '';
    return `
      <li>
        <a href="${href}" class="nav-mobile-tool-link${activeClass}">
          <span>${tool.icon}</span> ${tool.label}
        </a>
      </li>`;
  }).join('');

  return `
    <!-- Mobile overlay -->
    <div class="nav-mobile-overlay" id="nav-overlay" aria-hidden="true"></div>

    <!-- Mobile panel -->
    <nav class="nav-mobile-panel" id="nav-mobile-panel" aria-label="Menú de navegación móvil">
      <div class="nav-mobile-header">
        <a class="nav-mobile-logo" href="${resolve('index.html') || '/index.html'}" aria-label="Elevia Startups — Inicio">
          <span class="nav-logo-mark">
            <img src="${resolveRoot('favicon.svg')}" alt="" width="28" height="28" />
          </span>
          <span class="nav-logo-text">Elevia <span>Startups</span></span>
        </a>
        <button class="nav-mobile-close" id="nav-mobile-close" aria-label="Cerrar menú">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <ul class="nav-mobile-list" role="list">
        <li><a href="${resolve('index.html') || '/index.html'}" ${isActive('index.html') ? 'class="active"' : ''}>Inicio</a></li>
        <li class="nav-mobile-group-label" aria-hidden="true">Herramientas</li>
        ${toolLinks}
        <li><a href="${resolve('tools.html')}" ${isActive('tools.html') ? 'class="active"' : ''}>Ver todas las herramientas</a></li>
        <li class="nav-mobile-group-label" aria-hidden="true">Más</li>
        <li><a href="${resolve('investor-deck.html')}" ${isActive('investor-deck.html') ? 'class="active"' : ''}>Guía Investor Deck</a></li>
        <li><a href="${resolve('startup-report.html')}" ${isActive('startup-report.html') ? 'class="active"' : ''}>Mi Informe</a></li>
        <li><a href="${resolve('deck-review.html')}" ${isActive('deck-review.html') ? 'class="active"' : ''}>Revisión de Decks</a></li>
        <li><a href="${resolve('mentoria.html')}" ${isActive('mentoria.html') ? 'class="active"' : ''}>Mentoría para Startups <span class="badge badge-peach" style="font-size:0.68rem; padding: 2px 6px; margin-left: 6px;">De pago</span></a></li>
        <li><a href="${resolve('about.html')}" ${isActive('about.html') ? 'class="active"' : ''}>Acerca de</a></li>
      </ul>

      <a class="nav-mobile-cta" href="${resolve('tools.html')}">
        🚀 Explorar herramientas
      </a>
    </nav>`;
}

// ---------------------------------------------------------------------------
// Build header HTML
// ---------------------------------------------------------------------------

function buildHeaderHTML(activePage) {
  const navItems = [
    { label: 'Inicio',             href: 'index.html',        key: 'home' },
    { label: 'Guía Investor Deck', href: 'investor-deck.html', key: 'investor-deck' },
    { label: 'Mi Informe',         href: 'startup-report.html', key: 'startup-report' },
    { label: 'Revisión de Decks',  href: 'deck-review.html',  key: 'deck-review' },
    { label: 'Mentoría',           href: 'mentoria.html',     key: 'mentoria' },
    { label: 'Acerca de',          href: 'about.html',        key: 'about' },
  ];

  // Build standard desktop links (excluding Herramientas, injected separately)
  const desktopLinks = navItems.map(({ label, href, key }) => {
    const resolved = resolve(href);
    const active = (activePage === key || isActive(resolved)) ? ' active' : '';
    return `<li><a href="${resolved}" class="${active.trim()}">${label}</a></li>`;
  });

  // Insert Herramientas dropdown after Inicio
  const toolsActive = activePage === 'tools' || TOOLS.some(t => isActive(resolve(t.href)));
  desktopLinks.splice(1, 0, `
    <li>
      <button
        class="nav-dropdown-toggle${toolsActive ? ' active' : ''}"
        id="tools-toggle"
        aria-haspopup="true"
        aria-expanded="false"
        aria-controls="tools-dropdown"
      >
        Herramientas
        <svg class="chevron" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <polyline points="2,4 7,10 12,4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      ${buildDropdownHTML()}
    </li>`
  );

  return `
    <header class="site-header" id="site-header" role="banner">
      <div class="nav-inner">
        <!-- Logo -->
        <a class="nav-logo" href="${resolve('index.html') || '/index.html'}" aria-label="Elevia Startups — Inicio">
          <span class="nav-logo-mark">
            <img src="${resolveRoot('favicon.svg')}" alt="" width="30" height="30" />
          </span>
          <span class="nav-logo-text">Elevia <span>Startups</span></span>
        </a>

        <!-- Desktop navigation -->
        <ul class="nav-links" role="list">
          ${desktopLinks.join('')}
        </ul>

        <!-- CTA -->
        <a class="nav-cta" href="${resolve('tools.html')}">
          Explorar herramientas
        </a>

        <!-- Hamburger (mobile) -->
        <button
          class="nav-hamburger"
          id="nav-hamburger"
          aria-label="Abrir menú de navegación"
          aria-expanded="false"
          aria-controls="nav-mobile-panel"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <line class="hamburger-bar hb-top"    x1="3" y1="6"  x2="21" y2="6"  stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <line class="hamburger-bar hb-mid"    x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <line class="hamburger-bar hb-bottom" x1="3" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </header>

    ${buildMobileMenuHTML()}`;
}

// ---------------------------------------------------------------------------
// Wire up interactivity
// ---------------------------------------------------------------------------

function setupInteractivity() {
  const header      = document.getElementById('site-header');
  const hamburger   = document.getElementById('nav-hamburger');
  const mobilePanel = document.getElementById('nav-mobile-panel');
  const overlay     = document.getElementById('nav-overlay');
  const closeBtn    = document.getElementById('nav-mobile-close');
  const toolsToggle = document.getElementById('tools-toggle');
  const dropdown    = document.getElementById('tools-dropdown');

  // --- 1. Scroll class ---
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial check

  // --- 2. Mobile menu open/close helpers ---
  function openMobileMenu() {
    mobilePanel.classList.add('open');
    overlay.classList.add('visible');
    header.classList.add('menu-open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Cerrar menú de navegación');
    // Trigger overlay fade-in on next frame
    requestAnimationFrame(() => overlay.classList.add('active'));
    // Trap focus: move focus into panel
    closeBtn.focus();
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobilePanel.classList.remove('open');
    overlay.classList.remove('active');
    header.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menú de navegación');
    document.body.style.overflow = '';
    // Remove overlay display after transition
    setTimeout(() => overlay.classList.remove('visible'), 300);
    hamburger.focus();
  }

  // --- 3. Hamburger toggle ---
  hamburger.addEventListener('click', () => {
    const isOpen = mobilePanel.classList.contains('open');
    isOpen ? closeMobileMenu() : openMobileMenu();
  });

  // --- 4. Close on overlay click ---
  overlay.addEventListener('click', closeMobileMenu);

  // --- 5. Close on mobile close button ---
  closeBtn.addEventListener('click', closeMobileMenu);

  // --- 6. Close on Escape ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobilePanel.classList.contains('open')) {
        closeMobileMenu();
      }
      if (dropdown.classList.contains('open')) {
        closeDropdown();
        toolsToggle.focus();
      }
    }
  });

  // --- 7. Desktop dropdown ---
  function openDropdown() {
    dropdown.classList.add('open');
    toolsToggle.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown() {
    dropdown.classList.remove('open');
    toolsToggle.setAttribute('aria-expanded', 'false');
  }

  toolsToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.contains('open');
    isOpen ? closeDropdown() : openDropdown();
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!toolsToggle.contains(e.target) && !dropdown.contains(e.target)) {
      closeDropdown();
    }
  });

  // Close dropdown when focus leaves
  document.addEventListener('focusin', (e) => {
    if (!toolsToggle.contains(e.target) && !dropdown.contains(e.target)) {
      closeDropdown();
    }
  });

  // Keyboard navigation inside dropdown
  toolsToggle.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openDropdown();
      /** @type {HTMLAnchorElement|null} */
      const firstLink = dropdown.querySelector('a');
      if (firstLink) firstLink.focus();
    }
  });
}

/**
 * Automatically inject standard compliant favicons into <head> if not already present.
 */
function ensureFavicons() {
  if (typeof document === 'undefined' || !document.head) return;
  if (!document.querySelector('link[rel="apple-touch-icon"]')) {
    const link = document.createElement('link');
    link.rel = 'apple-touch-icon';
    link.sizes = '180x180';
    link.href = resolveRoot('apple-touch-icon.png');
    document.head.appendChild(link);
  }
  if (!document.querySelector('link[rel="icon"][type="image/svg+xml"]')) {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = resolveRoot('favicon.svg');
    document.head.appendChild(link);
  }
  if (!document.querySelector('link[rel="icon"][sizes="48x48"]')) {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.sizes = '48x48';
    link.href = resolveRoot('favicon-48x48.png');
    document.head.appendChild(link);
  }
  if (!document.querySelector('link[rel="icon"][sizes="96x96"]')) {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.sizes = '96x96';
    link.href = resolveRoot('favicon-96x96.png');
    document.head.appendChild(link);
  }
}

// ---------------------------------------------------------------------------
// Public: initNav
// ---------------------------------------------------------------------------

/**
 * Initializes the navigation header.
 * Call this in every page's DOMContentLoaded.
 *
 * @param {{ activePage?: string }} options
 *   activePage — one of: 'home' | 'tools' | 'investor-deck' | 'deck-review' | 'about'
 */
export function initNav(options = {}) {
  const { activePage = '' } = options;

  injectCSS();
  ensureFavicons();

  const container = document.createElement('div');
  container.innerHTML = buildHeaderHTML(activePage);

  const newHeader = container.querySelector('#site-header');
  const mobileOverlay = container.querySelector('#nav-overlay');
  const mobilePanel = container.querySelector('#nav-mobile-panel');

  const existingHeader = document.getElementById('site-header');
  if (existingHeader && newHeader) {
    existingHeader.replaceWith(newHeader);
  } else if (newHeader) {
    document.body.insertBefore(newHeader, document.body.firstChild);
  }

  // Remove any previously injected overlay/panel if any
  document.getElementById('nav-overlay')?.remove();
  document.getElementById('nav-mobile-panel')?.remove();

  if (mobileOverlay) document.body.appendChild(mobileOverlay);
  if (mobilePanel) document.body.appendChild(mobilePanel);

  setupInteractivity();
}

// ---------------------------------------------------------------------------
// Build footer HTML
// ---------------------------------------------------------------------------

function buildFooterHTML() {
  const toolLinks = TOOLS.map(tool => `
    <li><a href="${resolve(tool.href)}">${tool.icon} ${tool.label}</a></li>
  `).join('');

  const year = new Date().getFullYear();

  return `
    <footer class="site-footer" id="site-footer" role="contentinfo">
      <div class="footer-inner">

        <div class="footer-top">

          <!-- Brand column -->
          <div class="footer-brand">
            <a class="footer-logo" href="${resolve('index.html') || '/index.html'}" style="display:inline-flex; align-items:center; gap:9px;">
              <span class="nav-logo-mark"><img src="${resolveRoot('favicon.svg')}" alt="" width="26" height="26" style="border-radius:6px; display:block;" /></span>
              <span>Elevia <span>Startups</span></span>
            </a>
            <p>
              Herramientas gratuitas para founders que quieren tomar mejores
              decisiones con datos reales. Todo funciona en tu navegador —
              sin registro, sin servidores.
            </p>
            <!-- Storage notice -->
            <div class="storage-notice" role="note" aria-label="Aviso sobre almacenamiento local">
              <div class="storage-notice-icon">🔒</div>
              <div class="storage-notice-text">
                <strong>Privacidad garantizada</strong>
                Todos tus datos se guardan exclusivamente en el
                <em>localStorage</em> de tu navegador. Nunca enviamos
                información a ningún servidor externo.
              </div>
            </div>
          </div>

          <!-- Herramientas column -->
          <div class="footer-col">
            <h4>Herramientas</h4>
            <ul>
              ${toolLinks}
            </ul>
          </div>

          <!-- Recursos column -->
          <div class="footer-col">
            <h4>Recursos y Servicios</h4>
            <ul>
              <li><a href="${resolve('startup-report.html')}">Mi Informe de Startup</a></li>
              <li><a href="${resolve('investor-deck.html')}">Guía Investor Deck</a></li>
              <li><a href="${resolve('deck-review.html')}">Revisión de Decks</a></li>
              <li><a href="${resolve('mentoria.html')}">Mentoría para Startups <span style="font-size:0.75rem; color:var(--color-accent-peach); font-weight:700;">(De pago)</span></a></li>
              <li><a href="${resolve('tools.html')}">Todas las herramientas</a></li>
            </ul>
          </div>

          <!-- Empresa column -->
          <div class="footer-col">
            <h4>Empresa</h4>
            <ul>
              <li><a href="${resolve('about.html')}">Acerca de</a></li>
              <li><a href="${resolve('privacy.html')}">Política de privacidad</a></li>
              <li><a href="${resolve('legal.html')}">Aviso legal</a></li>
            </ul>
          </div>

        </div><!-- /.footer-top -->

        <!-- Bottom bar -->
        <div class="footer-bottom">
          <span>© ${year} Elevia Startups. Hecho con ❤️ para founders hispanohablantes.</span>
          <nav class="footer-legal-links" aria-label="Navegación legal">
            <a href="${resolve('privacy.html')}">Privacidad</a>
            <a href="${resolve('legal.html')}">Aviso Legal</a>
            <a href="${resolve('about.html')}">Acerca de</a>
          </nav>
        </div>

      </div><!-- /.footer-inner -->
    </footer>`;
}

// ---------------------------------------------------------------------------
// Public: initFooter
// ---------------------------------------------------------------------------

/**
 * Injects the site footer at the end of <body>.
 * Includes navigation links, about/legal text, storage notice, and copyright.
 */
export function initFooter() {
  const container = document.createElement('div');
  container.innerHTML = buildFooterHTML();
  const newFooter = container.querySelector('.site-footer');
  const existingFooter = document.getElementById('site-footer');

  if (existingFooter && newFooter) {
    existingFooter.replaceWith(newFooter);
  } else if (newFooter) {
    document.body.appendChild(newFooter);
  }
}
