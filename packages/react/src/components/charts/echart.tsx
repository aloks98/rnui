"use client"

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react"
import type { ForwardRefExoticComponent, RefAttributes } from "react"
import type { EChartsType, EChartsCoreOption } from "echarts/core"
import type { BaseChartProps } from "./types"
import type { ThemeMode } from "./types"
import { initChart, disposeChart, resizeChart, setChartOption, echarts } from "./core"
import { getThemeMode, registerShadcnTheme } from "./theme-registry"
import { applyMinimalPreset } from "./preset"
import { cn } from "@/lib/utils"

type AnyRecord = Record<string, unknown>

function shadcnThemeName(mode: ThemeMode): string {
  return mode === "dark" ? "shadcn-dark" : "shadcn-light"
}

function asArray<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) return []
  return Array.isArray(value) ? value : [value]
}

function restoreArrayOrSingle<T>(
  original: T | T[] | undefined,
  next: T[],
): T | T[] | undefined {
  if (original === undefined) return undefined
  return Array.isArray(original) ? next : next[0]
}

function hasSeriesEntries(option: EChartsCoreOption): boolean {
  const optionRecord = option as AnyRecord
  const series = asArray(
    optionRecord.series as AnyRecord | AnyRecord[] | undefined,
  )
  return series.length > 0
}

function createMountSeedOption(option: EChartsCoreOption): EChartsCoreOption {
  const optionRecord = option as AnyRecord
  const seriesInput = optionRecord.series as
    | AnyRecord
    | AnyRecord[]
    | undefined
  const seriesList = asArray(seriesInput)

  const seededSeries = seriesList.map((series) => {
    if (typeof series !== "object" || series === null || Array.isArray(series))
      return series
    const seeded: AnyRecord = { ...series, animation: false, data: [] }
    if ("links" in seeded) seeded.links = []
    if ("nodes" in seeded) seeded.nodes = []
    return seeded
  })

  const seededOption: AnyRecord = { ...optionRecord, animation: false }

  if (seriesInput !== undefined) {
    seededOption.series = restoreArrayOrSingle(
      seriesInput as AnyRecord | AnyRecord[] | undefined,
      seededSeries as AnyRecord[],
    )
  }

  return seededOption as EChartsCoreOption
}

function normalizeTheme(
  themeProp: string | undefined,
  autoMode: ThemeMode,
): { themeName: string; mode: ThemeMode | null; isShadcn: boolean } {
  if (themeProp === undefined)
    return { themeName: shadcnThemeName(autoMode), mode: autoMode, isShadcn: true }

  const t = themeProp.trim()
  if (t === "dark" || t === "light")
    return { themeName: shadcnThemeName(t), mode: t, isShadcn: true }
  if (t === "shadcn-dark")
    return { themeName: t, mode: "dark", isShadcn: true }
  if (t === "shadcn-light")
    return { themeName: t, mode: "light", isShadcn: true }
  return { themeName: t, mode: null, isShadcn: false }
}

export interface ChartRef {
  getEchartsInstance: () => EChartsType | null
  resize: (opts?: { width?: number; height?: number }) => void
}

export interface ChartProps extends BaseChartProps {
  /** ECharts option */
  option: EChartsCoreOption
  /** Whether to not merge option (default: false) */
  notMerge?: boolean
  /** Whether to lazy update (default: false) */
  lazyUpdate?: boolean
}

/**
 * Base EChart component — manages ECharts instance lifecycle directly
 * (no echarts-for-react). Uses ResizeObserver for auto-resize and
 * MutationObserver for dark mode detection.
 */
const EChart: ForwardRefExoticComponent<
  ChartProps & RefAttributes<ChartRef>
