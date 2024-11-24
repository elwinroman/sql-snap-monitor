import { useConfetti } from '@stevent-team/react-party'
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

  // efecto conffeti
  const { createConfetti, canvasProps } = useConfetti({
    spawnGap: -44,
    diameter: [10, 10],
    count: 30,
    shapeWeights: {
      // distribución de formas
      triangle: 1,
      circle: 1,
      square: 1,
      star: 1,
    },
    speed: 1.2, // velocidad de movimiento
    gravity: 6, // gravedad
    colors: ['deeppink', 'orange', 'mediumseagreen', 'dodgerblue', 'gold'],
  })

  if (onDiffEditor) return null

  const code = hasRoles ? SQLDefinitionCode + formatPermissionRoles(permission, schema, name) : SQLDefinitionCode

  // copy to clipboard
  const handleClick = (e) => {
    e.preventDefault()

    createConfetti()
    copyToClipboard({ text: code })
    setCopy(true)

    setTimeout(() => {
      setCopy(false)
    }, '1500')
  }
  return (
    <>
      <canvas {...canvasProps} />
      <button
        className={`h-7 w-auto rounded-sm border border-zinc-400/30 px-2 transition duration-200 ${copy ? 'bg-emerald-700' : 'bg-blue-700 hover:bg-blue-600'}`}
        onClick={handleClick}
      >
        <div className="flex items-center justify-center gap-1">
          <i className="text-zinc-100">
            <Clipboard size={14} />
          </i>
          <span className={`pt-[2px] text-xs font-semibold text-zinc-100 transition duration-700`}>{copy ? 'Copiado' : 'Copiar'}</span>
        </div>
      </button>
    </>
  )
}
