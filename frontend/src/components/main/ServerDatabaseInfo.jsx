import { DatabaseZap, Server } from 'lucide-react'
import { useLocation } from 'react-router-dom'

import { ROUTES } from '@/constants'
import { useAuthStore, useDiffEditorStore } from '@/stores'

export function ServerDatabaseInfo() {
  const dbname = useAuthStore((state) => state.dbname)
  const server = useAuthStore((state) => state.server)
  const onDiffEditor = useDiffEditorStore((state) => state.onDiffEditor)

  const currentLocation = useLocation()

  if (currentLocation.pathname === ROUTES.SQL_DEFINITION && onDiffEditor) return

  return (
    <div className="flex flex-col items-baseline gap-2 sm:flex-row sm:gap-6">
      <span className="text-primary text-xl font-semibold dark:font-medium">Explorando</span>

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
