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

  return (
    <div className="relative mb-10 overflow-hidden rounded-md border border-owborder bg-owcard py-10">
      {/* Copiar */}
      {(definitionCode || definitionError) && <CopyClipboard />}

      {/* Monaco editor syntax */}
      {definitionObjectList.length === 0 && (
        <MonacoEditorCode
          definitionError={definitionError}
          definitionCode={definitionCode}
        />
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
  )
}
