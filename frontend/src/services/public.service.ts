import api from '@/interceptors/auth-token.interceptor'
import { AxiosCall, Credential } from '@/models'
import { AuthenticatedUserApiResponse, CheckSessionApiResponse } from '@/models/api'
import { AuthenticatedUser } from '@/models/auth'
import { loadAbort } from '@/utilities'

import { checkSessionAdapter, CheckSessionResponse, createAuthenticatedUserAdapter } from './adapters'

export const loginService = (credential: Credential): AxiosCall<AuthenticatedUser> => {
  const controller = loadAbort()

  const adapterCredential = {
    host: credential.server,
    database: credential.dbname,
    user: credential.username,
    password: credential.password,
  }

  const adapterCall = api
    .post<AuthenticatedUserApiResponse>('/auth/login', adapterCredential, {
      signal: controller.signal,
      withCredentials: true,
    })
    .then((response) => {
      return {
        ...response,
        data: createAuthenticatedUserAdapter(response.data),
      }
    })

  return {
    call: adapterCall,
    controller,
  }
}

export const logoutService = (): AxiosCall<void> => {
  const controller = loadAbort()

  return {
    call: api.post(
      '/auth/logout',
      {}, // body vacío
      {
        signal: controller.signal,
        withCredentials: true, // true: para enviar la cookie en el payload
      },
    ),
    controller,
  }
}

export const checkSessionService = (): AxiosCall<CheckSessionResponse> => {
  const controller = loadAbort()

  const adapterCall = api
    .get<CheckSessionApiResponse>('/auth/check-session', {
      signal: controller.signal,
    })
    .then((response) => {
      return {
        ...response,
        data: checkSessionAdapter(response.data),
      }
    })

  return {
    call: adapterCall,
    controller,
  }
}
