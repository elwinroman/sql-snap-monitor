import { Toaster as Sonner } from 'sonner'

const TOAST_BASE = 'group toast !rounded-sm shadow-lg border !p-2 !px-3 !w-[420px] [&>[data-icon]]:!self-start [&>[data-icon]]:!mt-1.5'

const Toaster = () => {
  return (
    <Sonner
      position="bottom-right"
      style={{ '--offset': '24px', right: '100px' } as React.CSSProperties}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: TOAST_BASE,
          title: 'font-bold text-sm',
          description: 'text-sm opacity-80',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',

          // Estilos por tipo
          success: '!bg-palette-success-darker !border-palette-success-dark !text-palette-success-contrastText',
          error: '!bg-destructive !border-red-700 !text-destructive-foreground',
          info: '!bg-palette-info-darker !border-palette-info-dark !text-palette-info-contrastText',
          warning: '!bg-amber-600 !border-amber-700 !text-white',
        },
      }}
    />
  )
}

export { Toaster }
