import { Menu } from 'lucide-react'

import { LoaderDot } from '@/components/loader/loader-dot/LoaderDot'
import { useAligmentStore } from '@/stores'

import { EditorAligmentOption } from './EditorAligmentOption'

export function HeaderEditor() {
  const loading = useAligmentStore((state) => state.loading)
  const { name } = useAligmentStore((state) => state.object)
  // const error = useAligmentStore((state) => state.error)

  return (
    <header className="flex flex-col justify-start gap-x-5 gap-y-2 bg-card px-3 py-3 sm:items-center lg:flex-row lg:justify-between">
      <button className="flex-[1_1_0] hover:bg-zinc-200">
        <i className="block sm:hidden">
          <Menu size={18} />
        </i>
      </button>

      {loading ? (
        <LoaderDot />
      ) : (
        <div className="flex flex-[0_0_auto] flex-wrap items-center gap-2">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
            <span className="text-amber-400">{name ?? 'PRE-PRODUCCIÓN'}</span>
          </h4>
          <span className="max-w-sm text-nowrap text-sm text-secondary sm:max-w-full"> (Actualizado al día de ayer)</span>
        </div>
      )}

      {/* Opciones del editor */}
      <EditorAligmentOption className="flex-[1_1_0]" />
    </header>
  )
}
