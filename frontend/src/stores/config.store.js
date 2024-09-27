import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useConfigStore = create(
  persist(
    (set) => ({
      isMaximized: false,
      isDark: true,
      updateMaximized: (state) => set({ isMaximized: state }),
      updateDark: (state) => set({ isDark: state }),
    }),
    {
      name: 'config',
      storage: createJSONStorage(() => localStorage),

      // excluye de la persistencia, algunos estados del store
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !['isMaximized'].includes(key),
          ),
        ),
    },
  ),
)
