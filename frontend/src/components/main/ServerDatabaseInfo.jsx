import { ChevronRight, DatabaseZap, Server } from 'lucide-react'

import { useAuthStore } from '@/stores'

export function ServerDatabaseInfo() {
  const dbName = useAuthStore((state) => state.dbName)
  const serverName = useAuthStore((state) => state.serverName)

  return (
    <div className="flex flex-col items-baseline justify-end gap-2 sm:flex-row sm:gap-4">
      <span className="text-primary text-base font-medium select-none dark:font-normal">Explorando</span>

      <div className="flex items-baseline gap-2">
        <div className="flex flex-nowrap items-center gap-1">
          <i className="text-secondary">
            <Server size={14} />
          </i>
          <span className="text-secondary text-sm font-medium">{serverName}</span>
        </div>
        <ChevronRight size={14} className="text-secondary" />
        <div className="flex flex-nowrap items-center gap-1">
          <i className="text-secondary">
            <DatabaseZap size={14} />
          </i>
          <span className="text-secondary text-sm font-medium">{dbName}</span>
        </div>
      </div>
    </div>
  )
}
