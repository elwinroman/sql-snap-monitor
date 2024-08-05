import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Database as DatabaseIcon } from '@/icons/database'
import { useObjectStore } from '@/stores/object.store'

export function BreadcrumCard() {
  const object = useObjectStore((state) => state.object)

  return (
    <div className="rounded-md bg-indigo-900 px-6 py-3">
      <article className="flex h-full flex-wrap items-center justify-between gap-8 rounded-md px-3 py-2">
        <div className="flex gap-4">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-1">
                <i>
                  <DatabaseIcon width={22} height={22} />
                </i>
                <span className="text-lg font-bold text-slate-100">
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
                <span className="text-lg font-bold text-rose-600">
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
        <span className="grid h-10 w-10 place-content-center rounded-md bg-amber-400/30 text-sm font-bold text-amber-400">
          {object.type ?? '?'}
        </span>
      </article>
    </div>
  )
}
