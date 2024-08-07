import { create } from 'zustand'
import { JSONtoTextCode } from '@/utilities'
import { login, logout } from '@/services/auth.service'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      username: null,
      database: null,
      errorAuth: null,

      /**
       * Login user
       * @param {Object} credentials - Credenciales sql del usuario (server, database, user, password)
       */
      loginUser: async ({ credentials }) => {
        const res = await login({ credentials })

        if (res.error) {
          set({ errorAuth: JSONtoTextCode({ json: res }) })
          set({ isAuthenticated: false })
          set({ username: null })
          set({ database: null })
          return
        }

        set({ isAuthenticated: true })
        set({ username: credentials.username })
        set({ database: credentials.database })
        set({ errorAuth: null })
      },

      // Logout user
      logoutUser: async () => {
        await logout()
        set({ isAuthenticated: false })
        set({ username: null })
        set({ database: null })
        set({ errorAuth: null })
      },
    }),
    {
      name: 'is-authenticated', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
