import { LoaderDot } from '@/components/loader/loader-dot/LoaderDot'
import { Badge } from '@/components/ui/badge'
import { useDiffEditorStore, useSQLDefinitionStore } from '@/stores'

import { Options as EditorOptions } from './options/Options'

export function HeaderEditor() {
  const object = useSQLDefinitionStore((state) => state.SQLDefinitionObject)
  const onDiffEditor = useDiffEditorStore((state) => state.onDiffEditor)
  const loadingAligment = useSQLDefinitionStore((state) => state.loadingAligment)

  const headerObjectName = object.name ? object.name : 'Definiciones SQL'
  const schemaName = object.name ? object.schema : ''

  return (
    <div className="flex flex-col justify-between px-6 py-4 gap-x-5 gap-y-4 sm:items-center md:flex-row">
      {!onDiffEditor ? (
        <h4 className="flex items-center gap-2">
          <Badge variant="green">{schemaName}</Badge>
          <span className="text-base font-medium text-primary">{headerObjectName}</span>
        </h4>
      ) : (
        <h3 className="max-w-sm text-sm font-semibold text-primary sm:max-w-full">
          <span>Estas comparando con </span>
          <span className="font-bold text-green-500">PRE-PRODUCCIÓN</span>
          <span className="text-secondary"> (Actualizado al día de ayer)</span>
        </h3>
      )}

      <div className="flex gap-2">
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
