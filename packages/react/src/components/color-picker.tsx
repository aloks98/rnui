"use client"

import * as React from "react"
import { Pipette } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/popover"

export type ColorFormat = "hex" | "rgb" | "hsl"

export interface ColorPickerProps {
  value?: string
  onChange?: (value: string) => void
  defaultFormat?: ColorFormat
  presets?: string[]
  className?: string
}

// --- Color conversion helpers ---

function hexToHsv(hex: string): { h: number; s: number; v: number } {
  const { r, g, b } = hexToRgb(hex)
  const rr = r / 255, gg = g / 255, bb = b / 255
  const max = Math.max(rr, gg, bb), min = Math.min(rr, gg, bb)
  const d = max - min
  let h = 0
  const s = max === 0 ? 0 : d / max
  const v = max

  if (d !== 0) {
    switch (max) {
      case rr: h = ((gg - bb) / d + (gg < bb ? 6 : 0)) / 6; break
      case gg: h = ((bb - rr) / d + 2) / 6; break
      case bb: h = ((rr - gg) / d + 4) / 6; break
    }
  }
  return { h: h * 360, s, v }
}

function hsvToHex(h: number, s: number, v: number): string {
  const { r, g, b } = hsvToRgb(h, s, v)
  return rgbToHex(r, g, b)
}

function hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
  const c = v * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = v - c
  let r = 0, g = 0, b = 0

  if (h < 60) { r = c; g = x }
  else if (h < 120) { r = x; g = c }
  else if (h < 180) { g = c; b = x }
  else if (h < 240) { g = x; b = c }
  else if (h < 300) { r = x; b = c }
  else { r = c; b = x }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  }
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace("#", "")
  return {
    r: parseInt(clean.slice(0, 2), 16) || 0,
    g: parseInt(clean.slice(2, 4), 16) || 0,
    b: parseInt(clean.slice(4, 6), 16) || 0,
  }
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0"))
      .join("")
  )
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rr = r / 255, gg = g / 255, bb = b / 255
  const max = Math.max(rr, gg, bb), min = Math.min(rr, gg, bb)
  const l = (max + min) / 2
  let h = 0, s = 0

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case rr: h = ((gg - bb) / d + (gg < bb ? 6 : 0)) / 6; break
      case gg: h = ((bb - rr) / d + 2) / 6; break
      case bb: h = ((rr - gg) / d + 4) / 6; break
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function formatColor(hex: string, format: ColorFormat): string {
  if (format === "hex") return hex
  const { r, g, b } = hexToRgb(hex)
  if (format === "rgb") return `rgb(${r}, ${g}, ${b})`
  const { h, s, l } = rgbToHsl(r, g, b)
  return `hsl(${h}, ${s}%, ${l}%)`
}

function parseColorInput(input: string): string | null {
  const trimmed = input.trim()

  // Hex
  if (/^#?([0-9a-fA-F]{6})$/.test(trimmed)) {
    return trimmed.startsWith("#") ? trimmed : `#${trimmed}`
  }

  // rgb(r, g, b)
  const rgbMatch = trimmed.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/)
  if (rgbMatch) {
    return rgbToHex(+rgbMatch[1], +rgbMatch[2], +rgbMatch[3])
  }

  // hsl(h, s%, l%)
  const hslMatch = trimmed.match(/^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?/)
  if (hslMatch) {
    const h = +hslMatch[1] / 360
    const s = +hslMatch[2] / 100
    const l = +hslMatch[3] / 100
    const a = s * Math.min(l, 1 - l)
    const f = (n: number) => {
      const k = (n + h * 12) % 12
      return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
    }
    return rgbToHex(Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255))
  }

  return null
}

// --- Color Area (saturation/brightness) ---

function ColorArea({
  hue,
  saturation,
  brightness,
  onChange,
}: {
  hue: number
  saturation: number
  brightness: number
  onChange: (s: number, v: number) => void
}) {
  const areaRef = React.useRef<HTMLDivElement>(null)
  const dragging = React.useRef(false)

  const handleMove = React.useCallback(
    (clientX: number, clientY: number) => {
      const rect = areaRef.current?.getBoundingClientRect()
      if (!rect) return
      const s = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
      const v = Math.max(0, Math.min(1, 1 - (clientY - rect.top) / rect.height))
      onChange(s, v)
    },
    [onChange]
  )

  const handlePointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true
      areaRef.current?.setPointerCapture(e.pointerId)
      handleMove(e.clientX, e.clientY)
    },
    [handleMove]
  )

  const handlePointerMove = React.useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return
      handleMove(e.clientX, e.clientY)
    },
    [handleMove]
  )

  const handlePointerUp = React.useCallback(() => {
    dragging.current = false
  }, [])

  const hueColor = hsvToHex(hue, 1, 1)

  return (
    <div
      ref={areaRef}
      data-slot="color-area"
      className="relative h-40 w-full cursor-crosshair rounded-md border border-border"
      style={{ backgroundColor: hueColor }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className="absolute inset-0 rounded-md" style={{ background: "linear-gradient(to right, white, transparent)" }} />
      <div className="absolute inset-0 rounded-md" style={{ background: "linear-gradient(to top, black, transparent)" }} />
      <div
        className="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md"
        style={{
          left: `${saturation * 100}%`,
          top: `${(1 - brightness) * 100}%`,
          backgroundColor: hsvToHex(hue, saturation, brightness),
        }}
      />
    </div>
  )
}

