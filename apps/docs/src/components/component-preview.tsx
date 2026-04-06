import { useState } from 'react'

interface ComponentPreviewProps {
  src: string
  code: string
  height?: number
}

export function ComponentPreview({ src, code, height = 150 }: ComponentPreviewProps) {
  const [showCode, setShowCode] = useState(false)

  return (
    <div className="not-content my-6">
      <div className="rounded-t-lg border border-[var(--sl-color-hairline-light)] overflow-hidden">
        <iframe
          src={src}
          title="Component preview"
          className="w-full border-0 bg-white dark:bg-[#0a0a0a]"
          style={{ height: `${height}px` }}
        />
      </div>
      <div className="border-x border-b border-[var(--sl-color-hairline-light)] rounded-b-lg overflow-hidden">
        <button
          type="button"
          onClick={() => setShowCode(!showCode)}
          className="flex w-full items-center justify-center gap-2 border-b border-[var(--sl-color-hairline-light)] px-4 py-2 text-sm transition-colors"
          style={{ backgroundColor: 'var(--sl-color-gray-6)', color: 'var(--sl-color-gray-2)' }}
        >
          {showCode ? 'Hide Code' : 'Show Code'}
        </button>
        {showCode && (
          <pre className="overflow-x-auto p-4 text-sm" style={{ backgroundColor: 'var(--sl-color-gray-6)', color: 'var(--sl-color-gray-2)' }}>
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  )
}
