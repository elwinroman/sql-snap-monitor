import { IndentIncrease } from 'lucide-react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useEditorStore } from '@/stores/editor-option.store'

const RENDER_WHITESPACE_OPTION = {
  all: 'all',
  none: 'none',
  boundary: 'boundary',
  selection: 'selection',
  trailing: 'trailing',
}

export function IndentationWhitespace() {
  const renderWhitespace = useEditorStore((state) => state.renderWhitespace)
  const updateRenderWhitespace = useEditorStore(
    (state) => state.updateRenderWhitespace,
  )

  const handleClick = (e) => {
    e.preventDefault()

    if (renderWhitespace === RENDER_WHITESPACE_OPTION.none)
      updateRenderWhitespace(RENDER_WHITESPACE_OPTION.all)
    else updateRenderWhitespace(RENDER_WHITESPACE_OPTION.none)
  }

  const text =
    renderWhitespace === RENDER_WHITESPACE_OPTION.none
      ? 'Mostrar indentación'
      : 'Ocultar indentación'

  return (
    <TooltipProvider>
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>
          <button
            className={`rounded-sm p-1.5 hover:bg-black ${renderWhitespace === RENDER_WHITESPACE_OPTION.all ? 'bg-black' : 'bg-transparent'}`}
            onClick={handleClick}
          >
            <i className="text-white">
              <IndentIncrease size={16} />
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
