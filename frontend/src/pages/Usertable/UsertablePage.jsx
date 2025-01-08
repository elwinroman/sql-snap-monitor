// import { Table } from 'lucide-react'
import { MessageCircleWarning } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { AlertMessages } from '@/components/alert-messages/AlertMessages'
import { LoaderSlack } from '@/components/loader/loader-slack/LoaderSlack'
import { ObjectDetails } from '@/components/main/ObjectDetails'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Toaster } from '@/components/ui/sonner'
import { useUserTableStore } from '@/stores'

import { Columns } from './components/Columns'
import { DataTable } from './components/DataTable'

export function UsertablePage() {
  const object = useUserTableStore((state) => state.userTableObject)
  const tableDescription = useUserTableStore((state) => state.userTableExtendedPropertieList)
  const error = useUserTableStore((state) => state.userTableError)
  const updateError = useUserTableStore((state) => state.updateUsertableError)
  const loading = useUserTableStore((state) => state.loading)

  const headerObjectName = object.name ? `${object.schema}.${object.name}` : 'Tabla de usuario'

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
      {object.id && <ObjectDetails object={object} />}

      <div className="flex flex-col gap-2 px-6 py-6 rounded-md bg-card shadow-custom-card">
        <h4 className="flex items-center gap-2 pb-2 text-base font-medium">
          <span className="text-primary">{headerObjectName}</span>
        </h4>

        <div className="flex items-baseline justify-between gap-2 px-3 py-2 border border-dashed rounded-sm w-fit border-border">
          <div className="flex flex-col gap-2 text-sm text-secondary">
            {tableDescription.length > 0 ? (
              tableDescription.map((item, index) => <span key={index}>{item.propertyValue} </span>)
            ) : (
              <span className="text-muted">No existe una descripción para esta tabla de usuario</span>
            )}
          </div>

          {tableDescription.length > 1 && (
            <Popover>
              <PopoverTrigger>
                <i className="grid place-items-center rounded-sm p-1.5 text-red-400 transition-colors hover:bg-action-hover">
                  <MessageCircleWarning size={14} />
                </i>
              </PopoverTrigger>
              <PopoverContent>¡Existe más de una descripción para esta tabla de usuario!</PopoverContent>
            </Popover>
          )}
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
