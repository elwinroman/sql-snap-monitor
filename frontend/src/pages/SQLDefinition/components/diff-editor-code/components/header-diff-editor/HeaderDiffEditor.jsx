import { LoaderDot } from '@/components/loader/loader-dot/LoaderDot'
import { Badge } from '@/components/ui/badge'
import { useSQLDefinitionStore } from '@/stores'

import { DiffEditorOptions } from './components/DiffEditorOptions'

export function HeaderDiffEditor() {
  const object = useSQLDefinitionStore((state) => state.SQLDefinitionObject)
  const loadingAligment = useSQLDefinitionStore((state) => state.loadingAligment)

  const headerObjectName = object.name || 'Definiciones SQL'
  const schemaName = object.name ? object.schemaName : ''

  return (
    <div className="flex flex-col justify-between gap-x-5 gap-y-4 px-6 py-4 sm:items-center md:flex-row">
      <div className="flex items-center gap-2">
        {schemaName && (
          <Badge variant="red" size="sm">
            {schemaName}
          </Badge>
        )}
        <h4 className={`font-semibold text-rose-600 dark:text-rose-500 ${object.name ? 'text-sm' : 'text-base'}`}>{headerObjectName}</h4>
      </div>

      <div className="flex gap-2">
        {/* Opciones del editor */}
        {loadingAligment && loadingAligment ? (
          <div className="mr-4">
            <LoaderDot />
          </div>
        ) : (
          <DiffEditorOptions />
        )}
      </div>
    </div>
  )
}
