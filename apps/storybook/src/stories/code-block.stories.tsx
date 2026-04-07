import type { Meta, StoryObj } from '@storybook/react'
import { CodeBlock, InlineCode } from '@e412/rnui-react'

const meta = {
  title: 'Components/CodeBlock',
  component: CodeBlock,
} satisfies Meta<typeof CodeBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    code: `import { Button } from '@e412/rnui-react'

export function App() {
  return <Button>Click me</Button>
}`,
    language: 'tsx',
  },
}

export const WithTitle: Story = {
  args: {
    code: `npm install @e412/rnui-react @e412/rnui-themes`,
    title: 'Terminal',
    language: 'bash',
  },
}

export const WithLineNumbers: Story = {
  args: {
    code: `import { Card, CardHeader, CardTitle, CardContent } from '@e412/rnui-react'

export function UserCard({ name, email }) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{email}</p>
      </CardContent>
    </Card>
  )
}`,
    language: 'tsx',
    showLineNumbers: true,
  },
}

export const WithHighlightedLines: Story = {
  args: {
    code: `import { useState } from 'react'
import { Button } from '@e412/rnui-react'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={() => setCount(c => c + 1)}>
        Increment
      </Button>
    </div>
  )
}`,
    language: 'tsx',
    showLineNumbers: true,
    highlightLines: [5, 10, 11, 12],
  },
}

export const CSSExample: Story = {
  args: {
    code: `@import "tailwindcss";
@import "@e412/rnui-themes";
@source "../node_modules/@e412/rnui-react/dist";`,
    language: 'css',
    title: 'globals.css',
  },
}

export const JSONExample: Story = {
  args: {
    code: `{
  "name": "@e412/rnui-react",
  "version": "0.0.1",
  "dependencies": {
    "react": ">=18",
    "tailwindcss": ">=4"
  }
}`,
    language: 'json',
    showLineNumbers: true,
  },
}

export const NoCopy: Story = {
  args: {
    code: `// This block has no copy button
const x = 42`,
    language: 'ts',
    showCopy: false,
  },
}

export const Inline: Story = {
  render: () => (
    <p className="text-sm text-foreground">
      Install the package with <InlineCode>npm install @e412/rnui-react</InlineCode> and
      import components like <InlineCode>{'<Button />'}</InlineCode>.
    </p>
  ),
}
