import { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { ROUTES, TYPE_ACTION } from '@/constants'
import {
  eliminarBusquedaReciente,
  eliminarFavorito,
  eliminarTodoBusquedasRecientes,
  obtenerBusquedasRecientes,
  obtenerFavoritos,
  registrarBusquedaReciente,
  registrarFavorito,
} from '@/services'

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
    // inicializar algunos estados
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

    // obtener las búsquedas recientes
    const fetchRecentSearch = async () => {
      const type = currentLocation.pathname === ROUTES.SQL_DEFINITION ? TYPE_ACTION.sqldefinition.id : TYPE_ACTION.usertable.id
      const limit = 50 // solo se recuperará los 50 primeros resultados (rendimiento)

      try {
        const res = await obtenerBusquedasRecientes({ idTipoAccion: type, start: 0, limit })
        if (res.status === 'error' && res.statusCode === 404) setRecents([])
        else setRecents(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    // obtener las búsquedas favoritas
    const fetchFavorites = async () => {
      const type = currentLocation.pathname === ROUTES.SQL_DEFINITION ? TYPE_ACTION.sqldefinition.id : TYPE_ACTION.usertable.id

      try {
        const res = await obtenerFavoritos({ idTipoAccion: type })
        if (res.status === 'error' && res.statusCode === 404) setFavorites([])
        else {
          const dataFormatted = res.data.map((obj) => ({ ...obj, lFavorito: true })) // a la lista de favoritos, agrega un flag lFavorito = truem para mantener a nivel visual el icono de favoritos filled cuando se realiza la búsqueda
          setFavorites(dataFormatted)
        }
      } catch (err) {
        console.error(err)
      }
    }

    initTypes()
    fetchRecentSearch()
    fetchFavorites()
  }, [currentLocation])

  const updateOpen = (state) => setOpen(state)
  const updateSearch = (search) => setSearch(search)

  // actualiza el estado de las sugerencias
  const updateSuggestions = (suggestions) => {
    if (suggestions.length === 0) setSuggestions([])
    setSuggestions(suggestions)
  }

  // elimina un elemento de la lista de favoritos
  const deleteFavorite = (id) => {
    const newFavorites = [...favorites]
    const index = newFavorites.findIndex((element) => element.id === id)
    const objectId = newFavorites[index].objectId

    newFavorites.splice(index, 1)

    eliminarFavorito({ id })
    setFavorites(newFavorites)

    // actualizar las búsquedas recientes a nivel visual (star icon)
    const newRecents = [...recents]
    const indexOnRecent = newRecents.findIndex((element) => element.objectId === objectId)
    if (indexOnRecent !== -1) newRecents[indexOnRecent].lFavorito = false
    setRecents(newRecents)
  }

  const addFavorite = async ({ idTipoAccion, cSchema, cNombreObjeto }) => {
    const newFavorites = [...favorites]

    // generar un ID temporal para la actualización optimista (OPTIMISTIC UI)
    const tempId = `temp-${Date.now()}`

    // crear una nueva lista de favoritos con el nuevo elemento optimista
    const temporalFavorite = {
      id: tempId, // ID temporal
      objectId: null,
      cSchema,
      cNombreObjeto,
    }

    // buscar si existe el objeto en el estado
    const index = newFavorites.findIndex((element) => element.cSchema === cSchema && element.cNombreObjeto === cNombreObjeto)

    // si existe, se elimina de su posición actual y se inserta el objeto en la primera fila, sino solo se agrega el objeto en la primera fila
    if (index !== -1) newFavorites.splice(index, 1)
    newFavorites.unshift(temporalFavorite)

    setFavorites(newFavorites)

    try {
      // registrar favorito en la BD
      const res = await registrarFavorito({
        idTipoAccion,
        cSchema,
        cNombreObjeto,
      })

      // buscar y reemplazar el objeto con ID temporal por el ID real
      const updatedFavorites = newFavorites.map((fav) =>
        fav.id === tempId
          ? {
              id: res.data.id, // ID real recibido de la API
              objectId: res.data.objectId,
              cSchema: res.data.cSchema,
              cNombreObjeto: res.data.cNombreObjeto,
            }
          : fav,
      )

      // actualizar el estado local con el id object_id real
      setFavorites(updatedFavorites)
    } catch (err) {
      console.error(err)

      // revertir el estado si ocurre un error
      setFavorites(favorites)
    }
  }

  const addRecents = async (recentSearch, idType) => {
    const newRecents = [...recents]

    const data = {
      idTipoAccion: idType,
      cSchema: recentSearch.cSchema,
      cNombreObjeto: recentSearch.cNombreObjeto,
      lFavorito: recentSearch.lFavorito,
    }

    // registrar en la bd (este gestiona si actualizar o insertar)
    try {
      const res = await registrarBusquedaReciente({
        idTipoAccion: data.idTipoAccion,
        cSchema: data.cSchema,
        cNombreObjeto: data.cNombreObjeto,
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
        lFavorito: data.lFavorito, // mantener el icono favorito a nivel visual
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
        deleteFavorite,
        addFavorite,
        recents,
        addRecents,
        deleteRecent,
        deleteAllRecents,
        reset,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
