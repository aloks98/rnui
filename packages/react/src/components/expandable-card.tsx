"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export interface CardItem {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  description: string
  details: string
  metadata: string
}

export interface ExpandableCardProps {
  items: CardItem[]
  className?: string
}

function useOutsideClick(callback: () => void) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [callback])

  return ref
}

function ExpandableCard({ items, className }: ExpandableCardProps) {
  const [current, setCurrent] = useState<CardItem | null>(null)
  const ref = useOutsideClick(() => setCurrent(null))

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCurrent(null)
    }
    if (current) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [current])

  return (
    <div data-slot="expandable-card">
      {/* Backdrop */}
      <div
        className={cn(
          "pointer-events-none fixed inset-0 z-10 bg-background/50 backdrop-blur-xl transition-opacity duration-300",
          current ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Expanded card */}
      {current && (
        <div className="fixed inset-0 z-10 grid place-items-center p-4">
          <div
            ref={ref}
            className="flex h-fit w-full max-w-xl cursor-pointer flex-col items-start gap-4 overflow-hidden rounded-lg border bg-card p-4 text-card-foreground shadow-lg animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex w-full items-center gap-4">
              <div className="shrink-0">{current.icon}</div>
              <div className="flex grow flex-col gap-0.5">
                <div className="text-sm font-medium">{current.title}</div>
                <p className="text-sm text-muted-foreground">
                  {current.subtitle} / {current.description}
                </p>
                <div className="text-xs text-muted-foreground">
                  {current.metadata}
                </div>
              </div>
            </div>
            <div className="w-full text-sm text-muted-foreground">
              {current.details}
            </div>
          </div>
        </div>
      )}

      {/* Card list */}
      <div className={cn("relative flex items-start p-6", className)}>
        <div className="relative flex w-full flex-col items-center gap-4 px-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex w-full cursor-pointer flex-row items-center gap-4 rounded-lg border bg-card p-2 text-card-foreground shadow-sm transition-transform duration-150 hover:scale-[1.02] md:p-4"
              onClick={() => setCurrent(item)}
            >
              <div className="shrink-0">{item.icon}</div>
              <div className="flex w-full flex-col items-start justify-between gap-0.5">
                <div className="font-medium">{item.title}</div>
                <div className="text-xs text-muted-foreground">
                  {item.subtitle} / {item.description}
                </div>
                <div className="text-xs text-muted-foreground">
                  {item.metadata}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { ExpandableCard }
