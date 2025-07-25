import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from 'react'

import { cn } from '@/lib/utils'

type AvatarProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
type AvatarImageProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
type AvatarFallbackProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>

const Avatar = forwardRef<ComponentRef<typeof AvatarPrimitive.Root>, AvatarProps>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root ref={ref} className={cn('relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full', className)} {...props} />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = forwardRef<ComponentRef<typeof AvatarPrimitive.Image>, AvatarImageProps>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn('aspect-square h-full w-full', className)} {...props} />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = forwardRef<ComponentRef<typeof AvatarPrimitive.Fallback>, AvatarFallbackProps>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn('flex h-full w-full items-center justify-center rounded-full bg-indigo-600 text-white', className)}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarFallback, AvatarImage }
