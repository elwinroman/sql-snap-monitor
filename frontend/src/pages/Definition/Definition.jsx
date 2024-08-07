import { CopyClipboard } from './components/CopyClipboard'
import { HighlighterCode } from './components/HighlighterCode'
import { LinkObjects } from './components/LinkObjects'
import { useObjectStore } from '@/stores/object.store'

export function DefinitionPage() {
  const definitionError = useObjectStore((state) => state.definitionError)
  const definitionCode = useObjectStore((state) => state.definitionCode)
  const definitionObjectList = useObjectStore(
    (state) => state.definitionObjectList,
  )

  return (
    <div className="relative mb-10 overflow-hidden rounded-md border border-owborder bg-[#1d1f25]">
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
        <LinkObjects definitionObjectList={definitionObjectList} />
      )}
    </div>
  )
}
