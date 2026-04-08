import type { Meta, StoryObj } from '@storybook/react'
import { RadarChart } from '@e412/rnui-react'

const meta = {
  title: 'Charts/RadarChart',
  component: RadarChart,
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: { type: 'number', min: 100, max: 600 },
      description: 'Chart height in pixels',
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
} satisfies Meta<typeof RadarChart>

export default meta

export const RadarChartDefault: StoryObj = {
  args: {
    indicators: [
      { name: 'Sales', max: 100 },
      { name: 'Admin', max: 100 },
      { name: 'IT', max: 100 },
      { name: 'Support', max: 100 },
      { name: 'Dev', max: 100 },
    ],
    series: [
      { name: 'Product A', value: [85, 60, 90, 70, 95] },
      { name: 'Product B', value: [65, 80, 55, 85, 70] },
    ],
  },
}
