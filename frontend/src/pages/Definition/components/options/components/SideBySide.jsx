import { Rows2 } from 'lucide-react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useEditorStore, useSQLDefinitionStore } from '@/stores'

export function SideBySide() {
  const onDiffEditor = useSQLDefinitionStore((state) => state.onDiffEditor)
  const renderSideBySide = useEditorStore((state) => state.renderSideBySide)
  const updateRenderSideBySide = useEditorStore(
    (state) => state.updateRenderSideBySide,
  )

  if (!onDiffEditor) return null

  const handleClick = (e) => {
    e.preventDefault()
    updateRenderSideBySide(!renderSideBySide)
  }

  const text = renderSideBySide
    ? 'Mostrar diferencia en filas'
    : 'Mostrar diferencia en columnas'

  return (
    <TooltipProvider>
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>
          <button
            className={`rounded-sm p-1.5 transition-colors hover:bg-black ${!renderSideBySide ? 'bg-black' : 'bg-transparent'}`}
            onClick={handleClick}
          >
            <i className="text-white">
              <Rows2 size={16} />
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
