import { History } from 'lucide-react'
import { useState } from 'react'

import { useSearch } from '../../../hooks/useSearch'
import { Card } from './card'
import { DeleteItem } from './delete-item'
import { FavoriteItem } from './favorite-item'
import { ItemList } from './item-list'

export function RecentSearch() {
  const MIN_SHOW_ITEMS = 5
  const [itemsToShow, setItemsToShow] = useState(MIN_SHOW_ITEMS) // limitar resultados
  const [showAll, setShowAll] = useState(false) // mostrar todo o mostrar 'itemsToShow'
  const { recents, deleteRecent, deleteAllRecents } = useSearch()
  const title = 'Búsquedas recientes'

  // Mostrar todas las búsqueda recientes o mostrar menos
  const handleShowAllItems = (e) => {
    e.preventDefault()

    const show = !showAll
    if (show) setItemsToShow(recents.length)
    else setItemsToShow(MIN_SHOW_ITEMS)

    setShowAll(!showAll)
  }

  // Eliminar todas las búsquedas recientes
  const handleEliminarTodo = (e) => {
    e.preventDefault()

    deleteAllRecents()
  }

  return (
    <Card title={title} className="relative">
      <button
        className="absolute px-4 py-1 text-xs text-left transition-colors right-1 top-1 w-fit text-rose-400 hover:text-rose-500"
        onClick={handleEliminarTodo}
      >
        <span>Borrar todo</span>
      </button>

      {recents.slice(0, itemsToShow).map((data) => (
        <ItemList key={data.id} data={data}>
          <History size={14} className="mt-0.5 text-primary" />

          <div className="flex items-center justify-between w-full gap-1 transition-colors">
            <span className="overflow-hidden text-primary">{data.cNombreObjeto}</span>
            <div className="flex items-center gap-2">
              <FavoriteItem data={data} content="Favorito" />
              <DeleteItem action={deleteRecent} id={data.id} content="Eliminar" />
            </div>
          </div>
        </ItemList>
      ))}

      {recents.length >= itemsToShow && recents.length !== MIN_SHOW_ITEMS && (
        <button
          className="px-4 py-1 text-xs text-left text-blue-400 transition-colors w-fit hover:text-blue-500"
          onClick={handleShowAllItems}
        >
          <span>{!showAll ? 'Ver mas' : 'Ver menos'}</span>
        </button>
      )}
    </Card>
  )
}
