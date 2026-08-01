# @e412/rnui-react

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
