"use client"

import React, { useMemo, useRef } from "react"
import ReactEChartsCore from "echarts-for-react/esm/core"
import * as echarts from "echarts/core"
import { SVGRenderer } from "echarts/renderers"
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  DatasetComponent,
} from "echarts/components"
import type { EChartsOption } from "echarts"

import { cn } from "@/lib/utils"
import { useChartTheme, getChartColorPalette } from "./use-chart-theme"

// Register core components once
echarts.use([
  SVGRenderer,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  DatasetComponent,
])

export interface EChartProps {
  option: EChartsOption
  height?: string | number
  className?: string
  loading?: boolean
  onEvents?: Record<string, (params: any) => void>
  opts?: { renderer?: "canvas" | "svg" }
}

function EChart({
  option,
  height = 350,
  className,
  loading = false,
  onEvents,
  opts,
}: EChartProps) {
  const themeColors = useChartTheme()
  const palette = getChartColorPalette(themeColors)
  const chartRef = useRef<any>(null)

  // Stable serialized key for theme colors to avoid unnecessary recalc
  const colorKey = palette.join(",")

  const mergedOption = useMemo<EChartsOption>(() => {
    const hasColors = palette.length > 0 && palette[0] !== ""

    const base: EChartsOption = {
      color: hasColors ? palette : undefined,
      textStyle: {
        fontFamily: "inherit",
        color: themeColors.mutedForeground || undefined,
        fontSize: 12,
      },
      tooltip: {
        backgroundColor: themeColors.card || undefined,
        borderColor: themeColors.border || undefined,
        textStyle: {
          color: themeColors.foreground || undefined,
          fontSize: 12,
        },
        borderWidth: 1,
        padding: [8, 12],
        extraCssText: "border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);",
      },
      legend: {
        textStyle: {
          color: themeColors.mutedForeground || undefined,
          fontSize: 12,
        },
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 16,
      },
    }

    return deepMerge(base, option) as EChartsOption
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option, colorKey])

  return (
    <div data-slot="echart" className={cn("w-full", className)}>
      <ReactEChartsCore
        ref={chartRef}
        echarts={echarts}
        option={mergedOption}
        style={{ height, width: "100%" }}
        notMerge={false}
        lazyUpdate={true}
        showLoading={loading}
        opts={{ renderer: "svg", ...opts }}
        onEvents={onEvents}
      />
    </div>
  )
}

function deepMerge(target: any, source: any): any {
  const output = { ...target }
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === "object" &&
      !Array.isArray(target[key])
    ) {
      output[key] = deepMerge(target[key], source[key])
    } else if (source[key] !== undefined) {
      output[key] = source[key]
    }
  }
  return output
}

export { EChart, echarts }
