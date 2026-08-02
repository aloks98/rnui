// Zero-config CodeBlock highlighting: every shiki grammar and theme,
// registered lazily by name. This is a separate `@e412/rnui-react/code-block-full`
// subpath (NOT exported from the barrel) because referencing shiki's bundled
// maps makes consumer bundlers emit a chunk per grammar (~280 chunks / ~12 MB
// of build output). Importing this module is the explicit opt-in to that cost;
// consumers who render a known set of languages should register just those via
// createCodeBlockHighlighter instead.
import { bundledLanguages } from 'shiki/langs'
import { bundledThemes } from 'shiki/themes'
import { createCodeBlockHighlighter } from './code-block'

/**
 * A CodeBlock highlighter with shiki's full bundled registry — any language
 * and theme works by name, each fetched on first render.
 *
 * ```tsx
 * import { fullShikiHighlighter } from '@e412/rnui-react/code-block-full'
 *
 * <CodeBlockHighlighterProvider highlighter={fullShikiHighlighter}>
 *   <App />
 * </CodeBlockHighlighterProvider>
 * ```
 */
export const fullShikiHighlighter = /* @__PURE__ */ createCodeBlockHighlighter({
  langs: bundledLanguages,
  themes: bundledThemes,
})
