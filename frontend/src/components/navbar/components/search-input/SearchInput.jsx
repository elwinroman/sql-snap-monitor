import debounce from 'just-debounce-it'
import { Search } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'

import { InputWithIcon } from '@/components/ui/input-with-icon'
import { DEBOUNCE_DELAY } from '@/constants'
import { useSQLDefinitionStore, useUserTableStore } from '@/stores'

import { SuggestionSearchCard } from './components/SuggestionSearchCard'
import { useSearch, useSearchSuggestions } from './hooks'

export function SearchInput() {
  const loadingSqlDefinition = useSQLDefinitionStore((state) => state.loading)
  const loadingUsertable = useUserTableStore((state) => state.loading)

  const inputBtn = useRef()
  const suggestionRef = useRef(null)
  const [isFocus, setFocus] = useState(false)

  const { suggestions, updateSuggestions, getSuggestions } = useSearchSuggestions()
  const { search, updateSearch, find } = useSearch({ inputBtn, updateSuggestions })

  // Debounce para limitar la frecuencia de las sugerencias de búsqueda
  const debounceGetSuggestions = useCallback(
    debounce((search) => {
      getSuggestions({ search })
    }, DEBOUNCE_DELAY),
    [getSuggestions],
  )

  const handleKeyup = async (e) => {
    e.preventDefault()
    if (loadingSqlDefinition || loadingUsertable) return // si se está buscando un objeto, de deshabilita nueva búsqueda
    if (e.key === 'Enter') find()
  }

  const handleClick = async (e) => {
    e.preventDefault()
    if (loadingSqlDefinition || loadingUsertable) return // si se está buscando un objeto, de deshabilita nueva búsqueda
    find()
  }

  // Verifica si el clic está dentro de la card de sugerencias de búsqueda
  const handleBlur = (e) => {
    if (suggestionRef.current && !suggestionRef.current.contains(e.relatedTarget)) setFocus(false)
  }

  // cada vez que se tipea un caracter
  const handleChange = (e) => {
    const searchIn = e.target.value
    updateSearch(searchIn)
    debounceGetSuggestions(searchIn)
  }

  const updateFocus = (state) => {
    setFocus(state)
  }

  return (
    <div className="relative">
      <li>
        <InputWithIcon
          ref={inputBtn}
          size="default"
          value={search}
          endIcon={<Search size={22} />}
          placeholder="Search"
          onKeyUp={handleKeyup}
          onChange={handleChange}
          onFocus={() => setFocus(true)}
          onBlur={handleBlur}
          handleClick={handleClick}
          isFocus={isFocus}
          spellCheck="false"
          disabled={loadingSqlDefinition || loadingUsertable}
        />
      </li>
      {isFocus && suggestions.length > 0 && (
        <SuggestionSearchCard
          suggestions={suggestions}
          isFocus={isFocus}
          updateFocus={updateFocus}
          updateSearch={updateSearch}
          ref={suggestionRef}
        />
      )}
    </div>
  )
}
