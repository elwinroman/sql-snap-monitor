import { format } from '@formkit/tempo'
import { GitCompareArrows } from 'lucide-react'

import { TabsList, TabsTrigger, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui'
import { LOCAL_LANGUAJE } from '@/enviroment/enviroment'

import { TabOption } from '../constants/tabs-options'
import { useSysObjectStore } from '../store/sysobject.store'

export function HeaderTabs() {
  const sysobject = useSysObjectStore((state) => state.sysobject)

  return (
    <header className="border-b-border border-b px-2">
      <div className="SY flex flex-nowrap items-center justify-between gap-2">
        <TabsList className="gap-2">
          {/* Tab Script */}
          <TabsTrigger value={TabOption.Script}>
            <div className="flex flex-nowrap items-center gap-1">
              <span>Script</span>
            </div>
          </TabsTrigger>

          {/* Tab Comparar */}
          <TabsTrigger
            value={TabOption.Compare}
            disabled={!sysobject}
            className="gap-1.5 bg-pink-900 text-white data-[state=active]:bg-pink-700 data-[state=active]:text-white"
          >
            <GitCompareArrows size={14} />
            <span>Comparar</span>
          </TabsTrigger>
        </TabsList>

        {/* Info del objeto */}
        {sysobject && (
          <div className="flex items-center gap-4">
            {/* <div className="bg-palette-info-mainChannel/16 text-palette-info-dark dark:text-palette-info-light rounded-sm px-1.5 py-1 text-xs font-bold">
              NUEVO
            </div> */}
            <p className="text-secondary flex items-center gap-2 text-[13px] font-light">
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <span className="text-secondary text-xs">{format(sysobject.createDate, 'medium', LOCAL_LANGUAJE)}</span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="flex items-center gap-0.5">
                    <span>Fecha de creación</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <span> . </span>

              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <span className="dark:text-palette-success-light text-palette-success-main font-bold">{sysobject.typeDesc} </span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="flex items-center gap-0.5">
                    <span>Tipo de objeto de sistema</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <span> . </span>

              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <span className="text-secondary text-xs">{format(sysobject.modifyDate, 'medium')}</span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="flex items-center gap-0.5">
                    <span>Fecha de actualización</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </p>
          </div>
        )}
      </div>
    </header>
  )
}
