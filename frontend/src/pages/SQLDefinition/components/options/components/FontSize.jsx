import { AArrowDown, AArrowUp, ChevronDown, ChevronUp } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { EDITOR_OPTIONS } from '@/constants'
import { useEditorStore } from '@/stores'

export function FontSize() {
  const fontSize = useEditorStore((state) => state.fontSize)
  const updateFontSize = useEditorStore((state) => state.updateFontSize)

  const handleClickUp = (e) => {
    e.preventDefault()
    updateFontSize(fontSize + 1)
  }

  const handleClickDown = (e) => {
    e.preventDefault()
    updateFontSize(fontSize - 1)
  }

  return (
    <div className="rounded-sm border dark:border-zinc-700">
      <TooltipProvider>
        <Tooltip delayDuration={150}>
          <TooltipTrigger asChild>
            <button className="group rounded-l-sm bg-transparent px-1.5 py-1.5 hover:bg-black" onClick={handleClickDown}>
              <i className="text-white group-hover:text-zinc-400">
                <AArrowDown size={14} />
              </i>
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {EDITOR_OPTIONS.MIN_FONT_SIZE !== fontSize ? (
              <p className="flex">
                <ChevronDown size={12} />
                {fontSize - 1}px
              </p>
            ) : (
              <p className="flex">min {EDITOR_OPTIONS.MIN_FONT_SIZE}px</p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip delayDuration={150}>
          <TooltipTrigger asChild>
            <button className="group rounded-r-sm bg-transparent px-1.5 py-1.5 hover:bg-black" onClick={handleClickUp}>
              <i className="text-white group-hover:text-zinc-400">
                <AArrowUp size={14} />
              </i>
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {EDITOR_OPTIONS.MAX_FONT_SIZE !== fontSize ? (
              <p className="flex">
                <ChevronUp size={12} />
                {fontSize + 1}px
              </p>
            ) : (
              <p className="flex">max {EDITOR_OPTIONS.MAX_FONT_SIZE}px</p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
