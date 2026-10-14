/**
 * @file okr.calc.js
 * @module tools/okr.calc
 * @description Lógica de datos pura para la herramienta OKR de Elevia Startups.
 *              Sin dependencias de DOM. Exporta funciones de creación de estructuras
 *              de datos y cálculos de progreso para Objetivos y Resultados Clave.
 */

'use strict';

// ---------------------------------------------------------------------------
// Utilidades internas
// ---------------------------------------------------------------------------

/**
 * Genera un UUID v4. Usa crypto.randomUUID() cuando está disponible;
 * de lo contrario utiliza un generador de respaldo compatible.
 * @returns {string} UUID en formato estándar.
 */
function generateId() {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID();
  }

  // Respaldo: UUID v4 aleatorio sin dependencias externas
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Devuelve la fecha ISO actual como string.
 * @returns {string}
 */
function now() {
  return new Date().toISOString();
}

// ---------------------------------------------------------------------------
// Constantes de estado
// ---------------------------------------------------------------------------

/** @enum {string} Estados válidos para un Objetivo o Resultado Clave */
export const STATUS = Object.freeze({
  SIN_INICIAR: 'sin-iniciar',
  EN_PROGRESO: 'en-progreso',
  EN_RIESGO: 'en-riesgo',
  COMPLETADO: 'completado',
});

/** @enum {string} Métricas predefinidas para un Resultado Clave */
export const METRIC = Object.freeze({
  PORCENTAJE: 'porcentaje',
  NUMERO: 'numero',
  MONEDA: 'moneda',
  BOOLEANO: 'booleano',
  PERSONALIZADO: 'personalizado',
});

// ---------------------------------------------------------------------------
// Creación de estructuras de datos
// ---------------------------------------------------------------------------

/**
 * Crea una nueva Tarea/Iniciativa asociada a un Resultado Clave.
 *
 * @param {string} keyResultId - ID del KR al que pertenece esta tarea.
 * @param {string} [title='']  - Título inicial de la tarea.
 * @returns {{
 *   id: string,
 *   keyResultId: string,
 *   title: string,
 *   description: string,
 *   owner: string,
 *   deadline: string | null,
 *   completed: boolean,
 *   createdAt: string
 * }}
 */
export function createTask(keyResultId, title = '') {
  if (typeof keyResultId !== 'string' || !keyResultId) {
    throw new Error('createTask: keyResultId debe ser un string no vacío.');
  }

  return {
    id: generateId(),
    keyResultId,
    title: String(title),
    description: '',
    owner: '',
    deadline: null,       // ISO date string o null
    completed: false,
    important: true,      // Importante (default true)
    urgent: true,         // Urgente (default true)
    createdAt: now(),
  };
}

/**
 * Crea un nuevo Resultado Clave (KR) con 3 tareas predeterminadas vacías.
 *
 * @param {string} objectiveId - ID del Objetivo al que pertenece este KR.
 * @param {string} [title='']  - Título inicial del KR.
 * @returns {{
 *   id: string,
 *   objectiveId: string,
 *   title: string,
 *   description: string,
 *   owner: string,
 *   deadline: string | null,
 *   status: string,
 *   metric: string,
 *   targetValue: number,
 *   currentValue: number,
 *   unit: string,
 *   tasks: Array<object>
 * }}
 */
export function createKeyResult(objectiveId, title = '') {
  if (typeof objectiveId !== 'string' || !objectiveId) {
    throw new Error('createKeyResult: objectiveId debe ser un string no vacío.');
  }

  const id = generateId();

  return {
    id,
    objectiveId,
    title: String(title),
    description: '',
    owner: '',
    deadline: null,                 // ISO date string o null
    status: STATUS.SIN_INICIAR,
    metric: METRIC.PORCENTAJE,
    targetValue: 100,               // valor objetivo por defecto
    currentValue: 0,                // valor actual inicial
    unit: '%',
    tasks: [
      createTask(id),
      createTask(id),
      createTask(id),
    ],
  };
}

