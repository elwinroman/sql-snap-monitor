import { LoaderDot } from '@/components/loader/loader-dot/LoaderDot'
import { Badge } from '@/components/ui/badge'
import { useAligmentStore } from '@/stores'

import { EditorAligmentOption } from './EditorAligmentOption'

export function HeaderEditor() {
  const loading = useAligmentStore((state) => state.loading)
  const { name, schema } = useAligmentStore((state) => state.object)
  const fullName = name || 'PRE-PRODUCCIÓN'

  return (
    <header className="flex flex-col justify-start px-4 py-3 gap-x-5 gap-y-2 bg-card sm:items-center lg:flex-row lg:justify-between">
      {loading ? (
        <LoaderDot className="px-3" />
      ) : (
        <div className="flex flex-[0_0_auto] flex-wrap items-center gap-2">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
            <Badge variant="green">{schema}</Badge>
            <span className="text-amber-400">{fullName}</span>
          </h4>
          <span className="max-w-sm text-sm text-nowrap text-secondary sm:max-w-full"> (Actualizado al día de ayer)</span>
        </div>
      )}

      {/* Opciones del editor */}
      <EditorAligmentOption className="flex-[1_1_0]" />
    </header>
  )
}
