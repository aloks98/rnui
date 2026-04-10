'use client'

import { useMemo, useState } from 'react'
import {
  DataGrid,
  DataGridContainer,
  DataGridTable,
  DataGridPagination,
  DataGridScrollArea,
} from '@e412/rnui-react'
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
} from '@tanstack/react-table'

type User = { name: string; email: string; role: string }

const data: User[] = [
  { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { name: 'Bob', email: 'bob@example.com', role: 'Editor' },
  { name: 'Carol', email: 'carol@example.com', role: 'Viewer' },
  { name: 'David', email: 'david@example.com', role: 'Editor' },
  { name: 'Eve', email: 'eve@example.com', role: 'Admin' },
]

export function DataGridDemo() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'role', header: 'Role' },
    ],
    []
  )
  const table = useReactTable({
    columns,
    data,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })
  return (
    <DataGrid table={table} recordCount={data.length}>
      <DataGridContainer>
        <DataGridScrollArea>
          <DataGridTable />
        </DataGridScrollArea>
      </DataGridContainer>
      <DataGridPagination />
    </DataGrid>
  )
}
