import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { ROUTES } from '@/constants'
import { useSQLDefinition, useUsertable } from '@/hooks'

export function useSearch() {
  const { getSQLDefinitionObject } = useSQLDefinition()
  const { getUsertableObject } = useUsertable()

  const [search, setSearch] = useState('')
  const [previousSearch, updatePreviousSearch] = useState('')
  const currentLocation = useLocation()

  // acepta un argumento de las sugerencias si se quiere realizar la petición al ahcer click en la sugerencia
  const find = async ({ suggestionSearchTrigger = null } = {}) => {
    const sanitizeSearch = suggestionSearchTrigger == null ? search.trim() : suggestionSearchTrigger.trim()
    if (sanitizeSearch === '') return
    if (sanitizeSearch === previousSearch) return

    if (currentLocation.pathname === ROUTES.SQL_DEFINITION) await getSQLDefinitionObject({ name: sanitizeSearch })
    else if (currentLocation.pathname === ROUTES.USERTABLE) await getUsertableObject({ name: sanitizeSearch })

    updatePreviousSearch(sanitizeSearch)
  }

  const updateSearch = (search) => {
    setSearch(search)
  }

  // limpia el input y focus al cambiar de ruta
  useEffect(() => {
    setSearch('')
    updatePreviousSearch('')
  }, [currentLocation])

  return { search, updateSearch, find }
}
