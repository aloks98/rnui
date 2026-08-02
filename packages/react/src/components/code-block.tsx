'use client'

import * as React from 'react'
import { createBundledHighlighter, createSingletonShorthands } from 'shiki/core'
import type {
  CodeToHastOptions,
  DynamicImportLanguageRegistration,
  DynamicImportThemeRegistration,
  RegexEngine,
} from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import { cn } from '@/lib/utils'
import { CopyButton } from '@/components/copy-button'

// CodeBlock deliberately ships with NO languages or themes registered: shiki's
// bundled maps reference every grammar as a dynamic import, which forces
// consumer bundlers to emit a chunk per grammar (~280 chunks / ~12 MB) even
// though only the rendered ones load at runtime. Instead, consumers register
// exactly what they render via createCodeBlockHighlighter, or opt into the
// whole registry through the `@e412/rnui-react/code-block-full` subpath.

/** Same map shape as shiki's `bundledLanguages`: id -> lazy grammar import. */
export type CodeBlockLangs = Record<string, DynamicImportLanguageRegistration>
/** Same map shape as shiki's `bundledThemes`: name -> lazy theme import. */
export type CodeBlockThemes = Record<string, DynamicImportThemeRegistration>

export interface CreateCodeBlockHighlighterOptions {
  langs: CodeBlockLangs
  themes: CodeBlockThemes
  /**
   * Defaults to shiki's JavaScript regex engine (no wasm). Pass e.g.
   * `() => createOnigurumaEngine(import('shiki/wasm'))` to override.
   */
  engine?: () => RegexEngine | Promise<RegexEngine>
}

export interface CodeBlockHighlighter {
  codeToHtml: (code: string, options: CodeToHastOptions) => Promise<string>
}

/**
 * Build a highlighter from an explicit set of language/theme registrations.
 * The underlying shiki instance is created lazily on first highlight, and
 * each grammar/theme is only fetched when a CodeBlock actually renders it.
 *
 * ```ts
 * const highlighter = createCodeBlockHighlighter({
 *   langs: { bash: () => import('@shikijs/langs/bash') },
 *   themes: {
 *     'github-light-default': () => import('@shikijs/themes/github-light-default'),
 *     'github-dark-default': () => import('@shikijs/themes/github-dark-default'),
 *   },
 * })
 * ```
 */
export function createCodeBlockHighlighter(
  options: CreateCodeBlockHighlighterOptions,
): CodeBlockHighlighter {
  const createHighlighter = createBundledHighlighter({
    langs: options.langs,
    themes: options.themes,
    // `forgiving` skips the few grammar patterns the JS engine can't emulate
    // instead of throwing.
    engine:
      options.engine ??
      (() => createJavaScriptRegexEngine({ forgiving: true })),
  })
  const { codeToHtml } = createSingletonShorthands(createHighlighter)
  return { codeToHtml: codeToHtml as CodeBlockHighlighter['codeToHtml'] }
}

const CodeBlockHighlighterContext =
  React.createContext<CodeBlockHighlighter | null>(null)

export interface CodeBlockHighlighterProviderProps {
  highlighter: CodeBlockHighlighter
  children: React.ReactNode
}

/** Provide a highlighter to every CodeBlock below, instead of per-instance props. */
function CodeBlockHighlighterProvider({
  highlighter,
  children,
}: CodeBlockHighlighterProviderProps) {
  return (
    <CodeBlockHighlighterContext.Provider value={highlighter}>
      {children}
    </CodeBlockHighlighterContext.Provider>
  )
}

export interface CodeBlockTheme {
  light: string
  dark: string
}

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  showLineNumbers?: boolean
  showCopy?: boolean
  title?: string
  highlightLines?: number[]
  themes?: CodeBlockTheme
  fontSize?: string
  /**
   * Overrides the highlighter from CodeBlockHighlighterProvider. Without
   * either, the code renders as plain text.
   */
  highlighter?: CodeBlockHighlighter
}

const defaultThemes: CodeBlockTheme = {
  light: 'github-light-default',
  dark: 'github-dark-default',
}

