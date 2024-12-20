import { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { ROUTES, TYPE_ACTION } from '@/constants'
import { eliminarBusquedaReciente, eliminarTodoBusquedasRecientes, obtenerBusquedasRecientes, registrarBusquedaReciente } from '@/services'

export const SearchContext = createContext()

export function SearchProvider({ children }) {
  const currentLocation = useLocation()
  const [open, setOpen] = useState(false)
  const [type, setType] = useState({
    id: -1,
    name: '',
  })
  const [search, setSearch] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [favorites, setFavorites] = useState([])
  const [recents, setRecents] = useState([])

  // obtener las búsquedas recientes y favoritos
  useEffect(() => {
    const initTypes = () => {
      const type = {
        id: -1,
        name: '',
      }
      if (currentLocation.pathname === ROUTES.SQL_DEFINITION) {
        type.id = TYPE_ACTION.sqldefinition.id
        type.name = TYPE_ACTION.sqldefinition.name
      }
      if (currentLocation.pathname === ROUTES.USERTABLE) {
        type.id = TYPE_ACTION.usertable.id
        type.name = TYPE_ACTION.usertable.name
      }

      setType(type)
    }

    const fetchRecentSearch = async () => {
      const type = currentLocation.pathname === ROUTES.SQL_DEFINITION ? TYPE_ACTION.sqldefinition.id : TYPE_ACTION.usertable.id
      const limit = 50 // solo se recuperará los 50 primeros resultados (rendimiento)

      try {
        const res = await obtenerBusquedasRecientes({ idTipoAccion: type, start: 0, limit })
        if (res.status === 'error' && res.statusCode === 404) setRecents([])
        else setRecents(res.data)
      } catch (error) {
        console.error('Error en el fetching:', error)
      }
    }

    initTypes()
    fetchRecentSearch()
  }, [currentLocation])

  const updateOpen = (state) => setOpen(state)
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

  const addRecents = async ({ idTipoAccion, cSchema, cNombreObjeto }) => {
    const newRecents = [...recents]

    // registrar en la bd (este gestiona si actualizar o insertar)
    try {
      const res = await registrarBusquedaReciente({
        idTipoAccion,
        cSchema,
        cNombreObjeto,
      })

      // buscar si existe en el estado mediante el object_id
      const index = newRecents.findIndex((element) => element.id === res.data.id)

      // si existe, se elimina de su posición actual y se inserta el objeto en la primera fila, sino solo se agrega el objeto en la primera fila
      if (index !== -1) newRecents.splice(index, 1)

      newRecents.unshift({
        id: res.data.id,
        objectId: res.data.objectId,
        cSchema: res.data.cSchema,
        cNombreObjeto: res.data.cNombreObjeto,
      })

      setRecents(newRecents)
    } catch (err) {
      console.error(err)
    }
  }

  // elimina un elemento de la lista de búsqueda recientes
  const deleteRecent = (id) => {
    const newRecents = [...recents]
    const index = newRecents.findIndex((element) => element.id === id)
    newRecents.splice(index, 1)

    eliminarBusquedaReciente({ id })
    setRecents(newRecents)
  }

  // elimina todas las búsquedas recientes
  const deleteAllRecents = () => {
    eliminarTodoBusquedasRecientes({ idTipoAccion: type.id })

    setRecents([])
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
        search,
        updateSearch,
        suggestions,
        updateSuggestions,
        favorites,
        updateFavorites,
        deleteFavorite,
        addFavorite,
        recents,
        addRecents,
        updateRecents,
        deleteRecent,
        deleteAllRecents,
        reset,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
