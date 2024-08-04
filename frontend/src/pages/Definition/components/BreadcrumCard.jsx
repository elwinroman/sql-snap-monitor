import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { Database as DatabaseIcon } from '@/icons/database'
import { useObjectStore } from '@/stores/object.store'

export function BreadcrumCard({ ...props }) {
  const object = useObjectStore((state) => state.object)

  return (
    <li {...props}>
      <article className="flex h-full justify-between gap-8 rounded-md px-3 py-2">
        <div className="flex gap-3">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-1">
                <i>
                  <DatabaseIcon width={18} height={18} />
                </i>
                <span className="font-semibold text-slate-100">
                  SI_BDFinanciero
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Nombre database</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger className="grid place-content-center">
                <span className="rounded-md border border-amber-400 px-1 pb-0.5 text-xs text-amber-400 outline-none">
                  {object.schema ?? 'dbo'}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Schema</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger className="grid place-content-center">
                <span className="font-bold text-rose-600">
                  {' '}
                  {object.name ?? 'ObjectName'}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Nombre del objeto</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Badge className="rounded-md bg-amber-400 text-sm font-bold text-slate-900 hover:bg-amber-400">
          P
        </Badge>
      </article>
    </li>
  )
}
