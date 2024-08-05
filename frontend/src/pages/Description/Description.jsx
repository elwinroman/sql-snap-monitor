import { TableDescription } from './components/TableDescription'
import { useObjectStore } from '@/stores/object.store'

export function Description() {
  const listDescriptionColumns = useObjectStore(
    (state) => state.listDescriptionColumns,
  )
  const errorObject = useObjectStore((state) => state.errorObject)

  return (
    <div className="bg-ownavbar border-ownavbar flex flex-col gap-2 rounded-md border px-6 py-4">
      <h4 className="font-bold">Columnas</h4>
      {errorObject && <p className="text-red-500">{errorObject}</p>}
      {!errorObject && (
        <TableDescription listDescriptionColumns={listDescriptionColumns} />
      )}
    </div>
  )
}
