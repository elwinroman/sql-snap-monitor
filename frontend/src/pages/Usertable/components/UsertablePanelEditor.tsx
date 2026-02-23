import { FavoritosList, useFavoritoContext } from '@/components/favoritos'
import { SearchTrigger } from '@/components/search/components/SearchTrigger'
import { SearchProvider } from '@/components/search/context/searchContext'
import { Search } from '@/components/search/Search'

import { useUserTableStore } from '../store/usertable.store'

export function UsertablePanelEditor() {
  const { favoritos, deleteFavorito } = useFavoritoContext()
  const fetchUserTable = useUserTableStore((state) => state.fetchUserTable)
  const object = useUserTableStore((state) => state.userTableObject)

  return (
    <div className="border-border bg-background flex h-full flex-col border-r">
      {/* Controles superiores */}
      <div className="flex shrink-0 flex-col gap-7 px-4 py-6">
        <SearchProvider type="U" onSelect={fetchUserTable}>
          <SearchTrigger />
          <Search />
        </SearchProvider>
      </div>

      {/* Favoritos */}
      <FavoritosList
        favoritos={favoritos}
        onDelete={deleteFavorito}
        onSelect={fetchUserTable}
        activeObjectName={object?.name}
        activeSchema={object?.schemaName}
      />
    </div>
  )
}
