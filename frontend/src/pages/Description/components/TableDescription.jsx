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

export function TableDescription({ userTableColumnList }) {
  const userTableExtendedPropertieList = useObjectStore(
    (state) => state.userTableExtendedPropertieList,
  )

  return (
    <div>
      <div className="py-2">
        {userTableExtendedPropertieList.length > 0 &&
          userTableExtendedPropertieList.map((item) => (
            <div
              key={uuidv4()}
              className="flex gap-5 rounded-sm border border-dashed border-slate-500 p-2"
            >
              <p className="text-md text-slate-300">
                <span className="font-medium">{item.propertyValue} </span>
                <span className="rounded-sm bg-zinc-700 px-2 py-1 text-xs font-bold">
                  {item.propertyName}
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
            <TableHead className="font-semibold">Tipo</TableHead>
            <TableHead className="font-semibold">Descripción</TableHead>
            <TableHead className="font-semibold">Nombre de propiedad</TableHead>
            <TableHead className="w-[20px] font-semibold">col_id</TableHead>
          </TableRow>
        </TableHeader>

        {userTableColumnList.length > 0 && (
          <TableBody>
            {userTableColumnList.map((item, index) => (
              <TableRow key={uuidv4()}>
                <TableCell className="w-[20px]">{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.extendedProperties[0].propertyValue}</TableCell>
                <TableCell>
                  <span className="inline-block rounded-sm bg-zinc-700 px-2 py-1 text-center text-xs font-bold">
                    {item.extendedProperties[0].propertyName}
                  </span>
                </TableCell>
                <TableCell className="w-[20px]">{item.id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  )
}
