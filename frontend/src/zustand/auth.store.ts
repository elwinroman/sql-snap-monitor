import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

import { AuthContext } from '@/models'
import { BearAuthState } from '@/models/zustand'

const initialState: Pick<BearAuthState, 'authContext' | 'token' | 'errorApiConnection'> = {
  authContext: null,
  token: null,
  errorApiConnection: false,
}

export const useAuthStore = create<BearAuthState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        createSession: (payload: AuthContext, token: string): void => {
          set({
            authContext: payload,
            token: token,
          })
        },

        clearSession: (): void => set({ ...initialState }),
        updateToken: (token: string): void => set({ token: token }),
        updateErrorApiConnection: (state: boolean): void => set({ errorApiConnection: state }),
      }),
      {
        name: 'app.auth.local',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => !['errorApiConnection'].includes(key))),
      },
    ),
  ),
)

// authStore selector
export const getAccessToken = () => useAuthStore.getState().token
export const setAccessToken = (token: string) => {
  useAuthStore.getState().updateToken(token)
}
export const getClearSession = () => useAuthStore.getState().clearSession()
