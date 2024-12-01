import { Table } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { AlertMessages } from '@/components/alert-messages/AlertMessages'
import { LoaderSlack } from '@/components/loader/LoaderSlack'
import { Toaster } from '@/components/ui/sonner'
import { useUserTableStore } from '@/stores'

import { TableDescription } from './components'

export function UsertablePage() {
  const object = useUserTableStore((state) => state.userTableObject)
  const columns = useUserTableStore((state) => state.userTableColumnList)
  const error = useUserTableStore((state) => state.userTableError)
  const updateError = useUserTableStore((state) => state.updateUsertableError)
  const loading = useUserTableStore((state) => state.loading)

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
      <div className="flex flex-col gap-2 rounded-md border border-ownavbar bg-card px-8 py-8">
        <h4 className="flex items-center gap-2 pb-2 text-base font-bold text-zinc-300">
          <i>
            <Table size={20} />
          </i>
          <span className="text-amber-400">{object.name}</span>
        </h4>

        {/* Alerta de error */}
        {error && <AlertMessages message={error} type="error" />}

        {/* Descripción del usertable */}
        {columns && <TableDescription />}
      </div>

      <Toaster position="bottom-right" />
    </>
  )
}
