import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup, RadioGroupItem, Label } from '@e412/rnui-react'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'Default selected value',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio group is disabled',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation of the radio group',
    },
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable" disabled>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r4" />
        <Label htmlFor="r4">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r5" />
        <Label htmlFor="r5">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r6" />
        <Label htmlFor="r6">Compact</Label>
      </div>
    </RadioGroup>
  ),
}
