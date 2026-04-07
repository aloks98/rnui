import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ColorPicker } from '@e412/rnui-react'

const meta = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
} satisfies Meta<typeof ColorPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [color, setColor] = useState('#3b82f6')
    return (
      <div className="flex items-center gap-3">
        <ColorPicker value={color} onChange={setColor} />
      </div>
    )
  },
}

export const WithPresets: Story = {
  render: () => {
    const [color, setColor] = useState('#3b82f6')
    const presets = [
      '#ef4444', '#f97316', '#eab308', '#22c55e',
      '#3b82f6', '#8b5cf6', '#ec4899', '#000000',
      '#6b7280', '#14b8a6', '#f43f5e', '#ffffff',
    ]
    return (
      <div className="flex items-center gap-3">
        <ColorPicker value={color} onChange={setColor} presets={presets} />
      </div>
    )
  },
}

export const RGBFormat: Story = {
  render: () => {
    const [color, setColor] = useState('#8b5cf6')
    return (
      <div className="flex items-center gap-3">
        <ColorPicker value={color} onChange={setColor} defaultFormat="rgb" />
      </div>
    )
  },
}

export const HSLFormat: Story = {
  render: () => {
    const [color, setColor] = useState('#22c55e')
    return (
      <div className="flex items-center gap-3">
        <ColorPicker value={color} onChange={setColor} defaultFormat="hsl" />
      </div>
    )
  },
}
