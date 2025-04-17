import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useConfigStore = create(
  persist(
    (set, get) => ({
      isMaximized: false,
      isDark: true,
      updateMaximized: (state) => set({ isMaximized: state }),
      updateDark: (state) => {
        const html = document.documentElement

        state ? html.classList.add('dark') : html.classList.remove('dark')

        set({ isDark: state })
      },

      // inicia el estado inicial de la configuración (isDark)
      initConfig: () => {
        const isDark = get().isDark
        const html = document.documentElement

        isDark ? html.classList.add('dark') : html.classList.remove('dark')
      },
    }),
    {
      name: 'config',
      storage: createJSONStorage(() => localStorage),

      // excluye de la persistencia, algunos estados del store
      partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => !['isMaximized'].includes(key))),

      // ejecuta cuando el estado se rehidrata desde localStorage (agrega la clase 'dark' si es necesario)
      onRehydrateStorage: () => (state) => {
        const html = document.documentElement
        if (state?.isDark) html.classList.add('dark')
        else html.classList.remove('dark')
      },
    },
  ),
)
