import api from '@/interceptors/auth-token.interceptor'
import { AxiosCall } from '@/models'
import { ApiSysObjectType } from '@/models/sysobject'
import { loadAbort } from '@/utilities'

import { busquedaRecienteAdapter } from '../adapters'
import { BusquedaReciente, BusquedaRecienteApiResponse } from '../models'

interface QueryParams {
  type: ApiSysObjectType
  limit: number
}

export const getBusquedasRecientesService = (queryParams: QueryParams): AxiosCall<BusquedaReciente[]> => {
  const controller = loadAbort()

  const adapterCall = api
    .get<BusquedaRecienteApiResponse>('/busqueda-reciente', {
      signal: controller.signal,
      params: queryParams,
    })
    .then(async (response) => {
      return {
        ...response,
        data: busquedaRecienteAdapter(response.data),
      }
    })

  return {
    call: adapterCall,
    controller,
  }
}
