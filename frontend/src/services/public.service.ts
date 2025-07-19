import axios from 'axios'

import { AuthenticatedUserApiResponse } from '@/models/api/authenticated-user-api-response.model'
import { Credential } from '@/models/credential.model'
import { loadAbort } from '@/utilities/load-abort-axios.util'

export const loginService = (credential: Credential) => {
  const controller = loadAbort()

  const adapterCredential = {
    host: credential.server,
    database: credential.dbname,
    user: credential.username,
    password: credential.password,
  }

  return {
    call: axios.post<AuthenticatedUserApiResponse>('http://192.168.1.68:3000/api/v1/auth/login', adapterCredential, {
      signal: controller.signal,
    }),
    controller,
  }
}

// export const logoutService = async () => {
//   const controller = loadAbort()
//   const response = await axios.post('https://', { signal: controller.signal })
//   return response
// }
