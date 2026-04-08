import type { Meta, StoryObj } from '@storybook/react'
import { BarChart } from '@e412/rnui-react'

const meta = {
  title: 'Charts/BarChart',
  component: BarChart,
  decorators: [
    (Story: any) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BarChart>

export default meta
type Story = StoryObj<typeof meta>

export const BarChartDefault: Story = {
  args: {
    data: [
      { name: 'Mon', value: 4200 },
      { name: 'Tue', value: 3800 },
      { name: 'Wed', value: 5100 },
      { name: 'Thu', value: 4600 },
      { name: 'Fri', value: 5800 },
    ],
  },
}

export const BarChartHorizontal: Story = {
  args: {
    data: [
      { name: 'Mon', value: 4200 },
      { name: 'Tue', value: 3800 },
      { name: 'Wed', value: 5100 },
      { name: 'Thu', value: 4600 },
      { name: 'Fri', value: 5800 },
    ],
    horizontal: true,
  },
}

export const BarChartStacked: Story = {
  args: {
    data: [],
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    series: [
      {
        type: 'bar',
        name: 'Revenue',
        data: [4200, 3800, 5100, 4600, 5800, 6200],
        stack: 'total',
        barMaxWidth: 40,
        itemStyle: { borderRadius: [0, 0, 0, 0] },
      },
      {
        type: 'bar',
        name: 'Expenses',
        data: [2800, 3200, 2900, 3100, 2700, 3500],
        stack: 'total',
        barMaxWidth: 40,
        itemStyle: { borderRadius: [4, 4, 0, 0] },
      },
    ],
    showLegend: true,
  },
}

export const NegativeValues: StoryObj = {
  render: () => (
    <div className="w-full max-w-2xl">
      <BarChart
        data={[
          { name: 'Jan', value: 200 },
          { name: 'Feb', value: -120 },
          { name: 'Mar', value: 350 },
          { name: 'Apr', value: -80 },
          { name: 'May', value: 280 },
          { name: 'Jun', value: -150 },
        ]}
        option={{
          series: [
            {
              type: 'bar',
              data: [200, -120, 350, -80, 280, -150],
              barMaxWidth: 40,
              itemStyle: {
                borderRadius: [4, 4, 0, 0],
                color: (params: any) => params.value >= 0 ? '#22c55e' : '#ef4444',
              },
            },
          ],
          xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], axisTick: { show: false }, splitLine: { show: false } },
          yAxis: { type: 'value', axisLine: { show: false }, axisTick: { show: false }, splitLine: { lineStyle: { type: 'dashed', opacity: 0.5 } } },
          grid: { containLabel: true, left: 16, right: 16, top: 24, bottom: 8 },
        }}
      />
    </div>
  ),
}

export const CustomTooltip: StoryObj = {
  render: () => (
    <div className="w-full max-w-2xl">
      <BarChart
        data={[
          { name: 'Jan', value: 4200 },
          { name: 'Feb', value: 3800 },
          { name: 'Mar', value: 5100 },
          { name: 'Apr', value: 4600 },
          { name: 'May', value: 5800 },
          { name: 'Jun', value: 6200 },
        ]}
        option={{
          tooltip: {
            trigger: 'axis',
            formatter: (params: any) => {
              const p = Array.isArray(params) ? params[0] : params
              return `<div style="font-weight:600;margin-bottom:4px">${p.name}</div>
                <div style="display:flex;align-items:center;gap:6px">
                  <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${p.color}"></span>
                  Revenue: <b>$${p.value.toLocaleString()}</b>
                </div>`
            },
          },
        }}
      />
    </div>
  ),
}

export const LoadingState: StoryObj = {
  render: () => (
    <div className="w-full max-w-2xl">
      <BarChart
        data={[
          { name: 'Mon', value: 4200 },
          { name: 'Tue', value: 3800 },
          { name: 'Wed', value: 5100 },
        ]}
        loading={true}
      />
    </div>
  ),
}

export const CustomHeight: StoryObj = {
  render: () => (
    <div className="w-full max-w-2xl">
      <BarChart
        data={[
          { name: 'A', value: 40 },
          { name: 'B', value: 65 },
          { name: 'C', value: 30 },
          { name: 'D', value: 80 },
        ]}
        height={200}
      />
    </div>
  ),
}
