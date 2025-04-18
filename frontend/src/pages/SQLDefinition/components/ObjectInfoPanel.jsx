import { ObjectDetails } from '@/components/main/ObjectDetails'
import { useDiffEditorStore, useSQLDefinitionStore } from '@/stores'

export function ObjectInfoPanel() {
  const onDiffEditor = useDiffEditorStore((state) => state.onDiffEditor)
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
            <span className="text-secondary text-sm font-semibold">Objeto de alineación</span>
            <ObjectDetails object={aligmentObject} />
          </div>

          <div className="flex basis-1/2 flex-col gap-2">
            <span className="text-secondary text-sm font-semibold">Objeto local</span>
            <ObjectDetails object={object} />
          </div>
        </div>
      )}
    </>
  )
}
