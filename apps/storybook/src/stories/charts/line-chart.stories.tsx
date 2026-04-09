import type { Meta, StoryObj } from '@storybook/react'
import { LineChart, EChart, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@e412/rnui-react'

const meta = {
  title: 'Charts/LineChart',
  component: LineChart,
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: { type: 'number', min: 100, max: 600 },
      description: 'Chart height in pixels',
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
    animateOnMount: {
      control: 'boolean',
      description: 'Animate chart on mount',
    },
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof LineChart>

export default meta

export const LineChartDefault: StoryObj = {
  render: () => (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Weekly Page Views</CardTitle>
        <CardDescription>Daily page views for the current week</CardDescription>
      </CardHeader>
      <CardContent>
        <LineChart
          data={[
            { name: 'Mon', value: 12400 },
            { name: 'Tue', value: 14800 },
            { name: 'Wed', value: 13200 },
            { name: 'Thu', value: 16900 },
            { name: 'Fri', value: 18200 },
            { name: 'Sat', value: 21500 },
            { name: 'Sun', value: 19800 },
          ]}
          height={350}
        />
      </CardContent>
    </Card>
  ),
}

export const LineChartMultiSeries: StoryObj = {
  render: () => (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Revenue Trends</CardTitle>
        <CardDescription>Revenue, expenses, and profit over the past 12 months</CardDescription>
      </CardHeader>
      <CardContent>
        <LineChart
          categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
          series={[
            { name: 'Revenue', data: [42000, 38000, 51000, 46000, 58000, 62000, 55000, 67000, 71000, 64000, 73000, 81000] },
            { name: 'Expenses', data: [28000, 32000, 29000, 31000, 27000, 35000, 33000, 36000, 34000, 38000, 37000, 41000] },
            { name: 'Profit', data: [14000, 6000, 22000, 15000, 31000, 27000, 22000, 31000, 37000, 26000, 36000, 40000] },
          ]}
          smooth={true}
          showLegend={true}
          height={350}
        />
      </CardContent>
    </Card>
  ),
}

export const Annotations: StoryObj = {
  render: () => {
    const pageViews = [8200, 9320, 9010, 12340, 12900, 15300, 13200]
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Traffic Analysis</CardTitle>
          <CardDescription>Page views with min, max, and average annotations</CardDescription>
        </CardHeader>
        <CardContent>
          <LineChart
            data={[
              { name: 'Mon', value: 8200 },
              { name: 'Tue', value: 9320 },
              { name: 'Wed', value: 9010 },
              { name: 'Thu', value: 12340 },
              { name: 'Fri', value: 12900 },
              { name: 'Sat', value: 15300 },
              { name: 'Sun', value: 13200 },
            ]}
            smooth
            height={350}
            option={{
              series: [
                {
                  type: 'line',
                  data: pageViews,
                  smooth: true,
                  symbolSize: 6,
                  markPoint: {
                    data: [
                      { type: 'max', name: 'Max' },
                      { type: 'min', name: 'Min' },
                    ],
                    label: { fontSize: 10 },
                  },
                  markLine: {
                    data: [
                      { type: 'average', name: 'Average' },
                    ],
                    label: { formatter: 'Avg: {c}', fontSize: 11 },
                    lineStyle: { type: 'dashed' },
                  },
                },
              ],
              xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: { show: false },
                splitLine: { show: false },
              },
              yAxis: {
                type: 'value',
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { lineStyle: { type: 'dashed', opacity: 0.5 } },
              },
              grid: { containLabel: true, left: 16, right: 16, top: 40, bottom: 8 },
            }}
          />
        </CardContent>
      </Card>
    )
  },
}

export const NoAnimation: StoryObj = {
  render: () => (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Static Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <LineChart
          data={[
            { name: 'Mon', value: 820 },
            { name: 'Tue', value: 932 },
            { name: 'Wed', value: 901 },
            { name: 'Thu', value: 1234 },
            { name: 'Fri', value: 1290 },
          ]}
          animateOnMount={false}
          option={{ animation: false }}
          height={350}
        />
      </CardContent>
    </Card>
  ),
}

export const Sparkline: StoryObj = {
  render: () => (
    <div className="flex items-center gap-4">
      <span className="text-sm text-muted-foreground">Revenue</span>
      <div className="w-32">
        <EChart
          option={{
            grid: { left: 0, right: 0, top: 2, bottom: 2 },
            xAxis: { show: false, type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
            yAxis: { show: false, type: 'value' },
            series: [{
              type: 'line',
              data: [820, 932, 901, 1234, 1290, 1530, 1320],
              smooth: true,
              symbol: 'none',
              lineStyle: { width: 1.5 },
              areaStyle: { opacity: 0.1 },
            }],
            tooltip: { show: false },
          }}
          height={32}
          preset={false}
          animateOnMount={false}
        />
      </div>
      <span className="text-sm font-medium">$1,320</span>
    </div>
  ),
}
