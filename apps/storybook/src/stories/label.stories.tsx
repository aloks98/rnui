import type { Meta, StoryObj } from '@storybook/react'
import { Label, Input } from '@e412/rnui-react'

const meta = {
  title: 'Components/Label',
  component: Label,
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="email">Email address</Label>
      <Input type="email" id="email" placeholder="you@example.com" />
    </div>
  ),
}
