// Polyfill `require` for ESM modules that contain CJS interop code from
// Rolldown. Some bundled CJS dependencies (e.g. use-sync-external-store)
// call `require('react')` which Rolldown wraps in a polyfill that checks
// `typeof require`. In Node.js ESM contexts `require` is not defined, so
// the polyfill throws. This preload script makes `require` available
// globally via `createRequire`.
import { createRequire } from 'node:module'

if (typeof globalThis.require === 'undefined') {
  globalThis.require = createRequire(import.meta.url)
}
