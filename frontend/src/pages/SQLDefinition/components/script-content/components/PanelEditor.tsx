import { SearchTrigger } from '@/components/search/components/SearchTrigger'
import { SearchProvider } from '@/components/search/context/searchContext'
import { Search } from '@/components/search/Search'

import { ViewModeSelect } from './ViewModeSelect'

export function PanelEditor() {
  return (
    <div className="border-border bg-background flex h-full flex-col gap-7 border-r px-4 py-6">
      {/* Componente de búsqueda y su contexto */}
      <SearchProvider type="ALL_EXCEPT_USERTABLE">
        <SearchTrigger />
        <Search />
      </SearchProvider>

      <ViewModeSelect />
    </div>
  )
}