> = forwardRef<ChartRef, ChartProps>(function EChart(
  {
    option,
    width,
    height = 350,
    theme,
    preset = true,
    renderer = "canvas",
    loading = false,
    loadingOption,
    onEvents,
    style,
    className,
    autoResize = true,
    notMerge = false,
    lazyUpdate = false,
    animateOnMount = true,
    animateOnMountDelayMs = 16,
  },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<EChartsType | null>(null)
  const lastOptionRef = useRef<EChartsCoreOption | null>(null)
  const lastAppliedThemeRef = useRef<string | null>(null)
  const mountAnimationDoneRef = useRef<boolean>(false)
  const mountAnimationActiveRef = useRef<boolean>(false)
  const mountAnimationTimerRef = useRef<number | null>(null)

  const [autoMode, setAutoMode] = useState<ThemeMode>(() => getThemeMode())
  const resolvedTheme = useMemo(
    () => normalizeTheme(theme, autoMode),
    [theme, autoMode],
  )

  // Watch for mode changes when theme isn't explicitly provided
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return
    if (theme !== undefined) return

    const update = () => setAutoMode(getThemeMode())
    update()

    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleMediaChange = () => update()

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMediaChange)
    } else {
      mediaQuery.addListener(handleMediaChange)
    }

    return () => {
      observer.disconnect()
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMediaChange)
      } else {
        mediaQuery.removeListener(handleMediaChange)
      }
    }
  }, [theme])

  // Initialize chart instance
  useEffect(() => {
    if (typeof window === "undefined") return
    const container = containerRef.current
    if (!container) return

    // Register theme before init
    if (resolvedTheme.isShadcn && resolvedTheme.mode) {
      registerShadcnTheme(resolvedTheme.mode)
    }

    chartRef.current = initChart(container, resolvedTheme.themeName, {
      renderer,
      width: typeof width === "number" ? width : undefined,
      height: typeof height === "number" ? height : undefined,
    })
    lastAppliedThemeRef.current = resolvedTheme.themeName
    mountAnimationDoneRef.current = false
    mountAnimationActiveRef.current = false

    return () => {
      if (
        mountAnimationTimerRef.current !== null &&
        typeof window !== "undefined"
      ) {
        window.clearTimeout(mountAnimationTimerRef.current)
        mountAnimationTimerRef.current = null
      }
      mountAnimationActiveRef.current = false
      mountAnimationDoneRef.current = false
      if (chartRef.current) {
        disposeChart(chartRef.current)
        chartRef.current = null
      }
      lastAppliedThemeRef.current = null
    }
  }, [renderer]) // eslint-disable-line react-hooks/exhaustive-deps

  // Update option when it changes
  useEffect(() => {
    const chart = chartRef.current
    if (!chart || !option) return

    const effectiveOption = preset
      ? applyMinimalPreset(option, {
          mode: resolvedTheme.mode ?? autoMode,
        })
      : option
    lastOptionRef.current = effectiveOption

    const canAnimateOnMount =
      typeof window !== "undefined" &&
      animateOnMount &&
      hasSeriesEntries(effectiveOption) &&
      !mountAnimationDoneRef.current &&
      !mountAnimationActiveRef.current

    if (canAnimateOnMount) {
      mountAnimationActiveRef.current = true
      const seedOption = createMountSeedOption(effectiveOption)
      setChartOption(chart, seedOption, {
        notMerge: true,
        lazyUpdate: false,
      })

      const delayMs = Number.isFinite(animateOnMountDelayMs)
        ? Math.max(0, Math.round(animateOnMountDelayMs))
        : 16

      mountAnimationTimerRef.current = window.setTimeout(() => {
        mountAnimationTimerRef.current = null
        mountAnimationActiveRef.current = false

        const currentChart = chartRef.current
        const currentOption = lastOptionRef.current
        if (!currentChart || currentChart.isDisposed() || !currentOption) return

        setChartOption(currentChart, currentOption, {
          notMerge: false,
          lazyUpdate: false,
        })
        mountAnimationDoneRef.current = true
      }, delayMs)
      return
    }

    if (mountAnimationActiveRef.current) return

    if (hasSeriesEntries(effectiveOption)) {
      mountAnimationDoneRef.current = true
    }
    setChartOption(chart, effectiveOption, { notMerge, lazyUpdate })
  }, [
    option,
    preset,
    notMerge,
    lazyUpdate,
    autoMode,
    resolvedTheme.mode,
    animateOnMount,
    animateOnMountDelayMs,
  ])

  // Attach event handlers
  useEffect(() => {
    const chart = chartRef.current
    if (!chart || chart.isDisposed() || !onEvents) return

    Object.entries(onEvents).forEach(([eventName, handler]) => {
      chart.on(eventName, handler)
    })

    return () => {
      Object.keys(onEvents).forEach((eventName) => {
        chart.off(eventName)
      })
    }
  }, [onEvents])

  // Update theme and re-apply option
  useEffect(() => {
    const chart = chartRef.current
    if (!chart || chart.isDisposed()) return

    const nextThemeName = resolvedTheme.themeName
    if (lastAppliedThemeRef.current === nextThemeName) return

    if (resolvedTheme.isShadcn && resolvedTheme.mode) {
      registerShadcnTheme(resolvedTheme.mode)
    }

    // ECharts doesn't support runtime theme switching on an existing instance,
    // so we dispose + reinit with the new theme.
    const container = containerRef.current
    if (!container) return

    const currentOption = lastOptionRef.current
    disposeChart(chart)

    chartRef.current = initChart(container, nextThemeName, {
      renderer,
      width: typeof width === "number" ? width : undefined,
      height: typeof height === "number" ? height : undefined,
    })

    if (currentOption) {
      setChartOption(chartRef.current, currentOption, {
        notMerge: true,
        lazyUpdate: true,
      })
    }
    lastAppliedThemeRef.current = nextThemeName
  }, [resolvedTheme.themeName, resolvedTheme.isShadcn, resolvedTheme.mode]) // eslint-disable-line react-hooks/exhaustive-deps

  // Handle loading state
  useEffect(() => {
    if (!chartRef.current) return
    if (loading) {
      chartRef.current.showLoading(loadingOption)
    } else {
      chartRef.current.hideLoading()
    }
  }, [loading, loadingOption])

  // Handle responsive resizing via ResizeObserver + window resize fallback
  useEffect(() => {
    if (!autoResize || typeof window === "undefined") return
    const chart = chartRef.current
    const container = containerRef.current
    if (!chart || !container) return

    const resizeObserver = new ResizeObserver(() => {
      if (chart && !chart.isDisposed()) {
        resizeChart(chart, {
          width: typeof width === "number" ? width : undefined,
          height: typeof height === "number" ? height : undefined,
        })
      }
    })
    resizeObserver.observe(container)

    const handleResize = () => {
      if (chart && !chart.isDisposed()) {
        resizeChart(chart, {
          width: typeof width === "number" ? width : undefined,
          height: typeof height === "number" ? height : undefined,
        })
      }
    }
    window.addEventListener("resize", handleResize)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", handleResize)
    }
  }, [autoResize, width, height])

  // Expose chart instance via ref
  useImperativeHandle(
    ref,
    () => ({
      getEchartsInstance: () => chartRef.current,
      resize: (opts?: { width?: number; height?: number }) => {
        resizeChart(chartRef.current, opts)
      },
    }),
    [],
  )

  const containerStyle: React.CSSProperties = {
    width: width ?? "100%",
    height: height ?? "400px",
    ...(style as React.CSSProperties),
  }

  return (
    <div
      ref={containerRef}
      data-slot="echart"
      className={cn("w-full", className)}
      style={containerStyle}
    />
  )
})

EChart.displayName = "EChart"

/**
 * EChartProps is the public prop type for the base EChart component.
 * It's identical to ChartProps and kept for backward compatibility.
 */
export type EChartProps = ChartProps

export { EChart, echarts }
