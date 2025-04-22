import { LoaderDot } from '@/components/loader/loader-dot/LoaderDot'
import { Badge } from '@/components/ui/badge'
import { useConfigStore, useSQLDefinitionStore } from '@/stores'

import { EditorOptions } from './components/EditorOptions'

export function HeaderEditor() {
  const object = useSQLDefinitionStore((state) => state.SQLDefinitionObject)
  const loadingAligment = useSQLDefinitionStore((state) => state.loadingAligment)
  const isMaximized = useConfigStore((state) => state.isMaximized)

  const headerObjectName = object.name
  const schemaName = object.name ? object.schemaName : ''

  return (
    <div className="flex flex-col justify-between gap-x-5 gap-y-4 px-6 py-4 sm:items-center md:flex-row">
      <div className="flex items-center gap-2">
        {schemaName && isMaximized && (
          <Badge variant="yellow" size="sm">
            {schemaName}
          </Badge>
        )}
        <h4 className="text-primary text-sm font-medium">{isMaximized ? headerObjectName : 'Código SQL'}</h4>
      </div>

      {/* Lista de opciones */}
      <div className="flex gap-2 text-center">
        {/* Opciones del editor */}
        {loadingAligment && loadingAligment ? (
          <div className="mr-4">
            <LoaderDot />
          </div>
        ) : (
          <EditorOptions />
        )}
      </div>
    </div>
  )
}
