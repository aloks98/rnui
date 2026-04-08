import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Sortable, SortableItem, SortableItemHandle } from '@e412/rnui-react'
import { GripVertical } from 'lucide-react'

const meta = {
  title: 'Components/Sortable',
  component: Sortable,
  tags: ['autodocs'],
} satisfies Meta<typeof Sortable>

export default meta
type Story = StoryObj<typeof meta>

const defaultItems = [
  { id: '1', label: 'Item 1' },
  { id: '2', label: 'Item 2' },
  { id: '3', label: 'Item 3' },
  { id: '4', label: 'Item 4' },
  { id: '5', label: 'Item 5' },
]

export const Default: Story = {
  render: () => {
    const [items, setItems] = useState(defaultItems)
    return (
      <Sortable
        value={items}
        onValueChange={setItems}
        getItemValue={(item) => item.id}
        className="flex flex-col gap-2 w-72"
      >
        {items.map((item) => (
          <SortableItem key={item.id} value={item.id}>
            <SortableItemHandle className="flex items-center gap-2 rounded-lg border bg-card p-3 cursor-grab">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{item.label}</span>
            </SortableItemHandle>
          </SortableItem>
        ))}
      </Sortable>
    )
  },
}

export const WithHandles: Story = {
  render: () => {
    const [items, setItems] = useState(defaultItems)
    return (
      <Sortable
        value={items}
        onValueChange={setItems}
        getItemValue={(item) => item.id}
        className="flex flex-col gap-2 w-72"
      >
        {items.map((item) => (
          <SortableItem
            key={item.id}
            value={item.id}
            className="flex items-center gap-2 rounded-lg border bg-card p-3"
          >
            <SortableItemHandle>
              <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
            </SortableItemHandle>
            <span className="text-sm text-foreground">{item.label}</span>
          </SortableItem>
        ))}
      </Sortable>
    )
  },
}
