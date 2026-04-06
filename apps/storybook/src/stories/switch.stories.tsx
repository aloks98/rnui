import type { Meta, StoryObj } from '@storybook/react'
import { Switch, Label } from '@e412/rnui-react'

const meta = {
  title: 'Components/Switch',
  component: Switch,
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
}

export const Small: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="small-switch" size="sm" />
      <Label htmlFor="small-switch">Small switch</Label>
    </div>
  ),
}
