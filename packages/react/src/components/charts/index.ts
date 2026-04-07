export { EChart, echarts, type EChartProps, type ChartRef, type ChartProps } from "./echart"
export { BarChart, type BarChartProps, type BarChartDataItem } from "./bar-chart"
export { LineChart, type LineChartProps, type LineChartSeries, type LineChartDataItem } from "./line-chart"
export { AreaChart, type AreaChartProps, type AreaChartSeries } from "./area-chart"
export { PieChart, type PieChartProps, type PieChartDataItem } from "./pie-chart"
export { RadarChart, type RadarChartProps, type RadarChartIndicator, type RadarChartSeries } from "./radar-chart"
export { ScatterChart, type ScatterChartProps, type ScatterChartSeries } from "./scatter-chart"
export { registerShadcnTheme, getThemeMode, getThemeName } from "./theme-registry"
export { buildEChartsTheme, extractShadcnColors, resolveColor } from "./theme-builder"
export { applyMinimalPreset } from "./preset"
export type {
  ThemeMode,
  ShadcnChartColors,
  EChartsTheme,
  BaseChartProps,
  BarChartOption,
  LineChartOption,
  PieChartOption,
  ScatterChartOption,
  AreaChartOption,
  RadarChartOption,
} from "./types"
