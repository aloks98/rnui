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
    const base: EChartsOption = {
      color: palette.length > 0 ? palette : undefined,
      textStyle: {
        fontFamily: "inherit",
        color: themeColors.mutedForeground
          ? `oklch(${themeColors.mutedForeground})`
          : undefined,
      },
      grid: {
        containLabel: true,
        left: 12,
        right: 12,
        top: 40,
        bottom: 12,
      },
      tooltip: {
        trigger: "axis",
        backgroundColor: themeColors.card
          ? `oklch(${themeColors.card})`
          : undefined,
        borderColor: themeColors.border
          ? `oklch(${themeColors.border})`
          : undefined,
        textStyle: {
          color: themeColors.foreground
            ? `oklch(${themeColors.foreground})`
            : undefined,
          fontSize: 12,
        },
        borderWidth: 1,
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
