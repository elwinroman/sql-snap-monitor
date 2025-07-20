import { IndentIncrease } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui'
import { useEditorStore } from '@/stores'

// monaco editor option
const RenderWhitespaceOption = {
  All: 'all',
  None: 'none',
  Boundary: 'boundary',
  Selection: 'selection',
  Trailing: 'trailing',
}

export function IndentationWhitespace() {
  const renderWhitespace = useEditorStore((state) => state.renderWhitespace)
  const updateRenderWhitespace = useEditorStore((state) => state.updateRenderWhitespace)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (renderWhitespace === RenderWhitespaceOption.None) updateRenderWhitespace(RenderWhitespaceOption.All)
    else updateRenderWhitespace(RenderWhitespaceOption.None)
  }

  const text = renderWhitespace === RenderWhitespaceOption.None ? 'Mostrar indentación' : 'Ocultar indentación'

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <button
            className={`group h-7 rounded-sm px-2 hover:bg-white/[0.08] ${renderWhitespace === RenderWhitespaceOption.All ? 'bg-white/[0.16]' : 'bg-transparent'}`}
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
