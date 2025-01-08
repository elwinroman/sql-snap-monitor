import { DatabaseZap, Server } from 'lucide-react'
import { useLocation } from 'react-router-dom'

import { ROUTES } from '@/constants'
import { useAuthStore, useEditorStore } from '@/stores'

export function ServerDatabaseInfo() {
  const dbname = useAuthStore((state) => state.dbname)
  const server = useAuthStore((state) => state.server)
  const onDiffEditor = useEditorStore((state) => state.onDiffEditor)

  const currentLocation = useLocation()

  if (currentLocation.pathname === ROUTES.SQL_DEFINITION && onDiffEditor) return

  return (
    <div className="flex flex-col items-baseline gap-2 sm:flex-row sm:gap-6">
      <span className="text-xl text-primary">Explorando</span>

      <div className="flex gap-4">
        <div className="flex items-start gap-1 flex-nowrap">
          <i className="text-secondary">
            <Server size={16} />
          </i>
          <h1 className="text-sm font-bold text-secondary">{server}</h1>
        </div>
        <div className="flex items-start gap-1 flex-nowrap">
          <i className="text-secondary">
            <DatabaseZap size={16} />
          </i>
          <h1 className="text-sm font-bold text-secondary">{dbname}</h1>
        </div>
      </div>
    </div>
  )
}
