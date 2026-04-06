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

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="disabled-switch" disabled />
      <Label htmlFor="disabled-switch">Disabled</Label>
    </div>
  ),
}

export const DisabledChecked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="disabled-checked-switch" disabled defaultChecked />
      <Label htmlFor="disabled-checked-switch">Disabled and checked</Label>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <div className="flex items-center space-x-2">
        <Switch id="size-sm" size="sm" />
        <Label htmlFor="size-sm">Small</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="size-default" />
        <Label htmlFor="size-default">Default</Label>
      </div>
    </div>
  ),
}
