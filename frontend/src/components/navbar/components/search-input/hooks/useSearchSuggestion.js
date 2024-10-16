import { useCallback, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { ROUTES, TYPE_SEARCH } from '@/constants'

import { getSearchSuggestions } from '../services/search.service.js'

export function useSearchSuggestions() {
  const [suggestions, setSuggestions] = useState([])
  const currentLocation = useLocation()

  const updateSuggestions = (state) => {
    setSuggestions(state)
  }

  const getSuggestions = useCallback(
    async ({ search }) => {
      const sanitizeSearch = search.trim()
      let type = null

      if (sanitizeSearch === '' || sanitizeSearch.length < 3) {
        await getSearchSuggestions({ search: 'ƒ', type: null })
        setSuggestions([])
        return
      }

      if (currentLocation.pathname === ROUTES.SQL_DEFINITION) type = TYPE_SEARCH.SQLDEFINITION
      else if (currentLocation.pathname === ROUTES.USERTABLE) type = TYPE_SEARCH.USERTABLE

      try {
        const { data } = await getSearchSuggestions({ search: sanitizeSearch, type })
        setSuggestions(data || [])
      } catch (err) {
        throw new Error(err)
      }
    },
    [currentLocation],
  )

  return { suggestions, updateSuggestions, getSuggestions }
}
