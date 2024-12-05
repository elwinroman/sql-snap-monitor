import { ObjectDetails } from '@/components/main/ObjectDetails'
import { useEditorStore, useSQLDefinitionStore } from '@/stores'

export function ObjectInfoPanel() {
  const onDiffEditor = useEditorStore((state) => state.onDiffEditor)
  const object = useSQLDefinitionStore((state) => state.SQLDefinitionObject)
  const aligmentObject = useSQLDefinitionStore((state) => state.SQLDefinitionAligmentObject)

  if (object.id === null) return

  return (
    <>
      {!onDiffEditor ? (
        <ObjectDetails object={object} />
      ) : (
        <div className="flex gap-2">
          <div className="flex basis-1/2 flex-col gap-2">
            <span className="text-sm font-semibold text-zinc-400">Objeto de alineación</span>
            <ObjectDetails object={aligmentObject} />
          </div>

          <div className="flex basis-1/2 flex-col gap-2">
            <span className="text-sm font-semibold text-zinc-400">Objeto local</span>
            <ObjectDetails object={object} />
          </div>
        </div>
      )}
    </>
  )
}