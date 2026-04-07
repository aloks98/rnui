# ECharts Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add ECharts-based chart components to `@e412/rnui-react` using `echarts-for-react` with tree-shaking, themed to match shadcn's design tokens.

**Architecture:** A base `EChart` component wraps `echarts-for-react/lib/core` with auto-theme integration (reads CSS variables `--chart-1` through `--chart-5` at runtime). Pre-composed components (`BarChart`, `LineChart`, `AreaChart`, `PieChart`, `DonutChart`, `RadarChart`, `ScatterChart`) provide simplified props APIs while allowing full ECharts option overrides. All charts use SVG renderer for sharp rendering and dark mode compatibility.

**Tech Stack:** `echarts`, `echarts-for-react`, `echarts/core` (tree-shaking), shadcn theme tokens

---

## File Structure

```
packages/react/src/components/charts/
├── echart.tsx              (base wrapper — theme, resize, dark mode)
├── use-chart-theme.ts      (hook to read CSS chart tokens at runtime)
├── bar-chart.tsx            (pre-composed bar chart)
├── line-chart.tsx           (pre-composed line chart)
├── area-chart.tsx           (pre-composed area chart)
├── pie-chart.tsx            (pre-composed pie/donut chart)
├── radar-chart.tsx          (pre-composed radar chart)
├── scatter-chart.tsx        (pre-composed scatter chart)
└── index.ts                 (barrel export)
```

---

### Task 1: Install Dependencies and Create Base Hook

**Files:**
- Modify: `packages/react/package.json` (add deps)
- Create: `packages/react/src/components/charts/use-chart-theme.ts`

- [ ] **Step 1: Install echarts and echarts-for-react**

```bash
cd /home/aloks98/projects/rnui
pnpm --filter @e412/rnui-react add echarts echarts-for-react
```

- [ ] **Step 2: Create use-chart-theme.ts**

Create `packages/react/src/components/charts/use-chart-theme.ts`:

```ts
"use client"

import { useCallback, useEffect, useState } from "react"

export interface ChartThemeColors {
  chart1: string
  chart2: string
  chart3: string
  chart4: string
  chart5: string
  foreground: string
  mutedForeground: string
  border: string
  background: string
  card: string
}

function getCSSVariable(name: string): string {
  if (typeof window === "undefined") return ""
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
}

export function useChartTheme(): ChartThemeColors {
  const [colors, setColors] = useState<ChartThemeColors>({
    chart1: "",
    chart2: "",
    chart3: "",
    chart4: "",
    chart5: "",
    foreground: "",
    mutedForeground: "",
    border: "",
    background: "",
    card: "",
  })

  const readColors = useCallback(() => {
    setColors({
      chart1: getCSSVariable("--chart-1"),
      chart2: getCSSVariable("--chart-2"),
      chart3: getCSSVariable("--chart-3"),
      chart4: getCSSVariable("--chart-4"),
      chart5: getCSSVariable("--chart-5"),
      foreground: getCSSVariable("--foreground"),
      mutedForeground: getCSSVariable("--muted-foreground"),
      border: getCSSVariable("--border"),
      background: getCSSVariable("--background"),
      card: getCSSVariable("--card"),
    })
  }, [])

  useEffect(() => {
    readColors()

    // Re-read when dark mode toggles
    const observer = new MutationObserver(readColors)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    })

    return () => observer.disconnect()
  }, [readColors])

  return colors
}

export function getChartColorPalette(colors: ChartThemeColors): string[] {
  return [
    colors.chart1,
    colors.chart2,
    colors.chart3,
    colors.chart4,
    colors.chart5,
  ].filter(Boolean).map((c) => (c.startsWith("oklch") ? c : `oklch(${c})`))
}
```

- [ ] **Step 3: Commit**

```bash
git add packages/react/
git commit -m "feat: add echarts deps and useChartTheme hook"
```

---

### Task 2: Create Base EChart Component

**Files:**
- Create: `packages/react/src/components/charts/echart.tsx`

- [ ] **Step 1: Create echart.tsx**

Create `packages/react/src/components/charts/echart.tsx`:

