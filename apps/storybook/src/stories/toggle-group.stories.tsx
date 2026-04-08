import type { Meta, StoryObj } from '@storybook/react'
import { ToggleGroup, ToggleGroupItem } from '@e412/rnui-react'

const meta = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Selection type',
    },
    variant: {
      control: 'select',
      options: ['default', 'outline'],
      description: 'Toggle group variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Toggle group size',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Group orientation',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the group is disabled',
    },
  },
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        Bold
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        Italic
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        Underline
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Single: Story = {
  render: () => (
    <ToggleGroup type="single">
      <ToggleGroupItem value="left" aria-label="Left align">
        Left
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Center align">
        Center
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Right align">
        Right
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Outline: Story = {
  render: () => (
    <ToggleGroup type="multiple" variant="outline">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        Bold
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        Italic
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        Underline
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Small: Story = {
  render: () => (
    <ToggleGroup type="multiple" size="sm">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        B
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        I
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        U
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Large: Story = {
  render: () => (
    <ToggleGroup type="multiple" size="lg">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        Bold
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        Italic
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        Underline
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const WithSpacing: Story = {
  render: () => (
    <ToggleGroup type="multiple" spacing={2}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        Bold
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        Italic
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        Underline
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ToggleGroup type="single" orientation="vertical">
      <ToggleGroupItem value="top" aria-label="Top">
        Top
      </ToggleGroupItem>
      <ToggleGroupItem value="middle" aria-label="Middle">
        Middle
      </ToggleGroupItem>
      <ToggleGroupItem value="bottom" aria-label="Bottom">
        Bottom
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <ToggleGroup type="multiple" disabled>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        Bold
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        Italic
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        Underline
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}
