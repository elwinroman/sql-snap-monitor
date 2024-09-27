import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { checkSession, login, logout } from '@/services/auth.service'

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      isSessionExpired: false,
      username: null,
      dbname: null,
      errorAuth: null,

      /**
       * Login user
       * @param {Object} credentials - Credenciales sql del usuario (server, database, user, password)
       */
      loginUser: async ({ credentials }) => {
        const res = await login({ credentials })

        if (res.status === 'error') {
          set({ errorAuth: res })
          set({ isAuthenticated: false })
          set({ username: null })
          set({ dbname: null })
          return
        }

        set({ isAuthenticated: true })
        set({ username: credentials.username })
        set({ dbname: credentials.dbname })
        set({ errorAuth: null })
      },

      // Logout user
      logoutUser: async () => {
        await logout()
        set({ isAuthenticated: false })
        set({ username: null })
        set({ dbname: null })
        set({ errorAuth: null })
      },

      // Comprueba la conexión del usuario (cookie expired)
      checkSession: async () => {
        const res = await checkSession()
        // Unauthorized
        if (res.status === 'error') set({ isSessionExpired: true })
      },

      // Clear auth store
      clearAuthStore: () => {
        set({ isAuthenticated: false })
        set({ username: null })
        set({ dbname: null })
        set({ errorAuth: null })
        set({ isSessionExpired: false })
      },
    }),
    {
      name: 'is-authenticated', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used

      // excluye de la persistencia, algunos estados del store
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !['errorAuth'].includes(key)),
        ),
    },
  ),
)
