import type { Meta, StoryObj } from '@storybook/react'
import { Progress, ProgressLabel, ProgressValue } from '@e412/rnui-react'

const meta = {
  title: 'Components/Progress',
  component: Progress,
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Progress value={60} className="w-[60%]" />,
}

export const Empty: Story = {
  render: () => <Progress value={0} className="w-[60%]" />,
}

export const Full: Story = {
  render: () => <Progress value={100} className="w-[60%]" />,
}

export const WithLabelAndValue: Story = {
  render: () => (
    <Progress value={60} className="w-[60%]">
      <ProgressLabel>Uploading...</ProgressLabel>
      <ProgressValue />
    </Progress>
  ),
}
