import { forwardRef } from 'react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

const InputWithIcon = forwardRef(({ className, type, endIcon, handleClick, isFocus, ...props }, ref) => {
  const EndIcon = endIcon
  const { disabled } = props

  return (
    <div className="relative w-full">
      <input
        type={type}
        className={cn(
          `flex h-10 w-full rounded-sm border bg-background px-4 py-2 text-sm file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-5 ${isFocus ? 'border-amber-400' : 'border-owborder'}`,
          endIcon ? 'pr-11' : '',
          className,
        )}
        ref={ref}
        {...props}
      />
      {EndIcon && (
        <button
          className={`${disabled ? 'pointer-events-none opacity-50' : ''} absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer rounded-full p-1 transition-opacity duration-150 hover:opacity-100 ${isFocus ? 'opacity-100' : 'opacity-50'}`}
          onClick={handleClick}
        >
          {/* <EndIcon.type className={cn('h-[18px] w-[18px]')} {...endIcon.props} /> */}
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <EndIcon.type className={cn('h-[18px] w-[18px]')} {...endIcon.props} />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Buscar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </button>
      )}
    </div>
  )
})
InputWithIcon.displayName = 'InputWithIcon'

export { InputWithIcon }
