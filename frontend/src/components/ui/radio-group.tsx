import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Circle } from 'lucide-react'
import { ComponentPropsWithRef, ComponentRef, forwardRef } from 'react'

import { cn } from '@/lib/utils'

type RadioGroupProps = ComponentPropsWithRef<typeof RadioGroupPrimitive.Root>

const RadioGroup = forwardRef<ComponentRef<typeof RadioGroupPrimitive.Root>, RadioGroupProps>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root ref={ref} className={cn('grid gap-1', className)} {...props} />
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

type RadioGroupItemProps = ComponentPropsWithRef<typeof RadioGroupPrimitive.Item>

const RadioGroupItem = forwardRef<ComponentRef<typeof RadioGroupPrimitive.Item>, RadioGroupItemProps>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'border-primary text-primary ring-offset-background focus-visible:ring-ring aspect-square h-3.5 w-3.5 rounded-full border focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2 w-2 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
