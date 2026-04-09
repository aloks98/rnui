import type { Meta, StoryObj } from '@storybook/react'
import { RadarChart, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@e412/rnui-react'

const meta = {
  title: 'Charts/RadarChart',
  component: RadarChart,
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: { type: 'number', min: 100, max: 600 },
      description: 'Chart height in pixels',
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
} satisfies Meta<typeof RadarChart>

export default meta

export const RadarChartDefault: StoryObj = {
  render: () => (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Skills Comparison</CardTitle>
        <CardDescription>Product A vs Product B across key metrics</CardDescription>
      </CardHeader>
      <CardContent>
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
          height={300}
        />
      </CardContent>
    </Card>
  ),
}
