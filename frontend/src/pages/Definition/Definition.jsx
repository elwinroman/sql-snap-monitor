import { CopyClipboard } from './components/CopyClipboard'
import { HighlighterCode } from './components/HighlighterCode'
import { LinkObjectList } from '@/components/main/components/LinkObjectList'
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
    <div className="bg-owcard relative mb-10 overflow-hidden rounded-md border border-owborder">
      {/* Copiar */}
      {(definitionCode || definitionError) && <CopyClipboard />}

      {/* Highlihter syntax */}
      {definitionObjectList.length === 0 && (
        <HighlighterCode
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
