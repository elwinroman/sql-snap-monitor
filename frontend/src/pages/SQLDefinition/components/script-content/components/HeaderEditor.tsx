import { ChevronRight } from 'lucide-react'

import { ConfigOptionEditor, CopyCode, DownloadScript } from '@/components/editor-option'
import { useSysObjectStore } from '@/zustand'

export function HeaderEditor() {
  const sysobject = useSysObjectStore((state) => state.sysobject)
  const currentEditorCode = useSysObjectStore((state) => state.currentEditorCode)

  return (
    <header className="bg-background flex h-10 items-center justify-between px-4">
      {/* Breadcrumb */}
      {sysobject ? (
        <ul className="text-secondary SY flex items-center gap-0.5 text-[13px] font-medium">
          <li>{sysobject?.schemaName}</li>
          <li>
            <ChevronRight size={14} className="place-self-center-safe" />
          </li>
          <li className="text-primary overflow-hidden">{sysobject?.name}</li>
        </ul>
      ) : (
        <div className="SY flex h-11 items-center text-[13px]"></div>
      )}

      {/* Acciones */}
      <div className="flex items-center gap-1">
        <ConfigOptionEditor /> {/* Configuración del editor */}
        <DownloadScript text={sysobject?.definition ?? ''} disabled={!sysobject} filename={sysobject?.name ?? ''} />
        <CopyCode text={currentEditorCode} disabled={!sysobject} />
      </div>
    </header>
  )
}
