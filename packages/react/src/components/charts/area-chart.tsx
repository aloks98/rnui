"use client"

import * as echarts from "echarts/core"
import { LineChart as LineChartType } from "echarts/charts"
import type { EChartsOption } from "echarts"

import { EChart, type EChartProps } from "./echart"

echarts.use([LineChartType])

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
  option = {},
  ...props
}: AreaChartProps) {
  const chartSeries = series.map((s, i) => ({
    type: "line" as const,
    name: s.name,
    data: s.data,
    smooth: s.smooth ?? smooth,
    stack: stacked ? "total" : undefined,
    symbolSize: 4,
    areaStyle: gradient
      ? {
          opacity: 0.3,
          color: {
            type: "linear" as const,
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "currentColor" },
              { offset: 1, color: "transparent" },
            ],
          },
        }
      : { opacity: 0.15 },
  }))

  const chartOption: EChartsOption = {
    grid: {
      containLabel: true,
      left: 16,
      right: 16,
      top: 24,
      bottom: showLegend ? 32 : 8,
    },
    xAxis: { type: "category", data: categories, boundaryGap: false, axisTick: { show: false }, splitLine: { show: false } },
    yAxis: { type: "value", axisLine: { show: false }, axisTick: { show: false }, splitLine: { lineStyle: { type: "dashed" as const, opacity: 0.5 } } },
    series: chartSeries,
    legend: showLegend ? { show: true, bottom: 0, padding: [5, 0] } : undefined,
    ...option,
  }

  return <EChart option={chartOption} {...props} />
}

export { AreaChart }
