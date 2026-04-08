import type { Meta, StoryObj } from '@storybook/react'
import { AreaChart } from '@e412/rnui-react'

const meta = {
  title: 'Charts/AreaChart',
  component: AreaChart,
  decorators: [
    (Story: any) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AreaChart>

export default meta

const areaSeries = [
  { name: 'Users', data: [820, 932, 901, 1234, 1290, 1530] },
  { name: 'Sessions', data: [1200, 1400, 1100, 1800, 2000, 2300] },
]
const areaCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

export const AreaChartDefault: StoryObj = {
  render: () => (
    <div className="w-full max-w-2xl">
      <AreaChart categories={areaCategories} series={areaSeries} />
    </div>
  ),
}

export const AreaChartStacked: StoryObj = {
  render: () => (
    <div className="w-full max-w-2xl">
      <AreaChart categories={areaCategories} series={areaSeries} stacked={true} />
    </div>
  ),
}
