import type { Meta, StoryObj } from '@storybook/react'
import { ScatterChart } from '@e412/rnui-react'

const meta = {
  title: 'Charts/ScatterChart',
  component: ScatterChart,
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
} satisfies Meta<typeof ScatterChart>

export default meta

export const ScatterChartDefault: StoryObj = {
  args: {
    series: [
      {
        name: 'Cluster A',
        data: [
          [10, 8.04], [8, 6.95], [13, 7.58], [9, 8.81], [11, 8.33],
          [14, 9.96], [6, 7.24], [4, 4.26], [12, 10.84], [7, 4.82],
          [5, 5.68], [9.5, 7.71], [3, 4.1], [8.5, 6.42], [11.5, 9.12],
        ],
      },
      {
        name: 'Cluster B',
        data: [
          [20, 18.04], [18, 16.95], [23, 17.58], [19, 18.81], [21, 18.33],
          [24, 19.96], [16, 17.24], [14, 14.26], [22, 20.84], [17, 14.82],
          [15, 15.68], [19.5, 17.71], [13, 14.1], [18.5, 16.42], [21.5, 19.12],
        ],
      },
    ],
  },
}
