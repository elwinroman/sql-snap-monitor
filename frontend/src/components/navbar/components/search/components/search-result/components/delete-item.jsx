import { X } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export function DeleteItem({ action, content, id }) {
  const deleteAction = (e) => {
    e.stopPropagation()
    action(id)
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100} disableHoverableContent={true}>
        <TooltipTrigger asChild>
          <a onClick={deleteAction} className="transition-color rounded-sm px-1 py-1 hover:bg-background-alternate">
            <X size={16} className="text-secondary hover:text-primary" />
          </a>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