function CodeBlock({
  code,
  language = 'text',
  showLineNumbers = false,
  showCopy = true,
  title,
  highlightLines = [],
  themes = defaultThemes,
  fontSize = '13px',
  highlighter: highlighterProp,
  className,
  ...props
}: CodeBlockProps) {
  const contextHighlighter = React.useContext(CodeBlockHighlighterContext)
  const highlighter = highlighterProp ?? contextHighlighter
  const [highlightedHtml, setHighlightedHtml] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    let cancelled = false

    // No highlighter registered: render the code as plain text.
    if (!highlighter) {
      setHighlightedHtml('')
      setIsLoading(false)
      return
    }

    const highlight = async () => {
      try {
        // An unregistered language or theme rejects here; the catch below
        // falls back to rendering the code as plain text.
        const html = await highlighter.codeToHtml(code, {
          lang: language,
          themes: {
            light: themes.light,
            dark: themes.dark,
          },
          defaultColor: false,
          transformers: [
            {
              line(node, line) {
                if (highlightLines.includes(line)) {
                  this.addClassToHast(node, 'highlighted-line')
                }
                if (showLineNumbers) {
                  node.properties['data-line'] = line
                }
              },
            },
          ],
        })
        if (!cancelled) {
          setHighlightedHtml(html)
          setIsLoading(false)
        }
      } catch {
        if (!cancelled) {
          setHighlightedHtml('')
          setIsLoading(false)
        }
      }
    }

    highlight()
    return () => {
      cancelled = true
    }
  }, [code, language, themes, highlightLines, showLineNumbers, highlighter])

  return (
    <div
      data-slot="code-block"
      className={cn(
        'group/code-block relative overflow-hidden rounded-lg border border-border',
        className,
      )}
      style={{ fontSize }}
      {...props}
    >
      {/* Header */}
      {(title || language || showCopy) && (
        <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
          <div className="flex items-center gap-2">
            {title && (
              <span className="text-xs font-medium text-foreground">
                {title}
              </span>
            )}
            {language && (
              <span
                className={cn(
                  'text-xs text-muted-foreground',
                  title && "before:content-['·'] before:mr-2",
                )}
              >
                {language}
              </span>
            )}
          </div>
          {showCopy && (
            <CopyButton
              value={code}
              className="opacity-0 transition-opacity group-hover/code-block:opacity-100 focus-visible:opacity-100"
            />
          )}
        </div>
      )}

      {/* Code area — background comes from shiki theme */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <pre className="bg-muted/30 p-4 leading-relaxed text-foreground">
            <code>{code}</code>
          </pre>
        ) : highlightedHtml ? (
          <div
            className={cn(
              'code-block-content',
              '[&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:leading-relaxed',
              '[&_code]:block',
              // Dual theme: shiki outputs --shiki-light/--shiki-dark CSS variables
              '[&_span]:text-[var(--shiki-light)] dark:[&_span]:text-[var(--shiki-dark)]',
              '[&_pre]:bg-[var(--shiki-light-bg)] dark:[&_pre]:bg-[var(--shiki-dark-bg)]',
              // Line numbers
              showLineNumbers &&
                '[&_.line[data-line]]:before:content-[attr(data-line)] [&_.line[data-line]]:before:mr-4 [&_.line[data-line]]:before:inline-block [&_.line[data-line]]:before:w-6 [&_.line[data-line]]:before:text-right [&_.line[data-line]]:before:text-muted-foreground/40 [&_.line[data-line]]:before:select-none [&_.line[data-line]]:before:tabular-nums',
              // Highlighted lines
              '[&_.highlighted-line]:bg-primary/5 [&_.highlighted-line]:border-l-2 [&_.highlighted-line]:border-primary [&_.highlighted-line]:-ml-4 [&_.highlighted-line]:pl-[14px] [&_.highlighted-line]:-mr-4 [&_.highlighted-line]:pr-4',
            )}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        ) : (
          <pre className="bg-muted/30 p-4 leading-relaxed text-foreground">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  )
}

// --- Inline Code ---

export interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {}

function InlineCode({ className, ...props }: InlineCodeProps) {
  return (
    <code
      data-slot="inline-code"
      className={cn(
        'rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground',
        className,
      )}
      {...props}
    />
  )
}

export { CodeBlock, CodeBlockHighlighterProvider, InlineCode, defaultThemes }
