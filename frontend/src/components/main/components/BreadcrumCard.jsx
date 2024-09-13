// import { Database as DatabaseIcon } from '@/icons/database'
import { useAuthStore } from '@/stores/auth.store'

export function BreadcrumCard({ object }) {
  const dbname = useAuthStore((state) => state.dbname)

  return (
    <div className="flex flex-col items-baseline gap-2 border-b border-b-zinc-800 py-1 sm:flex-row sm:gap-6">
      <span className="text-2xl text-zinc-400">EXPLORANDO</span>
      <div className="flex items-baseline gap-2">
        <h1 className="text-base font-medium text-slate-200">{dbname}</h1>
        <span className="text-zinc-500">/</span>
        {object.id && (
          <h2 className="text-base font-medium text-amber-400">
            {object.name}
          </h2>
        )}
      </div>
    </div>
  )
}
