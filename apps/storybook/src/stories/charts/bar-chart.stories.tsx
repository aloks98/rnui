import type { Meta, StoryObj } from '@storybook/react'
import { BarChart, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@e412/rnui-react'

const meta = {
  title: 'Charts/BarChart',
  component: BarChart,
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: { type: 'number', min: 100, max: 600 },
      description: 'Chart height in pixels',
    },
    horizontal: {
      control: 'boolean',
      description: 'Whether to render bars horizontally',
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
  parameters: { layout: 'padded' },
} satisfies Meta<typeof BarChart>

export default meta
type Story = StoryObj<typeof meta>

export const BarChartDefault: Story = {
  render: () => (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Monthly Revenue</CardTitle>
        <CardDescription>Revenue performance over the past 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <BarChart
          data={[
            { name: 'Jan', value: 18500 },
            { name: 'Feb', value: 22300 },
            { name: 'Mar', value: 31200 },
            { name: 'Apr', value: 27800 },
            { name: 'May', value: 35600 },
            { name: 'Jun', value: 42100 },
          ]}
          height={350}
        />
      </CardContent>
    </Card>
  ),
}

export const BarChartHorizontal: Story = {
  render: () => (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Top Products by Sales</CardTitle>
        <CardDescription>Best-selling products this quarter</CardDescription>
      </CardHeader>
      <CardContent>
        <BarChart
          data={[
            { name: 'Wireless Headphones', value: 4520 },
            { name: 'Smart Watch', value: 3890 },
            { name: 'USB-C Hub', value: 3210 },
            { name: 'Keyboard', value: 2870 },
            { name: 'Webcam', value: 2140 },
          ]}
          horizontal={true}
          height={350}
        />
      </CardContent>
    </Card>
  ),
}

export const BarChartStacked: Story = {
  render: () => (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Revenue vs Expenses</CardTitle>
        <CardDescription>Monthly financial breakdown for H1 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <BarChart
          data={[]}
          categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
          series={[
            {
              type: 'bar',
              name: 'Revenue',
              data: [18500, 22300, 31200, 27800, 35600, 42100],
              stack: 'total',
              barMaxWidth: 40,
              itemStyle: { borderRadius: [0, 0, 0, 0] },
            },
            {
              type: 'bar',
              name: 'Expenses',
              data: [12400, 14100, 16800, 15200, 18900, 21300],
              stack: 'total',
              barMaxWidth: 40,
              itemStyle: { borderRadius: [4, 4, 0, 0] },
            },
          ]}
          showLegend={true}
          height={350}
        />
      </CardContent>
    </Card>
  ),
}

export const NegativeValues: StoryObj = {
  render: () => {
    const profitData = [4200, -1800, 6500, -2400, 3100, -3200]
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Profit & Loss</CardTitle>
          <CardDescription>Monthly profit and loss statement</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart
            data={[
              { name: 'Jan', value: 4200 },
              { name: 'Feb', value: -1800 },
              { name: 'Mar', value: 6500 },
              { name: 'Apr', value: -2400 },
              { name: 'May', value: 3100 },
              { name: 'Jun', value: -3200 },
            ]}
            height={350}
            option={{
              series: [
                {
                  type: 'bar',
                  data: profitData.map((v) => ({
                    value: v,
                    itemStyle: {
                      borderRadius: v >= 0 ? [4, 4, 0, 0] : [0, 0, 4, 4],
                      color: v >= 0 ? '#22c55e' : '#ef4444',
                    },
                  })),
                  barMaxWidth: 40,
                },
              ],
              xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], axisTick: { show: false }, splitLine: { show: false } },
              yAxis: { type: 'value', axisLine: { show: false }, axisTick: { show: false }, splitLine: { lineStyle: { type: 'dashed', opacity: 0.5 } } },
              grid: { containLabel: true, left: 16, right: 16, top: 24, bottom: 8 },
            }}
          />
        </CardContent>
      </Card>
    )
  },
}

export const CustomTooltip: StoryObj = {
  render: () => (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Sales Performance</CardTitle>
        <CardDescription>Monthly sales with formatted tooltips</CardDescription>
      </CardHeader>
      <CardContent>
        <BarChart
          data={[
            { name: 'Jan', value: 18500 },
            { name: 'Feb', value: 22300 },
            { name: 'Mar', value: 31200 },
            { name: 'Apr', value: 27800 },
            { name: 'May', value: 35600 },
            { name: 'Jun', value: 42100 },
          ]}
          height={350}
          option={{
            tooltip: {
              trigger: 'axis',
              formatter: (params: any) => {
                const p = Array.isArray(params) ? params[0] : params
                return `<div style="font-weight:600;margin-bottom:4px">${p.name}</div>
                  <div style="display:flex;align-items:center;gap:6px">
                    <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${p.color}"></span>
                    Sales: <b>$${p.value.toLocaleString()}</b>
                  </div>`
              },
            },
          }}
        />
      </CardContent>
    </Card>
  ),
}

export const LoadingState: StoryObj = {
  render: () => (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Loading Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart
          data={[
            { name: 'Mon', value: 4200 },
            { name: 'Tue', value: 3800 },
            { name: 'Wed', value: 5100 },
          ]}
          loading={true}
          height={350}
        />
      </CardContent>
    </Card>
  ),
}

export const CustomHeight: StoryObj = {
  render: () => (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Compact View</CardTitle>
        <CardDescription>A smaller chart for tight layouts</CardDescription>
      </CardHeader>
      <CardContent>
        <BarChart
          data={[
            { name: 'Q1', value: 48200 },
            { name: 'Q2', value: 61500 },
            { name: 'Q3', value: 55300 },
            { name: 'Q4', value: 72100 },
          ]}
          height={200}
        />
      </CardContent>
    </Card>
  ),
}
