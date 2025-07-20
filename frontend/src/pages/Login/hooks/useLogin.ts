import useFetchAndLoad from '@/hooks/useFetchAndLoad'
import { Credential } from '@/models'
import { AuthenticatedUser } from '@/models/auth'
import { loginService } from '@/services'
import { useAuthStore } from '@/zustand'

import { createSessionAdapter } from '../adapters/create-session.adapter'

export const useLogin = () => {
  const { callEndpoint, loading, error } = useFetchAndLoad<AuthenticatedUser>()
  const createSession = useAuthStore((state) => state.createSession)

  const login = async (credential: Credential) => {
    const response = await callEndpoint(loginService(credential))

    const userAuthenticated = response.data
    createSession(createSessionAdapter(userAuthenticated), userAuthenticated.token)
  }

  return { loading, error, login }
}
