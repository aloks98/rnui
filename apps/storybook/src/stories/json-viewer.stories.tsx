import type { Meta, StoryObj } from '@storybook/react'
import { JsonViewer } from '@e412/rnui-react'

const meta = {
  title: 'Components/JsonViewer',
  component: JsonViewer,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title displayed at the top of the viewer',
    },
    defaultExpanded: {
      control: 'select',
      options: [true, false, 0, 1, 2, 3],
      description: 'Whether to expand nodes by default, or expand to a specific depth level',
    },
    showLineNumbers: {
      control: 'boolean',
      description: 'Show line numbers in the viewer',
    },
    showColorIndent: {
      control: 'boolean',
      description: 'Show colored indent lines',
    },
    collapseOn: {
      control: 'select',
      options: ['click', 'doubleClick'],
      description: 'Collapse trigger interaction',
    },
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof JsonViewer>

export default meta
type Story = StoryObj<typeof meta>

const sampleData = {
  name: "John Doe",
  age: 30,
  active: true,
  email: "john@example.com",
  website: "https://example.com",
  color: "#3b82f6",
  joined: "2024-01-15T10:30:00Z",
  address: {
    street: "123 Main St",
    city: "Springfield",
    country: "US",
  },
  tags: ["developer", "designer", "writer"],
  projects: [
    { id: 1, name: "Project Alpha", status: "active" },
    { id: 2, name: "Project Beta", status: "completed" },
    { id: 3, name: "Project Gamma", status: "paused" },
  ],
  metadata: null,
}

export const Default: Story = {
  args: {
    data: sampleData,
    title: "User Data",
  },
}

export const ExpandedByDefault: Story = {
  args: {
    data: sampleData,
    title: "Fully Expanded",
    defaultExpanded: true,
  },
}

export const ExpandedToLevel: Story = {
  args: {
    data: sampleData,
    title: "Expanded to Level 1",
    defaultExpanded: 1,
  },
}

export const WithColorIndent: Story = {
  args: {
    data: sampleData,
    title: "Color Indent Lines",
    defaultExpanded: true,
    showColorIndent: true,
  },
}

export const NoLineNumbers: Story = {
  args: {
    data: sampleData,
    title: "No Line Numbers",
    defaultExpanded: true,
    showLineNumbers: false,
  },
}

export const DoubleClickCollapse: Story = {
  args: {
    data: sampleData,
    title: "Double Click to Collapse",
    defaultExpanded: true,
    collapseOn: "doubleClick",
  },
}

export const WithTruncation: Story = {
  args: {
    data: {
      users: Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
      })),
    },
    title: "Truncated Array (5 items shown)",
    defaultExpanded: 1,
    truncation: { enabled: true, itemsPerArray: 5 },
  },
}

export const APIResponse: Story = {
  args: {
    data: {
      status: 200,
      ok: true,
      url: "https://api.example.com/v1/users?page=1&limit=10",
      headers: {
        "content-type": "application/json",
        "x-request-id": "abc-123-def",
      },
      body: {
        data: [
          { id: 1, name: "Alice", role: "admin", lastLogin: "2024-03-15T08:30:00Z" },
          { id: 2, name: "Bob", role: "user", lastLogin: "2024-03-14T15:22:00Z" },
        ],
        pagination: {
          page: 1,
          limit: 10,
          total: 42,
          hasMore: true,
        },
      },
    },
    title: "API Response",
    defaultExpanded: 2,
  },
}
