import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
// import { Database as DatabaseIcon } from '@/icons/database'
import { useAuthStore } from '@/stores/auth.store'

export function BreadcrumCard({ object }) {
  const dbname = useAuthStore((state) => state.dbname)

  return (
    <div className="rounded-md bg-emerald-500 px-6 py-3">
      <article className="flex items-center justify-between rounded-md px-3 py-1">
        <div className="flex flex-col">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-1">
                <span className="text-lg font-medium text-slate-200">
                  {dbname}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Nombre database</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex gap-2">
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger className="grid place-content-center">
                  <span className="rounded-md bg-rose-500 px-1 pb-0.5 text-xs text-white outline-none">
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
                  <span className="text-xl font-bold text-white">
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
        </div>
        <span className="grid h-10 w-10 place-content-center rounded-md bg-amber-400 text-base font-bold text-zinc-800">
          {object.type ?? '?'}
        </span>
      </article>
    </div>
  )
}
