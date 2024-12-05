import { TYPE_SEARCH } from '@/constants'
import { useSQLDefinitionStore, useUserTableStore } from '@/stores'

import { useSearch } from '../../../hooks/useSearch'

export function ItemList({ children, data }) {
  const fetchSQLDefinition = useSQLDefinitionStore((state) => state.fetchSQLDefinition)
  const fetchUsertable = useUserTableStore((state) => state.fetchUserTable)
  const { updateOpen, type } = useSearch()

  // cada vez que hace click en el item, se recupera el objeto (sqldefinition o usertable)
  const getObject = (e) => {
    e.preventDefault('id', e.currentTarget.dataset.id)

    if (type === TYPE_SEARCH.SQLDEFINITION) fetchSQLDefinition({ id: e.currentTarget.dataset.id })
    if (type === TYPE_SEARCH.USERTABLE) fetchUsertable({ id: e.currentTarget.dataset.id })
    updateOpen(false) // cerrar dialog de búsqueda
  }
  return (
    <li key={data.id}>
      <button
        data-id={data.id}
        className="group pointer-events-auto flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left align-text-top text-sm text-secondary hover:bg-background"
        onClick={getObject}
      >
        {children}
      </button>
    </li>
  )
}
