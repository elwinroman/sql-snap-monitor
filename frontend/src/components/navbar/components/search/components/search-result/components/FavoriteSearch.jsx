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
          <Star size={14} className="text-primary mt-0.5" />
          <div className="flex w-full items-center justify-between gap-1 transition-colors">
            <span className="text-primary overflow-hidden">{data.cNombreObjeto}</span>
            <div className="flex items-center gap-2">
              <DeleteItem action={deleteFavorite} id={data.id} content="Eliminar" />
            </div>
          </div>
        </ItemList>
      ))}
    </Card>
  )
}
