---
'@e412/rnui-react': patch
---

Make the package tree-shakable and drop the shiki wasm engine.

- Build with `preserveModules` and declare `sideEffects: false`, so consumers only bundle the components they actually import (importing `Button` went from ~78KB of retained library code plus every dependency down to ~3KB and four imports). Per-file `"use client"` directives are now preserved in dist.
- `CodeBlock` now composes its highlighter from fine-grained shiki (`shiki/core` + lazy language/theme imports) with the JavaScript regex engine instead of the full bundle — same API, no 456KB `onig.wasm` fetched at runtime, and no wasm for consumer bundlers to choke on.
