import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DateSelector, DateSelectorValue, formatDateValue } from '@e412/rnui-react'

const meta = {
  title: 'Components/DateSelector',
  component: DateSelector,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label displayed above the date selector',
    },
    showInput: {
      control: 'boolean',
      description: 'Whether to show the text input',
    },
    showTwoMonths: {
      control: 'boolean',
      description: 'Whether to show two months in the calendar',
    },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof DateSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-xl">
      <DateSelector {...args} />
    </div>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <DateSelector label="Select Date" />
    </div>
  ),
}

export const RangeMode: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <DateSelector defaultFilterType="between" />
    </div>
  ),
}

export const MonthOnly: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <DateSelector periodTypes={["month"]} />
    </div>
  ),
}

export const QuarterAndYear: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <DateSelector periodTypes={["quarter", "year"]} />
    </div>
  ),
}

export const NoInput: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <DateSelector showInput={false} />
    </div>
  ),
}

export const SingleMonth: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <DateSelector showTwoMonths={false} />
    </div>
  ),
}

export const Controlled: Story = {
  render: function ControlledDateSelector() {
    const [value, setValue] = useState<DateSelectorValue | undefined>(undefined)

    return (
      <div className="flex w-full max-w-xl flex-col gap-4">
        <DateSelector value={value} onChange={setValue} />
        {value && (
          <div className="rounded-md border p-4">
            <p className="mb-1 text-sm font-medium">Formatted: {formatDateValue(value)}</p>
            <pre className="text-xs text-muted-foreground">
              {JSON.stringify(value, null, 2)}
            </pre>
          </div>
        )}
      </div>
    )
  },
}
