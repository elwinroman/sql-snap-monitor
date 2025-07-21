import { SearchContext } from '@aligment/contexts/searchContext'
import { useContext } from 'react'

export const useSearchContext = () => {
  const context = useContext(SearchContext)
  if (!context) throw new Error(`${useSearchContext.name} debe usarse dentro de <SearchContext>`)

  return context
}
