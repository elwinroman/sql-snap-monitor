import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'focus:ring-ring inline-flex items-center rounded-md font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-hidden',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80 border-transparent',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent',
        outline: 'border-border text-foreground border',
        green: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
        blue: 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300',
        yellow: 'bg-orange-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300',
        red: 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300',
      },
      size: {
        sm: 'px-1.5 py-0.5 text-[10px]',
        md: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm', // 🔽 Por defecto más pequeño
    },
  },
)

function Badge({ className, variant, size, ...props }) {
  return <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
}
{
  /* <div className=''></div> */
}
export { Badge, badgeVariants }
