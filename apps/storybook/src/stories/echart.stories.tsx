import type { Meta, StoryObj } from '@storybook/react'
import {
  EChart,
  BarChart,
  LineChart,
  AreaChart,
  PieChart,
  RadarChart,
  ScatterChart,
  echarts,
} from '@e412/rnui-react'
import { GaugeChart } from 'echarts/charts'

echarts.use([GaugeChart])

/* ------------------------------------------------------------------ */
/*  Bar Chart                                                         */
/* ------------------------------------------------------------------ */

const barMeta = {
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

export default barMeta
type BarStory = StoryObj<typeof barMeta>

export const BarChartDefault: BarStory = {
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

export const BarChartHorizontal: BarStory = {
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

export const BarChartStacked: BarStory = {
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

/* ------------------------------------------------------------------ */
/*  Line Chart                                                        */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Area Chart                                                        */
/* ------------------------------------------------------------------ */

const areaSeries = [
  { name: 'Users', data: [820, 932, 901, 1234, 1290, 1530] },
  { name: 'Sessions', data: [1200, 1400, 1100, 1800, 2000, 2300] },
]
const areaCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

export const AreaChartDefault: StoryObj = {
  render: () => (
    <div className="w-full max-w-2xl">
      <AreaChart categories={areaCategories} series={areaSeries} />
    </div>
  ),
}

export const AreaChartStacked: StoryObj = {
  render: () => (
    <div className="w-full max-w-2xl">
      <AreaChart categories={areaCategories} series={areaSeries} stacked={true} />
    </div>
  ),
}

/* ------------------------------------------------------------------ */
/*  Pie Chart                                                         */
/* ------------------------------------------------------------------ */

const browserData = [
  { name: 'Chrome', value: 63 },
  { name: 'Safari', value: 18 },
  { name: 'Firefox', value: 10 },
  { name: 'Edge', value: 6 },
  { name: 'Other', value: 3 },
]

export const PieChartDefault: StoryObj = {
  render: () => (
    <div className="w-full max-w-2xl">
      <PieChart data={browserData} />
    </div>
  ),
}

export const DonutChart: StoryObj = {
  render: () => (
    <div className="w-full max-w-2xl">
      <PieChart data={browserData} donut={true} />
    </div>
  ),
}

/* ------------------------------------------------------------------ */
/*  Radar Chart                                                       */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Scatter Chart                                                     */
/* ------------------------------------------------------------------ */

export const ScatterChartDefault: StoryObj = {
  render: () => (
    <div className="w-full max-w-2xl">
      <ScatterChart
        series={[
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
        ]}
      />
    </div>
  ),
}

/* ------------------------------------------------------------------ */
/*  Base EChart (Gauge)                                               */
/* ------------------------------------------------------------------ */

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
