import { type ColumnDef } from '@tanstack/react-table'
import { ArrowDownAZ, ArrowDownUp, ArrowDownZA, Check } from 'lucide-react'

import { Key } from '@/icons'

interface IndexRow {
  name: string
  typeDesc: string
  columnName: string
  isPrimaryKey: boolean
  isUnique: boolean
}

export type { IndexRow }

export const IndexColumns: ColumnDef<IndexRow>[] = [
  {
    accessorKey: 'name',
    size: 300,
    enableSorting: true,
    header: ({ column }) => (
      <button className="flex w-full items-center gap-2" onClick={column.getToggleSortingHandler()}>
        <span>Nombre índice</span>
        {{
          asc: <ArrowDownAZ size={14} className="text-secondary" />,
          desc: <ArrowDownZA size={14} className="text-secondary" />,
        }[column.getIsSorted() as string] ?? <ArrowDownUp size={14} className="text-muted" />}
      </button>
    ),
    cell: ({ row }) => <span className="text-primary">{row.original.name}</span>,
  },
  {
    accessorKey: 'typeDesc',
    size: 200,
    header: ({ column }) => (
      <button className="flex w-full items-center gap-2" onClick={column.getToggleSortingHandler()}>
        <span>Tipo</span>
        {{
          asc: <ArrowDownAZ size={14} className="text-secondary" />,
          desc: <ArrowDownZA size={14} className="text-secondary" />,
        }[column.getIsSorted() as string] ?? <ArrowDownUp size={14} className="text-muted" />}
      </button>
    ),
    cell: ({ row }) => (
      <span className="bg-background-neutral text-secondary w-fit rounded-sm px-1 py-0.5 text-center text-xs font-semibold whitespace-nowrap">
        {row.original.typeDesc}
      </span>
    ),
  },
  {
    accessorKey: 'columnName',
    size: 250,
    header: 'Columna',
    cell: ({ row }) => <span className="text-primary">{row.original.columnName}</span>,
  },
  {
    accessorKey: 'isPrimaryKey',
    size: 120,
    header: 'Primary Key',
    cell: ({ row }) => <>{row.original.isPrimaryKey && <Key size={14} className="text-amber-400" />}</>,
  },
  {
    accessorKey: 'isUnique',
    size: 100,
    header: 'Unique',
    cell: ({ row }) => <>{row.original.isUnique && <Check size={16} strokeWidth={3} className="text-emerald-500" />}</>,
  },
]
