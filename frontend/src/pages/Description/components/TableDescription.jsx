import { v4 as uuidv4 } from 'uuid'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Key as KeyIcon, KeyRound as KeyRoundIcon } from '@/icons'
import { useUserTableStore } from '@/stores/usertable.store'

export function TableDescription() {
  const userTableExtendedPropertieList = useUserTableStore(
    (state) => state.userTableExtendedPropertieList,
  )
  const userTableColumnList = useUserTableStore(
    (state) => state.userTableColumnList,
  )
  const userTableIndexList = useUserTableStore(
    (state) => state.userTableIndexList,
  )
  const userTableForeignKeyList = useUserTableStore(
    (state) => state.userTableForeignKeyList,
  )

  // Busca la columna que es clave primaria (solo puede haber una por ahora)
  const primaryKeyObject = userTableIndexList.find(
    (element) => element.isPrimaryKey === true,
  )

  // Formatear las claves foráneas agregando el nombre de la columna como clave
  const foreignKeysFormattedList = userTableForeignKeyList.reduce(
    (acc, item) => {
      const column = userTableColumnList.find((col) => col.id === item.columnId)
      if (column) acc[column.name] = item
      return acc
    },
    {},
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
            <TableHead className="text-nowrap font-semibold">
              Nombre de propiedad
            </TableHead>
          </TableRow>
        </TableHeader>

        {userTableColumnList.length > 0 && (
          <TableBody>
            {userTableColumnList.map((item, index) => (
              <TableRow key={uuidv4()}>
                <TableCell className="w-[20px] text-zinc-200">
                  {index + 1}
                </TableCell>

                {/* Nombre de la tabla */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-200">{item.name}</span>

                    {/* Clave primaria */}
                    {primaryKeyObject &&
                      primaryKeyObject.columnId === item.id && (
                        <TooltipProvider>
                          <Tooltip delayDuration={150}>
                            <TooltipTrigger>
                              <KeyIcon width={14} height={14} />
                            </TooltipTrigger>
                            <TooltipContent>
                              <span className="text-amber-400">
                                {primaryKeyObject.isPrimaryKey
                                  ? 'clave primaria'
                                  : ''}
                              </span>
                              <span>
                                {`${primaryKeyObject.isUnique ? ', unique, ' : ''}${primaryKeyObject.typeDesc.toLowerCase()}`}
                              </span>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}

                    {/* Clave foránea */}
                    {foreignKeysFormattedList[item.name] && (
                      <TooltipProvider>
                        <Tooltip delayDuration={150}>
                          <TooltipTrigger>
                            <KeyRoundIcon width={14} height={14} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="flex flex-col">
                              <span>Clave foránea</span>
                              <span className="text-amber-400">
                                {`${foreignKeysFormattedList[item.name].referencedSchema}.${foreignKeysFormattedList[item.name].referencedObject} (${foreignKeysFormattedList[item.name].referencedColumn})`}
                              </span>
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </TableCell>

                {/* Tipo de dato IDENTITY y NULLABLE */}
                <TableCell>
                  <div className="flex items-center justify-between gap-2">
                    <span className="w-fit rounded-sm border border-zinc-600 bg-zinc-700 px-1 text-center text-xs text-zinc-200">
                      {item.type}
                    </span>

                    {primaryKeyObject.columnId === item.id &&
                    item.isIdentity ? (
                      <span className="text-xs text-stone-400">IDENTITY</span>
                    ) : !item.isNullable ? (
                      <span className="text-nowrap text-xs text-stone-400">
                        NOT NULL
                      </span>
                    ) : null}
                  </div>
                </TableCell>

                {/* Valor de la propiedad extendida (descripción) */}
                <TableCell>
                  <div className="flex flex-col gap-2 text-zinc-200">
                    {item.extendedProperties.length > 0 &&
                      item.extendedProperties.map((subitem) => (
                        <span key={uuidv4()} className="text-pretty">
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

                {/* Nombre de la propiedad extendida (descripción) */}
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
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  )
}
