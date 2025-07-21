import { useSearch } from '@aligment/hooks/useSearch'
import { createContext, ReactNode } from 'react'

interface ContextProps {
  children: ReactNode
}

export interface SearchContextType {
  search: string
  updateSearch(search: string): void
  errorValidation: string | null
  updateErrorValidation(value: string): void
  getObject(): Promise<boolean>

  loading: boolean
  error: {
    title: string
    detail: string
  } | null
}

// crea contexto
export const SearchContext = createContext<SearchContextType | null>(null)

// provider
export const SearchProvider = ({ children }: ContextProps) => {
  const { search, updateSearch, errorValidation, updateErrorValidation, getObject, loading, error } = useSearch()

  return (
    <SearchContext.Provider value={{ search, updateSearch, errorValidation, updateErrorValidation, getObject, loading, error }}>
      {children}
    </SearchContext.Provider>
  )
}
