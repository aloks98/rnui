#!/usr/bin/env node
/**
 * Generates presets.css from individual theme CSS files.
 * Converts :root { } → [data-theme="name"] { }
 * Converts .dark { } → [data-theme="name"].dark, .dark [data-theme="name"] { }
 *
 * Run: node scripts/generate-presets.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = join(__dirname, '..', 'src');

const themeNames = ['oxide', 'ocean', 'violet', 'forest', 'rose', 'amber', 'slate', 'crimson'];

let output = `/* Auto-generated from theme source files — do not edit directly.
 * Run: node scripts/generate-presets.mjs
 *
 * Usage:
 *   @import '@e412/rnui-themes';
 *   @import '@e412/rnui-themes/presets';
 *
 *   <html data-theme="ocean">
 *   <html data-theme="ocean" class="dark">
 *
 * Custom themes:
 *   [data-theme="brand"] { --primary: ...; }
 *   [data-theme="brand"].dark, .dark [data-theme="brand"] { ... }
 */

`;

for (const name of themeNames) {
  const raw = readFileSync(join(srcDir, `${name}.css`), 'utf-8');

  // Extract comment header (first /* ... */ block)
  const commentMatch = raw.match(/\/\*[\s\S]*?\*\//);
  const comment = commentMatch ? commentMatch[0] : '';

  // Extract :root { ... } block content
  const rootMatch = raw.match(/:root\s*\{([\s\S]*?)\n\}/);
  const rootVars = rootMatch ? rootMatch[1] : '';

  // Extract .dark { ... } block content (everything between .dark { and the closing })
  const darkMatch = raw.match(/\.dark\s*\{([\s\S]*?)\n\}/);
  const darkVars = darkMatch ? darkMatch[1] : '';

  output += `/* ${name.charAt(0).toUpperCase() + name.slice(1)} */\n`;
  output += `[data-theme="${name}"] {${rootVars}\n}\n\n`;
  output += `[data-theme="${name}"].dark,\n.dark [data-theme="${name}"] {${darkVars}\n}\n\n`;
}

writeFileSync(join(srcDir, 'presets.css'), output);
console.log(`Generated presets.css with ${themeNames.length} themes`);
