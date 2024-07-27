import * as React from 'react'

import { cn } from '@/lib/utils'

const InputWithIcon = React.forwardRef(
  ({ className, type, startIcon, endIcon, ...props }, ref) => {
    const StartIcon = startIcon
    const EndIcon = endIcon

    const handleKeyup = (e) => {
      e.preventDefault()
      const value = e.target.value.trim()

      if (value === '') return

      if (e.key === 'Enter') {
        // Actualizar el estado del stringCode para renderizar el codigo
      }
    }

    return (
      <div className="relative w-full">
        {StartIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 transform">
            <StartIcon.type
              className={cn('h-[18px] w-[18px]')}
              {...startIcon.props}
            />
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            startIcon ? 'pl-10' : '',
            endIcon ? 'pr-8' : '',
            className,
          )}
          ref={ref}
          onKeyUp={handleKeyup}
          {...props}
        />
        {EndIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
            <EndIcon.type
              className={cn('h-[18px] w-[18px]')}
              {...endIcon.props}
            />
          </div>
        )}
      </div>
    )
  },
)
InputWithIcon.displayName = 'InputWithIcon'

export { InputWithIcon }
