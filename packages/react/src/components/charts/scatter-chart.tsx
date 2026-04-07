"use client"

import * as echarts from "echarts/core"
import { ScatterChart as ScatterChartType } from "echarts/charts"
import type { EChartsOption } from "echarts"

import { EChart, type EChartProps } from "./echart"

echarts.use([ScatterChartType])

export interface ScatterChartSeries {
  name: string
  data: [number, number][]
}

export interface ScatterChartProps extends Omit<EChartProps, "option"> {
  series: ScatterChartSeries[]
  showLegend?: boolean
  option?: Partial<EChartsOption>
}

function ScatterChart({
  series,
  showLegend = true,
  option = {},
  ...props
}: ScatterChartProps) {
  const chartSeries = series.map((s) => ({
    type: "scatter" as const,
    name: s.name,
    data: s.data,
    symbolSize: 8,
  }))

  const chartOption: EChartsOption = {
    xAxis: { type: "value" as const },
    yAxis: { type: "value" as const },
    series: chartSeries,
    legend: showLegend ? { show: true, bottom: 0 } : undefined,
    ...option,
  }

  return <EChart option={chartOption} {...props} />
}

export { ScatterChart }
