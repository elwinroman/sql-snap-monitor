import { AlertMessages } from '@/components/alert-messages/AlertMessages'
import { CopyClipboard } from './components/CopyClipboard'
import { LinkObjectList } from '@/components/main/components/LinkObjectList'
import { MonacoEditorCode } from './components/monaco-editor-code/MonacoEditorCode'
import { useObjectStore } from '@/stores/object.store'

export function DefinitionPage() {
  const definitionCode = useObjectStore((state) => state.definitionCode)
  const definitionError = useObjectStore((state) => state.definitionError)
  const definitionObjectList = useObjectStore(
    (state) => state.definitionObjectList,
  )
  const fetchDefinition = useObjectStore((state) => state.fetchDefinition)
  const updateDefinitionObject = useObjectStore(
    (state) => state.updateDefinitionObject,
  )
  const loading = useObjectStore((state) => state.loading)

  if (loading) return <div>Buscando...</div>

  return (
    <div
      className={`relative overflow-hidden rounded-md border border-owborder bg-owcard ${definitionCode ? 'pb-10' : ''}`}
    >
      {definitionCode && (
        <div className="flex items-center justify-between px-6 py-4">
          <h4 className="">Definición</h4>

          {/* Copiar */}
          {definitionCode && <CopyClipboard />}
        </div>
      )}

      {/* Monaco editor syntax */}
      {definitionCode && <MonacoEditorCode definitionCode={definitionCode} />}

      {!definitionCode && (
        <div className="flex flex-col gap-3 px-6 py-6">
          <h4>Definición</h4>

          {/* Alerta de error */}
          {definitionError && (
            <AlertMessages message={definitionError} type="error" />
          )}

          {/* Multiples objetos */}
          {definitionObjectList.length > 0 && (
            <LinkObjectList
              objectList={definitionObjectList}
              updateObject={updateDefinitionObject}
              fetchObjectAction={fetchDefinition}
            />
          )}
        </div>
      )}
    </div>
  )
}
