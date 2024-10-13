import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { ROUTES } from '@/constants'
import { useSQLDefinition, useUsertable } from '@/hooks'

export function useSearch({ inputBtn, updateSuggestions }) {
  const { getSQLDefinitionObject } = useSQLDefinition()
  const { getUsertableObject } = useUsertable()

  const [search, setSearch] = useState('')
  const [previousSearch, updatePreviousSearch] = useState('')
  const currentLocation = useLocation()

  const find = async () => {
    const sanitizeSearch = search.trim()
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
    updateSuggestions([])
    inputBtn.current.focus()
    inputBtn.current.value = ''
  }, [currentLocation, inputBtn])

  return { search, updateSearch, find }
}
