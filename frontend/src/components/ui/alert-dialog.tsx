import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { ComponentPropsWithoutRef, ComponentRef, FC, forwardRef, HTMLAttributes } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

type AlertDialogOverlayProps = ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>

const AlertDialogOverlay = forwardRef<ComponentRef<typeof AlertDialogPrimitive.Overlay>, AlertDialogOverlayProps>(
  ({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Overlay
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80',
        className,
      )}
      {...props}
      ref={ref}
    />
  ),
)
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

type AlertDialogContentProps = ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>

const AlertDialogContent = forwardRef<ComponentRef<typeof AlertDialogPrimitive.Content>, AlertDialogContentProps>(
  ({ className, ...props }, ref) => (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg',
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  ),
)
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

type DivProps = HTMLAttributes<HTMLDivElement>

const AlertDialogHeader: FC<DivProps> = ({ className, ...props }) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
)
AlertDialogHeader.displayName = 'AlertDialogHeader'

const AlertDialogFooter: FC<DivProps> = ({ className, ...props }) => (
  <div className={cn('flex flex-col justify-center sm:flex-row sm:space-x-2', className)} {...props} />
)
AlertDialogFooter.displayName = 'AlertDialogFooter'

type AlertDialogTitleProps = ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>

const AlertDialogTitle = forwardRef<ComponentRef<typeof AlertDialogPrimitive.Title>, AlertDialogTitleProps>(
  ({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Title ref={ref} className={cn('text-base font-semibold', className)} {...props} />
  ),
)
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

type AlertDialogDescriptionProps = ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>

const AlertDialogDescription = forwardRef<ComponentRef<typeof AlertDialogPrimitive.Description>, AlertDialogDescriptionProps>(
  ({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Description ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props} />
  ),
)
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName

type AlertDialogActionProps = ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>

const AlertDialogAction = forwardRef<ComponentRef<typeof AlertDialogPrimitive.Action>, AlertDialogActionProps>(
  ({ className, ...props }, ref) => <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />,
)
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

type AlertDialogCancelProps = ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>

const AlertDialogCancel = forwardRef<ComponentRef<typeof AlertDialogPrimitive.Cancel>, AlertDialogCancelProps>(
  ({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Cancel ref={ref} className={cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', className)} {...props} />
  ),
)
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}
