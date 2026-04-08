import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from '@e412/rnui-react'

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline'],
      description: 'Toggle variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Toggle size',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
    },
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    'aria-label': 'Toggle bold',
    children: 'Bold',
  },
}

export const Outline: Story = {
  render: () => (
    <Toggle variant="outline" aria-label="Toggle italic">
      Italic
    </Toggle>
  ),
}

export const Small: Story = {
  render: () => (
    <Toggle size="sm" aria-label="Toggle underline">
      U
    </Toggle>
  ),
}

export const Large: Story = {
  render: () => (
    <Toggle size="lg" aria-label="Toggle large">
      Large
    </Toggle>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Toggle disabled aria-label="Toggle disabled">
      Disabled
    </Toggle>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <Toggle aria-label="Default">Default</Toggle>
      <Toggle variant="outline" aria-label="Outline">Outline</Toggle>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <Toggle size="sm" aria-label="Small">SM</Toggle>
      <Toggle size="default" aria-label="Default">Default</Toggle>
      <Toggle size="lg" aria-label="Large">LG</Toggle>
    </div>
  ),
}
