import { useState } from 'react'

import useFetchAndLoad from '@/hooks/useFetchAndLoad'
import { ApiSysObjectType } from '@/models/sysobject'

import { BusquedaReciente } from '../models'
import { getBusquedasRecientesService } from '../services'

export const useRecents = (type: ApiSysObjectType) => {
  const [recents, setRecents] = useState<BusquedaReciente[]>([])
  const { callEndpoint, loading, error } = useFetchAndLoad<BusquedaReciente[]>()

  const getRecents = async () => {
    try {
      const response = await callEndpoint(getBusquedasRecientesService({ type, limit: 50 }))
      setRecents(response.data)
    } catch (err) {
      console.error('Error al obtener búsquedas recientes: ', err)
    }
  }

  return { getRecents, recents, loading, error }
}
