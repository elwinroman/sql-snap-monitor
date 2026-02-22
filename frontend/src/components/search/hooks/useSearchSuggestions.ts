import debounce from 'just-debounce-it'
import { useCallback, useMemo, useState } from 'react'

import { DEBOUNCE_DELAY } from '@/enviroment/enviroment'
import { ApiSysObjectType, SysObjectSuggestion } from '@/models/sysobject'
import { getSearchSuggestionsService } from '@/services'

import useFetchAndLoad from '../../../hooks/useFetchAndLoad'

// hook - lógica para búsqueda de objetos
export const useSearchSuggestions = (type: ApiSysObjectType) => {
  const [suggestions, setSuggestions] = useState<SysObjectSuggestion[]>([])
  const [querySearch, setQuerySearch] = useState<string>('')
  const { callEndpoint, loading, error } = useFetchAndLoad<SysObjectSuggestion[]>()

  // funcion que obtiene sugerencias de búsqueda según el tipo de objeto
  const getSuggestions = useCallback(async (search: string) => {
    // llamada a la API
    try {
      const response = await callEndpoint(getSearchSuggestionsService({ name: search, type }))

      // actualiza el estado incluso si la api no devuelve resultados []
      setSuggestions(response.data)
    } catch (err) {
      console.error(`Error al buscar sugerencias de búsqueda para objetos de sistema (SQL Definitions): ${err} `)
    }
  }, [])

  const debounceGetSuggestions = useMemo(
    () =>
      debounce(
        getSuggestions,
        DEBOUNCE_DELAY, // delay para la recuperación de sugerencias de búsqueda
        true, // ejecutar inmediatamente la primera llamada
      ),
    [getSuggestions],
  )

  const updateQuerySearch = (inputText: string) => setQuerySearch(inputText)
  const updateSuggestions = (suggestionList: SysObjectSuggestion[]) => setSuggestions(suggestionList)

  // cada vez que cambia el input de búsqueda consulta a la API las coincidencias de búsqueda (TODO: Refactorizar para usar estado Search para la búsqueda mediante useRef)
  /*
  useEffect(() => {
    debounceGetSuggestions()

    return () => debounceGetSuggestions.cancel()
  }, [search])
  */
  return { querySearch, updateQuerySearch, debounceGetSuggestions, suggestions, updateSuggestions, loading, error }
}
