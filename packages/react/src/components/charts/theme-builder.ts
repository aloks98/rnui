/**
 * Theme builder utilities
 *
 * Converts shadcn/ui CSS variables (oklch format) to ECharts theme format.
 * Uses culori for oklch->rgb conversion, with browser CSS.supports as primary path.
 */

import { formatRgb, parse } from "culori"
import type { EChartsTheme, ShadcnChartColors, ThemeMode } from "./types"

// ---------------------------------------------------------------------------
// resolveColor: convert arbitrary CSS color strings to rgb()/rgba()
// ---------------------------------------------------------------------------

interface ResolveColorOptions {
  fallback?: string
}

function canUseDOM(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined"
}

function computeCssColor(value: string): string | null {
  const body = document.body
  if (!body) return null

  const el = document.createElement("div")
  el.style.color = value
  el.style.position = "absolute"
  el.style.visibility = "hidden"
  el.style.pointerEvents = "none"
  el.style.contain = "strict"
  body.appendChild(el)

  const computed = getComputedStyle(el).color
  body.removeChild(el)

  return computed.includes("rgb") ? computed : null
}

/**
 * Resolve an arbitrary CSS color string into rgb()/rgba(), preserving alpha.
 */
export function resolveColor(
  value: string,
  options?: ResolveColorOptions,
): string {
  const fallback = options?.fallback ?? "rgba(0, 0, 0, 1)"
  const input = value?.trim?.() ? value.trim() : ""

  if (!input) return fallback

  // Prefer browser conversion when available (handles oklch, color-mix, etc.)
  if (canUseDOM()) {
    try {
      const supports =
        typeof CSS !== "undefined" && typeof CSS.supports === "function"
          ? CSS.supports("color", input)
          : true

      if (supports) {
        const computed = computeCssColor(input)
        if (computed) return computed
      }
    } catch {
      // Fall through to culori
    }
  }

  // SSR / fallback conversion via culori
  try {
    const parsed = parse(input)
    if (parsed) return formatRgb(parsed)
  } catch {
    // ignore
  }

  return fallback
}

// ---------------------------------------------------------------------------
// CSS variable reading
// ---------------------------------------------------------------------------

export function getCSSVariable(
  varName: string,
  element?: HTMLElement,
): string {
  if (typeof window === "undefined" || typeof document === "undefined")
    return ""
  const targetElement = element ?? document.documentElement
  return getComputedStyle(targetElement).getPropertyValue(varName).trim()
}

