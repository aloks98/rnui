import type { Meta, StoryObj } from '@storybook/react'
import { EmptyState } from '@e412/rnui-react'
import { Inbox, Plus } from 'lucide-react'

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: <Inbox />,
    title: 'No messages',
    description: 'You have no messages in your inbox. New messages will appear here.',
  },
}

export const WithAction: Story = {
  args: {
    icon: <Inbox />,
    title: 'No projects yet',
    description: 'Get started by creating your first project.',
    action: (
      <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        <Plus className="h-4 w-4" />
        Create Project
      </button>
    ),
  },
}
