import { SearchTrigger } from '@/components/search/components/SearchTrigger'
import { SearchProvider } from '@/components/search/context/searchContext'
import { Search } from '@/components/search/Search'

import { useFavoritoContext } from '../../../contexts/favoritoContext'
import { FavoritosList } from './panel-editor/FavoritosList'
import { ViewModeSelect } from './panel-editor/ViewModeSelect'

export function PanelEditor() {
  const { favoritos, deleteFavorito } = useFavoritoContext()

  return (
    <div className="border-border bg-background flex h-full flex-col border-r">
      {/* Controles superiores */}
      <div className="flex shrink-0 flex-col gap-7 px-4 py-6">
        <SearchProvider type="ALL_EXCEPT_USERTABLE">
          <SearchTrigger />
          <Search />
        </SearchProvider>

        <ViewModeSelect />
      </div>

      {/* Favoritos */}
      <FavoritosList favoritos={favoritos} onDelete={deleteFavorito} />
    </div>
  )
}
