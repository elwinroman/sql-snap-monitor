import { Ban } from 'lucide-react'
import { useState } from 'react'

import { LoaderDot } from '@/components/loader/loader-dot/LoaderDot'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { checkSession } from '@/services'
import { useAuthStore, useSQLDefinitionStore, useUserTableStore } from '@/stores'

export function ViewDefinitionErrorAlert() {
  const [persistError, setPersistError] = useState(null)
  const [loading, setLoading] = useState(false)
  const updateErrorViewDefinition = useAuthStore((state) => state.updateErrorViewDefinition)
  const resetSqlDefinition = useSQLDefinitionStore((state) => state.reset)
  const resetUsertable = useUserTableStore((state) => state.reset)

  // verificar que se tenga permiso de VIEW DEFINITION
  const handlePermission = async () => {
    setLoading(true)
    const res = await checkSession()

    // si no existe permiso
    if (!res.data.viewdefinition_permission) {
      setPersistError(true)
      updateErrorViewDefinition(true)
    } else {
      setPersistError(false)
      resetSqlDefinition()
      resetUsertable()
    }
    setLoading(false)
  }

  return (
    <div>
      <AlertDialog defaultOpen={true} open={persistError ?? true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Permiso requerido para ver definiciones SQL</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="flex gap-2">
            <i className="pt-0.5 text-rose-500">
              <Ban size={20} />
            </i>
            <span className="text-sm text-balance text-zinc-300">
              No tienes permisos para acceder a las definiciones SQL (<strong>VIEW DEFINITION</strong>). Por favor, contacta con tu
              administrador de base de datos para solicitar el acceso necesario.
            </span>
          </AlertDialogDescription>
          <AlertDialogFooter>
            <Button variant="success" onClick={handlePermission}>
              Verificar permiso
            </Button>
          </AlertDialogFooter>

          {!loading ? (
            persistError && (
              <span className="text-sm text-red-400">Aún no tienes los permisos necesarios para ver las definiciones SQL.</span>
            )
          ) : (
            <LoaderDot />
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
