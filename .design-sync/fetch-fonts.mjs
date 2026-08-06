// Fetch the theme presets' brand fonts from Google Fonts as local woff2 +
// a rewritten @font-face sheet, so designs render real brand typography.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT = '/home/aloks98/projects/rnui/.design-sync/fonts';
mkdirSync(OUT, { recursive: true });

// families -> weight range actually reachable via Tailwind utilities in this DS
// (normal 400, medium 500, semibold 600, bold 700)
const FAMILIES = [
  'Bitter', 'DM Sans', 'Fraunces', 'Geist', 'Instrument Sans',
  'Nunito', 'Outfit', 'Plus Jakarta Sans', 'Sora', 'Source Sans 3',
];
// Keep the byte budget sane: latin covers the DS's own copy; latin-ext is a
// cheap safety net for accented content in designs.
const KEEP_SUBSETS = new Set(['latin', 'latin-ext']);
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const out = [];
let files = 0, bytes = 0;

for (const fam of FAMILIES) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fam)}:wght@400..700&display=swap`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) { console.error(`! ${fam}: css ${res.status}`); continue; }
  let css = await res.text();

  // Google emits one @font-face per subset, each preceded by a /* subset */ comment.
  const blocks = [...css.matchAll(/\/\*\s*([\w-\[\]]+)\s*\*\/\s*(@font-face\s*\{[^}]*\})/g)];
  let kept = 0;
  for (const [, subset, block] of blocks) {
    if (!KEEP_SUBSETS.has(subset)) continue;
    const m = /url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/.exec(block);
    if (!m) continue;
    const fontRes = await fetch(m[1], { headers: { 'User-Agent': UA } });
    if (!fontRes.ok) { console.error(`! ${fam}/${subset}: font ${fontRes.status}`); continue; }
    const buf = Buffer.from(await fontRes.arrayBuffer());
    const name = `${slug(fam)}-${subset}.woff2`;
    writeFileSync(join(OUT, name), buf);
    files++; bytes += buf.length; kept++;
    out.push(block.replace(m[0], `url(./${name})`).trim());
  }
  console.error(`  ${fam}: ${kept} face(s)`);
}

writeFileSync(
  join(OUT, 'fonts.css'),
  `/* Brand fonts for the @e412/rnui-themes presets, self-hosted so designs\n` +
  `   render real typography instead of a fallback stack.\n` +
  `   Generated from Google Fonts (all families SIL Open Font License 1.1).\n` +
  `   Regenerate: node .design-sync/fetch-fonts.mjs */\n\n` +
  out.join('\n\n') + '\n',
);
console.error(`\n${files} font file(s), ${(bytes / 1024 / 1024).toFixed(2)} MB total`);
