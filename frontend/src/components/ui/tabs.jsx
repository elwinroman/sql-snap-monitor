import * as TabsPrimitive from '@radix-ui/react-tabs'
import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

const Tabs = TabsPrimitive.Root

const TabsList = forwardRef((props, ref) => {
  const { className, ...rest } = props
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        'bg-background-paper text-muted-foreground inline-flex h-9 items-center justify-center rounded-lg px-1.5 py-1',
        className,
      )}
      {...rest}
    />
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = forwardRef((props, ref) => {
  const { className, ...rest } = props
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        'ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground text-secondary inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow',
        className,
      )}
      {...rest}
    />
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = forwardRef((props, ref) => {
  const { className, ...rest } = props
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        'ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        className,
      )}
      {...rest}
    />
  )
})
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }
