"use client"

import { useMemo } from "react"
import type { EChartsOption } from "echarts"
import { EChart, type EChartProps } from "./echart"

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
  option,
  ...props
}: BarChartProps) {
  const chartOption = useMemo<EChartsOption>(() => {
    const cats = categories ?? data.map((d) => d.name)

    const defaultSeries = series ?? [
      {
        type: "bar" as const,
        data: data.map((d) => d.value),
        stack: stacked ? "total" : undefined,
        barMaxWidth: 40,
        itemStyle: {
          borderRadius: horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0],
        },
      },
    ]

    return {
      grid: {
        containLabel: true,
        left: 16,
        right: 16,
        top: 24,
        bottom: showLegend ? 32 : 8,
      },
      xAxis: horizontal
        ? {
            type: "value",
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: {
              lineStyle: { type: "dashed" as const, opacity: 0.5 },
            },
          }
        : {
            type: "category",
            data: cats,
            axisTick: { show: false },
            splitLine: { show: false },
          },
      yAxis: horizontal
        ? {
            type: "category",
            data: cats,
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
          }
        : {
            type: "value",
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: {
              lineStyle: { type: "dashed" as const, opacity: 0.5 },
            },
          },
      series: defaultSeries,
      legend: showLegend
        ? { show: true, bottom: 0, padding: [5, 0] }
        : undefined,
      ...option,
    }
  }, [data, categories, series, horizontal, stacked, showLegend, option])

  return <EChart option={chartOption} {...props} />
}

export { BarChart }
