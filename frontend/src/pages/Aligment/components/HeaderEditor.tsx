import { useAligmentStore } from '@aligment/zustand/aligment.store'
import { PanelLeft } from 'lucide-react'

import { EditorAligmentOption } from './EditorAligmentOption'

export function HeaderEditor() {
  const hideMenu = useAligmentStore((state) => state.hideMenu)
  const updateHideMenu = useAligmentStore((state) => state.updateHideMenu)
  const sysobject = useAligmentStore((state) => state.sysobject)

  const fullName = sysobject ? `${sysobject.schemaName} . ${sysobject.name}` : 'PRE-PRODUCCIÓN'

  const handleHideMenu = () => updateHideMenu(!hideMenu)

  return (
    <header className="bg-background flex flex-col justify-start gap-x-5 gap-y-2 px-4 py-2.5 sm:items-center lg:flex-row lg:justify-between">
      <button className="hover:bg-background-neutral rounded-sm px-1 py-1" onClick={handleHideMenu}>
        <PanelLeft size={16} />
      </button>

      <div className="flex flex-[0_0_auto] flex-wrap items-center gap-2">
        <div className="flex items-baseline-last gap-2">
          <h4 className="text-palette-primary-main text-sm font-semibold dark:font-medium">{fullName}</h4>
        </div>
      </div>

      {/* Opciones del editor */}
      <EditorAligmentOption className="flex-[1_1_0]" />
    </header>
  )
}
