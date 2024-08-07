import { TableDescription } from './components/TableDescription'
import { useObjectStore } from '@/stores/object.store'

export function DescriptionPage() {
  const descriptionColumnList = useObjectStore(
    (state) => state.descriptionColumnList,
  )
  const descriptionError = useObjectStore((state) => state.descriptionError)

  return (
    <div className="flex flex-col gap-2 rounded-md border border-ownavbar bg-ownavbar px-6 py-4">
      <h4 className="font-bold">Columnas</h4>
      {descriptionError && <p className="text-red-500">{descriptionError}</p>}
      {!descriptionError && (
        <TableDescription descriptionColumnList={descriptionColumnList} />
      )}
    </div>
  )
}
