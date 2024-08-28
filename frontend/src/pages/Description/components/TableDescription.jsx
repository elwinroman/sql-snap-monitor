import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useObjectStore } from '@/stores/object.store'
import { v4 as uuidv4 } from 'uuid'

export function TableDescription({ descriptionColumnList }) {
  const descriptionTableList = useObjectStore(
    (state) => state.descriptionTableList,
  )

  return (
    <div>
      <div className="py-2">
        {descriptionTableList.length > 0 &&
          descriptionTableList.map((item) => (
            <div
              key={uuidv4()}
              className="flex gap-5 rounded-sm border border-dashed border-slate-500 p-2"
            >
              <p className="text-md text-slate-300">
                <span className="font-medium">{item.value} </span>
                <span className="rounded-sm bg-zinc-700 px-2 py-1 text-xs font-bold">
                  {item.property_name}
                </span>
              </p>
            </div>
          ))}
      </div>
      <Table>
        <TableCaption>Lista de descripción de un objeto.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20px] font-semibold">Nro</TableHead>
            <TableHead className="font-semibold">Nombre columna</TableHead>
            <TableHead className="font-semibold">Descripción</TableHead>
            <TableHead className="font-semibold">Nombre de propiedad</TableHead>
            <TableHead className="w-[20px] font-semibold">col_id</TableHead>
            <TableHead className="w-[20px] font-semibold">minor_id</TableHead>
          </TableRow>
        </TableHeader>

        {descriptionColumnList.length > 0 && (
          <TableBody>
            {descriptionColumnList.map((item, index) => (
              <TableRow key={uuidv4()}>
                <TableCell className="w-[20px]">{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell>
                  <span className="inline-block rounded-sm bg-zinc-700 px-2 py-1 text-center text-xs font-bold">
                    {item.property_name}
                  </span>
                </TableCell>
                <TableCell className="w-[20px]">{item.column_id}</TableCell>
                <TableCell className="w-[20px]">{item.minor_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  )
}
