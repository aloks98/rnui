"use client"

import * as echarts from "echarts/core"
import { LineChart as LineChartType } from "echarts/charts"
import type { EChartsOption } from "echarts"

import { EChart, type EChartProps } from "./echart"

echarts.use([LineChartType])

export interface LineChartDataItem {
  name: string
  value: number
  [key: string]: any
}

export interface LineChartSeries {
  name: string
  data: number[]
  smooth?: boolean
}

export interface LineChartProps extends Omit<EChartProps, "option"> {
  data?: LineChartDataItem[]
  categories?: string[]
  series?: LineChartSeries[]
  smooth?: boolean
  showLegend?: boolean
  option?: Partial<EChartsOption>
}

function LineChart({
  data,
  categories,
  series,
  smooth = false,
  showLegend = false,
  option = {},
  ...props
}: LineChartProps) {
  const cats = categories ?? data?.map((d) => d.name) ?? []

  const chartSeries = series
    ? series.map((s) => ({
        type: "line" as const,
        name: s.name,
        data: s.data,
        smooth: s.smooth ?? smooth,
        symbolSize: 6,
      }))
    : [
        {
          type: "line" as const,
          data: data?.map((d) => d.value) ?? [],
          smooth,
          symbolSize: 6,
        },
      ]

  const chartOption: EChartsOption = {
    xAxis: { type: "category", data: cats },
    yAxis: { type: "value" },
    series: chartSeries,
    legend: showLegend ? { show: true, bottom: 0 } : undefined,
    ...option,
  }

  return <EChart option={chartOption} {...props} />
}

export { LineChart }
