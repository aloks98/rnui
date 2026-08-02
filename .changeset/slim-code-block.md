---
'@e412/rnui-react': minor
---

**Breaking:** CodeBlock no longer bundles shiki's full grammar registry. Referencing the bundled language/theme maps forced every consumer's bundler to emit a chunk per grammar (~280 chunks / ~12 MB of build output) even when a single language was rendered. CodeBlock now ships with no languages or themes registered and renders code as plain text until a highlighter is provided.

Migration — pick one:

- **Register what you render** (recommended): `pnpm add @shikijs/langs @shikijs/themes`, then build a highlighter with `createCodeBlockHighlighter({ langs: { bash: () => import('@shikijs/langs/bash') }, themes: { 'github-light-default': () => import('@shikijs/themes/github-light-default'), 'github-dark-default': () => import('@shikijs/themes/github-dark-default') } })` and pass it via `<CodeBlockHighlighterProvider highlighter={...}>` or the new `highlighter` prop.
- **Keep today's zero-config behavior**: `import { fullShikiHighlighter } from '@e412/rnui-react/code-block-full'` and provide it the same way. This subpath is the explicit opt-in to the full registry's build cost.

Also:

- Unregistered or unknown languages degrade to visible plain text.
- `CodeBlockTheme` is now `{ light: string; dark: string }` (theme names are whatever your highlighter registered, not just shiki's bundled names).
- Fixed type errors in JsonViewer's collapsible sections (Base UI `Collapsible` has no `asChild` prop).
