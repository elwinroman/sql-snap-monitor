// import { Table } from 'lucide-react'
import { MessageCircleWarning } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { AlertMessages } from '@/components/alert-messages/AlertMessages'
import { LoaderSlack } from '@/components/loader/loader-slack/LoaderSlack'
import { ObjectDetails } from '@/components/main/ObjectDetails'
import { Badge } from '@/components/ui/badge'
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

  const headerObjectName = object.name || 'Tabla de usuario'
  const schemaName = object.name ? object.schema : ''
  const tableDescriptionDefault = object.name
    ? 'No existe una descripción para esta tabla de usuario'
    : 'En esta sección podrás realizar consultas sobre las Tablas'

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

      <div className="bg-card shadow-custom-card flex flex-col gap-2 rounded-md px-6 py-6">
        <div className="flex items-center gap-2 pb-2">
          {schemaName && (
            <Badge variant="yellow" size="sm">
              {schemaName}
            </Badge>
          )}
          <h4 className={`font-semibold text-amber-500 dark:font-medium dark:text-amber-400 ${object.id ? 'text-sm' : 'text-base'}`}>
            {headerObjectName}
          </h4>
        </div>

        <div className="border-border flex w-fit items-baseline justify-between gap-2 rounded-sm border border-dashed px-3 py-2">
          <div className="text-secondary flex flex-col gap-2 text-sm">
            {tableDescription.length > 0 ? (
              tableDescription.map((item, index) => <span key={index}>{item.propertyValue} </span>)
            ) : (
              <span className="text-muted">{tableDescriptionDefault}</span>
            )}
          </div>

          {tableDescription.length > 1 && (
            <Popover>
              <PopoverTrigger>
                <i className="hover:bg-action-hover grid place-items-center rounded-sm p-1.5 text-red-400 transition-colors">
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
