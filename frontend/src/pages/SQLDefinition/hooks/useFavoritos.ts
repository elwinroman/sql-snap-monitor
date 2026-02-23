import { useState } from 'react'

import useFetchAndLoad from '@/hooks/useFetchAndLoad'

import type { Favorito } from '../models/favorito.model'
import { deleteFavoritoService, getFavoritosService, upsertFavoritoService } from '../services/favorito.service'

export const useFavoritos = () => {
  const [favoritos, setFavoritos] = useState<Favorito[]>([])
  const { callEndpoint, loading } = useFetchAndLoad<Favorito[]>()
  const { callEndpoint: callUpsertEndpoint } = useFetchAndLoad<{ message: string }>()
  const { callEndpoint: callDeleteEndpoint } = useFetchAndLoad<{ data: { msg: string } }>()

  const getFavoritos = async () => {
    try {
      const response = await callEndpoint(getFavoritosService({ type: 'ALL_EXCEPT_USERTABLE', limit: 80 }))
      setFavoritos(response.data)
    } catch (err) {
      console.error('Error al obtener favoritos: ', err)
    }
  }

  const upsertFavorito = async (schema: string, objectName: string, type: string) => {
    try {
      await callUpsertEndpoint(upsertFavoritoService({ schema, objectName, type }))
      await getFavoritos()
    } catch (err) {
      console.error('Error al registrar favorito: ', err)
    }
  }

  const deleteFavorito = async (id: number) => {
    try {
      await callDeleteEndpoint(deleteFavoritoService(id))
      setFavoritos((prev) => prev.filter((f) => f.id !== id))
    } catch (err) {
      console.error('Error al eliminar favorito: ', err)
    }
  }

  const isFavorito = (objectName: string, schema: string): Favorito | undefined => {
    return favoritos.find((f) => f.objectName === objectName && f.schema === schema)
  }

  return { favoritos, getFavoritos, upsertFavorito, deleteFavorito, isFavorito, loading }
}
