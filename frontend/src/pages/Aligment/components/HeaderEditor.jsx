import { Menu } from 'lucide-react'

import { LoaderDot } from '@/components/loader/loader-dot/LoaderDot'
import { Badge } from '@/components/ui/badge'
import { useAligmentStore } from '@/stores'

import { EditorAligmentOption } from './EditorAligmentOption'

export function HeaderEditor() {
  const loading = useAligmentStore((state) => state.loading)
  const hideMenu = useAligmentStore((state) => state.hideMenu)
  const updateHideMenu = useAligmentStore((state) => state.updateHideMenu)
  const { name, schema } = useAligmentStore((state) => state.object)
  const fullName = name || 'PRE-PRODUCCIÓN'

  const handleHideMenu = () => {
    updateHideMenu({ state: !hideMenu })
  }

  return (
    <header className="flex flex-col justify-start px-4 py-3 gap-x-5 gap-y-2 bg-card sm:items-center lg:flex-row lg:justify-between">
      <button className="px-1 py-1 rounded-sm hover:bg-background-neutral" onClick={handleHideMenu}>
        <Menu size={17} />
      </button>

      {loading ? (
        <LoaderDot className="px-3" />
      ) : (
        <div className="flex flex-[0_0_auto] flex-wrap items-center gap-2">
          <div className="flex items-center gap-2">
            {schema && (
              <Badge variant="yellow" size="sm">
                {schema}
              </Badge>
            )}
            <h4 className="text-sm font-semibold text-amber-400">{fullName}</h4>
          </div>

          <span className="max-w-sm text-sm text-nowrap text-secondary sm:max-w-full"> (Actualizado al día de ayer)</span>
        </div>
      )}

      {/* Opciones del editor */}
      <EditorAligmentOption className="flex-[1_1_0]" />
    </header>
  )
}
