import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { cva } from 'class-variance-authority'
import { ChevronDown } from 'lucide-react'
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from 'react'

import { cn } from '@/lib/utils'

type NavigationMenuProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> & {
  className?: string
}

const NavigationMenu = forwardRef<ComponentRef<typeof NavigationMenuPrimitive.Root>, NavigationMenuProps>(
  ({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Root
      ref={ref}
      className={cn('relative z-10 flex max-w-max flex-1 items-center justify-center', className)}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  ),
)
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

type NavigationMenuListProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List> & {
  className?: string
}

const NavigationMenuList = forwardRef<ComponentRef<typeof NavigationMenuPrimitive.List>, NavigationMenuListProps>(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.List
      ref={ref}
      className={cn('group flex flex-1 list-none items-center justify-center space-x-1', className)}
      {...props}
    />
  ),
)
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
  'group data-active:bg-accent/50 data-[state=open]:bg-accent/50 inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-zinc-300/90 transition-colors hover:text-zinc-200 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50',
)

type NavigationMenuTriggerProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> & {
  className?: string
}

const NavigationMenuTrigger = forwardRef<ComponentRef<typeof NavigationMenuPrimitive.Trigger>, NavigationMenuTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Trigger ref={ref} className={cn(navigationMenuTriggerStyle(), 'group', className)} {...props}>
      {children}{' '}
      <ChevronDown
        className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  ),
)
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

type NavigationMenuContentProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content> & {
  className?: string
}

const NavigationMenuContent = forwardRef<ComponentRef<typeof NavigationMenuPrimitive.Content>, NavigationMenuContentProps>(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Content
      ref={ref}
      className={cn(
        'data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full md:absolute md:w-auto',
        className,
      )}
      {...props}
    />
  ),
)
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

type NavigationMenuViewportProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport> & {
  className?: string
}

const NavigationMenuViewport = forwardRef<ComponentRef<typeof NavigationMenuPrimitive.Viewport>, NavigationMenuViewportProps>(
  ({ className, ...props }, ref) => (
    <div className={cn('absolute top-full left-0 flex justify-center')}>
      <NavigationMenuPrimitive.Viewport
        ref={ref}
        className={cn(
          'origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-sm border shadow-lg md:w-[var(--radix-navigation-menu-viewport-width)]',
          className,
        )}
        {...props}
      />
    </div>
  ),
)
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName

type NavigationMenuIndicatorProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator> & {
  className?: string
}

const NavigationMenuIndicator = forwardRef<ComponentRef<typeof NavigationMenuPrimitive.Indicator>, NavigationMenuIndicatorProps>(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      className={cn(
        'data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-1 flex h-1.5 items-end justify-center overflow-hidden',
        className,
      )}
      {...props}
    >
      <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  ),
)
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
}
