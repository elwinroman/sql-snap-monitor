// import { Database as DatabaseIcon } from '@/icons/database'
import { useAuthStore } from '@/stores/auth.store'

export function BreadcrumCard({ object }) {
  const dbname = useAuthStore((state) => state.dbname)

  return (
    <div className="flex items-baseline gap-6 border-b border-b-zinc-800 py-1">
      <span className="text-3xl text-zinc-400">EXPLORANDO</span>
      <div className="flex items-baseline gap-2">
        <h1 className="text-xl font-bold text-slate-300">{dbname}</h1>

        {object.id && (
          <>
            <span className="mt-0.5 self-center rounded-md bg-orange-600 px-1.5 pb-0.5 text-xs font-bold text-zinc-100 outline-none">
              {object.schema}
            </span>
            <h2 className="text-xl font-bold text-amber-400">{object.name}</h2>
          </>
        )}
      </div>
    </div>
  )
}
