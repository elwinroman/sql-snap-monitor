import { Clipboard as ClipboardIcon } from '@/icons/clipboard'
import { useObjectStore } from '@/stores/object.store'
import { useState } from 'react'
import { copyToClipboard } from '../../../utilities/copy-clipboard.util'

export function CopyClipboard() {
  const SQLDefinitionCode = useObjectStore((state) => state.SQLDefinitionCode)
  const SQLDefinitionError = useObjectStore((state) => state.SQLDefinitionError)
  const [copy, setCopy] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()

    copyToClipboard({ text: SQLDefinitionCode || SQLDefinitionError })
    setCopy(true)

    setTimeout(() => {
      setCopy(false)
    }, '1500')
  }

  return (
    <button
      className={`w-24 rounded-full border border-zinc-400/30 px-2 py-1 backdrop-blur-sm transition duration-200 ${copy ? 'bg-emerald-400' : 'bg-amber-400 hover:bg-amber-300'}`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center gap-1">
        <i className="text-black">
          <ClipboardIcon width={15} height={15} />
        </i>
        <span
          className={`text-xs font-semibold text-black transition duration-700`}
        >
          {copy ? 'Copiado' : 'Copiar'}
        </span>
      </div>
    </button>
  )
}
