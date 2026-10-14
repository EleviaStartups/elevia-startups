# Elevia Startups — Primera Versión Funcional

> **«De la idea a una startup preparada para crecer»**

**Elevia Startups** es una plataforma digital de herramientas gratuitas, interactivas y rigurosas para emprendedores y fundadores de startups. Permite validar mercados, estructurar objetivos trimestrales con metodología OKR, definir el perfil de cliente ideal (ICP), valorar la compañía mediante 7 metodologías reconocidas del ecosistema inversor, simular la dilución en rondas de financiación, analizar unit economics (CAC y LTV) y proyectar la tesorería y el runway a 12 meses.

La plataforma está diseñada bajo el principio de **«Calma tecnológica»**: una experiencia visual moderna, limpia, acogedora y libre de estrés, alejada de la frialdad de las hojas de cálculo tradicionales o de los programas financieros anticuados.

---

## 🎨 1. Identidad Visual: «Calma Tecnológica»

La plataforma utiliza una paleta cromática centralizada mediante variables CSS globales en [`src/css/tokens.css`](file:///C:/Users/34717/.gemini/antigravity/scratch/elevia-startups/src/css/tokens.css):

| Color | Código HEX | Rol en la interfaz |
|---|---|---|
| **Marfil** | `#F7F5F0` | Fondo principal acogedor y luminoso |
| **Azul tinta** | `#202A36` | Texto principal, contrastes y títulos |
| **Verde salvia** | `#B9D8C2` | Progreso, acciones positivas y tracción |
| **Lavanda pastel** | `#D8C9F0` | Planificación, estrategia y elementos secundarios |
| **Melocotón pastel** | `#F0C6A8` | Avisos, unit economics y métricas de adquisición |
| **Blanco** | `#FFFFFF` | Superficies de tarjetas, paneles y campos de entrada |

- **Tipografía:** [Manrope](https://fonts.google.com/specimen/Manrope) e Inter para texto general; JetBrains Mono para cifras y fórmulas.
- **Microinteracciones:** Transiciones suaves de 180 a 280 milisegundos centralizadas en tokens.
- **Accesibilidad:** Respeto estricto a `prefers-reduced-motion`, contraste certificado y navegación por teclado.

---

## 🧰 2. Catálogo de Herramientas Implementadas

Cada herramienta cuenta con una página propia independiente, explicaciones educativas, cálculos verificables en tiempo real, persistencia local y opciones de exportación:

1. **[Calculadora TAM / SAM / SOM](file:///C:/Users/34717/.gemini/antigravity/scratch/elevia-startups/pages/tools/tam-sam-som.html):**
   - Enfoques **Top-down** y **Bottom-up**.
   - Selector de divisas (EUR, USD, GBP, MXN, COP) y periodicidad (anual o mensual).
   - Generación automática de escenarios (Conservador, Base, Optimista).
   - Detección de incoherencias y gráfico de barras comparativo.

2. **[Constructor de OKR](file:///C:/Users/34717/.gemini/antigravity/scratch/elevia-startups/pages/tools/okr-builder.html):**
   - Jerarquía visual completa: **Objetivo → Resultados Clave (KR) → Iniciativas / Tareas**.
   - **Distinción metodológica estricta:** el avance de un KR se calcula por su métrica cuantitativa real, no por el mero conteo de tareas completadas.
   - Reordenación accesible de objetivos y KRs, con exportación e importación en JSON.

3. **[Creador de ICP (Perfil de Cliente Ideal)](file:///C:/Users/34717/.gemini/antigravity/scratch/elevia-startups/pages/tools/icp-creator.html):**
   - Asistente guiado adaptable a modelos **B2C**, **B2B** y **B2B2C**.
   - Carga y previsualización de imagen 100% local (FileReader API, sin subida a servidores).
   - Matriz de certidumbre para clasificar supuestos en: 💡 Hipótesis, ✅ Validado o ⏳ Pendiente.
   - Generación de ficha ejecutiva imprimible y exportable.

4. **[Valoración de Startups (7 Métodos)](file:///C:/Users/34717/.gemini/antigravity/scratch/elevia-startups/pages/tools/startup-valuation.html):**
   - Basada en el marco de la guía de David Páez.
   - Selector de fase (Idea, Pre-seed, Seed, Growth, Series A, Consolidada) con recomendaciones automáticas.
   - **Los 7 métodos completamente funcionales:**
     1. *Método Berkus* (5 componentes de des-riesgo, techo configurable).
     2. *Método Scorecard / Payne* (comparables ponderados y multiplicador relativo).
     3. *Venture Capital Method* (exit proyectado, múltiplo de retorno y cálculo pre/post-money).
     4. *Múltiplos de facturación* (rango inferior, central y superior sobre ARR).
     5. *Descuento de Flujos de Caja (DCF)* (flujos libres a 5 años, tasa WACC y valor terminal Gordon validando $g < r$).
     6. *Risk Factor Summation* (valoración base con ajustes en 12 áreas operativas).
     7. *Transacciones Comparables* (análisis de mediana y dispersión).
   - Triangulación de resultados, análisis de sensibilidad (±20%) e informe profesional imprimible.

5. **[Calculadora de Dilución de Socios](file:///C:/Users/34717/.gemini/antigravity/scratch/elevia-startups/pages/tools/dilution-calculator.html):**
   - Simulación de ronda de capital directo con valoración pre-money y nueva inversión.
   - Editor dinámico de fundadores con validación del 100% de capital pre-ronda.
   - Tabla comparativa de cap table (antes vs después) y gráfico circular (donut).

6. **[Calculadora CAC / LTV y Unit Economics](file:///C:/Users/34717/.gemini/antigravity/scratch/elevia-startups/pages/tools/cac-ltv.html):**
   - Modelos de **Suscripción recurrente (SaaS)** y **Transaccional / Compra única**.
   - Análisis global y desglose por canal de captación publicitaria.
   - Cálculo de CAC, LTV, ratio LTV/CAC y Payback Period (tiempo de recuperación del CAC en meses).

7. **[Calculadora de Burn Rate y Runway](file:///C:/Users/34717/.gemini/antigravity/scratch/elevia-startups/pages/tools/burn-rate.html):**
   - Cálculo de burn rate bruto y burn rate neto mensual.
   - Desglose dinámico de costes por categorías y eventos puntuales (subvenciones, pagos extraordinarios).
   - Proyección de tesorería mes a mes a 12 meses y detección exacta del mes crítico de liquidez.
   - Simulación de escenarios Conservador, Base y Optimista.

---

## 📑 3. Contenidos Editoriales y Servicios

- **[Guía Visual del Investor Pitch Deck](file:///C:/Users/34717/.gemini/antigravity/scratch/elevia-startups/pages/investor-deck.html):**
  Desglose slide a slide de las 12 diapositivas estándar (Problema, Solución, Producto, Mercado, Modelo de Negocio, Tracción, Competencia, Go-to-Market, Roadmap, Equipo, Métricas y Ask). Cada diapositiva incluye qué responder, errores comunes, ejemplos ficticios y preguntas difíciles de inversores, con enlaces contextuales a las calculadoras de Elevia.

- **[Servicio de Revisión de Decks](file:///C:/Users/34717/.gemini/antigravity/scratch/elevia-startups/pages/deck-review.html):**
  Propuesta de auditoría especializada slide a slide. Incluye un preparador de briefing interactivo que permite estructurar la información, copiarla o descargarla localmente, sin formularios falsos ni promesas de envíos no conectados.

- **[Acerca de Elevia](file:///C:/Users/34717/.gemini/antigravity/scratch/elevia-startups/pages/about.html):**
  Declaración de misión, principios de producto y hoja de ruta tecnológica.

- **[Privacidad](file:///C:/Users/34717/.gemini/antigravity/scratch/elevia-startups/pages/privacy.html) y [Aviso Legal](file:///C:/Users/34717/.gemini/antigravity/scratch/elevia-startups/pages/legal.html):**
  Información prudente y transparente sobre el almacenamiento exclusivo en navegador y el carácter orientativo de las simulaciones financieras.

---

## 🏗️ 4. Estructura del Proyecto

```text
elevia-startups/
├── index.html                   # Página de inicio con catálogo y hero principal
├── robots.txt                   # Directivas para motores de búsqueda
├── sitemap.xml                  # Mapa del sitio con todas las rutas reales
├── README.md                    # Documentación técnica completa
├── .github/
│   └── workflows/
│       └── deploy.yml           # Workflow de GitHub Actions para GitHub Pages
├── pages/
│   ├── tools.html               # Catálogo completo con filtrado por categorías
│   ├── investor-deck.html       # Guía visual del pitch deck (12 diapositivas)
│   ├── investor-guide.html      # Alias / redirección a investor-deck.html
│   ├── deck-review.html         # Presentación del servicio y briefing local
│   ├── about.html               # Filosofía, valores y arquitectura
│   ├── privacy.html             # Política de privacidad local-first
│   ├── legal.html               # Términos de uso y aviso legal
│   └── tools/
│       ├── tam-sam-som.html     # Calculadora TAM / SAM / SOM
│       ├── okr-builder.html     # Constructor interactivo de OKRs
│       ├── icp-creator.html     # Creador de ICP (B2C, B2B, B2B2C)
│       ├── startup-valuation.html # Valoración de startups con 7 métodos
│       ├── dilution-calculator.html # Calculadora de dilución y cap table
│       ├── cac-ltv.html         # Calculadora de CAC, LTV y payback
│       └── burn-rate.html       # Calculadora de burn rate y runway
├── src/
│   ├── css/
│   │   ├── tokens.css           # Tokens de diseño (colores, fuentes, espaciados, motion)
│   │   ├── base.css             # Reseteo CSS, tipografía base y accesibilidad
│   │   ├── components.css       # Botones, tarjetas, formularios, badges, modales
│   │   ├── home.css             # Estilos específicos de la página de inicio
│   │   └── tools.css            # Estilos compartidos de las herramientas interactivas
│   └── js/
│       ├── config.js            # Configuración centralizada del sitio y metadatos
│       ├── components/
│       │   └── nav.js           # Cabecera sticky, menú móvil y pie de página compartidos
│       ├── tools/               # Motores de cálculo independientes (pure ES modules)
│       │   ├── tam-sam-som.calc.js
│       │   ├── okr.calc.js
│       │   ├── icp.calc.js
│       │   ├── valuation.calc.js
│       │   ├── dilution.calc.js
│       │   ├── cac-ltv.calc.js
│       │   └── burn-rate.calc.js
│       └── utils/
│           ├── charts.js        # Motor de gráficos en Canvas HTML5 (barras, donut, líneas)
│           ├── format.js        # Formateadores de moneda, porcentajes, descarga e impresión
│           └── storage.js       # Capa de abstracción sobre localStorage desacoplada
└── tests/
    ├── index.html               # Suite de pruebas unitarias visual para navegador
    ├── tests.js                 # 53 aserciones de cálculo exhaustivas en ES Modules
    ├── verify-calculations.ps1  # Script PowerShell de validación matemática (36 pruebas)
    ├── validate-paths.ps1       # Verificación automatizada de rutas de imports y CSS
    └── validate-links.ps1       # Verificación automatizada de 108 enlaces internos (0 rotos)
```

---

## 💻 5. Cómo Iniciar y Editar la Web en Local

Al tratarse de una web estática construida con HTML5 semántico, CSS moderno con variables y JavaScript modular (ES Modules), **no requiere instalación de herramientas pesadas ni pasos de compilación complejos**.

### Opción A: Abrir directamente o con cualquier servidor estático local

Puedes servir la carpeta con cualquier servidor HTTP ligero (para permitir que los módulos ES carguen sin restricciones de origen):

- **Con Python (si está instalado):**
  ```bash
  python -m http.server 8000
  ```
- **Con VS Code / Antigravity:**
  Usa la extensión **Live Server** o abre [`index.html`](file:///C:/Users/34717/.gemini/antigravity/scratch/elevia-startups/index.html) directamente.
- **Con Node.js (si se instala en el futuro):**
  ```bash
  npx serve .
  ```

---

## 🧪 6. Pruebas Unitarias y Validación

El proyecto incluye dos formas complementarias de verificar los cálculos:

1. **Vía PowerShell (en terminal):**
   ```powershell
   powershell.exe -ExecutionPolicy Bypass -File "tests/verify-calculations.ps1"
   ```
   *Resultado:* Valida automáticamente las 36 aserciones de cálculo crítico (Berkus, Scorecard, DCF, VC Method, TAM/SAM/SOM, Dilución, LTV/CAC, Runway y OKRs).

2. **Vía Navegador Web:**
   Abre [`tests/index.html`](file:///C:/Users/34717/.gemini/antigravity/scratch/elevia-startups/tests/index.html) en cualquier navegador moderno para inspeccionar los resultados de prueba visualmente.

---

## 🌐 7. Publicación en GitHub Pages

El proyecto está listo para publicarse en GitHub Pages:

1. **Subir al repositorio de GitHub:**
   Crea tu repositorio en GitHub y sube los archivos de la carpeta `elevia-startups`.
2. **Activar GitHub Pages:**
   - En tu repositorio de GitHub, ve a **Settings** → **Pages**.
   - En **Build and deployment** → **Source**, selecciona **GitHub Actions**.
   - El workflow incluido en `.github/workflows/deploy.yml` compilará y publicará la web automáticamente.
3. **Adaptar la ruta base si es necesario:**
   Si tu repositorio se publica bajo un subdirectorio (ej. `https://usuario.github.io/mi-repo/`), los enlaces relativos automáticos ya están configurados en [`src/js/components/nav.js`](file:///C:/Users/34717/.gemini/antigravity/scratch/elevia-startups/src/js/components/nav.js) y se adaptan tanto a dominios raíz como a subcarpetas.

---

## 🔒 8. Estado de Funcionalidades y Privacidad

- **Funcionalidades 100% implementadas:**
  - Identidad visual completa "Calma tecnológica".
  - Todas las 7 herramientas interactivas operativas con cálculos en tiempo real.
  - Almacenamiento y recuperación local (`localStorage`).
  - Exportación de archivos JSON, gráficos PNG e impresión formateada.
  - Guía completa de investor deck con 12 secciones y enlaces cruzados.
  - Generador de briefing para revisión de presentaciones.
  - SEO técnico con metadatos Open Graph, `robots.txt` y `sitemap.xml`.

- **Funcionalidades no implementadas (preparadas para futuras fases):**
  - Registro de usuarios y autenticación.
  - Sincronización en la nube multi-dispositivo (Supabase).
  - Pasarela de cobros reales para la revisión de decks.
  - Conexión con modelos de IA externos.

*Los cálculos de Elevia Startups son herramientas didácticas de simulación y no constituyen asesoramiento financiero, jurídico ni fiscal.*
