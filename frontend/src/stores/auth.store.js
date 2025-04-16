import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { checkSession, login, logout } from '@/services'

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      isSessionExpired: false,
      username: null,
      dbname: null,
      dbprodName: null,
      server: null,
      errorAuth: null,
      errorViewDefinition: null,
      errorApiConection: false, // API connection error (505)

      updateErrorViewDefinition: (state) => {
        set({ errorViewDefinition: state })
      },

      updateErrorApiConection: (state) => {
        set({ errorApiConection: state })
      },

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
          set({ dbprodName: null })
          set({ server: null })
          return
        }

        set({ isAuthenticated: true })
        set({ username: credentials.username })
        set({ dbname: res.data.name })
        set({ dbprodName: res.data.dbprod_name })
        set({ server: res.data.server })
        set({ errorAuth: null })
      },

      // Logout user
      logoutUser: async () => {
        await logout()
        set({ isAuthenticated: false })
        set({ username: null })
        set({ dbname: null })
        set({ dbprodName: null })
        set({ server: null })
        set({ errorAuth: null })
      },

      // Comprueba la conexión del usuario
      checkSession: async () => {
        try {
          const res = await checkSession()
          // Token expirado
          if (res.status === 'error') {
            set({ isSessionExpired: true })
            return
          }

          // si el usuario no tiene permisos de VIEWDEFINITION
          if (!res.data.viewdefinition_permission) set({ errorViewDefinition: true })
          else set({ errorViewDefinition: null })
        } catch (err) {
          set({ errorApiConection: true })
        }
      },

      // Clear auth store
      reset: () => {
        set({ isAuthenticated: false })
        set({ username: null })
        set({ dbname: null })
        set({ dbprodName: null })
        set({ server: null })
        set({ errorAuth: null })
        set({ errorViewDefinition: null })
        set({ isSessionExpired: false })
      },
    }),
    {
      name: 'is-authenticated', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used

      // excluye de la persistencia, algunos estados del store
      partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => !['errorAuth', 'errorApiConection'].includes(key))),
    },
  ),
)
