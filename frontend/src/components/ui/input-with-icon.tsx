import { cloneElement, forwardRef, MouseEventHandler, ReactElement } from 'react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui'
import { cn } from '@/lib/utils'

interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  type?: string
  endIcon?: ReactElement<{ className?: string }>
  handleClick?: MouseEventHandler<HTMLButtonElement>
  isFocus?: boolean
  title?: string
}

const InputWithIcon = forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ className, type = 'text', endIcon, handleClick, isFocus, title, disabled, ...props }, ref) => {
    const EndIcon = endIcon

    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            `bg-background placeholder:text-muted flex h-10 w-full rounded-sm border px-4 py-2 text-sm file:border-0 file:bg-transparent file:text-base file:font-medium focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-5 ${
              isFocus ? 'border-2 border-amber-500 dark:border-amber-400' : 'border-gray-500/20'
            }`,
            endIcon ? 'pr-11' : '',
            className,
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        {EndIcon && (
          <button
            type="button"
            className={cn(
              disabled ? 'pointer-events-none opacity-50' : '',
              'absolute top-1/2 right-2 -translate-y-1/2 transform cursor-pointer rounded-full p-1 transition-opacity duration-150 hover:opacity-100',
              isFocus ? 'opacity-100' : 'opacity-50',
            )}
            onClick={handleClick}
          >
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  {cloneElement(EndIcon, { className: cn('h-[18px] w-[18px]', EndIcon.props.className ?? '') })}
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
  },
)

InputWithIcon.displayName = 'InputWithIcon'

export { InputWithIcon }
