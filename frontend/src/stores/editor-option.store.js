import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useEditorStore = create(
  persist(
    (set) => ({
      // fontSize: 12,
      renderWhitespace: 'none',
      renderSideBySide: true,

      // ver roles y permisos al final del código
      hasRoles: true,

      // actualiza la visualización de las tabulaciones y espacios en blanco
      updateRenderWhitespace: (value) => set({ renderWhitespace: value }),

      // actualiza la visualización en diff editor, en paralelo o en línea
      updateRenderSideBySide: (state) => set({ renderSideBySide: state }),

      // actualiza la visualización de roles y permisos en el código
      updateRoles: (state) => set({ hasRoles: state }),
    }),
    {
      name: 'options',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
