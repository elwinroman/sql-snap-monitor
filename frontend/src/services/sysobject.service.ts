import { createSysObjectAdapter, suggestionsAdapter } from '@/adapters'
import api from '@/interceptors/auth-token.interceptor'
import { AxiosCall } from '@/models'
import { FullSysObjectApiResponse, SysObjectSuggestionsApiResponse } from '@/models/api'
import { ApiSysObjectType, FullSysObject, SysObjectSuggestion } from '@/models/sysobject'
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

/** Obtiene un objeto de tipo SQL Definition por ID */
export const getSysObjectByIdService = (id: number): AxiosCall<FullSysObject> => {
  const controller = loadAbort()

  const adapterCall = api
    .get<FullSysObjectApiResponse>(`/sysobject/${id}`, {
      signal: controller.signal,
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
