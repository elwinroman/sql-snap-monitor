import * as React from 'react'

import { cn } from '@/lib/utils'

const InputWithIcon = React.forwardRef(
  ({ className, type, startIcon, endBadge, ...props }, ref) => {
    const StartIcon = startIcon
    const EndBadge = endBadge
    const [focus, setFocus] = React.useState(false)

    return (
      <div className="relative w-full">
        {StartIcon && (
          <div
            className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform transition-opacity duration-150 ${focus ? 'opacity-20' : undefined}`}
          >
            <StartIcon.type
              className={cn('h-[18px] w-[18px]')}
              {...startIcon.props}
            />
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-96 rounded-md border border-owborder bg-ownavbar px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-muted-foreground focus:border-amber-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            startIcon ? 'pl-10' : '',
            endBadge ? 'pr-8' : '',
            className,
          )}
          ref={ref}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          {...props}
        />
        {EndBadge && (
          <div
            className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform rounded-sm bg-black/90 px-1.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm transition-opacity duration-150 dark:bg-black/60 ${focus ? 'opacity-100' : 'opacity-0'}`}
          >
            <EndBadge.type
              className={cn('h-[18px] w-[18px]')}
              {...endBadge.props}
            />
          </div>
        )}
      </div>
    )
  },
)
InputWithIcon.displayName = 'InputWithIcon'

export { InputWithIcon }