```tsx
"use client"

import React, { useMemo } from "react"
import ReactEChartsCore from "echarts-for-react/lib/core"
import * as echarts from "echarts/core"
import { SVGRenderer } from "echarts/renderers"
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  DatasetComponent,
} from "echarts/components"
import type { EChartsOption } from "echarts"

import { cn } from "@/lib/utils"
import { useChartTheme, getChartColorPalette } from "./use-chart-theme"

// Register core components once
echarts.use([
  SVGRenderer,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  DatasetComponent,
])

export interface EChartProps {
  option: EChartsOption
  height?: string | number
  className?: string
  loading?: boolean
  onEvents?: Record<string, (params: any) => void>
  opts?: { renderer?: "canvas" | "svg" }
}

function EChart({
  option,
  height = 350,
  className,
  loading = false,
  onEvents,
  opts,
}: EChartProps) {
  const themeColors = useChartTheme()
  const palette = useMemo(() => getChartColorPalette(themeColors), [themeColors])

  const mergedOption = useMemo<EChartsOption>(() => {
    const base: EChartsOption = {
      color: palette.length > 0 ? palette : undefined,
      textStyle: {
        fontFamily: "inherit",
        color: themeColors.mutedForeground
          ? `oklch(${themeColors.mutedForeground})`
          : undefined,
      },
      grid: {
        containLabel: true,
        left: 12,
        right: 12,
        top: 40,
        bottom: 12,
      },
      tooltip: {
        trigger: "axis",
        backgroundColor: themeColors.card
          ? `oklch(${themeColors.card})`
          : undefined,
        borderColor: themeColors.border
          ? `oklch(${themeColors.border})`
          : undefined,
        textStyle: {
          color: themeColors.foreground
            ? `oklch(${themeColors.foreground})`
            : undefined,
          fontSize: 12,
        },
        borderWidth: 1,
      },
    }

    // Deep merge base with user option (user wins)
    return deepMerge(base, option) as EChartsOption
  }, [option, palette, themeColors])

  return (
    <div data-slot="echart" className={cn("w-full", className)}>
      <ReactEChartsCore
        echarts={echarts}
        option={mergedOption}
        style={{ height, width: "100%" }}
        notMerge={true}
        lazyUpdate={true}
        showLoading={loading}
        opts={{ renderer: "svg", ...opts }}
        onEvents={onEvents}
      />
    </div>
  )
}

// Simple deep merge (object only, arrays replaced)
function deepMerge(target: any, source: any): any {
  const output = { ...target }
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === "object" &&
      !Array.isArray(target[key])
    ) {
      output[key] = deepMerge(target[key], source[key])
    } else if (source[key] !== undefined) {
      output[key] = source[key]
    }
  }
  return output
}

export { EChart, echarts }
```

- [ ] **Step 2: Verify build**

```bash
pnpm --filter @e412/rnui-react build
```

- [ ] **Step 3: Commit**

```bash
git add packages/react/src/components/charts/
git commit -m "feat: add base EChart component with theme integration"
```

---

### Task 3: Create Pre-composed Chart Components

**Files:**
- Create: `packages/react/src/components/charts/bar-chart.tsx`
- Create: `packages/react/src/components/charts/line-chart.tsx`
- Create: `packages/react/src/components/charts/area-chart.tsx`
- Create: `packages/react/src/components/charts/pie-chart.tsx`
- Create: `packages/react/src/components/charts/radar-chart.tsx`
- Create: `packages/react/src/components/charts/scatter-chart.tsx`

- [ ] **Step 1: Create bar-chart.tsx**

Create `packages/react/src/components/charts/bar-chart.tsx`:

```tsx
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
    legend: showLegend ? { show: true, bottom: 0 } : undefined,
    ...option,
  }

  return <EChart option={chartOption} {...props} />
}

export { BarChart }
```

- [ ] **Step 2: Create line-chart.tsx**

Create `packages/react/src/components/charts/line-chart.tsx`:

```tsx
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
```

- [ ] **Step 3: Create area-chart.tsx**

Create `packages/react/src/components/charts/area-chart.tsx`:

```tsx
"use client"

import * as echarts from "echarts/core"
import { LineChart as LineChartType } from "echarts/charts"
import type { EChartsOption } from "echarts"

import { EChart, type EChartProps } from "./echart"

echarts.use([LineChartType])

export interface AreaChartSeries {
  name: string
  data: number[]
  smooth?: boolean
}

export interface AreaChartProps extends Omit<EChartProps, "option"> {
  categories: string[]
  series: AreaChartSeries[]
  smooth?: boolean
  stacked?: boolean
  showLegend?: boolean
  gradient?: boolean
  option?: Partial<EChartsOption>
}

function AreaChart({
  categories,
  series,
  smooth = true,
  stacked = false,
  showLegend = true,
  gradient = true,
  option = {},
  ...props
}: AreaChartProps) {
  const chartSeries = series.map((s, i) => ({
    type: "line" as const,
    name: s.name,
    data: s.data,
    smooth: s.smooth ?? smooth,
    stack: stacked ? "total" : undefined,
    symbolSize: 4,
    areaStyle: gradient
      ? {
          opacity: 0.3,
          color: {
            type: "linear" as const,
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "currentColor" },
              { offset: 1, color: "transparent" },
            ],
          },
        }
      : { opacity: 0.15 },
  }))

  const chartOption: EChartsOption = {
    xAxis: { type: "category", data: categories, boundaryGap: false },
    yAxis: { type: "value" },
    series: chartSeries,
    legend: showLegend ? { show: true, bottom: 0 } : undefined,
    ...option,
  }

  return <EChart option={chartOption} {...props} />
}

export { AreaChart }
```

