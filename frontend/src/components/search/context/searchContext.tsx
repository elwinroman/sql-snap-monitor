import { createContext, ReactNode, useContext } from 'react'

import { useSearchSuggestions } from '@/components/search/hooks'
import { ApiSysObjectType, SysObjectSuggestion } from '@/models/sysobject'

interface ContextProps {
  /** Componentes React */
  children: ReactNode

  /** Tipo de búsqueda (para SQLDefinition y Usertable) */
  type: ApiSysObjectType

  /** Callback al seleccionar un objeto (search result, recent, etc.) */
  onSelect(objectId: number): void
}

export interface SearchContextType {
  // Sugerencias
  querySearch: string
  suggestions: SysObjectSuggestion[]
  updateQuerySearch(inputText: string): void
  updateSuggestions(suggestionsList: SysObjectSuggestion[]): void
  debounceGetSuggestions(search: string): void
  loading: boolean
  error: {
    title: string
    detail: string
  } | null

  /** Tipo de búsqueda */
  type: ApiSysObjectType

  /** Callback al seleccionar un objeto */
  onSelect(objectId: number): void
}

// crea contexto
export const SearchContext = createContext<SearchContextType | null>(null)

// provider
export const SearchProvider = ({ children, type, onSelect }: ContextProps) => {
  const { querySearch, suggestions, updateQuerySearch, updateSuggestions, debounceGetSuggestions, loading, error } =
    useSearchSuggestions(type)

  return (
    <SearchContext.Provider
      value={{ querySearch, suggestions, updateQuerySearch, updateSuggestions, debounceGetSuggestions, loading, error, type, onSelect }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export const searchContext = () => {
  const context = useContext(SearchContext)
  if (!context) throw new Error(`${searchContext.name} debe usarse dentro de <SearchContext>`)

  return context
}
