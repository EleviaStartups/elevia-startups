/**
 * @fileoverview storage.js — Elevia Startups
 * A clean abstraction layer over localStorage.
 *
 * All Elevia keys use the prefix "elevia_" to namespace our data and
 * avoid collisions with third-party scripts on the same origin.
 *
 * Designed to be swappable: replace this module's internals with
 * Supabase, IndexedDB, or any other backend without touching tool code.
 */

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Namespace prefix applied to every key managed by this module. */
const ELEVIA_PREFIX = 'elevia_';

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Resolves the full storage key, adding the Elevia prefix if not present.
 * This keeps callers from needing to know about the prefix themselves.
 *
 * @param {string} key
 * @returns {string}
 */
function resolveKey(key) {
  return key.startsWith(ELEVIA_PREFIX) ? key : `${ELEVIA_PREFIX}${key}`;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Checks whether localStorage is available and writable in the current
 * environment. Some browsers disable storage in private/incognito mode or
 * when the user has blocked site data.
 *
 * @returns {boolean}
 */
export function isStorageAvailable() {
  try {
    const testKey = `${ELEVIA_PREFIX}__storage_test__`;
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Saves data to localStorage with error handling.
 * The value is JSON-serialised before writing, so any JSON-compatible type
 * (object, array, string, number, boolean, null) is accepted.
 *
 * Common failure modes handled:
 *  - QuotaExceededError  — storage is full
 *  - SecurityError       — storage blocked by browser policy
 *  - JSON.stringify fail — circular references, BigInt, etc.
 *
 * @param {string} key  - Storage key (the "elevia_" prefix is added automatically)
 * @param {any}    data - Data to persist
 * @returns {{ success: boolean, error?: string }}
 */
export function saveData(key, data) {
  if (!key || typeof key !== 'string') {
    return { success: false, error: 'Invalid key: must be a non-empty string.' };
  }

  let serialised;
  try {
    serialised = JSON.stringify(data);
  } catch (err) {
    return { success: false, error: `Serialisation failed: ${err.message}` };
  }

  try {
    localStorage.setItem(resolveKey(key), serialised);
    return { success: true };
  } catch (err) {
    // DOMException name is the most reliable way to identify quota errors
    // across browsers (Chrome: QuotaExceededError, Firefox: NS_ERROR_DOM_QUOTA_REACHED)
    const isQuota =
      err instanceof DOMException &&
      (err.name === 'QuotaExceededError' ||
        err.name === 'NS_ERROR_DOM_QUOTA_REACHED');

    return {
      success: false,
      error: isQuota
        ? 'Storage quota exceeded. Free up space by removing unused data.'
        : `Storage write failed: ${err.message}`,
    };
  }
}

/**
 * Loads data from localStorage.
 * Returns `defaultValue` when the key does not exist or the stored value
 * cannot be parsed (e.g. corrupted JSON written by an older version).
 *
 * @param {string} key          - Storage key (prefix added automatically)
 * @param {any}    [defaultValue=null] - Fallback when key is absent or unreadable
 * @returns {any}
 */
export function loadData(key, defaultValue = null) {
  if (!key || typeof key !== 'string') return defaultValue;

  try {
    const raw = localStorage.getItem(resolveKey(key));
    if (raw === null) return defaultValue; // key not found
    return JSON.parse(raw);
  } catch {
    // Corrupted entry — treat as if the key does not exist
    return defaultValue;
  }
}

/**
 * Removes a single key from localStorage.
 * Silently succeeds even if the key does not exist or storage is unavailable.
 *
 * @param {string} key - Storage key (prefix added automatically)
 * @returns {void}
 */
export function removeData(key) {
  if (!key || typeof key !== 'string') return;
  try {
    localStorage.removeItem(resolveKey(key));
  } catch {
    // Non-critical — best-effort removal
  }
}

/**
 * Returns all storage keys that belong to Elevia (i.e. start with "elevia_").
 * Useful for building export/import features or debugging stored state.
 *
 * @returns {string[]} Full localStorage keys (including the prefix)
 */
export function listEleviaKeys() {
  const keys = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(ELEVIA_PREFIX)) {
        keys.push(k);
      }
    }
  } catch {
    // Storage unavailable — return empty list
  }
  return keys;
}

/**
 * Exports all Elevia data as a pretty-printed JSON string.
 * The exported object maps each full storage key to its parsed value.
 *
 * Example output:
 * ```json
 * {
 *   "elevia_burn_rate": { "monthly": 12000 },
 *   "elevia_cap_table": [ ... ]
 * }
 * ```
 *
 * Returns an empty JSON object string ("{}") when nothing is stored or
 * storage is unavailable.
 *
 * @returns {string}
 */
export function exportAllData() {
  const snapshot = {};
  const keys = listEleviaKeys();

  for (const fullKey of keys) {
    try {
      const raw = localStorage.getItem(fullKey);
      // Store the parsed value so the export is human-readable JSON
      snapshot[fullKey] = raw !== null ? JSON.parse(raw) : null;
    } catch {
      // If a value is unparseable, export its raw string to preserve it
      try {
        snapshot[fullKey] = localStorage.getItem(fullKey);
      } catch {
        // Skip unreadable entries
      }
    }
  }

  try {
    return JSON.stringify(snapshot, null, 2);
  } catch {
    return '{}';
  }
}

/**
 * Imports Elevia data from a JSON string (e.g. previously exported via
 * `exportAllData`). Only keys prefixed with "elevia_" are written; any
 * other keys present in the JSON are silently ignored for safety.
 *
 * Each valid entry is written individually so a single quota error
 * doesn't block the entire import — partial success is reported via
 * the `imported` count.
 *
 * @param {string} jsonString - JSON-encoded object of { [eleviaKey]: value }
 * @returns {{ success: boolean, imported: number, error?: string }}
 */
export function importAllData(jsonString) {
  if (typeof jsonString !== 'string' || jsonString.trim() === '') {
    return { success: false, imported: 0, error: 'Input must be a non-empty string.' };
  }

  let parsed;
  try {
    parsed = JSON.parse(jsonString);
  } catch (err) {
    return { success: false, imported: 0, error: `Invalid JSON: ${err.message}` };
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    return {
      success: false,
      imported: 0,
      error: 'Import data must be a JSON object, not an array or primitive.',
    };
  }

  let imported = 0;
  const errors = [];

  for (const [key, value] of Object.entries(parsed)) {
    // Security guard: only import Elevia-namespaced keys
    if (!key.startsWith(ELEVIA_PREFIX)) continue;

    try {
      localStorage.setItem(key, JSON.stringify(value));
      imported++;
    } catch (err) {
      errors.push(`${key}: ${err.message}`);
    }
  }

  if (errors.length > 0) {
    return {
      success: imported > 0, // partial success if at least one key was written
      imported,
      error: `Some entries could not be imported: ${errors.join('; ')}`,
    };
  }

  return { success: true, imported };
}
