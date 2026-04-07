"use client"

import { useMemo } from "react"
import type { EChartsOption } from "echarts"
import { EChart, type EChartProps } from "./echart"

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
  option,
  ...props
}: ScatterChartProps) {
  const chartOption = useMemo<EChartsOption>(() => {
    const chartSeries = series.map((s) => ({
      type: "scatter" as const,
      name: s.name,
      data: s.data,
      symbolSize: 8,
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
        type: "value" as const,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: {
          lineStyle: { type: "dashed" as const, opacity: 0.5 },
        },
      },
      yAxis: {
        type: "value" as const,
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
  }, [series, showLegend, option])

  return <EChart option={chartOption} {...props} />
}

export { ScatterChart }
