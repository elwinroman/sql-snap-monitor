import { forwardRef, useState } from 'react'

import { cn } from '@/lib/utils'

const InputWithIcon = forwardRef(({ className, type, endIcon, handleClick, ...props }, ref) => {
  const EndIcon = endIcon
  const [focus, setFocus] = useState(false)

  return (
    <div className="relative w-full">
      <input
        type={type}
        className={cn(
          `flex h-10 w-96 rounded-full border bg-ownavbar px-4 py-2 text-sm file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${focus ? 'border-amber-400' : 'border-owborder'}`,
          endIcon ? 'pr-11' : '',
          className,
        )}
        ref={ref}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...props}
      />
      {EndIcon && (
        <button
          className={`absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer rounded-full p-1 transition-opacity duration-150 hover:opacity-100 ${focus ? 'opacity-100' : 'opacity-50'}`}
          onClick={handleClick}
        >
          <EndIcon.type className={cn('h-[18px] w-[18px]')} {...endIcon.props} />
        </button>
      )}
    </div>
  )
})
InputWithIcon.displayName = 'InputWithIcon'

export { InputWithIcon }
