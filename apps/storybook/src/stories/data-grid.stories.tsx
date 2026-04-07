import { useMemo, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  DataGrid,
  DataGridContainer,
  DataGridTable,
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
  DataGridPagination,
  DataGridScrollArea,
  DataGridColumnHeader,
  Badge,
} from '@e412/rnui-react'
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'

interface IUser {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  balance: number
}

const demoData: IUser[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex@example.com', role: 'CEO', status: 'active', balance: 5143.03 },
  { id: '2', name: 'Sarah Chen', email: 'sarah@example.com', role: 'CTO', status: 'inactive', balance: 4321.87 },
  { id: '3', name: 'Michael Rodriguez', email: 'michael@example.com', role: 'Designer', status: 'active', balance: 7654.98 },
  { id: '4', name: 'Emma Wilson', email: 'emma@example.com', role: 'Developer', status: 'inactive', balance: 3456.45 },
  { id: '5', name: 'David Kim', email: 'david@example.com', role: 'Lawyer', status: 'active', balance: 9876.54 },
  { id: '6', name: 'Aron Thompson', email: 'aron@example.com', role: 'Director', status: 'active', balance: 6214.22 },
  { id: '7', name: 'James Brown', email: 'james@example.com', role: 'Product Manager', status: 'inactive', balance: 5321.77 },
  { id: '8', name: 'Maria Garcia', email: 'maria@example.com', role: 'Marketing Lead', status: 'active', balance: 8452.39 },
  { id: '9', name: 'Nick Johnson', email: 'nick@example.com', role: 'Data Scientist', status: 'active', balance: 7345.10 },
  { id: '10', name: 'Liam Thompson', email: 'liam@example.com', role: 'Engineer', status: 'inactive', balance: 5214.88 },
  { id: '11', name: 'Olivia Brown', email: 'olivia@example.com', role: 'Software Engineer', status: 'active', balance: 9421.50 },
  { id: '12', name: 'Sophia Lee', email: 'sophia@example.com', role: 'Sales Manager', status: 'active', balance: 4521.67 },
]

