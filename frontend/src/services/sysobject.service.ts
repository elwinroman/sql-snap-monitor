import { createSysObjectAdapter, suggestionsAdapter } from '@/adapters'
import api from '@/interceptors/auth-token.interceptor'
import type { AxiosCall } from '@/models'
import type { FullSysObjectApiResponse, SysObjectSuggestionsApiResponse } from '@/models/api'
import type { ApiSysObjectType, FullSysObject, SysObjectSuggestion } from '@/models/sysobject'
import { loadAbort } from '@/utilities'

interface QuerySysObjectParams {
  name: string
  schema: string
  actionType: number
}

interface QuerySuggestionParams {
  name: string
  type: ApiSysObjectType
}

/** Obtiene objeto de producción mediante nombre, schema y el tipo de acción si es por recuperación (busqueda) o por comparación */
export const getProdSysObjectService = (queryParams: QuerySysObjectParams): AxiosCall<FullSysObject> => {
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

/** Obtiene las coincidencias de búsqueda (sugerencias) de objetos */
export const getSearchSuggestionsService = (queryParams: QuerySuggestionParams): AxiosCall<SysObjectSuggestion[]> => {
  const controller = loadAbort()

  const adapterCall = api
    .get<SysObjectSuggestionsApiResponse>('/sysobject/search', {
      signal: controller.signal,
      params: queryParams,
    })
    .then(async (response) => {
      return {
        ...response,
        data: suggestionsAdapter(response.data),
      }
    })

  return {
    call: adapterCall,
    controller,
  }
}
