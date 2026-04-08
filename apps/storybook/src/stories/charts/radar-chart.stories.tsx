import type { Meta, StoryObj } from '@storybook/react'
import { RadarChart } from '@e412/rnui-react'

const meta = {
  title: 'Charts/RadarChart',
  component: RadarChart,
  decorators: [
    (Story: any) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RadarChart>

export default meta

export const RadarChartDefault: StoryObj = {
  render: () => (
    <div className="w-full max-w-2xl">
      <RadarChart
        indicators={[
          { name: 'Sales', max: 100 },
          { name: 'Admin', max: 100 },
          { name: 'IT', max: 100 },
          { name: 'Support', max: 100 },
          { name: 'Dev', max: 100 },
        ]}
        series={[
          { name: 'Product A', value: [85, 60, 90, 70, 95] },
          { name: 'Product B', value: [65, 80, 55, 85, 70] },
        ]}
      />
    </div>
  ),
}
