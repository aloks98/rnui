"use client"

import React, { useMemo } from "react"
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
  const palette = useMemo(() => getChartColorPalette(themeColors), [themeColors])

  const mergedOption = useMemo<EChartsOption>(() => {
    // Check if colors are loaded (empty string means not yet)
    const hasColors = palette.length > 0 && palette[0] !== ""

    const base: EChartsOption = {
      color: hasColors ? palette : undefined,
      textStyle: {
        fontFamily: "inherit",
        color: themeColors.mutedForeground || undefined,
        fontSize: 12,
      },
      grid: {
        containLabel: true,
        left: 16,
        right: 16,
        top: 24,
        bottom: 8,
      },
      tooltip: {
        trigger: "axis",
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
      xAxis: {
        axisLine: { lineStyle: { color: themeColors.border || undefined } },
        axisTick: { show: false },
        axisLabel: { color: themeColors.mutedForeground || undefined, fontSize: 11 },
        splitLine: { show: false },
      },
      yAxis: {
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: themeColors.mutedForeground || undefined, fontSize: 11 },
        splitLine: { lineStyle: { color: themeColors.border || undefined, type: "dashed" as const, opacity: 0.5 } },
      },
    }

    return deepMerge(base, option) as EChartsOption
  }, [option, palette, themeColors])

  return (
    <div data-slot="echart" className={cn("w-full", className)}>
      <ReactEChartsCore
        echarts={echarts}
        option={mergedOption}
        style={{ height, width: "100%" }}
        notMerge={true}
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
