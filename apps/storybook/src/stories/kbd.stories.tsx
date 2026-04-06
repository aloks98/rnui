import type { Meta, StoryObj } from '@storybook/react'
import { Kbd, KbdGroup } from '@e412/rnui-react'

const meta = {
  title: 'Components/Kbd',
  component: Kbd,
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Kbd>K</Kbd>,
}

export const Group: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
}
