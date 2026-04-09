import type { Meta, StoryObj } from '@storybook/react'
import { AreaChart, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@e412/rnui-react'

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
  parameters: { layout: 'centered' },
} satisfies Meta<typeof AreaChart>

export default meta

export const AreaChartDefault: StoryObj = {
  render: () => (
    <Card className="w-[672px]">
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
        <CardDescription>Active users and sessions over the past 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <AreaChart
          categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
          series={[
            { name: 'Users', data: [8200, 9320, 9010, 12340, 12900, 15300] },
            { name: 'Sessions', data: [12000, 14000, 11000, 18000, 20000, 23000] },
          ]}
          height={350}
        />
      </CardContent>
    </Card>
  ),
}

export const AreaChartStacked: StoryObj = {
  render: () => (
    <Card className="w-[672px]">
      <CardHeader>
        <CardTitle>Traffic Sources</CardTitle>
        <CardDescription>Breakdown of traffic by source over time</CardDescription>
      </CardHeader>
      <CardContent>
        <AreaChart
          categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
          series={[
            { name: 'Organic', data: [4200, 4800, 5100, 6200, 7100, 8400] },
            { name: 'Direct', data: [2800, 3200, 2900, 3800, 4200, 4600] },
            { name: 'Referral', data: [1200, 1400, 1100, 1800, 2000, 2300] },
          ]}
          stacked={true}
          showLegend={true}
          height={350}
        />
      </CardContent>
    </Card>
  ),
}
