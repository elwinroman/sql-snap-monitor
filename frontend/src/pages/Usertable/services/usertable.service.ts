import api from '@/interceptors/auth-token.interceptor'
import type { AxiosCall } from '@/models'
import { loadAbort } from '@/utilities'

import type { UserTableApiResponse } from '../models/usertable.model'

/** Obtiene la información de un usertable por su ID */
export const getUserTableByIdService = (id: number): AxiosCall<UserTableApiResponse> => {
  const controller = loadAbort()

  const call = api.get<UserTableApiResponse>(`/sysobject/usertable/${id}`, {
    signal: controller.signal,
  })

  return { call, controller }
}
