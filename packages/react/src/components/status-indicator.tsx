import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusIndicatorVariants = cva(
  "relative inline-flex rounded-full",
  {
    variants: {
      state: {
        active: "bg-success",
        down: "bg-destructive",
        fixing: "bg-warning",
        idle: "bg-muted-foreground",
      },
      size: {
        sm: "size-2",
        md: "size-3",
        lg: "size-4",
      },
    },
    defaultVariants: {
      state: "idle",
      size: "md",
    },
  }
)

const statusPingVariants = cva(
  "absolute inline-flex rounded-full opacity-75 animate-ping",
  {
    variants: {
      state: {
        active: "bg-success/60",
        down: "bg-destructive/60",
        fixing: "bg-warning/60",
        idle: "bg-muted-foreground/60",
      },
      size: {
        sm: "size-2",
        md: "size-3",
        lg: "size-4",
      },
    },
    defaultVariants: {
      state: "idle",
      size: "md",
    },
  }
)

interface StatusIndicatorProps
  extends VariantProps<typeof statusIndicatorVariants> {
  label?: string
  className?: string
  labelClassName?: string
}

function StatusIndicator({
  state = "idle",
  label,
  className,
  size = "md",
  labelClassName,
}: StatusIndicatorProps) {
  const shouldAnimate =
    state === "active" || state === "fixing" || state === "down"

  return (
    <div
      data-slot="status-indicator"
      data-state={state}
      className={cn("flex items-center gap-2", className)}
    >
      <div className="relative flex items-center">
        {shouldAnimate && (
          <span className={cn(statusPingVariants({ state, size }))} />
        )}
        <span className={cn(statusIndicatorVariants({ state, size }))} />
      </div>
      {label && (
        <span
          data-slot="status-indicator-label"
          className={cn("text-sm text-foreground", labelClassName)}
        >
          {label}
        </span>
      )}
    </div>
  )
}

export { StatusIndicator, statusIndicatorVariants }
export type { StatusIndicatorProps }
