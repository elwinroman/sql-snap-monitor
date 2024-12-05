import { LoaderDot } from '@/components/loader/loader-dot/LoaderDot'
import { useEditorStore, useSQLDefinitionStore } from '@/stores'

import { Options as EditorOptions } from './options/Options'

export function HeaderEditor() {
  const object = useSQLDefinitionStore((state) => state.SQLDefinitionObject)
  const onDiffEditor = useEditorStore((state) => state.onDiffEditor)
  const loadingAligment = useSQLDefinitionStore((state) => state.loadingAligment)

  const headerObjectName = object.name ? `${object.schema}.${object.name}` : 'Definiciones SQL'

  return (
    <div className="flex flex-col justify-between gap-x-5 gap-y-4 px-6 py-4 sm:items-center md:flex-row">
      {!onDiffEditor ? (
        <h4 className="flex items-center gap-2 font-medium text-zinc-300">
          <span className="text-primary">{headerObjectName}</span>
        </h4>
      ) : (
        <h3 className="max-w-sm text-sm text-zinc-200 sm:max-w-full">
          <span>Estas comparando con </span>
          <span className="font-bold text-emerald-500">PRE-PRODUCCIÓN</span>
          <span className="text-zinc-400"> (Actualizado al día de ayer)</span>
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
