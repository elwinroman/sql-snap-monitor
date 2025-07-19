import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

import { AuthContext } from '@/models/auth-context.model'

const initialState = {
  authContext: null,
  accessToken: null,
  errorApiConnection: false,
}

export const useAuthStore = create<any>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        createSession: (payload: AuthContext, token: string) => {
          set({
            authContext: payload,
            accessToken: token,
          })
        },

        clearSession: () => {
          set({ ...initialState })
        },

        updateErrorApiConnection: (state: boolean) => {
          set({ errorApiConnection: state })
        },
      }),
      {
        name: 'is-authenticated',
        storage: createJSONStorage(() => localStorage),

        partialize: (state) => {
          const { errorApiConnection, ...persisted } = state
          return persisted
        },
      },
    ),
  ),
)
