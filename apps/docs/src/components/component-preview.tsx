import { useState, type ReactNode } from 'react'

interface ComponentPreviewProps {
  children: ReactNode
  code: string
}

export function ComponentPreview({ children, code }: ComponentPreviewProps) {
  const [showCode, setShowCode] = useState(false)

  return (
    <div className="not-content my-6">
      <div className="flex min-h-[150px] items-center justify-center rounded-t-lg border border-border bg-background p-6">
        {children}
      </div>
      <div className="border-x border-b border-border rounded-b-lg overflow-hidden">
        <button
          type="button"
          onClick={() => setShowCode(!showCode)}
          className="flex w-full items-center justify-center gap-2 border-b border-border bg-muted/50 px-4 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors"
        >
          {showCode ? 'Hide Code' : 'Show Code'}
        </button>
        {showCode && (
          <pre className="overflow-x-auto p-4 text-sm bg-muted/30">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  )
}
