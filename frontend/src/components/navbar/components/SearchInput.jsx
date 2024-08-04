import { InputWithIcon } from '@/components/ui/input-with-icon'
import { Search as SearchIcon } from '@/icons/search'
import { useDefinition } from '@/hooks/useDefinition'
import { useLocation } from 'react-router-dom'
// import { useObjectStore } from '@/stores/object.store'
import { useEffect, useRef } from 'react'

export function SearchInput() {
  const { getDefinitionObject } = useDefinition()
  // const object = useObjectStore((state) => state.object)
  const currentLocation = useLocation()
  const inputBtn = useRef()
  const inputValue = useRef('')

  const handleKeyup = async (e) => {
    e.preventDefault()
    const value = e.target.value.trim()
    if (value === '') return
    if (value.toLowerCase() === inputValue.current.toLocaleLowerCase()) return

    if (e.key === 'Enter') {
      inputValue.current = value
      if (currentLocation.pathname === '/definition') {
        await getDefinitionObject({ name: value })
      }
      // else if (currentLocation.pathname === '/description')
      //   await getDescriptionObject({ name: value })
    }
  }

  // limpia el input y focus al cambiar de ruta
  useEffect(() => {
    inputBtn.current.focus()
    inputBtn.current.value = ''
    inputValue.current = ''
  }, [currentLocation])

  return (
    <li>
      <InputWithIcon
        ref={inputBtn}
        size="default"
        startIcon={<SearchIcon width={20} height={20} />}
        placeholder="Search"
        onKeyUp={handleKeyup}
        disabled={
          // disponible solo para obtener definiciones y descripciones
          currentLocation.pathname !== '/definition' &&
          currentLocation.pathname !== '/description'
        }
        endBadge={<span>ENTER</span>}
      />
    </li>
  )
}