/**
 * Crea un nuevo Objetivo con 3 Resultados Clave predeterminados vacíos.
 *
 * @param {string} [title=''] - Título inicial del objetivo.
 * @returns {{
 *   id: string,
 *   title: string,
 *   description: string,
 *   owner: string,
 *   deadline: string | null,
 *   status: string,
 *   keyResults: Array<object>,
 *   createdAt: string
 * }}
 */
export function createObjective(title = '') {
  const id = generateId();

  return {
    id,
    title: String(title),
    description: '',
    owner: '',
    deadline: null,                 // ISO date string o null
    status: STATUS.SIN_INICIAR,
    keyResults: [
      createKeyResult(id),
      createKeyResult(id),
      createKeyResult(id),
    ],
    createdAt: now(),
  };
}

// ---------------------------------------------------------------------------
// Cálculos de progreso
// ---------------------------------------------------------------------------

/**
 * Calcula el progreso de un Resultado Clave basándose en currentValue / targetValue.
 * El progreso NO se calcula a partir del estado de las tareas.
 *
 * @param {object} keyResult - Objeto KR con { currentValue, targetValue }.
 * @returns {number} Progreso entre 0 y 100 (redondeado a 2 decimales).
 */
export function calcKRProgress(keyResult) {
  const target = Number(keyResult?.targetValue);
  const current = Number(keyResult?.currentValue);

  // Sin objetivo definido o con objetivo nulo → progreso 0
  if (!Number.isFinite(target) || target === 0) return 0;
  if (!Number.isFinite(current)) return 0;

  // Clamp entre 0 y 100
  const raw = (current / target) * 100;
  return Math.min(100, Math.max(0, parseFloat(raw.toFixed(2))));
}

/**
 * Calcula el progreso global de un Objetivo como la media aritmética
 * del progreso de todos sus Resultados Clave.
 *
 * @param {object} objective - Objeto Objetivo con { keyResults: KR[] }.
 * @returns {number} Progreso entre 0 y 100 (redondeado a 2 decimales).
 */
export function calcObjectiveProgress(objective) {
  const krs = objective?.keyResults;

  if (!Array.isArray(krs) || krs.length === 0) return 0;

  const total = krs.reduce((sum, kr) => sum + calcKRProgress(kr), 0);
  const average = total / krs.length;

  return parseFloat(average.toFixed(2));
}

/**
 * Devuelve una etiqueta de estado según el valor de progreso.
 *
 * Rangos:
 *   - 0          → 'sin-iniciar'
 *   - 1 – 49     → 'en-riesgo'      (menos de la mitad)
 *   - 50 – 99    → 'en-progreso'
 *   - 100        → 'completado'
 *
 * @param {number} progress - Valor de progreso entre 0 y 100.
 * @returns {'sin-iniciar'|'en-progreso'|'en-riesgo'|'completado'}
 */
export function getProgressStatus(progress) {
  const p = Number(progress);

  if (!Number.isFinite(p) || p <= 0) return STATUS.SIN_INICIAR;
  if (p >= 100) return STATUS.COMPLETADO;
  if (p >= 50) return STATUS.EN_PROGRESO;
  return STATUS.EN_RIESGO;
}

// ---------------------------------------------------------------------------
// Utilidades de ordenamiento
// ---------------------------------------------------------------------------

/**
 * Reordena un elemento dentro de un array moviendo el índice `fromIndex`
 * a `toIndex`. Devuelve un nuevo array (inmutable; no muta el original).
 *
 * @template T
 * @param {T[]}   arr       - Array de origen.
 * @param {number} fromIndex - Índice actual del elemento a mover.
 * @param {number} toIndex   - Índice destino del elemento.
 * @returns {T[]} Nuevo array reordenado.
 */
export function reorderArray(arr, fromIndex, toIndex) {
  if (!Array.isArray(arr)) {
    throw new TypeError('reorderArray: el primer argumento debe ser un array.');
  }

  const len = arr.length;

  if (
    fromIndex < 0 || fromIndex >= len ||
    toIndex   < 0 || toIndex   >= len
  ) {
    throw new RangeError(
      `reorderArray: índices fuera de rango (from=${fromIndex}, to=${toIndex}, length=${len}).`
    );
  }

  if (fromIndex === toIndex) return [...arr];

  const result = [...arr];
  const [item] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, item);

  return result;
}

