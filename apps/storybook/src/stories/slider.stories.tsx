import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from '@e412/rnui-react'

const meta = {
  title: 'Components/Slider',
  component: Slider,
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Slider defaultValue={[50]} max={100} step={1} className="w-[60%]" />,
}

export const Range: Story = {
  render: () => <Slider defaultValue={[25, 75]} max={100} step={1} className="w-[60%]" />,
}
