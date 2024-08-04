import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { Database as DatabaseIcon } from '@/icons/database'

export function InfoObject() {
  return (
    <li className="grow">
      <article className="flex w-fit gap-8 rounded-md bg-indigo-100 px-3 py-2 dark:bg-indigo-900">
        <div className="flex gap-2">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-1">
                <i>
                  <DatabaseIcon width={18} height={18} />
                </i>
                <span className="font-semibold text-slate-800 dark:text-red-100">
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
                <span className="rounded-md border border-slate-400 px-1 pb-0.5 text-xs outline-none dark:border-indigo-200">
                  dbo
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
                <span className="font-semibold text-rose-600 dark:text-rose-500">
                  SI_FinCreditos
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Nombre del objeto</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Badge className="rounded-md text-sm font-bold">P</Badge>
      </article>
    </li>
  )
}
