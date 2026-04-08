import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@e412/rnui-react'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default', 'outline', 'secondary',
        'info', 'success', 'warning', 'destructive', 'focus', 'invert',
        'primary-light', 'info-light', 'success-light', 'warning-light', 'destructive-light', 'invert-light', 'focus-light',
        'primary-outline', 'info-outline', 'success-outline', 'warning-outline', 'destructive-outline', 'invert-outline', 'focus-outline',
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'xl'],
    },
    radius: {
      control: 'select',
      options: ['default', 'full'],
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Badge' },
}

export const SolidVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="focus">Focus</Badge>
      <Badge variant="invert">Invert</Badge>
    </div>
  ),
}

export const LightVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Badge variant="primary-light">Primary</Badge>
      <Badge variant="info-light">Info</Badge>
      <Badge variant="success-light">Success</Badge>
      <Badge variant="warning-light">Warning</Badge>
      <Badge variant="destructive-light">Destructive</Badge>
      <Badge variant="invert-light">Invert</Badge>
      <Badge variant="focus-light">Focus</Badge>
    </div>
  ),
}

export const OutlineVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Badge variant="primary-outline">Primary</Badge>
      <Badge variant="info-outline">Info</Badge>
      <Badge variant="success-outline">Success</Badge>
      <Badge variant="warning-outline">Warning</Badge>
      <Badge variant="destructive-outline">Destructive</Badge>
      <Badge variant="invert-outline">Invert</Badge>
      <Badge variant="focus-outline">Focus</Badge>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Badge size="xs">XS</Badge>
      <Badge size="sm">SM</Badge>
      <Badge size="default">Default</Badge>
      <Badge size="lg">LG</Badge>
      <Badge size="xl">XL</Badge>
    </div>
  ),
}

export const FullRadius: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Badge radius="full">Default</Badge>
      <Badge radius="full" variant="info">Info</Badge>
      <Badge radius="full" variant="success">Success</Badge>
      <Badge radius="full" variant="warning">Warning</Badge>
      <Badge radius="full" variant="destructive">Destructive</Badge>
    </div>
  ),
}
