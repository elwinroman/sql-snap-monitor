import debounce from 'just-debounce-it'
import { useCallback, useContext } from 'react'

import { DEBOUNCE_DELAY } from '@/constants'

import { SearchContext } from '../context/search'
import { getSearchSuggestions } from '../services/search.service'

export function useSearch() {
  const context = useContext(SearchContext)
  const updateSuggestions = context.updateSuggestions
  const suggestions = context.suggestions

  if (!context) throw new Error('Error en el contexto search')

  // obtener las sugerencias según la búsqueda
  const getSuggestions = useCallback(
    async ({ search, type }) => {
      const sanitizeSearch = search.trim()

      // restricción de búsqueda
      if (sanitizeSearch === '' || sanitizeSearch.length < 3) {
        updateSuggestions([])
        return
      }

      const { data } = await getSearchSuggestions({ search: sanitizeSearch, type })
      updateSuggestions(data || suggestions)
    },
    [updateSuggestions, suggestions],
  )

  // debounce para limitar la frecuencia de las sugerencias de búsqueda
  const debounceGetSuggestions = useCallback(
    debounce((_search, _type) => {
      getSuggestions({ search: _search, type: _type })
    }, DEBOUNCE_DELAY),
    [getSuggestions],
  )

  return { ...context, debounceGetSuggestions }
}
