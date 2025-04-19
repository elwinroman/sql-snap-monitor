import { cva } from 'class-variance-authority'
import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

// Variantes y tamaños con cva
const inputVariants = cva(
  'flex w-full rounded-md border bg-transparent px-3 transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-[14px] placeholder:opacity-60 placeholder:text-muted hover:ring-1',
  {
    variants: {
      variant: {
        default: 'border-border bg-transparent',
        outline: 'border border-ring bg-white',
        ghost: 'border-transparent bg-transparent shadow-none',
        danger: 'border-red-500 text-red-700 placeholder:text-red-400 focus-visible:ring-red-500',
        success: 'border-green-500 text-green-700 placeholder:text-green-400 focus-visible:ring-green-500',
      },
      size: {
        xs: 'h-9 text-xs py-1',
        sm: 'h-10 text-sm py-1.5',
        md: 'h-11 text-md py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  },
)

// Componente Input en JSX
const Input = forwardRef(({ className, type = 'text', variant, size, ...props }, ref) => {
  return <input type={type} ref={ref} className={cn(inputVariants({ variant, size }), className)} {...props} />
})

Input.displayName = 'Input'

export { Input, inputVariants }
