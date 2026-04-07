"use client"

import * as echarts from "echarts/core"
import { RadarChart as RadarChartType } from "echarts/charts"
import type { EChartsOption } from "echarts"

import { EChart, type EChartProps } from "./echart"

echarts.use([RadarChartType])

export interface RadarChartIndicator {
  name: string
  max: number
}

export interface RadarChartSeries {
  name: string
  value: number[]
}

export interface RadarChartProps extends Omit<EChartProps, "option"> {
  indicators: RadarChartIndicator[]
  series: RadarChartSeries[]
  showLegend?: boolean
  option?: Partial<EChartsOption>
}

function RadarChart({
  indicators,
  series,
  showLegend = true,
  option = {},
  ...props
}: RadarChartProps) {
  const chartOption: EChartsOption = {
    tooltip: { trigger: "item" },
    legend: showLegend ? { show: true, bottom: 0 } : undefined,
    grid: undefined,
    radar: {
      indicator: indicators,
      shape: "polygon",
    },
    series: [
      {
        type: "radar",
        data: series.map((s) => ({
          name: s.name,
          value: s.value,
          areaStyle: { opacity: 0.15 },
        })),
      },
    ],
    ...option,
  }

  return <EChart option={chartOption} {...props} />
}

export { RadarChart }
