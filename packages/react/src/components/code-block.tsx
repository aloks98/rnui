"use client"

import * as React from "react"
import { codeToHtml } from "shiki"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  showLineNumbers?: boolean
  showCopy?: boolean
  title?: string
  highlightLines?: number[]
  theme?: string
}

function CodeBlock({
  code,
  language = "text",
  showLineNumbers = false,
  showCopy = true,
  title,
  highlightLines = [],
  theme = "github-dark-default",
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
          theme,
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
        // Fallback: render as plain text
        if (!cancelled) {
          setHighlightedHtml("")
          setIsLoading(false)
        }
      }
    }

    highlight()
    return () => { cancelled = true }
  }, [code, language, theme, highlightLines, showLineNumbers])

  return (
    <div
      data-slot="code-block"
      className={cn(
        "group/code-block relative overflow-hidden rounded-lg border border-border",
        className
      )}
      {...props}
    >
      {/* Header bar — slightly lighter than code area */}
      {(title || language || showCopy) && (
        <div className="flex items-center justify-between bg-[#1c2128] px-4 py-2 dark:bg-[#161b22]">
          <div className="flex items-center gap-2">
            {title && (
              <span className="text-xs font-medium text-[#8b949e]">
                {title}
              </span>
            )}
            {language && (
              <span className={cn("text-xs text-[#6e7681]", title && "before:content-['·'] before:mr-2")}>
                {language}
              </span>
            )}
          </div>
          {showCopy && (
            <CopyButton
              value={code}
              className="text-[#6e7681] hover:text-[#c9d1d9] opacity-0 transition-opacity group-hover/code-block:opacity-100 focus-visible:opacity-100"
            />
          )}
        </div>
      )}

      {/* Code area — darker background */}
      <div className="overflow-x-auto bg-[#0d1117] dark:bg-[#0d1117]">
        {isLoading ? (
          <pre className="p-4 text-sm leading-relaxed text-[#c9d1d9]">
            <code>{code}</code>
          </pre>
        ) : highlightedHtml ? (
          <div
            className={cn(
              "code-block-content text-sm [&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:leading-relaxed [&_pre]:!bg-transparent",
              showLineNumbers && "[&_code]:counter-reset-[line] [&_.line]:before:counter-increment-[line] [&_.line]:before:content-[counter(line)] [&_.line]:before:mr-4 [&_.line]:before:inline-block [&_.line]:before:w-6 [&_.line]:before:text-right [&_.line]:before:text-[#3d4450] [&_.line]:before:select-none [&_.line]:before:tabular-nums",
              "[&_.highlighted-line]:bg-white/5 [&_.highlighted-line]:border-l-2 [&_.highlighted-line]:border-primary [&_.highlighted-line]:-ml-4 [&_.highlighted-line]:pl-[14px] [&_.highlighted-line]:-mr-4 [&_.highlighted-line]:pr-4",
            )}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        ) : (
          <pre className="p-4 text-sm leading-relaxed text-[#c9d1d9]">
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

export { CodeBlock, InlineCode }
