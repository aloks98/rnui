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

    const observer = new MutationObserver(readColors)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    })

    return () => observer.disconnect()
  }, [readColors])

  return colors
}

// CSS variables already contain full oklch() values — use them directly
export function getChartColorPalette(colors: ChartThemeColors): string[] {
  return [
    colors.chart1,
    colors.chart2,
    colors.chart3,
    colors.chart4,
    colors.chart5,
  ].filter(Boolean)
}
