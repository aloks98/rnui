import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  NumberField,
  NumberFieldGroup,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
  Label,
} from '@e412/rnui-react'

const meta = {
  title: 'Components/NumberField',
  component: NumberField,
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'number',
      description: 'Default value of the number field',
    },
    min: {
      control: 'number',
      description: 'Minimum allowed value',
    },
    max: {
      control: 'number',
      description: 'Maximum allowed value',
    },
    step: {
      control: 'number',
      description: 'Step increment value',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size variant of the number field',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the number field is disabled',
    },
  },
} satisfies Meta<typeof NumberField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <NumberField defaultValue={5} className="w-36">
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <NumberField defaultValue={1} className="w-36">
      <Label>Quantity</Label>
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  ),
}

export const WithMinMax: Story = {
  render: () => (
    <NumberField defaultValue={5} min={0} max={10} className="w-36">
      <Label>Rating (0-10)</Label>
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  ),
}

export const WithStep: Story = {
  render: () => (
    <NumberField defaultValue={0} step={0.25} className="w-36">
      <Label>Amount</Label>
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  ),
}

export const Small: Story = {
  render: () => (
    <NumberField defaultValue={3} size="sm" className="w-32">
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  ),
}

export const Large: Story = {
  render: () => (
    <NumberField defaultValue={3} size="lg" className="w-40">
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  ),
}

export const Disabled: Story = {
  render: () => (
    <NumberField defaultValue={5} disabled className="w-36">
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      <NumberField defaultValue={1} size="sm" className="w-32">
        <Label>Small</Label>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
      <NumberField defaultValue={2} size="default" className="w-36">
        <Label>Default</Label>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
      <NumberField defaultValue={3} size="lg" className="w-40">
        <Label>Large</Label>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(10)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <NumberField value={value} onValueChange={setValue} className="w-36">
          <Label>Controlled</Label>
          <NumberFieldGroup>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
        <p className="text-sm text-muted-foreground">Value: {value}</p>
      </div>
    )
  },
}

export const WithScrubArea: Story = {
  render: () => (
    <NumberField defaultValue={50} className="w-36">
      <NumberFieldScrubArea label="Opacity" />
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  ),
}
