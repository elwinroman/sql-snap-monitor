import { AuthContext } from '@/models'

export interface BearAuthState {
  authContext: AuthContext | null
  token: string | null
  errorApiConnection: boolean

  createSession: (payload: AuthContext, token: string) => void
  clearSession: () => void

  updateToken: (token: string) => void
  updateErrorApiConnection: (state: boolean) => void
}
