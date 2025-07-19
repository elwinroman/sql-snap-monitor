import useFetchAndLoad from '@/hooks/useFetchAndLoad'
import { AuthenticatedUserApiResponse } from '@/models/api/authenticated-user-api-response.model'
import { Credential } from '@/models/credential.model'
import { loginService } from '@/services/public.service'
import { useAuthStore } from '@/zustand/auth.store'

import { createSessionAdapter } from '../adapters/create-session.adapter'

export const useLogin = () => {
  const { callEndpoint, loading, error } = useFetchAndLoad<AuthenticatedUserApiResponse>()
  const createSession = useAuthStore((state) => state.createSession)

  const login = async (credential: Credential) => {
    const response = await callEndpoint(loginService(credential))

    const userAuthenticated = response.data
    await createSession(createSessionAdapter(userAuthenticated), userAuthenticated.data.token.accessToken)
  }

  return { loading, error, login }
}
