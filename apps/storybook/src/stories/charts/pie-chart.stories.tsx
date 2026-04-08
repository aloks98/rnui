import type { Meta, StoryObj } from '@storybook/react'
import { PieChart } from '@e412/rnui-react'

const meta = {
  title: 'Charts/PieChart',
  component: PieChart,
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: { type: 'number', min: 100, max: 600 },
      description: 'Chart height in pixels',
    },
    donut: {
      control: 'boolean',
      description: 'Render as a donut chart',
    },
    showLegend: {
      control: 'boolean',
      description: 'Show chart legend',
    },
    showLabels: {
      control: 'boolean',
      description: 'Show slice labels',
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
} satisfies Meta<typeof PieChart>

export default meta

const browserData = [
  { name: 'Chrome', value: 63 },
  { name: 'Safari', value: 18 },
  { name: 'Firefox', value: 10 },
  { name: 'Edge', value: 6 },
  { name: 'Other', value: 3 },
]

export const PieChartDefault: StoryObj = {
  args: {
    data: browserData,
  },
}

export const DonutChart: StoryObj = {
  args: {
    data: browserData,
    donut: true,
  },
}

export const CustomColors: StoryObj = {
  render: () => (
    <div className="w-full max-w-2xl">
      <PieChart
        data={[
          { name: 'Design', value: 35 },
          { name: 'Development', value: 40 },
          { name: 'Marketing', value: 15 },
          { name: 'Sales', value: 10 },
        ]}
        option={{
          color: ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b'],
        }}
      />
    </div>
  ),
}

export const DonutWithCenterLabel: StoryObj = {
  render: () => (
    <div className="w-full max-w-2xl">
      <PieChart
        data={[
          { name: 'Used', value: 72 },
          { name: 'Free', value: 28 },
        ]}
        donut
        showLegend={false}
        showLabels={false}
        option={{
          color: ['#3b82f6', '#e5e7eb'],
          series: [
            {
              type: 'pie',
              radius: ['55%', '75%'],
              center: ['50%', '50%'],
              data: [
                { name: 'Used', value: 72 },
                { name: 'Free', value: 28, itemStyle: { color: '#e5e7eb' } },
              ],
              label: { show: false },
              emphasis: { scale: false },
              itemStyle: { borderRadius: 6, borderWidth: 3, borderColor: 'transparent' },
            },
          ],
          graphic: [
            {
              type: 'text',
              left: 'center',
              top: '42%',
              style: {
                text: '72%',
                fontSize: 28,
                fontWeight: 'bold',
                textAlign: 'center',
              },
            },
            {
              type: 'text',
              left: 'center',
              top: '55%',
              style: {
                text: 'Storage Used',
                fontSize: 12,
                textAlign: 'center',
                fill: '#6b7280',
              },
            },
          ],
        }}
      />
    </div>
  ),
}
