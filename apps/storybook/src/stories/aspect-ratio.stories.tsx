import type { Meta, StoryObj } from '@storybook/react'
import { AspectRatio } from '@e412/rnui-react'

const meta = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9}>
        <div className="flex h-full w-full items-center justify-center rounded-md bg-muted text-muted-foreground">
          16:9 Aspect Ratio
        </div>
      </AspectRatio>
    </div>
  ),
}
