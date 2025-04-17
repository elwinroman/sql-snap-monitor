import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'border border-border text-foreground',
        green: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
        blue: 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300',
        yellow: 'bg-orange-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300',
        red: 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300',
      },
      size: {
        sm: 'text-[10px] px-1.5 py-0.5',
        md: 'text-xs px-2.5 py-1',
        lg: 'text-sm px-3 py-1.5',
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
