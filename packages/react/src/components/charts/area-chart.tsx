"use client"

import { useMemo } from "react"
import type { EChartsOption } from "echarts"
import * as echarts from "echarts/core"
import { EChart, type EChartProps } from "./echart"
import { extractShadcnColors, resolveColor } from "./theme-builder"

export interface AreaChartSeries {
  name: string
  data: number[]
  smooth?: boolean
  color?: string
}

export interface AreaChartProps extends Omit<EChartProps, "option"> {
  categories: string[]
  series: AreaChartSeries[]
  smooth?: boolean
  stacked?: boolean
  showLegend?: boolean
  gradient?: boolean
  option?: Partial<EChartsOption>
}

const fallbackPalette = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"]

function getSeriesColor(index: number): string {
  if (typeof document === "undefined") return fallbackPalette[index % fallbackPalette.length]
  try {
    const colors = extractShadcnColors()
    const chartColors = [colors.chart1, colors.chart2, colors.chart3, colors.chart4, colors.chart5]
    const raw = chartColors[index % chartColors.length]
    return resolveColor(raw, { fallback: fallbackPalette[index % fallbackPalette.length] })
  } catch {
    return fallbackPalette[index % fallbackPalette.length]
  }
}

function AreaChart({
  categories,
  series,
  smooth = true,
  stacked = false,
  showLegend = true,
  gradient = true,
  option,
  ...props
}: AreaChartProps) {
  const chartOption = useMemo<EChartsOption>(() => {
    const chartSeries = series.map((s, i) => {
      const seriesColor = s.color || getSeriesColor(i)

      return {
        type: "line" as const,
        name: s.name,
        data: s.data,
        smooth: s.smooth ?? smooth,
        stack: stacked ? "total" : undefined,
        symbolSize: 4,
        areaStyle: gradient
          ? {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: seriesColor },
                { offset: 1, color: "transparent" },
              ]),
              opacity: 0.4,
            }
          : { opacity: 0.15 },
      }
    })

    return {
      grid: {
        containLabel: true,
        left: 16,
        right: 16,
        top: 24,
        bottom: showLegend ? 32 : 8,
      },
      xAxis: {
        type: "category",
        data: categories,
        boundaryGap: false,
        axisTick: { show: false },
        splitLine: { show: false },
      },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: {
          lineStyle: { type: "dashed" as const, opacity: 0.5 },
        },
      },
      series: chartSeries,
      legend: showLegend
        ? { show: true, bottom: 0, padding: [5, 0] }
        : undefined,
      ...option,
    }
  }, [categories, series, smooth, stacked, showLegend, gradient, option])

  return <EChart option={chartOption} {...props} />
}

export { AreaChart }
