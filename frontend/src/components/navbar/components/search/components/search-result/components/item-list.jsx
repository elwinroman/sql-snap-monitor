import { TYPE_ACTION } from '@/constants'
import { useSQLDefinitionStore, useUserTableStore } from '@/stores'

import { useSearch } from '../../../hooks/useSearch'

export function ItemList({ children, data }) {
  const fetchSQLDefinition = useSQLDefinitionStore((state) => state.fetchSQLDefinition)
  const fetchUsertable = useUserTableStore((state) => state.fetchUserTable)
  const { updateOpen, addRecents, type, favorites } = useSearch()

  // cada vez que hace click en el item, se recupera el objeto (sqldefinition o usertable)
  const getObject = (e) => {
    e.preventDefault()

    if (type.name === TYPE_ACTION.sqldefinition.name) fetchSQLDefinition({ id: e.currentTarget.dataset.id })
    if (type.name === TYPE_ACTION.usertable.name) fetchUsertable({ id: e.currentTarget.dataset.id })

    // comprobar que el objeto buscado tenga lFavorito (cuando se busca desde las SUGERENCIAS), si no lo tiene actualiza su valor desde Favorites
    if (data.lFavorito == null) {
      const index = favorites.findIndex((element) => element.objectId === data.objectId)
      data.lFavorito = index !== -1
    }

    // agrega al estado el item clickeado y lo registra en la base de datos
    addRecents(data, type.id)

    updateOpen(false) // cerrar dialog de búsqueda
  }

  return (
    <li key={data.id}>
      <button
        data-id={data.objectId}
        className="hover:bg-action-hover group text-secondary pointer-events-auto flex w-full cursor-pointer items-center gap-2 border-b border-dashed border-b-gray-500/40 px-4 py-2 text-left align-text-top text-sm"
        onClick={getObject}
      >
        {children}
      </button>
    </li>
  )
}
