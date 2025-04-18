import { forwardRef } from 'react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

const InputWithIcon = forwardRef(({ className, type, endIcon, handleClick, isFocus, title, ...props }, ref) => {
  const EndIcon = endIcon
  const { disabled } = props

  return (
    <div className="relative w-full">
      <input
        type={type}
        className={cn(
          `bg-background placeholder:text-muted flex h-10 w-full rounded-sm border px-4 py-2 text-sm file:border-0 file:bg-transparent file:text-base file:font-medium focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-5 ${isFocus ? 'border-amber-400' : 'border-gray-500/20'}`,
          endIcon ? 'pr-11' : '',
          className,
        )}
        ref={ref}
        {...props}
      />
      {EndIcon && (
        <button
          className={`${disabled ? 'pointer-events-none opacity-50' : ''} absolute top-1/2 right-2 -translate-y-1/2 transform cursor-pointer rounded-full p-1 transition-opacity duration-150 hover:opacity-100 ${isFocus ? 'opacity-100' : 'opacity-50'}`}
          onClick={handleClick}
        >
          {/* <EndIcon.type className={cn('h-[18px] w-[18px]')} {...endIcon.props} /> */}
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <EndIcon.type className={cn('h-[18px] w-[18px]')} {...endIcon.props} />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{title}</p>
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
