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

  return (
    <div className="bg-owcard flex flex-col gap-2 rounded-md border border-ownavbar px-6 py-4">
      <h4 className="font-bold">Columnas</h4>
      {descriptionError && <p className="text-red-500">{descriptionError}</p>}
      {!descriptionError && (
        <TableDescription descriptionColumnList={descriptionColumnList} />
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
