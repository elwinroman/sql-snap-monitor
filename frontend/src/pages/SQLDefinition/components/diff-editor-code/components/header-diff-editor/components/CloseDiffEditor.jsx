import { X } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useDiffEditorStore } from '@/stores'

export function CloseDiffEditor() {
  const updateDiffEditor = useDiffEditorStore((state) => state.updateDiffEditor)

  const handleClick = (e) => {
    e.preventDefault()
    updateDiffEditor(false)
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <button className={`group h-7 rounded-sm px-2 transition-colors hover:bg-white/[0.08]`} onClick={handleClick}>
            <X size={14} className="text-primary group-hover:text-secondary" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Cerrar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
