import { Badge } from '@/components/ui/badge'
import { useSQLDefinitionStore } from '@/stores'

import { Metadata } from './Metadata'

export function GeneralInfo() {
  const object = useSQLDefinitionStore((state) => state.SQLDefinitionObject)
  const description = object.id
    ? 'No se ha encontrado una descripcion'
    : 'Administra tu objeto SQL y consulta toda la información necesaria.'

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Nombre del objeto y su esquema */}
          <div className="text-primary flex flex-row items-center-safe gap-2 text-xl font-bold dark:font-medium">
            {object.schemaName && <Badge variant="yellow">{object.schemaName}</Badge>}

            <h2>{object.name ?? 'Definición SQL'}</h2>
          </div>

          {/* Tipo de objeto */}
          {object.typeDesc && (
            <Badge variant="blue" size="md">
              {object.typeDesc}
            </Badge>
          )}
        </div>

        {/* Descripción del objeto (si es que tiene) */}
        <p className="text-secondary text-sm">{description}</p>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-primary/90 font-medium">Metadata</h3>
        <Metadata object={object}></Metadata>
      </div>
    </section>
  )
}
