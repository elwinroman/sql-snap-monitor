import { AlertMessages } from '@/components/alert-messages/AlertMessages'
// import { CopyClipboard } from './components/CopyClipboard'
import { LinkObjectList } from '@/components/main/components/LinkObjectList'
import { MonacoEditorCode } from './components/monaco-editor-code/MonacoEditorCode'
import { useObjectStore } from '@/stores/object.store'
import { Options } from './components/options/Options'
import { useMaximize } from './hooks/useMaximize'

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

  const { maximize, toggleMaximize } = useMaximize()

  if (loading) return <div>Buscando...</div>

  return (
    <div
      className={`overflow-hidden rounded-md border border-owborder bg-owcard ${definitionCode ? 'pb-10' : ''} ${maximize ? 'fixed left-0 top-0 z-50 h-screen w-screen' : ''}`}
    >
      {definitionCode && (
        <div className="flex items-center justify-between px-6 py-4">
          <h4 className="font-bold">Definición</h4>

          <div className="flex gap-2">
            {/* Opciones */}
            <Options maximize={maximize} toggleMaximize={toggleMaximize} />
          </div>
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
