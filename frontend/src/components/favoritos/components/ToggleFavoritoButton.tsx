import { Star } from 'lucide-react'

import { Button } from '@/components/ui'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface Props {
  isFavorite: boolean
  onClick(): void
  size?: number
}

export function ToggleFavoritoButton({ isFavorite, onClick, size = 16 }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onClick()
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleClick}>
            <Star size={size} className={cn('transition-colors', isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-secondary')} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <span>{isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
