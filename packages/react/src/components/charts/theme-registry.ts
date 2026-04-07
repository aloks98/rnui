/**
 * Theme registration utilities
 *
 * Registers ECharts themes and provides theme switching functionality.
 */

import * as echarts from "echarts/core"
import { extractShadcnColors, buildEChartsTheme } from "./theme-builder"
import type { ThemeMode, ShadcnChartColors } from "./types"

const lastThemeSignatureByName: Record<string, string | undefined> = {}

function themeSignature(colors: ShadcnChartColors, mode: ThemeMode): string {
  const fontFamily =
    typeof window !== "undefined" &&
    typeof document !== "undefined" &&
    document.body
      ? getComputedStyle(document.body).fontFamily
      : ""
  return JSON.stringify(colors) + `|mode:${mode}|font:${fontFamily}`
}

/**
 * Register a single shadcn theme for the current token state.
 */
export function registerShadcnTheme(
  mode: ThemeMode,
  element?: HTMLElement,
): void {
  if (typeof window === "undefined" || typeof document === "undefined") return

  const targetElement = element ?? document.documentElement
  const themeName = mode === "dark" ? "shadcn-dark" : "shadcn-light"

  const colors = extractShadcnColors(targetElement)
  const sig = themeSignature(colors, mode)

  if (lastThemeSignatureByName[themeName] === sig) return

  const theme = buildEChartsTheme(colors, mode)
  echarts.registerTheme(themeName, theme)
  lastThemeSignatureByName[themeName] = sig
}

/**
 * Get current theme mode based on system preference or DOM
 */
export function getThemeMode(element?: HTMLElement): ThemeMode {
  if (typeof window === "undefined") return "light"

  const targetElement = element ?? document.documentElement
  const classList = targetElement.classList

  if (classList.contains("dark")) return "dark"
  if (classList.contains("light")) return "light"

  const attrMode = (
    targetElement.getAttribute("data-theme") ??
    targetElement.getAttribute("data-mode") ??
    targetElement.getAttribute("data-color-scheme")
  )
    ?.trim()
    .toLowerCase()
  if (attrMode === "dark" || attrMode === "light") return attrMode

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  )
    return "dark"

  return "light"
}

/**
 * Get theme name based on current mode
 */
export function getThemeName(): string {
  const mode = getThemeMode()
  return mode === "dark" ? "shadcn-dark" : "shadcn-light"
}
