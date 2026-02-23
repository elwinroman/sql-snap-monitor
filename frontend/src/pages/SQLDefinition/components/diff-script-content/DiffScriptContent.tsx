import { useEffect } from 'react'

import { useSysObjectStore } from '../../store/sysobject.store'
import { DiffEditorCode } from './components/DiffEditorCode'
import { HeaderDiffEditor } from './components/HeaderDiffEditor'

export function DiffScriptContent() {
  const sysobject = useSysObjectStore((state) => state.sysobject)
  const fetchProdSysObject = useSysObjectStore((state) => state.fetchProdSysObject)

  // busca el objeto de pre-producción cuando cambia el sysobject
  // el store internamente evita llamadas duplicadas
  useEffect(() => {
    if (sysobject) fetchProdSysObject()
  }, [sysobject])

  return (
    <section className="flex h-full flex-col overflow-hidden">
      <HeaderDiffEditor />
      <DiffEditorCode />
    </section>
  )
}
