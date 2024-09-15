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
      <div className="py-4">
        {userTableExtendedPropertieList.length > 0 &&
          userTableExtendedPropertieList.map((item) => (
            <div
              key={uuidv4()}
              className="flex gap-5 rounded-sm border border-dashed border-zinc-500 px-4 py-2"
            >
              <p className="flex items-center gap-4 text-sm">
                <span className="font-medium text-zinc-200">
                  {item.propertyValue}
                </span>
                <span className="w-fit rounded-sm bg-slate-700 px-2 py-1 text-center text-xs text-white">
                  {item.propertyName}
                </span>
              </p>
            </div>
          ))}

        {userTableExtendedPropertieList.length === 0 && (
          <div
            key={uuidv4()}
            className="flex gap-5 rounded-sm border border-dashed border-zinc-500 px-4 py-2"
          >
            <p className="flex items-center gap-4 text-sm">
              <span className="text-zinc-500">
                No existe descripción de tabla
              </span>
              <span className="text-zinc-500">
                No existe nombre de propiedad
              </span>
            </p>
          </div>
        )}
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
                <TableCell className="w-[20px] text-zinc-200">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <span className="text-zinc-200">{item.name}</span>
                </TableCell>
                <TableCell>
                  <span className="w-fit rounded-sm border border-zinc-600 bg-zinc-700 px-1 text-center text-xs text-zinc-200">
                    {item.type}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-2 text-zinc-200">
                    {item.extendedProperties.length > 0 &&
                      item.extendedProperties.map((subitem) => (
                        <span key={uuidv4()} className="">
                          {subitem.propertyValue}
                        </span>
                      ))}

                    {item.extendedProperties.length === 0 && (
                      <span className="text-zinc-500">
                        No existe descripción
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-2">
                    {item.extendedProperties.length > 0 &&
                      item.extendedProperties.map((subitem) => (
                        <span
                          key={uuidv4()}
                          className="w-fit rounded-sm bg-slate-700 px-2 py-1 text-center text-xs text-white"
                        >
                          {subitem.propertyName}
                        </span>
                      ))}

                    {item.extendedProperties.length === 0 && (
                      <span className="text-zinc-500">
                        No existe nombre de propiedad
                      </span>
                    )}
                  </div>
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
