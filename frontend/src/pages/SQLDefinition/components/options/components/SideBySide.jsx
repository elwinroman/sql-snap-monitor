import { Rows2 } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useEditorStore } from '@/stores'

export function SideBySide() {
  const onDiffEditor = useEditorStore((state) => state.onDiffEditor)
  const renderSideBySide = useEditorStore((state) => state.renderSideBySide)
  const updateRenderSideBySide = useEditorStore((state) => state.updateRenderSideBySide)

  if (!onDiffEditor) return null

  const handleClick = (e) => {
    e.preventDefault()
    updateRenderSideBySide(!renderSideBySide)
  }

  const text = renderSideBySide ? 'Mostrar diferencia en filas' : 'Mostrar diferencia en columnas'

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <button
            className={`group h-7 rounded-sm px-2 transition-colors hover:bg-black ${!renderSideBySide ? 'bg-black' : 'bg-transparent'}`}
            onClick={handleClick}
          >
            <i className="text-white group-hover:text-zinc-400">
              <Rows2 size={14} />
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
