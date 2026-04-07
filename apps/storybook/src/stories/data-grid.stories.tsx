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
  DataGridColumnVisibility,
  DataGridTableFootRow,
  DataGridTableFootRowCell,
  Badge,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
  Skeleton,
} from '@e412/rnui-react'
import {
  ColumnDef,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  useReactTable,
} from '@tanstack/react-table'

// ---------------------------------------------------------------------------
// Shared data
// ---------------------------------------------------------------------------

interface IUser {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  company: string
  balance: number
}

const demoData: IUser[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex@example.com', role: 'CEO', status: 'active', company: 'Apple', balance: 5143.03 },
  { id: '2', name: 'Sarah Chen', email: 'sarah@example.com', role: 'CTO', status: 'inactive', company: 'OpenAI', balance: 4321.87 },
  { id: '3', name: 'Michael Rodriguez', email: 'michael@example.com', role: 'Designer', status: 'active', company: 'Meta', balance: 7654.98 },
  { id: '4', name: 'Emma Wilson', email: 'emma@example.com', role: 'Developer', status: 'inactive', company: 'Tesla', balance: 3456.45 },
  { id: '5', name: 'David Kim', email: 'david@example.com', role: 'Lawyer', status: 'active', company: 'SAP', balance: 9876.54 },
  { id: '6', name: 'Aron Thompson', email: 'aron@example.com', role: 'Director', status: 'active', company: 'Keenthemes', balance: 6214.22 },
  { id: '7', name: 'James Brown', email: 'james@example.com', role: 'Product Manager', status: 'inactive', company: 'BBVA', balance: 5321.77 },
  { id: '8', name: 'Maria Garcia', email: 'maria@example.com', role: 'Marketing Lead', status: 'active', company: 'Sony', balance: 8452.39 },
  { id: '9', name: 'Nick Johnson', email: 'nick@example.com', role: 'Data Scientist', status: 'active', company: 'LVMH', balance: 7345.10 },
  { id: '10', name: 'Liam Thompson', email: 'liam@example.com', role: 'Engineer', status: 'inactive', company: 'ENI', balance: 5214.88 },
  { id: '11', name: 'Olivia Brown', email: 'olivia@example.com', role: 'Software Engineer', status: 'active', company: 'Vale', balance: 9421.50 },
  { id: '12', name: 'Sophia Lee', email: 'sophia@example.com', role: 'Sales Manager', status: 'active', company: 'Tata', balance: 4521.67 },
]

// ---------------------------------------------------------------------------
// Reusable column definitions
// ---------------------------------------------------------------------------

const baseColumns: ColumnDef<IUser>[] = [
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
    size: 220,
  },
  {
    accessorKey: 'role',
    header: 'Role',
    size: 150,
  },
  {
    accessorKey: 'company',
    header: 'Company',
    size: 140,
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
  {
    accessorKey: 'balance',
    header: 'Balance',
    cell: (info) => <span className="font-semibold">${(info.getValue() as number).toFixed(2)}</span>,
    size: 120,
    meta: { headerClassName: 'text-right', cellClassName: 'text-right' },
  },
]

// ---------------------------------------------------------------------------
// 1. Default — basic table with pagination
// ---------------------------------------------------------------------------

function DefaultStory() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 })

  const columns = useMemo<ColumnDef<IUser>[]>(() => baseColumns, [])

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

// ---------------------------------------------------------------------------
// 2. CellBorder — tableLayout={{ cellBorder: true }}
// ---------------------------------------------------------------------------

function CellBorderStory() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 })

  const columns = useMemo<ColumnDef<IUser>[]>(() => baseColumns, [])

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
            <DataGridTable />
          </DataGridScrollArea>
        </DataGridContainer>
        <DataGridPagination />
      </div>
    </DataGrid>
  )
}

// ---------------------------------------------------------------------------
// 3. Dense — tableLayout={{ dense: true }}
// ---------------------------------------------------------------------------

function DenseStory() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 8 })

  const columns = useMemo<ColumnDef<IUser>[]>(() => baseColumns, [])

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
    <DataGrid table={table} recordCount={demoData.length} tableLayout={{ dense: true }}>
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

// ---------------------------------------------------------------------------
// 4. LightTable — no header bg, no row borders, rounded rows
// ---------------------------------------------------------------------------

function LightTableStory() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 })

  const columns = useMemo<ColumnDef<IUser>[]>(() => baseColumns, [])

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
    <DataGrid
      table={table}
      recordCount={demoData.length}
      tableLayout={{ headerBackground: false, rowBorder: false, rowRounded: true }}
    >
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

// ---------------------------------------------------------------------------
// 5. Striped — striped rows, rounded, no container border
// ---------------------------------------------------------------------------

