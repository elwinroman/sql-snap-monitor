import { useState } from 'react'

import useFetchAndLoad from '@/hooks/useFetchAndLoad'
import { ApiSysObjectType } from '@/models/sysobject'

import { BusquedaReciente } from '../models'
import { deleteBusquedaRecienteService, getBusquedasRecientesService } from '../services'

export const useRecents = (type: ApiSysObjectType) => {
  const [recents, setRecents] = useState<BusquedaReciente[]>([])
  const { callEndpoint, loading, error } = useFetchAndLoad<BusquedaReciente[]>()
  const { callEndpoint: callDeleteEndpoint } = useFetchAndLoad<{ msg: string }>()

  const getRecents = async () => {
    try {
      const response = await callEndpoint(getBusquedasRecientesService({ type, limit: 80 }))
      setRecents(response.data)
    } catch (err) {
      console.error('Error al obtener búsquedas recientes: ', err)
    }
  }

  const deleteRecent = async (id: string) => {
    try {
      await callDeleteEndpoint(deleteBusquedaRecienteService(id))
      setRecents((prev) => prev.filter((r) => r.id !== id))
    } catch (err) {
      console.error('Error al eliminar búsqueda reciente: ', err)
    }
  }

  return { getRecents, deleteRecent, recents, loading, error }
}
