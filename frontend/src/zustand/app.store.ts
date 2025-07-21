import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { BearAppState } from '@/models/zustand'

const initialState: Pick<BearAppState, 'isDark'> = {
  isDark: true,
}

export const useAppStore = create<BearAppState>()(
  persist(
    (set) => ({
      ...initialState,

      updateDark: (state) => {
        const html = document.documentElement

        if (state) html.classList.add('dark')
        else html.classList.remove('dark')

        set({ isDark: state })
      },
    }),
    {
      name: 'app.global.settings',
      storage: createJSONStorage(() => localStorage),

      // ejecuta cuando el estado se rehidrata desde localStorage (agrega la clase 'dark' si es necesario)
      onRehydrateStorage: () => (state) => {
        const html = document.documentElement
        if (state?.isDark) html.classList.add('dark')
        else html.classList.remove('dark')
      },
    },
  ),
)
