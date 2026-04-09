import type { Meta, StoryObj } from '@storybook/react'
import { ScatterChart, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@e412/rnui-react'

const meta = {
  title: 'Charts/ScatterChart',
  component: ScatterChart,
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
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ScatterChart>

export default meta

export const ScatterChartDefault: StoryObj = {
  render: () => (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Height vs Weight</CardTitle>
        <CardDescription>Body measurements across two sample groups</CardDescription>
      </CardHeader>
      <CardContent>
        <ScatterChart
          series={[
            {
              name: 'Group A',
              data: [
                [161, 51], [167, 59], [159, 49], [157, 63], [155, 53],
                [170, 59], [159, 47], [166, 69], [176, 66], [160, 75],
                [172, 55], [164, 51], [169, 77], [175, 67], [163, 58],
              ],
            },
            {
              name: 'Group B',
              data: [
                [174, 65], [175, 71], [193, 80], [186, 72], [187, 78],
                [181, 74], [184, 86], [178, 68], [191, 77], [180, 76],
                [177, 70], [183, 84], [189, 82], [185, 79], [192, 85],
              ],
            },
          ]}
          height={350}
        />
      </CardContent>
    </Card>
  ),
}
