"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/tooltip"

export interface CopyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  label?: string
  copiedLabel?: string
}

function CopyButton({
  value,
  className,
  label = "Copy",
  copiedLabel = "Copied!",
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = React.useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      try {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        // Fallback for older browsers
        const textarea = document.createElement("textarea")
        textarea.value = value
        textarea.style.position = "fixed"
        textarea.style.opacity = "0"
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand("copy")
        document.body.removeChild(textarea)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    },
    [value]
  )

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            data-slot="copy-button"
            data-copied={copied || undefined}
            className={cn(
              "text-muted-foreground hover:text-foreground",
              copied && "text-success hover:text-success",
              className
            )}
            onClick={handleCopy}
            aria-label={copied ? copiedLabel : label}
            {...props}
          />
        }
      >
        {copied ? (
          <Check className="size-3.5" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </TooltipTrigger>
      <TooltipContent>
        <p>{copied ? copiedLabel : label}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export { CopyButton }
