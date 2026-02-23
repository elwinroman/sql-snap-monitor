import api from '@/interceptors/auth-token.interceptor'
import type { AxiosCall } from '@/models'
import type { ApiSysObjectType } from '@/models/sysobject'
import { loadAbort } from '@/utilities'

import { favoritoAdapter } from '../adapters/favorito.adapter'
import type { Favorito, FavoritoApiResponse, UpsertFavoritoBody } from '../models/favorito.model'

interface GetQueryParams {
  type: ApiSysObjectType
  limit: number
}

export const getFavoritosService = (queryParams: GetQueryParams): AxiosCall<Favorito[]> => {
  const controller = loadAbort()

  const adapterCall = api
    .get<FavoritoApiResponse>('/favorito', {
      signal: controller.signal,
      params: queryParams,
    })
    .then(async (response) => {
      return {
        ...response,
        data: favoritoAdapter(response.data),
      }
    })

  return {
    call: adapterCall,
    controller,
  }
}

export const upsertFavoritoService = (body: UpsertFavoritoBody): AxiosCall<{ message: string }> => {
  const controller = loadAbort()

  const call = api.put<{ message: string }>('/favorito/upsert', body, {
    signal: controller.signal,
  })

  return { call, controller }
}

export const deleteFavoritoService = (id: number): AxiosCall<{ data: { msg: string } }> => {
  const controller = loadAbort()

  const call = api.delete<{ data: { msg: string } }>(`/favorito/${id}`, {
    signal: controller.signal,
  })

  return { call, controller }
}
