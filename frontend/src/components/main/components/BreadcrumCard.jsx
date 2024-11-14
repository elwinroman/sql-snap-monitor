import { DatabaseZap, Server } from 'lucide-react'

import { useAuthStore, useEditorStore } from '@/stores'

export function BreadcrumCard() {
  const dbname = useAuthStore((state) => state.dbname)
  const server = useAuthStore((state) => state.server)
  const onDiffEditor = useEditorStore((state) => state.onDiffEditor)

  if (onDiffEditor) return

  return (
    <div className="flex flex-col items-baseline gap-2 sm:flex-row sm:gap-6">
      <span className="text-xl text-zinc-400">EXPLORANDO</span>

      <div className="flex gap-4">
        <div className="flex flex-nowrap items-start gap-1">
          <i className="text-slate-300">
            <Server size={16} />
          </i>
          <h1 className="text-sm font-medium text-slate-400">{server}</h1>
        </div>
        <div className="flex flex-nowrap items-start gap-1">
          <i className="text-slate-300">
            <DatabaseZap size={16} />
          </i>
          <h1 className="text-sm font-medium text-slate-400">{dbname}</h1>
        </div>
      </div>
    </div>
  )
}
