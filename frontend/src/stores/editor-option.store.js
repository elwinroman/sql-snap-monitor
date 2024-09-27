import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useEditorStore = create(
  persist(
    (set) => ({
      // fontSize: 12,
      renderWhitespace: 'none',
      renderSideBySide: true,

      // actualiza la visualización de las tabulaciones y espacios en blanco
      updateRenderWhitespace: (value) => set({ renderWhitespace: value }),

      // actualiza la visualización en diff editor, en paralelo o en línea
      updateRenderSideBySide: (state) => set({ renderSideBySide: state }),
    }),
    {
      name: 'options',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