function withAlpha(color: string, alpha: number): string {
  const match = color.match(/rgba?\(([^)]+)\)/i)
  if (!match) return color
  const channels = match[1]
  if (!channels) return color
  const parts = channels.split(",").map((p) => p.trim())
  if (parts.length < 3) return color
  return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${alpha})`
}

/**
 * Extract shadcn/ui chart colors from CSS variables
 */
export function extractShadcnColors(
  element?: HTMLElement,
): ShadcnChartColors {
  return {
    chart1: getCSSVariable("--chart-1", element),
    chart2: getCSSVariable("--chart-2", element),
    chart3: getCSSVariable("--chart-3", element),
    chart4: getCSSVariable("--chart-4", element),
    chart5: getCSSVariable("--chart-5", element),
    background: getCSSVariable("--background", element),
    foreground: getCSSVariable("--foreground", element),
    card: getCSSVariable("--card", element),
    cardForeground: getCSSVariable("--card-foreground", element),
    popover: getCSSVariable("--popover", element),
    popoverForeground: getCSSVariable("--popover-foreground", element),
    secondary: getCSSVariable("--secondary", element),
    secondaryForeground: getCSSVariable("--secondary-foreground", element),
    muted: getCSSVariable("--muted", element),
    mutedForeground: getCSSVariable("--muted-foreground", element),
    accent: getCSSVariable("--accent", element),
    accentForeground: getCSSVariable("--accent-foreground", element),
    destructive: getCSSVariable("--destructive", element),
    destructiveForeground: getCSSVariable("--destructive-foreground", element),
    border: getCSSVariable("--border", element),
    input: getCSSVariable("--input", element),
    ring: getCSSVariable("--ring", element),
    primary: getCSSVariable("--primary", element),
    primaryForeground: getCSSVariable("--primary-foreground", element),
  }
}

/**
 * Build ECharts theme from shadcn/ui colors
 */
export function buildEChartsTheme(
  colors: ShadcnChartColors,
  mode: ThemeMode = "light",
): EChartsTheme {
  const fallbackPalette = [
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#f59e0b",
    "#10b981",
  ]

  const chartColors = [
    resolveColor(colors.chart1, { fallback: fallbackPalette[0] }),
    resolveColor(colors.chart2, { fallback: fallbackPalette[1] }),
    resolveColor(colors.chart3, { fallback: fallbackPalette[2] }),
    resolveColor(colors.chart4, { fallback: fallbackPalette[3] }),
    resolveColor(colors.chart5, { fallback: fallbackPalette[4] }),
  ]

  const backgroundColor = resolveColor(colors.background ?? "", {
    fallback: mode === "dark" ? "rgb(9, 9, 11)" : "rgb(255, 255, 255)",
  })
  const cardColor = resolveColor(colors.card ?? colors.background ?? "", {
    fallback: mode === "dark" ? "rgb(24, 24, 27)" : backgroundColor,
  })
  const popoverColor = resolveColor(
    colors.popover ?? colors.card ?? colors.background ?? "",
    { fallback: cardColor },
  )

  const textColor = resolveColor(colors.foreground ?? "", {
    fallback: mode === "dark" ? "rgb(244, 244, 245)" : "rgb(9, 9, 11)",
  })
  const mutedTextColor = resolveColor(
    colors.mutedForeground ?? colors.foreground ?? "",
    {
      fallback:
        mode === "dark"
          ? "rgba(244, 244, 245, 0.70)"
          : "rgba(9, 9, 11, 0.60)",
    },
  )

  const borderColor = resolveColor(colors.border, {
    fallback:
      mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)",
  })

  const inputColor = resolveColor(colors.input ?? colors.border ?? "", {
    fallback: borderColor,
  })
  const mutedColor = resolveColor(colors.muted ?? "", {
    fallback:
      mode === "dark"
        ? "rgba(244, 244, 245, 0.08)"
        : "rgba(9, 9, 11, 0.04)",
  })
  const primaryColor = resolveColor(colors.primary ?? colors.chart1 ?? "", {
    fallback: chartColors[0] ?? fallbackPalette[0],
  })
  const popoverTextColor = resolveColor(colors.popoverForeground ?? "", {
    fallback: textColor,
  })
  const primaryPaletteColor =
    chartColors[0] ?? fallbackPalette[0] ?? "rgb(59, 130, 246)"
  const boxplotFillColor = withAlpha(
    primaryPaletteColor,
    mode === "dark" ? 0.42 : 0.24,
  )

  const fontFamily =
    typeof window !== "undefined" &&
    typeof document !== "undefined" &&
    document.body
      ? getComputedStyle(document.body).fontFamily
      : undefined

  return {
    color: chartColors,
    backgroundColor: "transparent",

    textStyle: { color: textColor, fontFamily, fontSize: 12 },

    title: {
      textStyle: { color: textColor, fontFamily },
      subtextStyle: { color: mutedTextColor },
    },

    line: {
      itemStyle: { borderColor: "transparent" },
      label: { color: textColor },
    },

    bar: {
      itemStyle: { borderColor: "transparent" },
      label: { color: textColor },
    },

    pie: {
      itemStyle: { borderColor: borderColor },
      label: { color: textColor },
    },

    scatter: {
      itemStyle: { borderColor: "transparent" },
      label: { color: textColor },
    },

    radar: {
      itemStyle: { borderColor: "transparent" },
      label: { color: textColor },
    },

    boxplot: {
      itemStyle: {
        color: boxplotFillColor,
        borderColor: primaryColor,
        borderWidth: 1.2,
      },
      label: { color: textColor },
    },

    parallel: {
      itemStyle: { borderColor: "transparent" },
      label: { color: textColor },
    },

    sankey: {
      itemStyle: { borderColor: "transparent" },
      label: { color: textColor },
    },

    funnel: {
      itemStyle: { borderColor: "transparent" },
      label: { color: textColor },
    },

    gauge: {
      itemStyle: { color: primaryColor, borderColor: "transparent" },
      splitLine: { lineStyle: { color: borderColor } },
      axisTick: { lineStyle: { color: borderColor } },
      axisLabel: { color: mutedTextColor },
      pointer: { itemStyle: { color: primaryColor } },
      title: { color: textColor },
      detail: { color: textColor },
    },

    candlestick: {
      itemStyle: {
        color: chartColors[0],
        color0: chartColors[1],
        borderColor: "transparent",
        borderColor0: "transparent",
      },
    },

    graph: {
      itemStyle: { borderColor: "transparent" },
      lineStyle: { color: borderColor },
      label: { color: textColor },
    },

    map: {
      itemStyle: { areaColor: mutedColor, borderColor: borderColor },
      label: { color: textColor },
    },

    geo: {
      itemStyle: { areaColor: mutedColor, borderColor: borderColor },
      label: { color: textColor },
    },

    categoryAxis: {
      axisLine: { show: false, lineStyle: { color: borderColor } },
      axisTick: { show: false, lineStyle: { color: borderColor } },
      axisLabel: { color: mutedTextColor },
      splitLine: { show: false, lineStyle: { color: borderColor } },
    },

    valueAxis: {
      axisLine: { show: false, lineStyle: { color: borderColor } },
      axisTick: { show: false, lineStyle: { color: borderColor } },
      axisLabel: { color: mutedTextColor },
      splitLine: {
        show: true,
        lineStyle: { color: borderColor, type: "solid" },
      },
    },

    logAxis: {
      axisLine: { lineStyle: { color: borderColor } },
      axisTick: { lineStyle: { color: borderColor } },
      axisLabel: { color: mutedTextColor },
      splitLine: { lineStyle: { color: borderColor } },
    },

    timeAxis: {
      axisLine: { lineStyle: { color: borderColor } },
      axisTick: { lineStyle: { color: borderColor } },
      axisLabel: { color: mutedTextColor },
      splitLine: { lineStyle: { color: borderColor } },
    },

    toolbox: {
      iconStyle: { borderColor: borderColor },
      emphasis: { iconStyle: { borderColor: primaryColor } },
    },

    legend: { textStyle: { color: mutedTextColor } },

    tooltip: {
      backgroundColor: popoverColor,
      borderColor: borderColor,
      textStyle: { color: popoverTextColor },
    },

    timeline: {
      lineStyle: { color: borderColor },
      itemStyle: { color: mutedColor, borderColor: borderColor },
      controlStyle: { color: textColor, borderColor: borderColor },
      label: { color: textColor },
    },

    visualMap: { textStyle: { color: textColor } },

    dataZoom: {
      textStyle: { color: mutedTextColor },
      handleStyle: { color: primaryColor, borderColor: borderColor },
      dataBackground: {
        lineStyle: { color: borderColor },
        areaStyle: { color: mutedColor },
      },
      selectedDataBackground: {
        lineStyle: { color: primaryColor },
        areaStyle: { color: chartColors[0] },
      },
      fillerColor: inputColor,
      borderColor: borderColor,
    },

    markPoint: { label: { color: textColor } },
    markLine: {
      label: { color: textColor },
      lineStyle: { color: borderColor },
    },
    markArea: { label: { color: textColor } },
  }
}
