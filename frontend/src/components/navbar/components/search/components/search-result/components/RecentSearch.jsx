import { History } from 'lucide-react'

import { useSearch } from '../../../hooks/useSearch'
import { Card } from './card'
import { DeleteItem } from './delete-item'
import { ItemList } from './item-list'

export function RecentSearch() {
  const { recents, deleteRecent } = useSearch()
  const title = 'Búsquedas recientes'

  return (
    <Card title={title}>
      {recents.map((data) => (
        <ItemList key={data.id} data={data}>
          <History size={13} className="text-secondary group-hover:text-primary" />

          <div className="flex w-full justify-between gap-1 transition-colors">
            <span className="overflow-hidden text-secondary group-hover:text-primary">{data.name}</span>
            <div className="flex items-center gap-2">
              <span className="overflow-hidden rounded-sm bg-background px-1 py-0.5 text-xs text-muted">{data.schemaName}</span>

              <DeleteItem action={deleteRecent} id={data.id} content="Eliminar" />
            </div>
          </div>
        </ItemList>
      ))}
    </Card>
  )
}
