import { Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { resetAllStores } from '@/utilities'

export function SessionExpiredAlert() {
  const navigate = useNavigate()

  const handleClick = () => {
    resetAllStores()
    navigate('/login')
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
