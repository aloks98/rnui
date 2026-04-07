"use client"

import * as echarts from "echarts/core"
import { BarChart as BarChartType } from "echarts/charts"
import type { EChartsOption } from "echarts"

import { EChart, type EChartProps } from "./echart"

echarts.use([BarChartType])

export interface BarChartDataItem {
  name: string
  value: number
  [key: string]: any
}

export interface BarChartProps extends Omit<EChartProps, "option"> {
  data: BarChartDataItem[]
  categories?: string[]
  series?: EChartsOption["series"]
  horizontal?: boolean
  stacked?: boolean
  showLegend?: boolean
  option?: Partial<EChartsOption>
}

function BarChart({
  data,
  categories,
  series,
  horizontal = false,
  stacked = false,
  showLegend = false,
  option = {},
  ...props
}: BarChartProps) {
  const cats = categories ?? data.map((d) => d.name)

  const defaultSeries = series ?? [
    {
      type: "bar" as const,
      data: data.map((d) => d.value),
      stack: stacked ? "total" : undefined,
      barMaxWidth: 40,
      radius: [4, 4, 0, 0],
      itemStyle: { borderRadius: horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0] },
    },
  ]

  const chartOption: EChartsOption = {
    xAxis: horizontal
      ? { type: "value" }
      : { type: "category", data: cats },
    yAxis: horizontal
      ? { type: "category", data: cats }
      : { type: "value" },
    series: defaultSeries,
    legend: showLegend ? { show: true, bottom: 0, padding: [5, 0] } : undefined,
    grid: { bottom: showLegend ? 32 : 8 },
    ...option,
  }

  return <EChart option={chartOption} {...props} />
}

export { BarChart }
