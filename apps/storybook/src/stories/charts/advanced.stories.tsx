import type { Meta, StoryObj } from '@storybook/react'
import { EChart, echarts } from '@e412/rnui-react'
import { GaugeChart } from 'echarts/charts'

echarts.use([GaugeChart])

const meta = {
  title: 'Charts/Advanced',
  component: EChart,
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: { type: 'number', min: 100, max: 600 },
      description: 'Chart height in pixels',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    preset: {
      control: 'boolean',
      description: 'Apply default chart presets',
    },
    animateOnMount: {
      control: 'boolean',
      description: 'Animate chart on mount',
    },
  },
  decorators: [
    (Story: any) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EChart>

export default meta

export const BaseEChart: StoryObj = {
  render: () => (
    <div className="w-full max-w-2xl">
      <EChart
        option={{
          series: [
            {
              type: 'gauge',
              progress: { show: true, width: 18 },
              axisLine: { lineStyle: { width: 18 } },
              axisTick: { show: false },
              splitLine: { length: 12, lineStyle: { width: 2 } },
              axisLabel: { distance: 25, fontSize: 12 },
              anchor: { show: true, size: 20, itemStyle: { borderWidth: 2 } },
              title: { show: true, offsetCenter: [0, '70%'], fontSize: 16 },
              detail: {
                valueAnimation: true,
                fontSize: 28,
                offsetCenter: [0, '90%'],
                formatter: '{value}%',
              },
              data: [{ value: 72, name: 'Completion' }],
            },
          ],
        }}
        height={400}
      />
    </div>
  ),
}

export const DataZoom: StoryObj = {
  render: () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const data = [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]

    return (
      <div className="w-full max-w-2xl">
        <EChart
          option={{
            xAxis: { type: 'category', data: months, axisTick: { show: false }, splitLine: { show: false } },
            yAxis: { type: 'value', axisLine: { show: false }, axisTick: { show: false }, splitLine: { lineStyle: { type: 'dashed', opacity: 0.5 } } },
            grid: { containLabel: true, left: 16, right: 16, top: 24, bottom: 60 },
            dataZoom: [
              { type: 'slider', start: 0, end: 100, height: 20, bottom: 8 },
              { type: 'inside', start: 0, end: 100 },
            ],
            series: [
              {
                type: 'bar',
                data,
                barMaxWidth: 40,
                itemStyle: { borderRadius: [4, 4, 0, 0] },
              },
            ],
            tooltip: { trigger: 'axis' },
          }}
          height={400}
        />
      </div>
    )
  },
}

export const MixedChart: StoryObj = {
  render: () => (
    <div className="w-full max-w-2xl">
      <EChart
        option={{
          xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], axisTick: { show: false }, splitLine: { show: false } },
          yAxis: [
            { type: 'value', name: 'Revenue ($)', axisLine: { show: false }, axisTick: { show: false }, splitLine: { lineStyle: { type: 'dashed', opacity: 0.5 } } },
            { type: 'value', name: 'Growth (%)', axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false } },
          ],
          grid: { containLabel: true, left: 16, right: 16, top: 40, bottom: 32 },
          legend: { show: true, bottom: 0 },
          tooltip: { trigger: 'axis' },
          series: [
            {
              name: 'Revenue',
              type: 'bar',
              data: [4200, 3800, 5100, 4600, 5800, 6200],
              barMaxWidth: 40,
              itemStyle: { borderRadius: [4, 4, 0, 0] },
            },
            {
              name: 'Growth',
              type: 'line',
              yAxisIndex: 1,
              data: [12, -5, 18, 8, 22, 15],
              smooth: true,
              symbolSize: 6,
            },
          ],
        }}
        height={400}
      />
    </div>
  ),
}
