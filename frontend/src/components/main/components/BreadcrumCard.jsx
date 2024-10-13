import { DatabaseZap } from 'lucide-react'

import { useAuthStore, useEditorStore } from '@/stores'

export function BreadcrumCard() {
  const dbname = useAuthStore((state) => state.dbname)
  const onDiffEditor = useEditorStore((state) => state.onDiffEditor)

  if (onDiffEditor) return

  return (
    <div className="flex flex-col items-baseline gap-2 border-b border-b-zinc-800 py-1 sm:flex-row sm:gap-6">
      <span className="text-2xl text-zinc-400">EXPLORANDO</span>
      <div className="flex items-start gap-2">
        <i>
          <DatabaseZap size={20} />
        </i>
        <h1 className="text-base font-medium text-slate-200">{dbname}</h1>
      </div>
    </div>
  )
}
