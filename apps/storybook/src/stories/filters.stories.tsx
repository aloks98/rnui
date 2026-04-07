import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Filters,
  Filter,
  FilterFieldConfig,
  createFilter,
  Button,
} from '@e412/rnui-react'
import { FilterIcon } from 'lucide-react'

const meta = {
  title: 'Components/Filters',
  component: Filters,
} satisfies Meta<typeof Filters>

export default meta
type Story = StoryObj<typeof meta>

const fields: FilterFieldConfig<string>[] = [
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
  },
  {
    key: 'role',
    label: 'Role',
    type: 'multiselect',
    options: [
      { value: 'ceo', label: 'CEO' },
      { value: 'cto', label: 'CTO' },
      { value: 'designer', label: 'Designer' },
      { value: 'developer', label: 'Developer' },
      { value: 'engineer', label: 'Engineer' },
    ],
  },
  {
    key: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    key: 'company',
    label: 'Company',
    type: 'text',
  },
]

export const Default: Story = {
  render: function DefaultFilters() {
    const [filters, setFilters] = useState<Filter<string>[]>([])

    return (
      <Filters
        filters={filters}
        fields={fields}
        onChange={setFilters}
        trigger={
          <Button variant="outline" size="sm">
            <FilterIcon className="size-4" />
            Filter
          </Button>
        }
      />
    )
  },
}

export const WithPresetFilters: Story = {
  render: function PresetFilters() {
    const [filters, setFilters] = useState<Filter<string>[]>([
      createFilter<string>('status', 'is', ['active']),
      createFilter<string>('role', 'is_any_of', ['developer', 'engineer']),
    ])

    return (
      <Filters
        filters={filters}
        fields={fields}
        onChange={setFilters}
        trigger={
          <Button variant="outline" size="sm">
            <FilterIcon className="size-4" />
            Filter
          </Button>
        }
      />
    )
  },
}

export const SmallSize: Story = {
  render: function SmallFilters() {
    const [filters, setFilters] = useState<Filter<string>[]>([])

    return (
      <Filters
        filters={filters}
        fields={fields}
        onChange={setFilters}
        size="sm"
        trigger={
          <Button variant="outline" size="sm">
            <FilterIcon className="size-4" />
            Filter
          </Button>
        }
      />
    )
  },
}
