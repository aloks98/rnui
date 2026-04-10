import type { ReactNode } from 'react'

export function Preview({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`not-prose flex min-h-[150px] items-center justify-center rounded-lg border p-6 ${className ?? ''}`}>
      {children}
    </div>
  )
}
