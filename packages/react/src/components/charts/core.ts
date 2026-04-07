/**
 * Core ECharts wrapper utilities
 *
 * Provides tree-shakeable ECharts initialization and management.
 */

import * as echarts from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import {
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  RadarChart,
  EffectScatterChart,
  GaugeChart,
} from "echarts/charts"
import {
  AriaComponent,
  AxisPointerComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  DatasetComponent,
  GraphicComponent,
  GridComponent,
  LegendComponent,
  MarkAreaComponent,
  MarkLineComponent,
  MarkPointComponent,
  PolarComponent,
  RadarComponent,
  TimelineComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  TransformComponent,
  VisualMapComponent,
} from "echarts/components"
import { LabelLayout, UniversalTransition } from "echarts/features"
import type { EChartsCoreOption, EChartsType } from "echarts/core"

// Register renderer, all chart types, and shared components once
let baseRegistered = false
if (!baseRegistered) {
  echarts.use([
    CanvasRenderer,
    // Charts
    BarChart,
    LineChart,
    PieChart,
    ScatterChart,
    RadarChart,
    EffectScatterChart,
    GaugeChart,
    // Components
    AriaComponent,
    AxisPointerComponent,
    DataZoomComponent,
    DataZoomInsideComponent,
    DataZoomSliderComponent,
    DatasetComponent,
    GraphicComponent,
    GridComponent,
    LegendComponent,
    MarkAreaComponent,
    MarkLineComponent,
    MarkPointComponent,
    PolarComponent,
    RadarComponent,
    TimelineComponent,
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    TransformComponent,
    VisualMapComponent,
    // Features
    LabelLayout,
    UniversalTransition,
  ])
  baseRegistered = true
}

/**
 * ECharts initialization options
 */
export interface InitOptions {
  container?: HTMLElement | string | null
  theme?: string | object
  renderer?: "canvas" | "svg"
  width?: number
  height?: number
  devicePixelRatio?: number
  locale?: string
}

/**
 * Initialize an ECharts instance
 */
export function initChart(
  container: HTMLElement | string | null = null,
  theme?: string | object,
  opts?: InitOptions,
): EChartsType {
  const options = {
    renderer: opts?.renderer || "canvas",
    width: opts?.width,
    height: opts?.height,
    devicePixelRatio: opts?.devicePixelRatio,
    locale: opts?.locale,
  }

  const containerElement =
    typeof container === "string"
      ? typeof document !== "undefined"
        ? (document.querySelector(container) as HTMLElement)
        : null
      : container

  return echarts.init(containerElement ?? undefined, theme ?? undefined, options)
}

/**
 * Dispose an ECharts instance
 */
export function disposeChart(chart: EChartsType | null): void {
  if (chart) {
    chart.dispose()
  }
}

/**
 * Resize an ECharts instance
 */
export function resizeChart(
  chart: EChartsType | null,
  opts?: { width?: number; height?: number },
): void {
  if (chart) {
    chart.resize(opts)
  }
}

/**
 * Set option on an ECharts instance
 */
export function setChartOption(
  chart: EChartsType | null,
  option: EChartsCoreOption,
  opts?: { notMerge?: boolean; lazyUpdate?: boolean },
): void {
  if (chart) {
    chart.setOption(option, opts)
  }
}

export { echarts }
