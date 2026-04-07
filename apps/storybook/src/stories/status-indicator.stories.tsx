import type { Meta, StoryObj } from '@storybook/react'
import { StatusIndicator } from '@e412/rnui-react'

const meta = {
  title: 'Components/StatusIndicator',
  component: StatusIndicator,
  argTypes: {
    state: {
      control: 'select',
      options: ['active', 'down', 'fixing', 'idle'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof StatusIndicator>

export default meta
type Story = StoryObj<typeof meta>

export const Active: Story = {
  args: {
    state: 'active',
    label: 'Online',
  },
}

export const Down: Story = {
  args: {
    state: 'down',
    label: 'Offline',
  },
}

export const Fixing: Story = {
  args: {
    state: 'fixing',
    label: 'Maintenance',
  },
}

export const Idle: Story = {
  args: {
    state: 'idle',
    label: 'Idle',
  },
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <StatusIndicator state="active" label="Active — System operational" />
      <StatusIndicator state="down" label="Down — Service unavailable" />
      <StatusIndicator state="fixing" label="Fixing — Under maintenance" />
      <StatusIndicator state="idle" label="Idle — No activity" />
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <StatusIndicator state="active" size="sm" label="Small" />
      <StatusIndicator state="active" size="md" label="Medium (default)" />
      <StatusIndicator state="active" size="lg" label="Large" />
    </div>
  ),
}

export const WithoutLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <StatusIndicator state="active" size="sm" />
      <StatusIndicator state="down" size="md" />
      <StatusIndicator state="fixing" size="lg" />
      <StatusIndicator state="idle" size="md" />
    </div>
  ),
}

export const ServiceDashboard: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-3 rounded-lg border p-4">
      <h3 className="text-sm font-medium">Service Status</h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">API Gateway</span>
          <StatusIndicator state="active" size="sm" label="Operational" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Database</span>
          <StatusIndicator state="active" size="sm" label="Operational" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">CDN</span>
          <StatusIndicator state="fixing" size="sm" label="Degraded" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Email Service</span>
          <StatusIndicator state="down" size="sm" label="Outage" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Background Jobs</span>
          <StatusIndicator state="idle" size="sm" label="Idle" />
        </div>
      </div>
    </div>
  ),
}
