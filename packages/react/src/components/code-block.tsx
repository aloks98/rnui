"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  showLineNumbers?: boolean
  showCopy?: boolean
  title?: string
  highlightLines?: number[]
}

function CodeBlock({
  code,
  language,
  showLineNumbers = false,
  showCopy = true,
  title,
  highlightLines = [],
  className,
  children,
  ...props
}: CodeBlockProps) {
  const lines = code.split("\n")

  // If children are provided (pre-highlighted HTML), use them instead of raw code
  const hasHighlightedContent = !!children

  return (
    <div
      data-slot="code-block"
      className={cn(
        "group/code-block relative overflow-hidden rounded-lg border border-border bg-[oklch(0.205_0_0)] text-[oklch(0.985_0_0)] dark:bg-[oklch(0.145_0_0)]",
        className
      )}
      {...props}
    >
      {/* Header */}
      {(title || language || showCopy) && (
        <div className="flex items-center justify-between border-b border-border/20 px-4 py-2">
          <div className="flex items-center gap-2">
            {title && (
              <span className="text-xs font-medium text-[oklch(0.708_0_0)]">
                {title}
              </span>
            )}
            {language && !title && (
              <span className="text-xs text-[oklch(0.556_0_0)]">
                {language}
              </span>
            )}
            {title && language && (
              <span className="text-xs text-[oklch(0.556_0_0)]">
                {language}
              </span>
            )}
          </div>
          {showCopy && (
            <CopyButton
              value={code}
              className="text-[oklch(0.556_0_0)] hover:text-[oklch(0.985_0_0)] opacity-0 transition-opacity group-hover/code-block:opacity-100 focus-visible:opacity-100"
            />
          )}
        </div>
      )}

      {/* Code area */}
      <div className="overflow-x-auto">
        {hasHighlightedContent ? (
          <div className="p-4 text-sm">
            {children}
          </div>
        ) : (
          <pre className="p-4 text-sm leading-relaxed">
            <code>
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex",
                    highlightLines.includes(i + 1) &&
                      "bg-white/5 -mx-4 px-4 border-l-2 border-primary"
                  )}
                >
                  {showLineNumbers && (
                    <span className="mr-4 inline-block w-8 shrink-0 text-right text-[oklch(0.439_0_0)] select-none tabular-nums">
                      {i + 1}
                    </span>
                  )}
                  <span className="flex-1">{line || "\n"}</span>
                </div>
              ))}
            </code>
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
