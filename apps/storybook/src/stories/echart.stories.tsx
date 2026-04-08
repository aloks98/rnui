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

/* ------------------------------------------------------------------ */
/*  Custom Tooltip                                                     */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Custom Colors                                                      */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Annotations (markLine + markPoint)                                 */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Data Zoom (interactive range selection)                            */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Mixed Chart (Bar + Line)                                           */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Negative Values                                                    */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Loading State                                                      */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  No Animation                                                       */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Custom Height                                                      */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Donut with Center Label                                            */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Sparkline (minimal inline chart)                                   */
/* ------------------------------------------------------------------ */

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
