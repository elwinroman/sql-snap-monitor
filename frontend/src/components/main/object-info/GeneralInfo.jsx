import { MessageCircleWarning } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { SPANISH_TYPES } from '../constants/spanish-types'
import { Metadata } from './Metadata'

export function GeneralInfo({ title, object, tableDescription = null }) {
  const descriptionSqlObject = object.id
    ? 'No se ha encontrado una descripción para este objeto'
    : 'Realiza la búsqueda de un objeto de definición SQL (SPs, Views, etc)'

  const descriptionUsertable = object.id
    ? 'No se ha encontrado una descripcion para esta tabla'
    : 'Realiza la búsqueda de una tabla de usuario'

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Nombre del objeto y su esquema */}
          <div className="text-primary flex flex-row items-center-safe gap-2 font-bold dark:font-medium">
            {object.schemaName && <Badge variant="yellow">{object.schemaName}</Badge>}

            <h1 className="text-lg">{object.name ?? title}</h1>
          </div>

          {/* Tipo de objeto */}
          {object.typeDesc && (
            <Badge variant="blue" size="md">
              {SPANISH_TYPES[object.type]}
            </Badge>
          )}
        </div>

        {/* Descripción del objeto para el tipo sql definition (si es que tiene) */}
        {!tableDescription && (
          <p className="text-secondary border-border w-fit rounded-sm border border-dashed px-3 py-2 text-sm">{descriptionSqlObject}</p>
        )}

        {/* Descripción para el tipo de objeto table */}
        {tableDescription && (
          <div className="border-border flex w-fit items-baseline justify-between gap-2 rounded-sm border border-dashed px-3 py-2">
            <div className="text-secondary flex flex-col gap-2 text-sm">
              {tableDescription.length > 0 ? (
                tableDescription.map((item, index) => <span key={index}>{item.propertyValue} </span>)
              ) : (
                <span className="text-secondary">{descriptionUsertable}</span>
              )}
            </div>

            {tableDescription.length > 1 && (
              <Popover>
                <PopoverTrigger>
                  <i className="hover:bg-action-hover grid place-items-center rounded-sm p-1.5 text-red-400 transition-colors">
                    <MessageCircleWarning size={14} />
                  </i>
                </PopoverTrigger>
                <PopoverContent>¡Existe más de una descripción para esta tabla de usuario!</PopoverContent>
              </Popover>
            )}
          </div>
        )}
      </div>

      {/* Metadata */}
      <div className="flex flex-col gap-2">
        <h3 className="text-primary/90 font-medium">Metadata</h3>
        <Metadata object={object}></Metadata>
      </div>
    </section>
  )
}
