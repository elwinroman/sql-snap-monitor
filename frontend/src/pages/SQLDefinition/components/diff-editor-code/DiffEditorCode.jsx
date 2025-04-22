import { useEffect } from 'react'

import { useDiffEditorStore } from '@/stores'

import { HeaderDiffEditor } from './components/header-diff-editor/HeaderDiffEditor'
import { MonacoDiffEditorCode } from './components/MonacoDiffEditorCode'

export function DiffEditorCode() {
  const onDiffEditor = useDiffEditorStore((state) => state.onDiffEditor)
  const updateDiffEditor = useDiffEditorStore((state) => state.updateDiffEditor)

  // bindea el key ESC para cerrar el editor de comparación
  useEffect(() => {
    const down = (e) => {
      if (!onDiffEditor) return

      if (e.key === 'Escape') {
        e.preventDefault()
        updateDiffEditor(false)
      }
    }

    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [onDiffEditor, updateDiffEditor])

  return (
    <section className="bg-background fixed top-0 left-0 z-50 h-screen w-screen">
      <HeaderDiffEditor />
      <MonacoDiffEditorCode />
    </section>
  )
}
