import { Clipboard } from 'lucide-react'
import { useState } from 'react'

import { useEditorStore, useSQLDefinitionStore } from '@/stores'
import { formatPermissionRoles } from '@/utilities'

import { copyToClipboard } from '../../../utilities/copy-clipboard.util'

export function CopyClipboard() {
  const SQLDefinitionCode = useSQLDefinitionStore((state) => state.SQLDefinitionCode)
  const { permission, schema, name } = useSQLDefinitionStore((state) => state.SQLDefinitionObject)
  const onDiffEditor = useEditorStore((state) => state.onDiffEditor)
  const hasRoles = useEditorStore((state) => state.hasRoles)
  const [copy, setCopy] = useState(false)

  if (onDiffEditor) return null

  const code = hasRoles ? SQLDefinitionCode + formatPermissionRoles(permission, schema, name) : SQLDefinitionCode

  // copy to clipboard
  const handleClick = (e) => {
    e.preventDefault()

    copyToClipboard({ text: code })
    setCopy(true)

    setTimeout(() => {
      setCopy(false)
    }, '1500')
  }

  return (
    <button
      className={`w-20 rounded-sm border border-zinc-400/30 py-0.5 transition duration-200 ${copy ? 'bg-emerald-400' : 'bg-amber-400 hover:bg-amber-300'}`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center gap-1">
        <i className="text-black">
          <Clipboard size={14} />
        </i>
        <span className={`pt-[2px] text-xs font-semibold text-black transition duration-700`}>{copy ? 'Copiado' : 'Copiar'}</span>
      </div>
    </button>
  )
}
