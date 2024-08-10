import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { ClockHour5 as ClockHour5Icon } from '@/icons/clock-hour-5'
import { useAuthStore } from '@/stores/auth.store'
import { useObjectStore } from '@/stores/object.store'

export function SessionExpiredAlert() {
  const clearAuthStore = useAuthStore((state) => state.clearAuthStore)
  const clearObjectStore = useObjectStore((state) => state.clearObjectStore)

  const handleClick = () => {
    clearAuthStore()
    clearObjectStore()
  }

  return (
    <div>
      <AlertDialog defaultOpen={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sesión expirada</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="flex items-center gap-2">
            <i className="text-rose-500">
              <ClockHour5Icon width={28} height={28} />
            </i>
            <span>
              Su sesión ha expirado. Por favor, inicia sesión de nuevo.
            </span>
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <button className="Button mauve" onClick={handleClick}>
                Iniciar sesión
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
