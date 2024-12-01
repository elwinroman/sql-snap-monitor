import { createContext, useState } from 'react'

export const SearchContext = createContext()

export function SearchProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState('')
  const [search, setSearch] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [favorites, setFavorites] = useState([])
  const [recents, setRecents] = useState([])

  const updateOpen = (state) => setOpen(state)
  const updateType = (type) => setType(type)
  const updateSearch = (search) => setSearch(search)

  // actualiza el estado de las sugerencias
  const updateSuggestions = (suggestions) => {
    if (suggestions.length === 0) setSuggestions([])
    setSuggestions(suggestions)
  }

  // actualiza el estado de la lista de búsquedas favoritas
  const updateFavorites = (favorites) => {
    if (favorites.length === 0) setSuggestions([])
    setSuggestions(favorites)
  }

  // elimina un elemento de la lista de favoritos
  const deleteFavorite = (id) => {
    console.log('eliminando favoritos')
    const newFavorites = [...favorites]
    const index = newFavorites.findIndex((element) => element === id)
    newFavorites.splice(index, 1)

    // api delete de favoritos
    setFavorites(newFavorites)
  }

  const addFavorite = (id, name) => {
    //
    const newFavorites = [...favorites]
    newFavorites.unshift({ id, name })

    // api añadir a favoritos
    setFavorites({ id, name })
  }

  // actualiza el estado de la lista de búsquedas recientes
  const updateRecents = (recents) => {
    if (recents.length === 0) setSuggestions([])
    setFavorites(recents)
  }

  // elimina un elemento de la lista de búsqueda recientes
  const deleteRecent = (id) => {
    const newRecents = [...recents]
    const index = newRecents.findIndex((element) => element === id)
    newRecents.splice(index, 1)

    // api delete recientes
    setRecents(newRecents)
  }

  // resetear los estados
  const reset = () => {
    setSearch('')
    setSuggestions([])
  }

  return (
    <SearchContext.Provider
      value={{
        open,
        updateOpen,
        type,
        updateType,
        search,
        updateSearch,
        suggestions,
        updateSuggestions,
        favorites,
        updateFavorites,
        deleteFavorite,
        addFavorite,
        recents,
        updateRecents,
        deleteRecent,
        reset,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
