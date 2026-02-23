import { TabsList, TabsTrigger, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui'

import { TabOption } from '../constants/tab-options'
import { useUserTableStore } from '../store/usertable.store'

export function HeaderTabsUsertable() {
  const object = useUserTableStore((state) => state.userTableObject)

  return (
    <header className="border-b-border border-b px-2">
      <div className="flex flex-nowrap items-center justify-between gap-2">
        <TabsList className="gap-2">
          <TabsTrigger value={TabOption.Structure}>Estructura</TabsTrigger>
          <TabsTrigger value={TabOption.Indexes} disabled={!object}>
            Índices
          </TabsTrigger>
        </TabsList>

        {object && (
          <div className="flex items-center gap-4">
            <p className="text-secondary flex items-center gap-2 text-[13px] font-light">
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <span className="text-secondary text-xs">{String(object.createDate)}</span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Fecha de creación</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <span> . </span>

              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <span className="dark:text-palette-success-light text-palette-success-main font-bold">{object.typeDesc}</span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Tipo de objeto de sistema</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <span> . </span>

              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <span className="text-secondary text-xs">{String(object.modifyDate)}</span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Fecha de actualización</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </p>
          </div>
        )}
      </div>
    </header>
  )
}
