import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { InputWithIcon } from '@/components/ui/input-with-icon'
import { ROUTES } from '@/constants'
import { useSQLDefinition, useUsertable } from '@/hooks'
import { Search as SearchIcon } from '@/icons/search'

function useSearch({ inputBtn }) {
  const { getSQLDefinitionObject } = useSQLDefinition()
  const { getUsertableObject } = useUsertable()

  const [search, updateSearch] = useState('')
  const [previousSearch, updatePreviousSearch] = useState('')
  const currentLocation = useLocation()

  const find = async () => {
    if (search === '') return
    if (search === previousSearch) return

    if (currentLocation.pathname === ROUTES.SQL_DEFINITION) await getSQLDefinitionObject({ name: search })
    else if (currentLocation.pathname === ROUTES.USERTABLE) await getUsertableObject({ name: search })

    updatePreviousSearch(search)
  }

  // limpia el input y focus al cambiar de ruta
  useEffect(() => {
    updateSearch('')
    updatePreviousSearch('')
    inputBtn.current.focus()
    inputBtn.current.value = ''
  }, [currentLocation, inputBtn])

  return { search, updateSearch, find }
}

export function SearchInput() {
  const inputBtn = useRef()
  const { updateSearch, find } = useSearch({ inputBtn })

  const handleKeyup = async (e) => {
    e.preventDefault()
    if (e.key === 'Enter') find()
  }

  const handleClick = async (e) => {
    e.preventDefault()
    find()
  }

  const handleChange = (e) => {
    updateSearch(e.target.value.trim())
  }

  return (
    <li>
      <InputWithIcon
        ref={inputBtn}
        size="default"
        endIcon={<SearchIcon width={22} height={22} />}
        placeholder="Search"
        onKeyUp={handleKeyup}
        onChange={handleChange}
        handleClick={handleClick}
      />
    </li>
  )
}
