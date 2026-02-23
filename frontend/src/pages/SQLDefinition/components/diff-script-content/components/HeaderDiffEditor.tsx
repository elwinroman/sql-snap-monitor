import { ChevronRight } from 'lucide-react'

import { ConfigOptionEditor } from '@/components/editor-option'

import { useSysObjectStore } from '../../../store/sysobject.store'
import { SideBySideToggle } from './SideBySideToggle'

export function HeaderDiffEditor() {
  const sysobject = useSysObjectStore((state) => state.sysobject)

  return (
    <header className="bg-background flex h-10 items-center justify-between px-4">
      {/* Breadcrumb */}
      {sysobject ? (
        <ul className="text-secondary SY flex items-center gap-0.5 text-[13px] font-medium">
          <li>{sysobject.schemaName}</li>
          <li>
            <ChevronRight size={14} className="place-self-center-safe" />
          </li>
          <li className="text-primary overflow-hidden">{sysobject.name}</li>
        </ul>
      ) : (
        <div className="SY flex h-11 items-center text-[13px]" />
      )}

      {/* Acciones */}
      <div className="flex items-center gap-1">
        <SideBySideToggle />
        <ConfigOptionEditor />
      </div>
    </header>
  )
}
