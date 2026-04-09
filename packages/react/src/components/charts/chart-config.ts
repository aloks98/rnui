/**
 * ECharts config generator — builds themed chart options
 * with sensible defaults matching shadcn design.
 *
 * Usage:
 *   const option = chartConfig()
 *     .bar({ data: [120, 200, 150], categories: ['A', 'B', 'C'] })
 *     .title('Monthly Revenue')
 *     .legend()
 *     .tooltip()
 *     .build()
 *
 *   <EChart option={option} />
 */

import type { EChartsOption } from "echarts"

type SeriesType = "bar" | "line" | "pie" | "scatter" | "radar" | "gauge"

interface BarConfig {
  data: number[]
  name?: string
  categories?: string[]
  stack?: string
  horizontal?: boolean
  borderRadius?: number
  barWidth?: number
}

interface LineConfig {
  data: number[]
  name?: string
  categories?: string[]
  smooth?: boolean
  area?: boolean
  areaOpacity?: number
}

interface PieConfig {
  data: { name: string; value: number }[]
  donut?: boolean
  innerRadius?: string
  outerRadius?: string
}

interface ScatterConfig {
  data: [number, number][]
  name?: string
  symbolSize?: number
}

interface RadarConfig {
  indicators: { name: string; max: number }[]
  series: { name: string; value: number[] }[]
}

interface GaugeConfig {
  value: number
  name?: string
  min?: number
  max?: number
}

class ChartConfigBuilder {
  private option: EChartsOption = {}
  private seriesList: any[] = []
  private xAxisData: string[] | undefined
  private isHorizontal = false
  private hasGrid = true

  /**
   * Add a bar series
   */
  bar(config: BarConfig): this {
    const {
      data,
      name,
      categories,
      stack,
      horizontal = false,
      borderRadius = 4,
      barWidth,
    } = config

    this.isHorizontal = horizontal
    if (categories) this.xAxisData = categories

    this.seriesList.push({
      type: "bar",
      name,
      data,
      stack,
      barMaxWidth: barWidth ?? 40,
      itemStyle: {
        borderRadius: horizontal
          ? [0, borderRadius, borderRadius, 0]
          : [borderRadius, borderRadius, 0, 0],
      },
    })

    return this
  }

  /**
   * Add a line series
   */
  line(config: LineConfig): this {
    const {
      data,
      name,
      categories,
      smooth = false,
      area = false,
      areaOpacity = 0.15,
    } = config

    if (categories) this.xAxisData = categories

    this.seriesList.push({
      type: "line",
      name,
      data,
      smooth,
      symbolSize: 6,
      ...(area ? { areaStyle: { opacity: areaOpacity } } : {}),
    })

    return this
  }

  /**
   * Add a pie/donut series
   */
  pie(config: PieConfig): this {
    const {
      data,
      donut = false,
      innerRadius = "40%",
      outerRadius = "70%",
    } = config

    this.hasGrid = false

    this.seriesList.push({
      type: "pie",
      radius: donut ? [innerRadius, outerRadius] : outerRadius,
      center: ["50%", "50%"],
      data,
      label: { show: true, fontSize: 12 },
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
    })

    return this
  }

  /**
   * Add a scatter series
   */
  scatter(config: ScatterConfig): this {
    const { data, name, symbolSize = 8 } = config

    this.seriesList.push({
      type: "scatter",
      name,
      data,
      symbolSize,
    })

    return this
  }

  /**
   * Add a radar chart
   */
  radar(config: RadarConfig): this {
    this.hasGrid = false

    this.option.radar = {
      indicator: config.indicators,
      shape: "polygon",
    }

    this.seriesList.push({
      type: "radar",
      data: config.series.map((s) => ({
        name: s.name,
        value: s.value,
        areaStyle: { opacity: 0.15 },
      })),
    })

    return this
  }

  /**
   * Add a gauge chart
   */
  gauge(config: GaugeConfig): this {
    const { value, name = "", min = 0, max = 100 } = config

    this.hasGrid = false

    this.seriesList.push({
      type: "gauge",
      min,
      max,
      progress: { show: true, width: 18 },
      axisLine: { lineStyle: { width: 18 } },
      axisTick: { show: false },
      splitLine: { length: 12, lineStyle: { width: 2 } },
      axisLabel: { distance: 25, fontSize: 12 },
      anchor: { show: true, size: 20, itemStyle: { borderWidth: 2 } },
      title: { show: !!name, offsetCenter: [0, "70%"], fontSize: 16 },
      detail: {
        valueAnimation: true,
        fontSize: 28,
        offsetCenter: [0, "90%"],
        formatter: "{value}%",
      },
      data: [{ value, name }],
    })

    return this
  }

