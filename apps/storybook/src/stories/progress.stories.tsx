import type { Meta, StoryObj } from '@storybook/react'
import { Progress, ProgressLabel, ProgressValue } from '@e412/rnui-react'

const meta = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value (0-100)',
    },
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 60,
    className: 'w-[60%]',
  },
}

export const Empty: Story = {
  args: {
    value: 0,
    className: 'w-[60%]',
  },
}

export const Full: Story = {
  args: {
    value: 100,
    className: 'w-[60%]',
  },
}

export const WithLabelAndValue: Story = {
  render: () => (
    <Progress value={60} className="w-[60%]">
      <ProgressLabel>Uploading...</ProgressLabel>
      <ProgressValue />
    </Progress>
  ),
}
