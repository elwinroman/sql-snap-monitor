import { DatabaseZap, Server } from 'lucide-react'

import { useAuthStore } from '@/stores'

export function ServerDatabaseInfo() {
  const dbname = useAuthStore((state) => state.dbname)
  const server = useAuthStore((state) => state.server)

  return (
    <div className="font-fira flex flex-col items-baseline justify-end gap-2 pb-1 sm:flex-row sm:gap-6">
      <span className="text-primary text-base font-medium dark:font-normal">Explorando</span>

      <div className="flex gap-4">
        <div className="flex flex-nowrap items-start gap-1">
          <i className="text-secondary">
            <Server size={16} />
          </i>
          <h1 className="text-secondary text-sm font-bold">{server}</h1>
        </div>
        <div className="flex flex-nowrap items-start gap-1">
          <i className="text-secondary">
            <DatabaseZap size={16} />
          </i>
          <h1 className="text-secondary text-sm font-bold">{dbname}</h1>
        </div>
      </div>
    </div>
  )
}
