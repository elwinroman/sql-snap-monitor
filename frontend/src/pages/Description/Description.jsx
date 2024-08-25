import { AlertMessages } from '@/components/alert-messages/AlertMessages'
import { LinkObjectList } from '@/components/main/components/LinkObjectList'
import { TableDescription } from './components/TableDescription'
import { useObjectStore } from '@/stores/object.store'

export function DescriptionPage() {
  const descriptionColumnList = useObjectStore(
    (state) => state.descriptionColumnList,
  )
  const descriptionError = useObjectStore((state) => state.descriptionError)
  const descriptionObjectList = useObjectStore(
    (state) => state.descriptionObjectList,
  )
  const fetchDescription = useObjectStore((state) => state.fetchDescription)
  const updateDescriptionObject = useObjectStore(
    (state) => state.updateDescriptionObject,
  )
  const loading = useObjectStore((state) => state.loading)

  if (loading) return <div>Buscando...</div>

  return (
    <div className="flex flex-col gap-2 rounded-md border border-ownavbar bg-owcard px-6 py-4">
      <h4 className="font-bold">Descripción</h4>

      {/* Descripción del objecto */}
      {descriptionColumnList && (
        <TableDescription descriptionColumnList={descriptionColumnList} />
      )}

      {/* Alerta de error */}
      {descriptionError && (
        <AlertMessages message={descriptionError} type="error" />
      )}

      {/* Multiples objetos */}
      {descriptionObjectList.length > 0 && (
        <LinkObjectList
          objectList={descriptionObjectList}
          updateObject={updateDescriptionObject}
          fetchObjectAction={fetchDescription}
        />
      )}
    </div>
  )
}
