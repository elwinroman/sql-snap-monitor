import { useAligmentStore } from '@aligment/zustand/aligment.store'
import { Menu } from 'lucide-react'

import { Badge } from '@/components/ui'

import { EditorAligmentOption } from './EditorAligmentOption'

export function HeaderEditor() {
  const hideMenu = useAligmentStore((state) => state.hideMenu)
  const updateHideMenu = useAligmentStore((state) => state.updateHideMenu)
  const sysobject = useAligmentStore((state) => state.sysobject)

  const fullName = sysobject ? sysobject.name : 'PRE-PRODUCCIÓN'

  const handleHideMenu = () => updateHideMenu(!hideMenu)

  return (
    <header className="bg-card flex flex-col justify-start gap-x-5 gap-y-2 px-4 py-3 sm:items-center lg:flex-row lg:justify-between">
      <button className="hover:bg-background-neutral rounded-sm px-1 py-1" onClick={handleHideMenu}>
        <Menu size={17} />
      </button>

      <div className="flex flex-[0_0_auto] flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          {sysobject && (
            <Badge variant="yellow" size="sm">
              {sysobject.schemaName}
            </Badge>
          )}
          <h4 className="text-sm font-semibold text-amber-500 dark:text-amber-400">{fullName}</h4>
        </div>

        <span className="text-secondary max-w-sm text-sm text-nowrap sm:max-w-full"> (Actualizado al día de ayer)</span>
      </div>

      {/* Opciones del editor */}
      <EditorAligmentOption className="flex-[1_1_0]" />
    </header>
  )
}
