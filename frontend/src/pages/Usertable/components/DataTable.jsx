import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { useMemo, useState } from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useUserTableStore } from '@/stores'

export function DataTable({ headerColumns }) {
  const [sorting, setSorting] = useState([])
  // const [columnFilters, setColumnFilters] = useState([])

  const columns = useUserTableStore((state) => state.userTableColumnList)
  const indexes = useUserTableStore((state) => state.userTableIndexList)
  const foreignKeys = useUserTableStore((state) => state.userTableForeignKeyList)

  // use usa useMemo para evitar loop de renderización infinita
  const formattedData = useMemo(() => {
    return columns.map((item, index) => {
      const foreignKey = foreignKeys.filter((element) => element.columnId === item.id)

      return {
        nro: index + 1,
        nombre: {
          desc: item.name,
          renderPrimaryKeyIcon: indexes.find((element) => element.columnId === item.id)?.isPrimaryKey ?? false,
          renderUniqueKeyIcon: indexes.find((element) => element.columnId === item.id)?.isUnique ?? false,
        },
        tipo: item.type,
        nulo: item.isNullable,
        atributo: item.isIdentity ? 'IDENTITY' : item.defaultDefinition ? `DEFAULT: ${item.defaultDefinition.slice(1, -1)}` : '',
        referencia: [...foreignKey],
        descripcion: item.extendedProperties.map((element) => element.propertyValue),
        propriedad: item.extendedProperties.map((element) => element.propertyName),
      }
    })
  }, [columns, foreignKeys, indexes])

  const table = useReactTable({
    data: formattedData,
    columns: headerColumns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    // onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      // columnFilters,
    },
  })

  return (
    <div className="border rounded-md">
      {/* <div className="flex items-center py-4">
        <input
          placeholder="Filter emails..."
          value={table.getColumn('nombre')?.getFilterValue() ?? ''}
          onChange={(event) => table.getColumn('nombre')?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div> */}

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} style={{ width: `${header.getSize()}px` }}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
