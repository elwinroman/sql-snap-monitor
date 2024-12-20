import { Star } from 'lucide-react'

import { useSearch } from '../../../hooks/useSearch'
import { Card } from './card'
import { DeleteItem } from './delete-item'
import { ItemList } from './item-list'

export function FavoriteSearch() {
  const { favorites, deleteFavorite } = useSearch()
  const title = 'Favoritos'

  return (
    <Card title={title}>
      {favorites.map((data) => (
        <ItemList key={data.id} data={data}>
          <i className="text-amber group-hover:text-primary">
            <Star size={13} />
          </i>
          <div className="flex w-full items-center justify-between gap-1 transition-colors">
            <span className="overflow-hidden text-secondary group-hover:text-primary">{data.cNombreObjeto}</span>
            <div className="flex items-center gap-2">
              <span className="overflow-hidden rounded-sm bg-background px-1 py-1 text-xs text-muted">{data.schemaName}</span>

              <DeleteItem action={deleteFavorite} id={data.id} content="Eliminar" />
            </div>
          </div>
        </ItemList>
      ))}
    </Card>
  )
}
