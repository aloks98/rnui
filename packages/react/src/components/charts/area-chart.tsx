"use client"

import { useMemo } from "react"
import type { EChartsOption } from "echarts"
import { EChart, type EChartProps } from "./echart"

export interface AreaChartSeries {
  name: string
  data: number[]
  smooth?: boolean
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
    const chartSeries = series.map((s) => ({
      type: "line" as const,
      name: s.name,
      data: s.data,
      smooth: s.smooth ?? smooth,
      stack: stacked ? "total" : undefined,
      symbolSize: 4,
      areaStyle: gradient
        ? {
            color: {
              type: "linear" as const,
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: "inherit" },
                { offset: 1, color: "transparent" },
              ],
              global: false,
            },
            opacity: 0.4,
          }
        : { opacity: 0.15 },
    }))

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
