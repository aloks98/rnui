"use client"

import { useCallback, useEffect, useRef, useState } from "react"

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

const EMPTY_COLORS: ChartThemeColors = {
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
}

/**
 * Convert any CSS color (oklch, hsl, rgb, hex) to hex
 * by using a temporary canvas element.
 */
function cssColorToHex(cssColor: string): string {
  if (!cssColor || typeof document === "undefined") return ""
  try {
    const ctx = document.createElement("canvas").getContext("2d")
    if (!ctx) return cssColor
    ctx.fillStyle = cssColor
    return ctx.fillStyle // browser normalizes to hex or rgb
  } catch {
    return cssColor
  }
}

function getCSSVariable(name: string): string {
  if (typeof window === "undefined") return ""
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
}

function readAllColors(): ChartThemeColors {
  return {
    chart1: cssColorToHex(getCSSVariable("--chart-1")),
    chart2: cssColorToHex(getCSSVariable("--chart-2")),
    chart3: cssColorToHex(getCSSVariable("--chart-3")),
    chart4: cssColorToHex(getCSSVariable("--chart-4")),
    chart5: cssColorToHex(getCSSVariable("--chart-5")),
    foreground: cssColorToHex(getCSSVariable("--foreground")),
    mutedForeground: cssColorToHex(getCSSVariable("--muted-foreground")),
    border: cssColorToHex(getCSSVariable("--border")),
    background: cssColorToHex(getCSSVariable("--background")),
    card: cssColorToHex(getCSSVariable("--card")),
  }
}

export function useChartTheme(): ChartThemeColors {
  const [colors, setColors] = useState<ChartThemeColors>(EMPTY_COLORS)
  const initialized = useRef(false)

  const readColors = useCallback(() => {
    setColors(readAllColors())
  }, [])

  useEffect(() => {
    // Read once on mount — no double render
    if (!initialized.current) {
      initialized.current = true
      setColors(readAllColors())
    }

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
  ].filter(Boolean)
}
