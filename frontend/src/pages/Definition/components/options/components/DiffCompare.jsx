import { GitCompare } from 'lucide-react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useSQLDefinitionStore } from '@/stores'

export function DiffCompare() {
  const onDiffEditor = useSQLDefinitionStore((state) => state.onDiffEditor)
  const updateOnDiffEditor = useSQLDefinitionStore(
    (state) => state.updateOnDiffEditor,
  )
  const SQLDefinitionProductionObject = useSQLDefinitionStore(
    (state) => state.SQLDefinitionProductionObject,
  )
  const getSQLDefinitionProductionObject = useSQLDefinitionStore(
    (state) => state.getSQLDefinitionProductionObject,
  )

  const handleClick = (e) => {
    e.preventDefault()

    updateOnDiffEditor(!onDiffEditor)
    SQLDefinitionProductionObject ?? getSQLDefinitionProductionObject()
  }
  const text = onDiffEditor
    ? 'Mostrar SQL de definición'
    : 'Comparar SQL de producción'

  return (
    <TooltipProvider>
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>
          <button
            className={`rounded-sm p-1.5 hover:bg-black ${onDiffEditor ? 'bg-black' : 'bg-transparent'}`}
            onClick={handleClick}
          >
            <i className="text-white">
              <GitCompare size={16} />
            </i>
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