- [ ] **Step 4: Create pie-chart.tsx**

Create `packages/react/src/components/charts/pie-chart.tsx`:

```tsx
"use client"

import * as echarts from "echarts/core"
import { PieChart as PieChartType } from "echarts/charts"
import type { EChartsOption } from "echarts"

import { EChart, type EChartProps } from "./echart"

echarts.use([PieChartType])

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
  option = {},
  ...props
}: PieChartProps) {
  const chartOption: EChartsOption = {
    tooltip: { trigger: "item" },
    legend: showLegend ? { show: true, bottom: 0 } : undefined,
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
        itemStyle: { borderRadius: donut ? 6 : 4, borderWidth: 2, borderColor: "transparent" },
      },
    ],
    ...option,
  }

  return <EChart option={chartOption} {...props} />
}

export { PieChart }
```

- [ ] **Step 5: Create radar-chart.tsx**

Create `packages/react/src/components/charts/radar-chart.tsx`:

```tsx
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
```

- [ ] **Step 6: Create scatter-chart.tsx**

Create `packages/react/src/components/charts/scatter-chart.tsx`:

```tsx
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
```

- [ ] **Step 7: Create barrel export**

Create `packages/react/src/components/charts/index.ts`:

```ts
export { EChart, type EChartProps } from "./echart"
export { useChartTheme, getChartColorPalette, type ChartThemeColors } from "./use-chart-theme"
export { BarChart, type BarChartProps, type BarChartDataItem } from "./bar-chart"
export { LineChart, type LineChartProps, type LineChartSeries, type LineChartDataItem } from "./line-chart"
export { AreaChart, type AreaChartProps, type AreaChartSeries } from "./area-chart"
export { PieChart, type PieChartProps, type PieChartDataItem } from "./pie-chart"
export { RadarChart, type RadarChartProps, type RadarChartIndicator, type RadarChartSeries } from "./radar-chart"
export { ScatterChart, type ScatterChartProps, type ScatterChartSeries } from "./scatter-chart"
```

- [ ] **Step 8: Add to main barrel export**

Add to `packages/react/src/index.ts`:

```ts
export * from './components/charts'
```

- [ ] **Step 9: Build and verify**

```bash
pnpm --filter @e412/rnui-react build
```

Expected: Build succeeds.

- [ ] **Step 10: Commit**

```bash
git add packages/react/
git commit -m "feat: add pre-composed ECharts components (Bar, Line, Area, Pie, Radar, Scatter)"
```

---

### Task 4: Create Storybook Stories

**Files:**
- Create: `apps/storybook/src/stories/echart.stories.tsx`

- [ ] **Step 1: Add echarts deps to storybook**

```bash
pnpm --filter @e412/storybook add echarts echarts-for-react
```

- [ ] **Step 2: Create echart.stories.tsx**

Create `apps/storybook/src/stories/echart.stories.tsx` with stories for all chart types:

- **BarChartDefault** — 5 items (Mon-Fri revenue data)
- **BarChartHorizontal** — horizontal bars
- **BarChartStacked** — multiple stacked series
- **LineChartDefault** — single line with 7 data points
- **LineChartMultiSeries** — 3 lines (Revenue, Expenses, Profit) over 6 months
- **AreaChartDefault** — gradient area with 2 series
- **AreaChartStacked** — stacked area chart
- **PieChartDefault** — 5 segments (Browser market share)
- **DonutChart** — same data with `donut={true}`
- **RadarChartDefault** — 2 series comparison across 5 metrics
- **ScatterChartDefault** — 2 clusters of random data points
- **BaseEChart** — raw EChart component with custom option (for advanced users)

Each story should use realistic sample data and demonstrate the simplified props API.

- [ ] **Step 3: Commit**

```bash
git add apps/storybook/
git commit -m "feat: add comprehensive ECharts stories for all chart types"
```

---

### Task 5: Verify Full Build

- [ ] **Step 1: Full monorepo build**

```bash
cd /home/aloks98/projects/rnui
pnpm build
```

Expected: Themes and React packages build successfully.

- [ ] **Step 2: Verify no require() in ESM bundle**

```bash
grep -c "require(" packages/react/dist/index.mjs
```

Expected: 0

- [ ] **Step 3: Commit any fixes**

Only if needed.
