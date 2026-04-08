import type { Meta, StoryObj } from '@storybook/react'
import { LineChart, EChart } from '@e412/rnui-react'

const meta = {
  title: 'Charts/LineChart',
  component: LineChart,
  decorators: [
    (Story: any) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LineChart>

export default meta

export const LineChartDefault: StoryObj = {
  render: () => (
    <div className="w-full max-w-2xl">
      <LineChart
        data={[
          { name: 'Mon', value: 820 },
          { name: 'Tue', value: 932 },
          { name: 'Wed', value: 901 },
          { name: 'Thu', value: 1234 },
          { name: 'Fri', value: 1290 },
          { name: 'Sat', value: 1530 },
          { name: 'Sun', value: 1320 },
        ]}
      />
    </div>
  ),
}

export const LineChartMultiSeries: StoryObj = {
  render: () => (
    <div className="w-full max-w-2xl">
      <LineChart
        categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
        series={[
          { name: 'Revenue', data: [4200, 3800, 5100, 4600, 5800, 6200] },
          { name: 'Expenses', data: [2800, 3200, 2900, 3100, 2700, 3500] },
          { name: 'Profit', data: [1400, 600, 2200, 1500, 3100, 2700] },
        ]}
        smooth={true}
        showLegend={true}
      />
    </div>
  ),
}

export const Annotations: StoryObj = {
  render: () => (
    <div className="w-full max-w-2xl">
      <LineChart
        data={[
          { name: 'Mon', value: 820 },
          { name: 'Tue', value: 932 },
          { name: 'Wed', value: 901 },
          { name: 'Thu', value: 1234 },
          { name: 'Fri', value: 1290 },
          { name: 'Sat', value: 1530 },
          { name: 'Sun', value: 1320 },
        ]}
        smooth
        option={{
          series: [
            {
              type: 'line',
              data: [820, 932, 901, 1234, 1290, 1530, 1320],
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
    </div>
  ),
}

export const NoAnimation: StoryObj = {
  render: () => (
    <div className="w-full max-w-2xl">
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
      />
    </div>
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
