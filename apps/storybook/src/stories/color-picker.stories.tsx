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
        <span className="text-sm text-muted-foreground font-mono">{color}</span>
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
    ]
    return (
      <div className="flex items-center gap-3">
        <ColorPicker value={color} onChange={setColor} presets={presets} />
        <span className="text-sm text-muted-foreground font-mono">{color}</span>
      </div>
    )
  },
}

export const WithAlpha: Story = {
  render: () => {
    const [color, setColor] = useState('#3b82f6')
    return (
      <div className="flex items-center gap-3">
        <ColorPicker value={color} onChange={setColor} showAlpha />
        <span className="text-sm text-muted-foreground font-mono">{color}</span>
      </div>
    )
  },
}