  /**
   * Set chart title (rendered by ECharts, not a Card)
   */
  title(text: string, subtitle?: string): this {
    this.option.title = {
      text,
      subtext: subtitle,
      left: "center",
    }
    return this
  }

  /**
   * Enable legend
   */
  legend(position: "top" | "bottom" | "left" | "right" = "bottom"): this {
    this.option.legend = {
      show: true,
      [position === "left" || position === "right" ? "orient" : ""]:
        position === "left" || position === "right" ? "vertical" : undefined,
      [position]: position === "bottom" ? 0 : position === "top" ? 0 : "auto",
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 16,
    }
    return this
  }

  /**
   * Enable tooltip
   */
  tooltip(
    trigger: "axis" | "item" = "axis",
    formatter?: string | ((params: any) => string)
  ): this {
    this.option.tooltip = {
      trigger,
      ...(formatter ? { formatter } : {}),
      borderWidth: 1,
      padding: [8, 12],
      extraCssText:
        "border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);",
    }
    return this
  }

  /**
   * Enable data zoom (slider + scroll)
   */
  dataZoom(start = 0, end = 100): this {
    this.option.dataZoom = [
      { type: "slider", start, end, height: 20, bottom: 8 },
      { type: "inside", start, end },
    ]
    // Adjust grid for slider
    if (this.hasGrid) {
      this.option.grid = {
        ...(this.option.grid as any),
        bottom: 60,
      }
    }
    return this
  }

  /**
   * Set custom grid margins
   */
  grid(margins: {
    left?: number
    right?: number
    top?: number
    bottom?: number
  }): this {
    this.option.grid = {
      containLabel: true,
      left: margins.left ?? 16,
      right: margins.right ?? 16,
      top: margins.top ?? 24,
      bottom: margins.bottom ?? 8,
    }
    return this
  }

  /**
   * Set custom color palette
   */
  colors(palette: string[]): this {
    this.option.color = palette
    return this
  }

  /**
   * Merge raw ECharts options (for anything not covered by helpers)
   */
  raw(opts: Partial<EChartsOption>): this {
    this.option = { ...this.option, ...opts }
    return this
  }

  /**
   * Build the final ECharts option
   */
  build(): EChartsOption {
    const result: EChartsOption = { ...this.option }

    result.series = this.seriesList

    if (this.hasGrid && this.seriesList.length > 0) {
      const firstType = this.seriesList[0]?.type

      if (firstType === "bar" || firstType === "line") {
        if (!result.grid) {
          const hasLegend = !!(result.legend as any)?.show
          result.grid = {
            containLabel: true,
            left: 16,
            right: 16,
            top: 24,
            bottom: hasLegend ? 32 : 8,
          }
        }

        if (!result.xAxis) {
          result.xAxis = this.isHorizontal
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
                data: this.xAxisData,
                axisTick: { show: false },
                splitLine: { show: false },
              }
        }

        if (!result.yAxis) {
          result.yAxis = this.isHorizontal
            ? {
                type: "category",
                data: this.xAxisData,
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
              }
        }
      }

      if (firstType === "scatter" && !result.xAxis) {
        result.xAxis = {
          type: "value",
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: {
            lineStyle: { type: "dashed" as const, opacity: 0.5 },
          },
        }
        result.yAxis = {
          type: "value",
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: {
            lineStyle: { type: "dashed" as const, opacity: 0.5 },
          },
        }
      }
    }

    if (!result.tooltip) {
      result.tooltip = { trigger: "axis" }
    }

    return result
  }
}

/**
 * Create a new chart config builder.
 *
 * @example
 * // Simple bar chart
 * const option = chartConfig()
 *   .bar({ data: [120, 200, 150], categories: ['A', 'B', 'C'] })
 *   .tooltip()
 *   .build()
 *
 * // Multi-series line chart with legend
 * const option = chartConfig()
 *   .line({ data: [120, 200, 150], categories: ['Jan', 'Feb', 'Mar'], name: 'Revenue', smooth: true })
 *   .line({ data: [80, 120, 100], name: 'Expenses', smooth: true })
 *   .legend()
 *   .tooltip()
 *   .build()
 *
 * // Donut chart
 * const option = chartConfig()
 *   .pie({ data: [{ name: 'A', value: 40 }, { name: 'B', value: 60 }], donut: true })
 *   .tooltip('item')
 *   .legend()
 *   .build()
 */
export function chartConfig(): ChartConfigBuilder {
  return new ChartConfigBuilder()
}

export { ChartConfigBuilder }
