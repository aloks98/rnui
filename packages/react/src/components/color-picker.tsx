"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Label } from "@/components/label"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/popover"

export interface ColorPickerProps {
  value?: string
  onChange?: (value: string) => void
  presets?: string[]
  showAlpha?: boolean
  className?: string
}

function hexToRgba(hex: string): { r: number; g: number; b: number; a: number } {
  const clean = hex.replace("#", "")
  const r = parseInt(clean.slice(0, 2), 16) || 0
  const g = parseInt(clean.slice(2, 4), 16) || 0
  const b = parseInt(clean.slice(4, 6), 16) || 0
  const a = clean.length === 8 ? parseInt(clean.slice(6, 8), 16) / 255 : 1
  return { r, g, b, a }
}

function rgbaToHex(r: number, g: number, b: number, a?: number): string {
  const hex = [r, g, b]
    .map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0"))
    .join("")
  if (a !== undefined && a < 1) {
    const alphaHex = Math.round(a * 255)
      .toString(16)
      .padStart(2, "0")
    return `#${hex}${alphaHex}`
  }
  return `#${hex}`
}

function isValidHex(value: string): boolean {
  return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value)
}

function ColorPicker({
  value = "#000000",
  onChange,
  presets,
  showAlpha = false,
  className,
}: ColorPickerProps) {
  const [internalValue, setInternalValue] = React.useState(value)
  const [alpha, setAlpha] = React.useState(1)
  const [hexInput, setHexInput] = React.useState(value)

  React.useEffect(() => {
    setInternalValue(value)
    setHexInput(value)
    if (value.length === 9) {
      const { a } = hexToRgba(value)
      setAlpha(a)
    }
  }, [value])

  const handleColorChange = React.useCallback(
    (newColor: string, newAlpha?: number) => {
      const a = newAlpha ?? alpha
      const finalColor = showAlpha && a < 1
        ? rgbaToHex(
            ...Object.values(hexToRgba(newColor)).slice(0, 3) as [number, number, number],
            a
          )
        : newColor.slice(0, 7)
      setInternalValue(finalColor)
      setHexInput(finalColor)
      onChange?.(finalColor)
    },
    [alpha, showAlpha, onChange]
  )

  const handleHexInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setHexInput(val)
      if (isValidHex(val)) {
        handleColorChange(val)
      }
    },
    [handleColorChange]
  )

  const handleAlphaChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const a = parseFloat(e.target.value)
      setAlpha(a)
      handleColorChange(internalValue, a)
    },
    [internalValue, handleColorChange]
  )

  const displayColor = internalValue.slice(0, 7)

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className={cn("w-10 h-10 rounded-lg p-0 border-border", className)}
          />
        }
      >
        <span
          className="block h-6 w-6 rounded-md border border-border"
          style={{ backgroundColor: displayColor }}
        />
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-64 rounded-lg border border-border bg-card p-3 text-foreground shadow-md"
        )}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={displayColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="h-10 w-10 shrink-0 cursor-pointer rounded-md border border-border bg-transparent p-0.5"
            />
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground">Hex</Label>
              <Input
                value={hexInput}
                onChange={handleHexInput}
                className="h-8 font-mono text-xs"
                placeholder="#000000"
              />
            </div>
          </div>

          {showAlpha && (
            <div className="flex flex-col gap-1">
              <Label className="text-xs text-muted-foreground">
                Opacity: {Math.round(alpha * 100)}%
              </Label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={alpha}
                onChange={handleAlphaChange}
                className="h-2 w-full cursor-pointer accent-primary"
              />
            </div>
          )}

          {presets && presets.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">Presets</Label>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleColorChange(color)}
                    className={cn(
                      "h-6 w-6 rounded-md border border-border transition-transform hover:scale-110",
                      internalValue === color && "ring-2 ring-primary ring-offset-1 ring-offset-background"
                    )}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { ColorPicker }
