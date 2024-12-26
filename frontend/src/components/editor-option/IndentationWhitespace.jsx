import { IndentIncrease } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useEditorStore } from '@/stores'

const RENDER_WHITESPACE_OPTION = {
  all: 'all',
  none: 'none',
  boundary: 'boundary',
  selection: 'selection',
  trailing: 'trailing',
}

export function IndentationWhitespace() {
  const renderWhitespace = useEditorStore((state) => state.renderWhitespace)
  const updateRenderWhitespace = useEditorStore((state) => state.updateRenderWhitespace)

  const handleClick = (e) => {
    e.preventDefault()

    if (renderWhitespace === RENDER_WHITESPACE_OPTION.none) updateRenderWhitespace(RENDER_WHITESPACE_OPTION.all)
    else updateRenderWhitespace(RENDER_WHITESPACE_OPTION.none)
  }

  const text = renderWhitespace === RENDER_WHITESPACE_OPTION.none ? 'Mostrar indentación' : 'Ocultar indentación'

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <button
            className={`group h-7 rounded-sm px-2 hover:bg-white/[0.08] ${renderWhitespace === RENDER_WHITESPACE_OPTION.all ? 'bg-white/[0.16]' : 'bg-transparent'}`}
            onClick={handleClick}
          >
            <i className="text-primary group-hover:text-secondary">
              <IndentIncrease size={14} />
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
