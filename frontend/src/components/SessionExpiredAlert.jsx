import { Clock } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useAuthStore, useSQLDefinitionStore, useUserTableStore } from '@/stores'

export function SessionExpiredAlert() {
  const clearAuthStore = useAuthStore((state) => state.clearAuthStore)
  const resetSQLDefinitionStore = useSQLDefinitionStore((state) => state.reset)
  const resetUsertTableStore = useUserTableStore((state) => state.reset)

  const handleClick = () => {
    clearAuthStore()
    resetSQLDefinitionStore()
    resetUsertTableStore()
    useSQLDefinitionStore.persist.clearStorage()
    useUserTableStore.persist.clearStorage()
  }

  return (
    <div>
      <AlertDialog defaultOpen={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sesión expirada</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="flex gap-2">
            <i className="pt-0.5 text-rose-500">
              <Clock size={20} />
            </i>
            <span className="text-sm text-zinc-300">
              Tu sesión ha expirado o tus credenciales han sido actualizadas. Por favor, inicia sesión nuevamente para continuar.
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
