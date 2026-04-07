"use client"

import * as React from "react"
import { parse, formatHex, formatRgb, formatHsl, converter } from "culori"
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
  showAlpha?: boolean
  className?: string
}

// --- Color conversion via culori ---

const toHsv = converter("hsv")
const toRgb = converter("rgb")
const toHsl = converter("hsl")

function colorToHex(input: string): string {
  try {
    const parsed = parse(input)
    return parsed ? formatHex(parsed) : "#000000"
  } catch {
    return "#000000"
  }
}

function hexToHsv(input: string): { h: number; s: number; v: number } {
  const hsv = toHsv(input)
  if (!hsv) return { h: 0, s: 0, v: 0 }
  return { h: hsv.h ?? 0, s: hsv.s ?? 0, v: hsv.v ?? 0 }
}

function hsvToHex(h: number, s: number, v: number): string {
  return formatHex({ mode: "hsv", h, s, v }) ?? "#000000"
}

function hexToRgb(input: string): { r: number; g: number; b: number } {
  const rgb = toRgb(input)
  if (!rgb) return { r: 0, g: 0, b: 0 }
  return {
    r: Math.round((rgb.r ?? 0) * 255),
    g: Math.round((rgb.g ?? 0) * 255),
    b: Math.round((rgb.b ?? 0) * 255),
  }
}

function rgbToHex(r: number, g: number, b: number): string {
  return formatHex({ mode: "rgb", r: r / 255, g: g / 255, b: b / 255 }) ?? "#000000"
}

function hexToHsl(input: string): { h: number; s: number; l: number } {
  const hsl = toHsl(input)
  if (!hsl) return { h: 0, s: 0, l: 0 }
  return {
    h: Math.round(hsl.h ?? 0),
    s: Math.round((hsl.s ?? 0) * 100),
    l: Math.round((hsl.l ?? 0) * 100),
  }
}

function formatColor(hex: string, format: ColorFormat): string {
  if (format === "hex") return hex
  const { r, g, b } = hexToRgb(hex)
  if (format === "rgb") return `rgb(${r}, ${g}, ${b})`
  const { h, s, l } = hexToHsl(hex)
  return `hsl(${h}, ${s}%, ${l}%)`
}

