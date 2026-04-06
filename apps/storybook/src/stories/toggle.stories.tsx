import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from '@e412/rnui-react'

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Toggle aria-label="Toggle bold">Bold</Toggle>,
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

export const Disabled: Story = {
  render: () => (
    <Toggle disabled aria-label="Toggle disabled">
      Disabled
    </Toggle>
  ),
}
