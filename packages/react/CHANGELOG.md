# @e412/rnui-react

## 0.2.0

### Minor Changes

- 400de51: **Breaking:** CodeBlock no longer bundles shiki's full grammar registry. Referencing the bundled language/theme maps forced every consumer's bundler to emit a chunk per grammar (~280 chunks / ~12 MB of build output) even when a single language was rendered. CodeBlock now ships with no languages or themes registered and renders code as plain text until a highlighter is provided.

  Migration — pick one:
  - **Register what you render** (recommended): `pnpm add @shikijs/langs @shikijs/themes`, then build a highlighter with `createCodeBlockHighlighter({ langs: { bash: () => import('@shikijs/langs/bash') }, themes: { 'github-light-default': () => import('@shikijs/themes/github-light-default'), 'github-dark-default': () => import('@shikijs/themes/github-dark-default') } })` and pass it via `<CodeBlockHighlighterProvider highlighter={...}>` or the new `highlighter` prop.
  - **Keep today's zero-config behavior**: `import { fullShikiHighlighter } from '@e412/rnui-react/code-block-full'` and provide it the same way. This subpath is the explicit opt-in to the full registry's build cost.

  Also:
  - Unregistered or unknown languages degrade to visible plain text.
  - `CodeBlockTheme` is now `{ light: string; dark: string }` (theme names are whatever your highlighter registered, not just shiki's bundled names).
  - Fixed type errors in JsonViewer's collapsible sections (Base UI `Collapsible` has no `asChild` prop).

### Patch Changes

- @e412/rnui-themes@0.2.0

## 0.1.1

### Patch Changes

- f34e5ba: Make the package tree-shakable and drop the shiki wasm engine.
  - Build with `preserveModules` and declare `sideEffects: false`, so consumers only bundle the components they actually import (importing `Button` went from ~78KB of retained library code plus every dependency down to ~3KB and four imports). Per-file `"use client"` directives are now preserved in dist.
  - `CodeBlock` now composes its highlighter from fine-grained shiki (`shiki/core` + lazy language/theme imports) with the JavaScript regex engine instead of the full bundle — same API, no 456KB `onig.wasm` fetched at runtime, and no wasm for consumer bundlers to choke on.
  - @e412/rnui-themes@0.1.1

## 0.1.0

### Minor Changes

- a1652d6: Initial public release.

### Patch Changes

- Updated dependencies [a1652d6]
  - @e412/rnui-themes@0.1.0