// ---------------------------------------------------------------------------
// Serialización y parseo del proyecto
// ---------------------------------------------------------------------------

/**
 * Serializa un proyecto OKR completo a JSON.
 * Añade metadatos de versión y timestamp de exportación.
 *
 * @param {object} project - Objeto del proyecto con { id, name, objectives, ... }.
 * @returns {string} JSON serializado.
 */
export function serializeProject(project) {
  if (!project || typeof project !== 'object') {
    throw new TypeError('serializeProject: se esperaba un objeto de proyecto.');
  }

  const payload = {
    _meta: {
      version: '1.0.0',
      exportedAt: now(),
      app: 'Elevia Startups – OKR Tool',
    },
    ...project,
  };

  return JSON.stringify(payload, null, 2);
}

/**
 * Parsea y valida un JSON de proyecto OKR.
 * Lanza un error descriptivo si el JSON está malformado o faltan campos clave.
 *
 * @param {string} json - Cadena JSON a parsear.
 * @returns {object} Objeto de proyecto validado (sin el campo _meta).
 * @throws {SyntaxError}  Si el JSON está malformado.
 * @throws {TypeError}    Si la estructura del proyecto no es válida.
 */
export function parseProject(json) {
  if (typeof json !== 'string' || !json.trim()) {
    throw new TypeError('parseProject: se esperaba una cadena JSON no vacía.');
  }

  let parsed;
  try {
    parsed = JSON.parse(json);
  } catch (e) {
    throw new SyntaxError(`parseProject: JSON inválido → ${e.message}`);
  }

  if (typeof parsed !== 'object' || parsed === null) {
    throw new TypeError('parseProject: el JSON no representa un objeto.');
  }

  // Extraer metadatos sin mutar el objeto de proyecto
  const { _meta, ...project } = parsed; // eslint-disable-line no-unused-vars

  // Validaciones mínimas de estructura
  if (typeof project.id !== 'string' || !project.id) {
    throw new TypeError('parseProject: el proyecto no contiene un "id" válido.');
  }

  if (!Array.isArray(project.objectives)) {
    throw new TypeError('parseProject: "objectives" debe ser un array.');
  }

  // Validación superficial de cada objetivo
  for (const [i, obj] of project.objectives.entries()) {
    if (typeof obj.id !== 'string' || !obj.id) {
      throw new TypeError(
        `parseProject: objetivo en índice ${i} no tiene un "id" válido.`
      );
    }
    if (!Array.isArray(obj.keyResults)) {
      throw new TypeError(
        `parseProject: objetivo "${obj.id}" debe tener un array "keyResults".`
      );
    }
  }

  return project;
}

/**
 * Clasifica todas las tareas de un proyecto en los 4 cuadrantes de la Matriz de Eisenhower:
 * - CI: Hacer ahora (Importante & Urgente)
 * - CII: Planificar (Importante & No urgente)
 * - CIII: Delegar (No importante & Urgente)
 * - CIV: Dejar de hacer (No importante & No urgente)
 *
 * @param {object} project - Proyecto OKR
 * @returns {{
 *   ci: Array<object>,
 *   cii: Array<object>,
 *   ciii: Array<object>,
 *   civ: Array<object>,
 *   total: number
 * }}
 */
export function getEisenhowerClassification(project) {
  const res = { ci: [], cii: [], ciii: [], civ: [], total: 0 };
  if (!project || !Array.isArray(project.objectives)) return res;

  project.objectives.forEach((obj, objIdx) => {
    (obj.keyResults || []).forEach((kr, krIdx) => {
      (kr.tasks || []).forEach((task, taskIdx) => {
        res.total++;
        const important = task.important !== false;
        const urgent = task.urgent !== false;

        const item = {
          task,
          objIdx,
          krIdx,
          taskIdx,
          objTitle: obj.title,
          krTitle: kr.title,
          objNumber: objIdx + 1,
          krNumber: `${objIdx + 1}.${krIdx + 1}`,
        };

        if (important && urgent) {
          res.ci.push(item);
        } else if (important && !urgent) {
          res.cii.push(item);
        } else if (!important && urgent) {
          res.ciii.push(item);
        } else {
          res.civ.push(item);
        }
      });
    });
  });

  return res;
}