// --- Default ---
function DefaultStory() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 })
  const [sorting, setSorting] = useState<SortingState>([{ id: 'name', desc: false }])

  const columns = useMemo<ColumnDef<IUser>[]>(() => [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (info) => <span className="font-medium">{info.getValue() as string}</span>,
      size: 180,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: (info) => <span className="text-muted-foreground">{info.getValue() as string}</span>,
      size: 200,
    },
    {
      accessorKey: 'role',
      header: 'Role',
      size: 150,
    },
    {
      accessorKey: 'balance',
      header: 'Balance',
      cell: (info) => <span className="font-semibold">${(info.getValue() as number).toFixed(2)}</span>,
      size: 120,
      meta: { headerClassName: 'text-right', cellClassName: 'text-right' },
    },
  ], [])

  const table = useReactTable({
    columns,
    data: demoData,
    pageCount: Math.ceil(demoData.length / pagination.pageSize),
    getRowId: (row) => row.id,
    state: { pagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <DataGrid table={table} recordCount={demoData.length}>
      <div className="w-full space-y-2.5">
        <DataGridContainer>
          <DataGridScrollArea>
            <DataGridTable />
          </DataGridScrollArea>
        </DataGridContainer>
        <DataGridPagination />
      </div>
    </DataGrid>
  )
}

// --- Sortable Columns ---
function SortableStory() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 })
  const [sorting, setSorting] = useState<SortingState>([{ id: 'name', desc: true }])

  const columns = useMemo<ColumnDef<IUser>[]>(() => [
    {
      accessorKey: 'name',
      header: ({ column }) => <DataGridColumnHeader title="Name" column={column} />,
      cell: (info) => <span className="font-medium">{info.getValue() as string}</span>,
      size: 180,
      enableSorting: true,
    },
    {
      accessorKey: 'email',
      header: ({ column }) => <DataGridColumnHeader title="Email" column={column} />,
      size: 200,
      enableSorting: true,
    },
    {
      accessorKey: 'role',
      header: ({ column }) => <DataGridColumnHeader title="Role" column={column} />,
      size: 150,
      enableSorting: true,
    },
    {
      accessorKey: 'balance',
      header: ({ column }) => <DataGridColumnHeader title="Balance" column={column} />,
      cell: (info) => <span className="font-semibold">${(info.getValue() as number).toFixed(2)}</span>,
      size: 120,
      enableSorting: true,
      meta: { headerClassName: 'text-right', cellClassName: 'text-right' },
    },
  ], [])

  const table = useReactTable({
    columns,
    data: demoData,
    pageCount: Math.ceil(demoData.length / pagination.pageSize),
    getRowId: (row) => row.id,
    state: { pagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <DataGrid table={table} recordCount={demoData.length}>
      <div className="w-full space-y-2.5">
        <DataGridContainer>
          <DataGridScrollArea>
            <DataGridTable />
          </DataGridScrollArea>
        </DataGridContainer>
        <DataGridPagination />
      </div>
    </DataGrid>
  )
}

// --- Row Selection ---
function RowSelectionStory() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 })
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const columns = useMemo<ColumnDef<IUser>[]>(() => [
    {
      id: 'select',
      header: () => <DataGridTableRowSelectAll />,
      cell: ({ row }) => <DataGridTableRowSelect row={row} />,
      enableSorting: false,
      size: 40,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (info) => <span className="font-medium">{info.getValue() as string}</span>,
      size: 180,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      size: 200,
    },
    {
      accessorKey: 'role',
      header: 'Role',
      size: 150,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge variant={row.original.status === 'active' ? 'success-light' : 'secondary'} radius="full">
          {row.original.status}
        </Badge>
      ),
      size: 100,
    },
  ], [])

  const table = useReactTable({
    columns,
    data: demoData,
    pageCount: Math.ceil(demoData.length / pagination.pageSize),
    getRowId: (row) => row.id,
    state: { pagination, sorting, rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <DataGrid table={table} recordCount={demoData.length}>
      <div className="w-full space-y-2.5">
        <DataGridContainer>
          <DataGridScrollArea>
            <DataGridTable />
          </DataGridScrollArea>
        </DataGridContainer>
        <DataGridPagination />
      </div>
    </DataGrid>
  )
}

// --- Striped ---
function StripedStory() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 })

  const columns = useMemo<ColumnDef<IUser>[]>(() => [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (info) => <span className="font-medium">{info.getValue() as string}</span>,
      size: 180,
    },
    { accessorKey: 'email', header: 'Email', size: 200 },
    { accessorKey: 'role', header: 'Role', size: 150 },
    {
      accessorKey: 'balance',
      header: 'Balance',
      cell: (info) => <span className="font-semibold">${(info.getValue() as number).toFixed(2)}</span>,
      size: 120,
      meta: { headerClassName: 'text-right', cellClassName: 'text-right' },
    },
  ], [])

  const table = useReactTable({
    columns,
    data: demoData,
    pageCount: Math.ceil(demoData.length / pagination.pageSize),
    getRowId: (row) => row.id,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <DataGrid table={table} recordCount={demoData.length} tableLayout={{ striped: true }}>
      <div className="w-full space-y-2.5">
        <DataGridContainer>
          <DataGridScrollArea>
            <DataGridTable />
          </DataGridScrollArea>
        </DataGridContainer>
        <DataGridPagination />
      </div>
    </DataGrid>
  )
}

// --- Dense ---
function DenseStory() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 8 })

  const columns = useMemo<ColumnDef<IUser>[]>(() => [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (info) => <span className="font-medium">{info.getValue() as string}</span>,
      size: 180,
    },
    { accessorKey: 'email', header: 'Email', size: 200 },
    { accessorKey: 'role', header: 'Role', size: 150 },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge variant={row.original.status === 'active' ? 'success-light' : 'secondary'} size="xs" radius="full">
          {row.original.status}
        </Badge>
      ),
      size: 100,
    },
  ], [])

  const table = useReactTable({
    columns,
    data: demoData,
    pageCount: Math.ceil(demoData.length / pagination.pageSize),
    getRowId: (row) => row.id,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <DataGrid table={table} recordCount={demoData.length} tableLayout={{ cellBorder: true }}>
      <div className="w-full space-y-2.5">
        <DataGridContainer>
          <DataGridScrollArea>
            <DataGridTable className="[&_td]:py-1.5 [&_th]:py-1.5 text-xs" />
          </DataGridScrollArea>
        </DataGridContainer>
        <DataGridPagination />
      </div>
    </DataGrid>
  )
}

const meta = {
  title: 'Components/DataGrid',
  component: DataGrid,
} satisfies Meta<typeof DataGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <DefaultStory /> }
export const SortableColumns: Story = { render: () => <SortableStory /> }
export const RowSelection: Story = { render: () => <RowSelectionStory /> }
export const Striped: Story = { render: () => <StripedStory /> }
export const Dense: Story = { render: () => <DenseStory /> }