function StripedStory() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 })

  const columns = useMemo<ColumnDef<IUser>[]>(() => baseColumns, [])

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
    <DataGrid
      table={table}
      recordCount={demoData.length}
      tableLayout={{ stripped: true, rowRounded: true }}
    >
      <div className="w-full space-y-2.5">
        <DataGridContainer border={false}>
          <DataGridScrollArea>
            <DataGridTable />
          </DataGridScrollArea>
        </DataGridContainer>
        <DataGridPagination />
      </div>
    </DataGrid>
  )
}

// ---------------------------------------------------------------------------
// 6. AutoWidth — tableLayout={{ width: "auto" }}
// ---------------------------------------------------------------------------

function AutoWidthStory() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 })

  const columns = useMemo<ColumnDef<IUser>[]>(() => baseColumns, [])

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
    <DataGrid table={table} recordCount={demoData.length} tableLayout={{ width: 'auto' }}>
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

// ---------------------------------------------------------------------------
// 7. RowSelection — with checkboxes
// ---------------------------------------------------------------------------

function RowSelectionStory() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 })
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const columns = useMemo<ColumnDef<IUser>[]>(
    () => [
      {
        id: 'select',
        header: () => <DataGridTableRowSelectAll />,
        cell: ({ row }) => <DataGridTableRowSelect row={row} />,
        enableSorting: false,
        size: 40,
      },
      ...baseColumns,
    ],
    [],
  )

  const table = useReactTable({
    columns,
    data: demoData,
    pageCount: Math.ceil(demoData.length / pagination.pageSize),
    getRowId: (row) => row.id,
    state: { pagination, rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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

// ---------------------------------------------------------------------------
// 8. ExpandableRow — expandable rows with chevron toggle
// ---------------------------------------------------------------------------

function ExpandableRowStory() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 })
  const [expanded, setExpanded] = useState<ExpandedState>({})

  const columns = useMemo<ColumnDef<IUser>[]>(
    () => [
      {
        id: 'expand',
        header: () => null,
        cell: ({ row }) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => row.toggleExpanded()}
            className="size-7 p-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${row.getIsExpanded() ? 'rotate-90' : ''}`}
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>
        ),
        size: 40,
        enableSorting: false,
        meta: {
          expandedContent: (row: IUser) => (
            <div className="p-4 space-y-1">
              <p className="text-sm font-medium">Expanded Details for {row.name}</p>
              <p className="text-sm text-muted-foreground">
                {row.name} works at <span className="font-medium">{row.company}</span> as{' '}
                <span className="font-medium">{row.role}</span>. Current balance:{' '}
                <span className="font-semibold">${row.balance.toFixed(2)}</span>.
              </p>
              <p className="text-sm text-muted-foreground">
                Contact: {row.email} &middot; Status:{' '}
                <Badge variant={row.status === 'active' ? 'success-light' : 'secondary'} radius="full">
                  {row.status}
                </Badge>
              </p>
            </div>
          ),
        },
      },
      ...baseColumns,
    ],
    [],
  )

  const table = useReactTable({
    columns,
    data: demoData,
    pageCount: Math.ceil(demoData.length / pagination.pageSize),
    getRowId: (row) => row.id,
    state: { pagination, expanded },
    onPaginationChange: setPagination,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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

// ---------------------------------------------------------------------------
// 9. SortableColumns — DataGridColumnHeader with sort
// ---------------------------------------------------------------------------

function SortableColumnsStory() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 })
  const [sorting, setSorting] = useState<SortingState>([{ id: 'name', desc: false }])

  const columns = useMemo<ColumnDef<IUser>[]>(
    () =>
      baseColumns.map((col) => ({
        ...col,
        header: ({ column }: { column: unknown }) => (
          <DataGridColumnHeader
            title={typeof col.header === 'string' ? col.header : String((col as { accessorKey?: string }).accessorKey ?? '')}
            column={column as never}
          />
        ),
        enableSorting: true,
      })),
    [],
  )

  const table = useReactTable({
    columns,
    data: demoData,
    pageCount: Math.ceil(demoData.length / pagination.pageSize),
    getRowId: (row) => row.id,
    state: { pagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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

// ---------------------------------------------------------------------------
// 10. ColumnVisibility — DataGridColumnVisibility toggle
// ---------------------------------------------------------------------------

function ColumnVisibilityStory() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 })
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const columns = useMemo<ColumnDef<IUser>[]>(() => baseColumns, [])

  const table = useReactTable({
    columns,
    data: demoData,
    pageCount: Math.ceil(demoData.length / pagination.pageSize),
    getRowId: (row) => row.id,
    state: { pagination, columnVisibility },
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <DataGrid table={table} recordCount={demoData.length}>
      <div className="w-full space-y-2.5">
        <div className="flex justify-end">
          <DataGridColumnVisibility
            table={table}
            trigger={<Button variant="outline" size="sm">Toggle Columns</Button>}
          />
        </div>
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

// ---------------------------------------------------------------------------
// 11. StickyHeader — headerSticky with fixed height scroll area
// ---------------------------------------------------------------------------

function StickyHeaderStory() {
  const columns = useMemo<ColumnDef<IUser>[]>(() => baseColumns, [])

  const table = useReactTable({
    columns,
    data: demoData,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <DataGrid table={table} recordCount={demoData.length} tableLayout={{ headerSticky: true }}>
      <div className="w-full">
        <DataGridContainer>
          <DataGridScrollArea className="h-[300px]">
            <DataGridTable />
          </DataGridScrollArea>
        </DataGridContainer>
      </div>
    </DataGrid>
  )
}

// ---------------------------------------------------------------------------
// 12. LoadingSkeleton — skeleton loading state with isLoading prop
// ---------------------------------------------------------------------------

function LoadingSkeletonStory() {
  const [isLoading, setIsLoading] = useState(true)
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 })

  const columns = useMemo<ColumnDef<IUser>[]>(
    () =>
      baseColumns.map((col) => ({
        ...col,
        meta: {
          ...(col.meta ?? {}),
          skeleton: <Skeleton className="h-4 w-full" />,
        },
      })),
    [],
  )

  const table = useReactTable({
    columns,
    data: isLoading ? [] : demoData,
    pageCount: Math.ceil(demoData.length / pagination.pageSize),
    getRowId: (row) => row.id,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <DataGrid
      table={table}
      recordCount={isLoading ? 0 : demoData.length}
      isLoading={isLoading}
      loadingMode="skeleton"
    >
      <div className="w-full space-y-2.5">
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={() => setIsLoading((v) => !v)}>
            {isLoading ? 'Show Data' : 'Show Loading'}
          </Button>
        </div>
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

// ---------------------------------------------------------------------------
// 13. FooterTotals — DataGridTableFootRow with aggregates
// ---------------------------------------------------------------------------

function FooterTotalsStory() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 })

  const columns = useMemo<ColumnDef<IUser>[]>(() => baseColumns, [])

  const totalBalance = demoData.reduce((sum, row) => sum + row.balance, 0)

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
    <DataGrid table={table} recordCount={demoData.length}>
      <div className="w-full space-y-2.5">
        <DataGridContainer>
          <DataGridScrollArea>
            <DataGridTable
              footerContent={
                <DataGridTableFootRow>
                  <DataGridTableFootRowCell colSpan={5} className="font-semibold">
                    Total ({demoData.length} records)
                  </DataGridTableFootRowCell>
                  <DataGridTableFootRowCell className="text-right font-bold">
                    ${totalBalance.toFixed(2)}
                  </DataGridTableFootRowCell>
                </DataGridTableFootRow>
              }
            />
          </DataGridScrollArea>
        </DataGridContainer>
        <DataGridPagination />
      </div>
    </DataGrid>
  )
}

// ---------------------------------------------------------------------------
// 14. CardContainer — wrapped in Card with CardHeader
// ---------------------------------------------------------------------------

function CardContainerStory() {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 })

  const columns = useMemo<ColumnDef<IUser>[]>(() => baseColumns, [])

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
    <DataGrid table={table} recordCount={demoData.length}>
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardAction>
            <Badge variant="secondary">{demoData.length} members</Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-2.5">
          <DataGridContainer border={false}>
            <DataGridScrollArea>
              <DataGridTable />
            </DataGridScrollArea>
          </DataGridContainer>
          <DataGridPagination />
        </CardContent>
      </Card>
    </DataGrid>
  )
}

// ---------------------------------------------------------------------------
// Story exports
// ---------------------------------------------------------------------------

const meta = {
  title: 'Components/DataGrid',
  component: DataGrid,
} satisfies Meta<typeof DataGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <DefaultStory /> }
export const CellBorder: Story = { render: () => <CellBorderStory /> }
export const Dense: Story = { render: () => <DenseStory /> }
export const LightTable: Story = { render: () => <LightTableStory /> }
export const Striped: Story = { render: () => <StripedStory /> }
export const AutoWidth: Story = { render: () => <AutoWidthStory /> }
export const RowSelection: Story = { render: () => <RowSelectionStory /> }
export const ExpandableRow: Story = { render: () => <ExpandableRowStory /> }
export const SortableColumns: Story = { render: () => <SortableColumnsStory /> }
export const ColumnVisibility: Story = { render: () => <ColumnVisibilityStory /> }
export const StickyHeader: Story = { render: () => <StickyHeaderStory /> }
export const LoadingSkeleton: Story = { render: () => <LoadingSkeletonStory /> }
export const FooterTotals: Story = { render: () => <FooterTotalsStory /> }
export const CardContainer: Story = { render: () => <CardContainerStory /> }
