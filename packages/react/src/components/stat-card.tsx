import * as React from "react"
import { ArrowDown, ArrowUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/card"

export interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: { value: number; isPositive: boolean }
  className?: string
}

function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("relative", className)}>
      <CardContent className="flex items-start justify-between gap-4 px-4 pt-0">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {trend && (
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-medium",
                trend.isPositive ? "text-success" : "text-destructive"
              )}
            >
              {trend.isPositive ? (
                <ArrowUp className="h-3 w-3" />
              ) : (
                <ArrowDown className="h-3 w-3" />
              )}
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        {icon && (
          <div className="flex items-center justify-center rounded-lg bg-muted p-2 text-muted-foreground [&>svg]:h-5 [&>svg]:w-5">
            {icon}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { StatCard }
