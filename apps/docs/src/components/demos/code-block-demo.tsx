'use client'

import { CodeBlock } from '@e412/rnui-react'

export function CodeBlockDemo() {
  return (
    <CodeBlock
      code={`import { Button } from '@e412/rnui-react'\n\nexport function App() {\n  return <Button>Click me</Button>\n}`}
      language="tsx"
      showLineNumbers
    />
  )
}
