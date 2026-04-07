import type { Meta, StoryObj } from '@storybook/react'
import {
  DataGrid,
  DataGridContainer,
  DataGridTable,
  DataGridPagination,
} from '@e412/rnui-react'
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

type User = {
  name: string
  email: string
  role: string
  status: string
}

const data: User[] = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
  { name: 'David Brown', email: 'david@example.com', role: 'Editor', status: 'Active' },
  { name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Inactive' },
]

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
]

function DataGridStory() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <DataGridContainer>
      <DataGrid table={table} recordCount={data.length}>
        <DataGridTable />
        <DataGridPagination />
      </DataGrid>
    </DataGridContainer>
  )
}

const meta = {
  title: 'Components/DataGrid',
  component: DataGrid,
} satisfies Meta<typeof DataGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <DataGridStory />,
}
