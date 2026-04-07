import type { Meta, StoryObj } from '@storybook/react'
import { CopyButton } from '@e412/rnui-react'

const meta = {
  title: 'Components/CopyButton',
  component: CopyButton,
} satisfies Meta<typeof CopyButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <code className="rounded bg-muted px-2 py-1 text-sm font-mono">npm install @e412/rnui-react</code>
      <CopyButton value="npm install @e412/rnui-react" />
    </div>
  ),
}

export const WithCustomText: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-foreground">API Key:</span>
        <code className="rounded bg-muted px-2 py-1 text-sm font-mono">sk-1234567890abcdef</code>
        <CopyButton value="sk-1234567890abcdef" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-foreground">Endpoint:</span>
        <code className="rounded bg-muted px-2 py-1 text-sm font-mono">https://api.example.com/v1</code>
        <CopyButton value="https://api.example.com/v1" />
      </div>
    </div>
  ),
}