// --- Hue Slider ---

function HueSlider({
  hue,
  onChange,
}: {
  hue: number
  onChange: (h: number) => void
}) {
  const sliderRef = React.useRef<HTMLDivElement>(null)
  const dragging = React.useRef(false)

  const handleMove = React.useCallback(
    (clientX: number) => {
      const rect = sliderRef.current?.getBoundingClientRect()
      if (!rect) return
      const h = Math.max(0, Math.min(360, ((clientX - rect.left) / rect.width) * 360))
      onChange(h)
    },
    [onChange]
  )

  const handlePointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true
      sliderRef.current?.setPointerCapture(e.pointerId)
      handleMove(e.clientX)
    },
    [handleMove]
  )

  const handlePointerMove = React.useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return
      handleMove(e.clientX)
    },
    [handleMove]
  )

  const handlePointerUp = React.useCallback(() => {
    dragging.current = false
  }, [])

  return (
    <div
      ref={sliderRef}
      data-slot="hue-slider"
      className="relative h-3 w-full cursor-pointer rounded-full border border-border"
      style={{
        background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div
        className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md"
        style={{
          left: `${(hue / 360) * 100}%`,
          backgroundColor: hsvToHex(hue, 1, 1),
        }}
      />
    </div>
  )
}

// --- Main Component ---

function ColorPicker({
  value = "#3b82f6",
  onChange,
  defaultFormat = "hex",
  presets,
  className,
}: ColorPickerProps) {
  const [hsv, setHsv] = React.useState(() => hexToHsv(value))
  const [format, setFormat] = React.useState<ColorFormat>(defaultFormat)
  const [textInput, setTextInput] = React.useState(() => formatColor(value, defaultFormat))

  const currentHex = React.useMemo(() => hsvToHex(hsv.h, hsv.s, hsv.v), [hsv])

  React.useEffect(() => {
    const newHsv = hexToHsv(value)
    setHsv(newHsv)
    setTextInput(formatColor(value, format))
  }, [value])

  const updateColor = React.useCallback(
    (h: number, s: number, v: number) => {
      setHsv({ h, s, v })
      const hex = hsvToHex(h, s, v)
      setTextInput(formatColor(hex, format))
      onChange?.(hex)
    },
    [format, onChange]
  )

  const handleFormatChange = React.useCallback(() => {
    const formats: ColorFormat[] = ["hex", "rgb", "hsl"]
    const nextIdx = (formats.indexOf(format) + 1) % formats.length
    const next = formats[nextIdx]
    setFormat(next)
    setTextInput(formatColor(currentHex, next))
  }, [format, currentHex])

  const handleTextChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setTextInput(val)
      const parsed = parseColorInput(val)
      if (parsed) {
        const newHsv = hexToHsv(parsed)
        setHsv(newHsv)
        onChange?.(parsed)
      }
    },
    [onChange]
  )

  const handlePresetClick = React.useCallback(
    (preset: string) => {
      const newHsv = hexToHsv(preset)
      setHsv(newHsv)
      setTextInput(formatColor(preset, format))
      onChange?.(preset)
    },
    [format, onChange]
  )

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-slot="color-picker-trigger"
            className={cn("h-9 gap-2 px-3", className)}
          />
        }
      >
        <span
          className="size-4 rounded-sm border border-border"
          style={{ backgroundColor: currentHex }}
        />
        <span className="font-mono text-xs">{currentHex}</span>
      </PopoverTrigger>
      <PopoverContent
        data-slot="color-picker"
        className="w-64 p-3"
      >
        <div className="flex flex-col gap-3">
          {/* Color area */}
          <ColorArea
            hue={hsv.h}
            saturation={hsv.s}
            brightness={hsv.v}
            onChange={(s, v) => updateColor(hsv.h, s, v)}
          />

          {/* Hue slider */}
          <HueSlider
            hue={hsv.h}
            onChange={(h) => updateColor(h, hsv.s, hsv.v)}
          />

          {/* Format selector + value input */}
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 px-2 font-mono text-xs uppercase"
              onClick={handleFormatChange}
            >
              {format}
            </Button>
            <Input
              value={textInput}
              onChange={handleTextChange}
              className="h-8 font-mono text-xs"
              spellCheck={false}
            />
            <Button
              variant="outline"
              size="icon-sm"
              className="shrink-0"
              onClick={() => {
                if ("EyeDropper" in window) {
                  const eyeDropper = new (window as any).EyeDropper()
                  eyeDropper.open().then((result: { sRGBHex: string }) => {
                    handlePresetClick(result.sRGBHex)
                  }).catch(() => {})
                }
              }}
              title="Pick color from screen"
            >
              <Pipette className="size-3.5" />
            </Button>
          </div>

          {/* Presets */}
          {presets && presets.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {presets.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handlePresetClick(color)}
                  className={cn(
                    "size-6 rounded-md border border-border transition-transform hover:scale-110",
                    currentHex.toLowerCase() === color.toLowerCase() &&
                      "ring-2 ring-ring ring-offset-1 ring-offset-background"
                  )}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { ColorPicker }
