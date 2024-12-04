import { ArrowDown01, ArrowDown10, ArrowDownAZ, ArrowDownUp, ArrowDownZA, Check, MessageCircleWarning } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Key } from '@/icons'

export const Columns = [
  {
    accessorKey: 'nro',
    enableResizing: false,
    enableSorting: true,
    size: 20,
    header: ({ column }) => {
      const handleNumberSort = () => {
        // al tener la numeración ordenado por defecto por el número, permite gestionar solo dos estado
        if (column.getIsSorted() === false) {
          column.toggleSorting(true)
          return
        }

        const isCurrentlySorted = column.getIsSorted() === 'asc' // Verificar si está en ascendente
        column.toggleSorting(isCurrentlySorted) // Cambiar entre 'asc' y undefined (solo 2 estados)
      }

      return (
        <button className="flex w-full items-center gap-2" onClick={handleNumberSort}>
          <span>Nro</span>
          {{
            asc: <ArrowDown01 size={14} className="text-secondary" />,
            desc: <ArrowDown10 size={14} className="text-secondary" />,
          }[column.getIsSorted()] ?? <ArrowDownUp size={14} className="text-muted" />}
        </button>
      )
    },
  },
  {
    accessorKey: 'nombre',
    size: 300,
    enableSorting: true,
    // al ser un objeto, se ordena por nombre.desc
    sortingFn: (rowA, rowB, columnId) => {
      const a = rowA.getValue(columnId).desc.toLowerCase()
      const b = rowB.getValue(columnId).desc.toLowerCase()
      return a.localeCompare(b) // Comparación alfabética
    },
    header: ({ column }) => {
      return (
        <button className="flex w-full items-center gap-2" onClick={column.getToggleSortingHandler()}>
          <span>Nombre columna</span>
          {{
            asc: <ArrowDownAZ size={14} className="text-secondary" />,
            desc: <ArrowDownZA size={14} className="text-secondary" />,
          }[column.getIsSorted()] ?? <ArrowDownUp size={14} className="text-muted" />}
        </button>
      )
    },
    cell: ({ row }) => {
      const { desc, renderPrimaryKeyIcon, renderUniqueKeyIcon } = row.original.nombre
      return (
        <div className="flex items-center gap-2">
          <span className="text-primary">{desc}</span>

          {/* clave primaria (icono) */}
          {renderPrimaryKeyIcon && (
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger>
                  <Key size={14} className="text-amber-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <span className="text-amber-400">primary key</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {/* clave única (icono) - si es clave única, no es necesario mostrar */}
          {!renderPrimaryKeyIcon && renderUniqueKeyIcon && (
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger>
                  <Key size={14} className="text-blue-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <span className="text-blue-400">unique key</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'tipo',
    size: 50,
    header: ({ column }) => {
      return (
        <button className="flex w-full items-center gap-2" onClick={column.getToggleSortingHandler()}>
          <span>Tipo</span>
          {{
            asc: <ArrowDownAZ size={14} className="text-primary" />,
            desc: <ArrowDownZA size={14} className="text-primary" />,
          }[column.getIsSorted()] ?? <ArrowDownUp size={14} className="text-muted" />}
        </button>
      )
    },
    cell: ({ row }) => {
      const { tipo } = row.original
      return <span className="w-fit rounded-sm border border-border bg-background px-1 text-center text-xs text-secondary">{tipo}</span>
    },
  },
  {
    accessorKey: 'nulo',
    header: 'Nulo',
    size: 20,
    cell: ({ row }) => {
      const { nulo } = row.original
      return <>{nulo && <Check size={16} strokeWidth={3} className="text-emerald-500" />}</>
    },
  },
  {
    accessorKey: 'atributo',
    header: 'Atributos',
    size: 150,
    cell: ({ row }) => {
      const { atributo } = row.original
      return <span className="text-secondary">{atributo}</span>
    },
  },
  {
    accessorKey: 'referencia',
    header: 'Referencias',
    size: 300,
    cell: ({ row }) => {
      const { referencia } = row.original
      return (
        <div className="flex min-w-[100px] flex-col gap-2 text-blue-400">
          {referencia.length > 0 &&
            referencia.map((item) => <span key={uuidv4()}>{`${item.referencedSchema}.${item.referencedObject}`}</span>)}
        </div>
      )
    },
  },
  {
    accessorKey: 'descripcion',
    size: 700,
    enableResizing: false,
    header: () => {
      return <div className="min-w-[300px] text-left">Descripción</div>
    },
    cell: ({ row }) => {
      const { descripcion } = row.original
      return (
        <div className="flex items-baseline justify-between gap-2">
          <div className="flex flex-col gap-2 text-primary">
            {descripcion.length > 0 ? (
              descripcion.map((item) => <span key={uuidv4()}>{item} </span>)
            ) : (
              <span className="text-muted">No existe descripción</span>
            )}
          </div>

          {descripcion.length > 1 && (
            <Popover>
              <PopoverTrigger>
                <i className="grid place-items-center rounded-sm p-1.5 text-red-400 transition-colors hover:bg-background">
                  <MessageCircleWarning size={14} />
                </i>
              </PopoverTrigger>
              <PopoverContent>¡Existe más de una descripción para esta columna!</PopoverContent>
            </Popover>
          )}
        </div>
      )
    },
  },
]
