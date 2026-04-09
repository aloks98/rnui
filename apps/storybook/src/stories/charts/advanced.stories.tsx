import type { Meta, StoryObj } from '@storybook/react'
import { EChart, echarts, chartConfig, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@e412/rnui-react'
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
  parameters: { layout: 'centered' },
} satisfies Meta<typeof EChart>

export default meta

export const BaseEChart: StoryObj = {
  render: () => (
    <Card className="w-[672px]">
      <CardHeader>
        <CardTitle>System Performance</CardTitle>
        <CardDescription>Current CPU utilization</CardDescription>
      </CardHeader>
      <CardContent>
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
                data: [{ value: 72, name: 'CPU Usage' }],
              },
            ],
          }}
          height={350}
        />
      </CardContent>
    </Card>
  ),
}

export const DataZoom: StoryObj = {
  render: () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const data = [12.0, 18.9, 27.0, 53.2, 65.6, 96.7, 135.6, 162.2, 82.6, 50.0, 26.4, 13.3]

    return (
      <Card className="w-[672px]">
        <CardHeader>
          <CardTitle>Annual Precipitation</CardTitle>
          <CardDescription>Monthly rainfall in millimeters with interactive zoom</CardDescription>
        </CardHeader>
        <CardContent>
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
            height={350}
          />
        </CardContent>
      </Card>
    )
  },
}

export const MixedChart: StoryObj = {
  render: () => (
    <Card className="w-[672px]">
      <CardHeader>
        <CardTitle>Revenue & Growth Rate</CardTitle>
        <CardDescription>Monthly revenue with year-over-year growth percentage</CardDescription>
      </CardHeader>
      <CardContent>
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
                data: [42000, 38000, 51000, 46000, 58000, 62000],
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
          height={350}
        />
      </CardContent>
    </Card>
  ),
}

/* ------------------------------------------------------------------ */
/*  chartConfig() Builder Examples                                     */
/* ------------------------------------------------------------------ */

export const ConfigBuilderBar: StoryObj = {
  render: () => {
    const option = chartConfig()
      .bar({ data: [18500, 22300, 31200, 27800, 35600, 42100], categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] })
      .tooltip()
      .build()

    return (
      <Card className="w-[672px]">
        <CardHeader>
          <CardTitle>Config Builder — Bar Chart</CardTitle>
          <CardDescription>Built with chartConfig().bar().tooltip().build()</CardDescription>
        </CardHeader>
        <CardContent>
          <EChart option={option} height={350} />
        </CardContent>
      </Card>
    )
  },
}

export const ConfigBuilderMultiLine: StoryObj = {
  render: () => {
    const option = chartConfig()
      .line({ data: [4200, 3800, 5100, 4600, 5800, 6200], categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], name: 'Revenue', smooth: true })
      .line({ data: [2800, 3200, 2900, 3100, 2700, 3500], name: 'Expenses', smooth: true })
      .line({ data: [1400, 600, 2200, 1500, 3100, 2700], name: 'Profit', smooth: true })
      .legend()
      .tooltip()
      .build()

    return (
      <Card className="w-[672px]">
        <CardHeader>
          <CardTitle>Config Builder — Multi-Line</CardTitle>
          <CardDescription>Built with chartConfig().line().line().line().legend().tooltip().build()</CardDescription>
        </CardHeader>
        <CardContent>
          <EChart option={option} height={350} />
        </CardContent>
      </Card>
    )
  },
}

export const ConfigBuilderDonut: StoryObj = {
  render: () => {
    const option = chartConfig()
      .pie({
        data: [
          { name: 'Design', value: 35 },
          { name: 'Engineering', value: 40 },
          { name: 'Marketing', value: 15 },
          { name: 'Sales', value: 10 },
        ],
        donut: true,
      })
      .tooltip('item')
      .legend()
      .build()

    return (
      <Card className="w-[672px]">
        <CardHeader>
          <CardTitle>Config Builder — Donut</CardTitle>
          <CardDescription>Built with chartConfig().pie({'{ donut: true }'}).tooltip('item').legend().build()</CardDescription>
        </CardHeader>
        <CardContent>
          <EChart option={option} height={300} />
        </CardContent>
      </Card>
    )
  },
}

export const ConfigBuilderAreaWithZoom: StoryObj = {
  render: () => {
    const option = chartConfig()
      .line({ data: [820, 932, 901, 1234, 1290, 1530, 1320, 1450, 1680, 1590, 1820, 2010], categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], name: 'Users', smooth: true, area: true, areaOpacity: 0.3 })
      .tooltip()
      .dataZoom(0, 60)
      .build()

    return (
      <Card className="w-[672px]">
        <CardHeader>
          <CardTitle>Config Builder — Area with Zoom</CardTitle>
          <CardDescription>Built with chartConfig().line({'{ area: true }'}).dataZoom(0, 60).build()</CardDescription>
        </CardHeader>
        <CardContent>
          <EChart option={option} height={380} />
        </CardContent>
      </Card>
    )
  },
}

export const ConfigBuilderCustomColors: StoryObj = {
  render: () => {
    const option = chartConfig()
      .bar({ data: [320, 280, 250, 210, 180], categories: ['React', 'Vue', 'Angular', 'Svelte', 'Solid'], horizontal: true })
      .colors(['#6366f1', '#ec4899', '#f59e0b', '#14b8a6', '#8b5cf6'])
      .tooltip()
      .build()

    return (
      <Card className="w-[672px]">
        <CardHeader>
          <CardTitle>Config Builder — Custom Colors</CardTitle>
          <CardDescription>Built with chartConfig().bar().colors([...]).build()</CardDescription>
        </CardHeader>
        <CardContent>
          <EChart option={option} height={300} />
        </CardContent>
      </Card>
    )
  },
}
