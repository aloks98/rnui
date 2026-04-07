"use client"

import { useMemo } from "react"
import type { EChartsOption } from "echarts"
import { EChart, type EChartProps } from "./echart"

export interface PieChartDataItem {
  name: string
  value: number
}

export interface PieChartProps extends Omit<EChartProps, "option"> {
  data: PieChartDataItem[]
  donut?: boolean
  showLegend?: boolean
  showLabels?: boolean
  option?: Partial<EChartsOption>
}

function PieChart({
  data,
  donut = false,
  showLegend = true,
  showLabels = true,
  option,
  ...props
}: PieChartProps) {
  const chartOption = useMemo<EChartsOption>(() => ({
    tooltip: { trigger: "item" },
    legend: showLegend
      ? { show: true, bottom: 0, padding: [5, 0] }
      : undefined,
    grid: undefined,
    series: [
      {
        type: "pie",
        radius: donut ? ["40%", "70%"] : "70%",
        center: ["50%", "45%"],
        data,
        label: { show: showLabels, fontSize: 12 },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.2)",
          },
        },
        itemStyle: {
          borderRadius: donut ? 6 : 4,
          borderWidth: 2,
          borderColor: "transparent",
        },
      },
    ],
    ...option,
  }), [data, donut, showLegend, showLabels, option])

  return <EChart option={chartOption} {...props} />
}

export { PieChart }
