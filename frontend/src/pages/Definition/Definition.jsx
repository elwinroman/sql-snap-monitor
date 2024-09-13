import { AlertMessages } from '@/components/alert-messages/AlertMessages'
// import { CopyClipboard } from './components/CopyClipboard'
import { LinkObjectList } from '@/components/main/components/LinkObjectList'
import { MonacoEditorCode } from './components/monaco-editor-code/MonacoEditorCode'
import { useObjectStore } from '@/stores/object.store'
import { Options } from './components/options/Options'
import { useMaximize } from './hooks/useMaximize'
import { Info } from './components/Info'

export function DefinitionPage() {
  const SQLDefinitionCode = useObjectStore((state) => state.SQLDefinitionCode)
  const SQLDefinitionError = useObjectStore((state) => state.SQLDefinitionError)
  const SQLDefinitionObjectList = useObjectStore(
    (state) => state.SQLDefinitionObjectList,
  )
  const fetchSQLDefinition = useObjectStore((state) => state.fetchSQLDefinition)
  const updateSQLDefinitionObject = useObjectStore(
    (state) => state.updateSQLDefinitionObject,
  )
  const loading = useObjectStore((state) => state.loading)

  const { maximize, toggleMaximize } = useMaximize()

  if (loading) return <div>Buscando...</div>

  return (
    <div
      className={`overflow-hidden rounded-md border border-owborder bg-owcard ${SQLDefinitionCode ? 'pb-10' : ''} ${maximize ? 'fixed left-0 top-0 z-50 h-screen w-screen' : ''}`}
    >
      {SQLDefinitionCode && (
        <div className="flex items-center justify-between px-6 py-4">
          <h4 className="text-lg font-bold">Definición SQL de objetos</h4>

          <div className="flex gap-2">
            {/* Opciones */}
            <Options maximize={maximize} toggleMaximize={toggleMaximize} />
          </div>
        </div>
      )}

      {/* Monaco editor syntax */}
      {SQLDefinitionCode && (
        <MonacoEditorCode SQLDefinitionCode={SQLDefinitionCode} />
      )}

      {!SQLDefinitionCode && (
        <div className="flex flex-col gap-3 px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:px-10 lg:py-10">
          <h4 className="sm:4 pb-2 text-lg font-bold">
            Definición SQL de objetos
          </h4>

          {/* Alerta de error */}
          {SQLDefinitionError && (
            <AlertMessages message={SQLDefinitionError} type="error" />
          )}

          {/* Multiples objetos */}
          {SQLDefinitionObjectList.length > 0 && (
            <LinkObjectList
              objectList={SQLDefinitionObjectList}
              updateObject={updateSQLDefinitionObject}
              fetchObjectAction={fetchSQLDefinition}
            />
          )}

          {/* Información sobre la página actual */}
          <Info />
        </div>
      )}
    </div>
  )
}
