// import { Table } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { AlertMessages } from '@/components/alert-messages/AlertMessages'
import { LoaderSlack } from '@/components/loader/loader-slack/LoaderSlack'
import { Badge } from '@/components/ui/badge'
import { Toaster } from '@/components/ui/sonner'
import { useUserTableStore } from '@/stores'

import { Columns } from './components/Columns'
import { DataTable } from './components/DataTable'

export function UsertablePage() {
  const object = useUserTableStore((state) => state.userTableObject)
  const error = useUserTableStore((state) => state.userTableError)
  const updateError = useUserTableStore((state) => state.updateUsertableError)
  const loading = useUserTableStore((state) => state.loading)

  const tableDescription = useUserTableStore((state) => state.userTableExtendedPropertieList)
  const schemaName = object.name ? object.schema : ''

  // Maneja los errores, muestra y limpia la notificación al buscar un objeto QSL
  useEffect(() => {
    if (error) {
      toast.error(error.message)
      updateError({ state: null })
    }
  }, [error, updateError])

  if (loading) return <LoaderSlack />

  return (
    <>
      <div className="bg-card shadow-custom-card flex flex-col gap-2 rounded-md px-6 py-6">
        <div className="flex items-center gap-2 pb-2">
          {schemaName && (
            <Badge variant="yellow" size="sm">
              {schemaName}
            </Badge>
          )}
          <h4 className="text-primary text-sm font-medium">Columnas</h4>
        </div>

        {/* Alerta de error */}
        {error && <AlertMessages message={error} type="error" />}

        {/* Descripción del usertable */}
        <DataTable headerColumns={Columns} />
      </div>

      <Toaster position="bottom-right" />
    </>
  )
}
