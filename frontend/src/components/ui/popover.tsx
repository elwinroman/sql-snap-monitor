import * as PopoverPrimitive from '@radix-ui/react-popover'
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from 'react'

import { cn } from '@/lib/utils'

const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger

type PopoverContentProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
  className?: string
}

const PopoverContent = forwardRef<ComponentRef<typeof PopoverPrimitive.Content>, PopoverContentProps>(
  ({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border bg-[#1C252E] p-4 text-sm text-white shadow-md outline-hidden dark:bg-gray-700',
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  ),
)
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverContent, PopoverTrigger }
