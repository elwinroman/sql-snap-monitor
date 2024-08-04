import { CopyClipboard } from './components/CopyClipboard'
import { HighlighterCode } from './components/HighlighterCode'
import { InfoCards } from './components/InfoCards'
import { LinkObjects } from './components/LinkObjects'
import { useObjectStore } from '@/stores/object.store'

export function Definition() {
  const errorObject = useObjectStore((state) => state.errorObject)
  const definitionCode = useObjectStore((state) => state.definitionCode)
  const listObjects = useObjectStore((state) => state.listObjects)

  return (
    <section className="flex flex-col gap-6">
      {/* Información del objecto */}
      <InfoCards />

      <div className="border-owborder relative mb-10 overflow-hidden rounded-md border bg-[#1d1f25] px-1 py-6">
        {/* Copiar */}
        {(definitionCode || errorObject) && <CopyClipboard />}

        {/* Highlihter syntax */}
        {listObjects.length === 0 && (
          <HighlighterCode
            errorObject={errorObject}
            definitionCode={definitionCode}
          />
        )}

        {/* Multiples objetos */}
        {listObjects.length > 0 && <LinkObjects listObjects={listObjects} />}
      </div>
    </section>
  )
}
