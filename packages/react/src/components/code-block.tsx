"use client"

import * as React from "react"
import { codeToHtml, type BundledTheme } from "shiki"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"

export interface CodeBlockTheme {
  light: BundledTheme
  dark: BundledTheme
}

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  showLineNumbers?: boolean
  showCopy?: boolean
  title?: string
  highlightLines?: number[]
  themes?: CodeBlockTheme
}

const defaultThemes: CodeBlockTheme = {
  light: "github-light-default",
  dark: "github-dark-default",
}

function CodeBlock({
  code,
  language = "text",
  showLineNumbers = false,
  showCopy = true,
  title,
  highlightLines = [],
  themes = defaultThemes,
  className,
  ...props
}: CodeBlockProps) {
  const [highlightedHtml, setHighlightedHtml] = React.useState<string>("")
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    let cancelled = false

    const highlight = async () => {
      try {
        const html = await codeToHtml(code, {
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
                  this.addClassToHast(node, "highlighted-line")
                }
                if (showLineNumbers) {
                  node.properties["data-line"] = line
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
          setHighlightedHtml("")
          setIsLoading(false)
        }
      }
    }

    highlight()
    return () => { cancelled = true }
  }, [code, language, themes, highlightLines, showLineNumbers])

  return (
    <div
      data-slot="code-block"
      className={cn(
        "group/code-block relative overflow-hidden rounded-lg border border-border",
        className
      )}
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
              <span className={cn("text-xs text-muted-foreground", title && "before:content-['·'] before:mr-2")}>
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
          <pre className="bg-muted/30 p-4 text-sm leading-relaxed text-foreground">
            <code>{code}</code>
          </pre>
        ) : highlightedHtml ? (
          <div
            className={cn(
              "code-block-content text-sm",
              "[&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:leading-relaxed",
              "[&_code]:block",
              // Dual theme: shiki outputs --shiki-light/--shiki-dark CSS variables
              "[&_span]:text-[var(--shiki-light)] dark:[&_span]:text-[var(--shiki-dark)]",
              "[&_pre]:bg-[var(--shiki-light-bg)] dark:[&_pre]:bg-[var(--shiki-dark-bg)]",
              // Line numbers
              showLineNumbers && "[&_.line[data-line]]:before:content-[attr(data-line)] [&_.line[data-line]]:before:mr-4 [&_.line[data-line]]:before:inline-block [&_.line[data-line]]:before:w-6 [&_.line[data-line]]:before:text-right [&_.line[data-line]]:before:text-muted-foreground/40 [&_.line[data-line]]:before:select-none [&_.line[data-line]]:before:tabular-nums",
              // Highlighted lines
              "[&_.highlighted-line]:bg-primary/5 [&_.highlighted-line]:border-l-2 [&_.highlighted-line]:border-primary [&_.highlighted-line]:-ml-4 [&_.highlighted-line]:pl-[14px] [&_.highlighted-line]:-mr-4 [&_.highlighted-line]:pr-4",
            )}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        ) : (
          <pre className="bg-muted/30 p-4 text-sm leading-relaxed text-foreground">
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
        "rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground",
        className
      )}
      {...props}
    />
  )
}

export { CodeBlock, InlineCode, defaultThemes }