function parseColorInput(input: string): string | null {
  const trimmed = input.trim()
  if (!trimmed) return null
  try {
    const parsed = parse(trimmed.startsWith("#") ? trimmed : trimmed.match(/^[0-9a-fA-F]{6}$/) ? `#${trimmed}` : trimmed)
    return parsed ? formatHex(parsed) : null
  } catch {
    return null
  }
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

// --- Channel input group (connected borders) ---

function ChannelInputGroup({
  channels,
}: {
  channels: { value: number; min: number; max: number; suffix?: string; onChange: (v: number) => void }[]
}) {
  return (
    <div className="flex flex-1">
      {channels.map((ch, i) => (
        <div
          key={i}
          className={cn(
            "relative flex-1",
            i === 0 && "[&_input]:rounded-r-none [&_input]:border-r-0",
            i === channels.length - 1 && "[&_input]:rounded-l-none",
            i > 0 && i < channels.length - 1 && "[&_input]:rounded-none [&_input]:border-r-0",
          )}
        >
          <Input
            type="number"
            min={ch.min}
            max={ch.max}
            value={ch.value}
            onChange={(e) => {
              const v = parseInt(e.target.value)
              if (!isNaN(v)) ch.onChange(Math.max(ch.min, Math.min(ch.max, v)))
            }}
            className={cn(
              "h-7 w-full px-1 text-center font-mono text-xs [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
              ch.suffix && "pr-4",
            )}
          />
          {ch.suffix && (
            <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">
              {ch.suffix}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

// --- Main Component ---

function ColorPicker({
  value = "#3b82f6",
  onChange,
  defaultFormat = "hex",
  presets,
  showAlpha = false,
  className,
}: ColorPickerProps) {
  const [hsv, setHsv] = React.useState(() => hexToHsv(value))
  const [format, setFormat] = React.useState<ColorFormat>(defaultFormat)
  const [alpha, setAlpha] = React.useState(1)
  const [hexInput, setHexInput] = React.useState(value)

  const currentHex = React.useMemo(() => hsvToHex(hsv.h, hsv.s, hsv.v), [hsv])
  const currentRgb = React.useMemo(() => hexToRgb(currentHex), [currentHex])
  const currentHsl = React.useMemo(() => hexToHsl(currentHex), [currentHex])

  React.useEffect(() => {
    const parsed = parseColorInput(value) ?? value
    setHsv(hexToHsv(parsed))
    setHexInput(parsed)
  }, [value])

  const emitChange = React.useCallback(
    (hex: string) => {
      setHexInput(hex)
      onChange?.(formatColor(hex, format))
    },
    [onChange, format]
  )

  const updateFromHsv = React.useCallback(
    (h: number, s: number, v: number) => {
      setHsv({ h, s, v })
      emitChange(hsvToHex(h, s, v))
    },
    [emitChange]
  )

  const updateFromRgb = React.useCallback(
    (r: number, g: number, b: number) => {
      const hex = rgbToHex(r, g, b)
      setHsv(hexToHsv(hex))
      emitChange(hex)
    },
    [emitChange]
  )

  const updateFromHsl = React.useCallback(
    (h: number, s: number, l: number) => {
      // HSL to RGB
      const ss = s / 100, ll = l / 100
      const a = ss * Math.min(ll, 1 - ll)
      const f = (n: number) => {
        const k = (n + h / 30) % 12
        return ll - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
      }
      const hex = rgbToHex(Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255))
      setHsv(hexToHsv(hex))
      emitChange(hex)
    },
    [emitChange]
  )

  const handleHexInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setHexInput(val)
      const parsed = parseColorInput(val)
      if (parsed) {
        setHsv(hexToHsv(parsed))
        onChange?.(parsed)
      }
    },
    [onChange]
  )

  const handlePresetClick = React.useCallback(
    (preset: string) => {
      setHsv(hexToHsv(preset))
      emitChange(preset)
    },
    [emitChange]
  )

  const handleFormatChange = React.useCallback(() => {
    const formats: ColorFormat[] = ["hex", "rgb", "hsl"]
    const nextIdx = (formats.indexOf(format) + 1) % formats.length
    setFormat(formats[nextIdx])
  }, [format])

  const handleEyeDropper = React.useCallback(() => {
    if ("EyeDropper" in window) {
      const eyeDropper = new (window as any).EyeDropper()
      eyeDropper
        .open()
        .then((result: { sRGBHex: string }) => handlePresetClick(result.sRGBHex))
        .catch(() => {})
    }
  }, [handlePresetClick])

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
          style={{ backgroundColor: currentHex, opacity: alpha }}
        />
        <span className="font-mono text-xs">{formatColor(currentHex, format)}</span>
      </PopoverTrigger>
      <PopoverContent data-slot="color-picker" className="w-64 p-3">
        <div className="flex flex-col gap-3">
          {/* Color area */}
          <ColorArea
            hue={hsv.h}
            saturation={hsv.s}
            brightness={hsv.v}
            onChange={(s, v) => updateFromHsv(hsv.h, s, v)}
          />

          {/* Hue slider */}
          <HueSlider
            hue={hsv.h}
            onChange={(h) => updateFromHsv(h, hsv.s, hsv.v)}
          />

          {/* Alpha slider */}
          {showAlpha && (
            <div
              className="relative h-3 w-full cursor-pointer rounded-full border border-border"
              style={{
                background: `linear-gradient(to right, transparent, ${currentHex})`,
              }}
            >
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(alpha * 100)}
                onChange={(e) => setAlpha(parseInt(e.target.value) / 100)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
              <div
                className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md pointer-events-none"
                style={{
                  left: `${alpha * 100}%`,
                  backgroundColor: currentHex,
                }}
              />
            </div>
          )}

          {/* Format selector + inputs */}
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 px-2 font-mono text-[10px] uppercase"
              onClick={handleFormatChange}
            >
              {format}
            </Button>

            {format === "hex" ? (
              <Input
                value={hexInput}
                onChange={handleHexInput}
                className="h-7 flex-1 font-mono text-xs"
                spellCheck={false}
              />
            ) : format === "rgb" ? (
              <ChannelInputGroup
                channels={[
                  { value: currentRgb.r, min: 0, max: 255, onChange: (r) => updateFromRgb(r, currentRgb.g, currentRgb.b) },
                  { value: currentRgb.g, min: 0, max: 255, onChange: (g) => updateFromRgb(currentRgb.r, g, currentRgb.b) },
                  { value: currentRgb.b, min: 0, max: 255, onChange: (b) => updateFromRgb(currentRgb.r, currentRgb.g, b) },
                  ...(showAlpha ? [{ value: Math.round(alpha * 100), min: 0, max: 100, suffix: "%", onChange: (a: number) => setAlpha(a / 100) }] : []),
                ]}
              />
            ) : (
              <ChannelInputGroup
                channels={[
                  { value: currentHsl.h, min: 0, max: 360, onChange: (h) => updateFromHsl(h, currentHsl.s, currentHsl.l) },
                  { value: currentHsl.s, min: 0, max: 100, onChange: (s) => updateFromHsl(currentHsl.h, s, currentHsl.l) },
                  { value: currentHsl.l, min: 0, max: 100, onChange: (l) => updateFromHsl(currentHsl.h, currentHsl.s, l) },
                  ...(showAlpha ? [{ value: Math.round(alpha * 100), min: 0, max: 100, suffix: "%", onChange: (a: number) => setAlpha(a / 100) }] : []),
                ]}
              />
            )}

            {"EyeDropper" in globalThis && (
              <Button
                variant="ghost"
                size="icon-sm"
                className="shrink-0"
                onClick={handleEyeDropper}
                title="Pick color from screen"
              >
                <Pipette className="size-3.5" />
              </Button>
            )}
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
