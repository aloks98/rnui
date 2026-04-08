import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ColorPicker } from '@e412/rnui-react'

const meta = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'color',
      description: 'The current color value (hex string)',
    },
    defaultFormat: {
      control: 'select',
      options: ['hex', 'rgb', 'hsl'],
      description: 'Default color format to display',
    },
    showAlpha: {
      control: 'boolean',
      description: 'Whether to show the alpha slider',
    },
    onChange: { action: 'changed' },
  },
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

export const WithAlpha: Story = {
  render: () => {
    const [color, setColor] = useState('#3b82f6')
    return (
      <div className="flex items-center gap-3">
        <ColorPicker value={color} onChange={setColor} showAlpha defaultFormat="rgb" />
      </div>
    )
  },
}
