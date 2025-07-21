import { createSysObjectAdapter } from '@/adapters'
import api from '@/interceptors/auth-token.interceptor'
import { AxiosCall } from '@/models'
import { FullSysObjectApiResponse } from '@/models/api'
import { FullSysObject } from '@/models/sysobject'
import { loadAbort } from '@/utilities'

interface QueryParams {
  name: string
  schema: string
  actionType: number
}

export const getProdSysObjectService = (queryParams: QueryParams): AxiosCall<FullSysObject> => {
  const controller = loadAbort()

  const adapterCall = api
    .get<FullSysObjectApiResponse>('/sysobject/prod', {
      signal: controller.signal,
      params: queryParams,
    })
    .then(async (response) => {
      return {
        ...response,
        data: createSysObjectAdapter(response.data),
      }
    })

  return {
    call: adapterCall,
    controller,
  }
}
