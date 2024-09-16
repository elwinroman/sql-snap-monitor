import { AlertMessages } from '@/components/alert-messages/AlertMessages'
import { LinkObjectList } from '@/components/main/components/LinkObjectList'
import { TableDescription } from './components/TableDescription'
import { useObjectStore } from '@/stores/object.store'

export function DescriptionPage() {
  const userTableColumnList = useObjectStore(
    (state) => state.userTableColumnList,
  )
  const userTableError = useObjectStore((state) => state.userTableError)
  const userTableObjectList = useObjectStore(
    (state) => state.userTableObjectList,
  )
  const fetchUserTable = useObjectStore((state) => state.fetchUserTable)
  const updateObjectUserTable = useObjectStore(
    (state) => state.updateObjectUserTable,
  )
  const loading = useObjectStore((state) => state.loading)

  if (loading) return <div>Buscando...</div>

  return (
    <div className="flex flex-col gap-2 rounded-md border border-ownavbar bg-owcard px-8 py-8">
      <h4 className="font-bold">Descripción</h4>

      {/* Descripción del objecto */}
      {userTableColumnList && <TableDescription />}

      {/* Alerta de error */}
      {userTableError && (
        <AlertMessages message={userTableError} type="error" />
      )}

      {/* Multiples objetos */}
      {userTableObjectList.length > 0 && (
        <LinkObjectList
          objectList={userTableObjectList}
          updateObject={updateObjectUserTable}
          fetchObjectAction={fetchUserTable}
        />
      )}
    </div>
  )
}
