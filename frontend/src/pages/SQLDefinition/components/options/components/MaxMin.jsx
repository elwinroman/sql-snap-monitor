import { Maximize, Minimize } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useConfigStore } from '@/stores'

export function MaxMin() {
  const isMaximized = useConfigStore((state) => state.isMaximized)
  const updateMaximized = useConfigStore((state) => state.updateMaximized)

  const handleClick = (e) => {
    e.preventDefault()
    updateMaximized(!isMaximized)
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>
          <button className="transition-transform hover:scale-110" onClick={handleClick}>
            {isMaximized ? (
              <i className="text-white">
                <Minimize size={16} />
              </i>
            ) : (
              <i className="text-white">
                <Maximize size={16} />
              </i>
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{isMaximized ? 'Minimizar' : 'Maximizar'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
