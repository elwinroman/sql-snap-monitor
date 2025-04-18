import { useSearch } from '../../hooks/useSearch'
import { FavoriteSearch, NoResults, RecentSearch, SuggestionResult } from './components'

export function SearchResult() {
  const { search, suggestions, recents, favorites } = useSearch()

  return (
    <>
      <div className="grow overflow-x-hidden overflow-y-auto py-2">
        {/* Búsqueda */}
        {suggestions.length > 0 && <SuggestionResult />}

        {suggestions.length === 0 && search.trim().length < 3 && (
          <>
            {recents.length > 0 && <RecentSearch />}
            {favorites.length > 0 && <FavoriteSearch />}
          </>
        )}

        {/* Sin resultados */}
        {suggestions.length === 0 && search.trim().length > 2 && <NoResults />}
      </div>
    </>
  )
}
