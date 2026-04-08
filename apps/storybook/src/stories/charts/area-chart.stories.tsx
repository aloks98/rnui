import type { Meta, StoryObj } from '@storybook/react'
import { AreaChart } from '@e412/rnui-react'

const meta = {
  title: 'Charts/AreaChart',
  component: AreaChart,
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: { type: 'number', min: 100, max: 600 },
      description: 'Chart height in pixels',
    },
    stacked: {
      control: 'boolean',
      description: 'Stack areas on top of each other',
    },
    smooth: {
      control: 'boolean',
      description: 'Use smooth curves',
    },
    showLegend: {
      control: 'boolean',
      description: 'Show chart legend',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
  },
  decorators: [
    (Story: any) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof AreaChart>

export default meta

const areaSeries = [
  { name: 'Users', data: [820, 932, 901, 1234, 1290, 1530] },
  { name: 'Sessions', data: [1200, 1400, 1100, 1800, 2000, 2300] },
]
const areaCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

export const AreaChartDefault: StoryObj = {
  args: {
    categories: areaCategories,
    series: areaSeries,
  },
}

export const AreaChartStacked: StoryObj = {
  args: {
    categories: areaCategories,
    series: areaSeries,
    stacked: true,
  },
}
