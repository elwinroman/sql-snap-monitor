import { Maximize, Minimize } from 'lucide-react'
import { useEffect } from 'react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useConfigStore } from '@/stores'

export function MaxMin() {
  const isMaximized = useConfigStore((state) => state.isMaximized)
  const updateMaximized = useConfigStore((state) => state.updateMaximized)

  const handleClick = (e) => {
    e.preventDefault()
    updateMaximized(!isMaximized)
  }

  // bindea el key ESC para minimizar la ventana de SQL definition
  useEffect(() => {
    const down = (e) => {
      if (!isMaximized) return

      if (e.key === 'Escape') {
        e.preventDefault()
        updateMaximized(false)
      }
    }

    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [isMaximized, updateMaximized])

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <button className="transition-transform outline-none h-7 hover:scale-110" onClick={handleClick}>
            {isMaximized ? <Minimize size={16} className="text-primary" /> : <Maximize size={16} className="text-primary" />}
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{isMaximized ? 'Minimizar' : 'Maximizar'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
