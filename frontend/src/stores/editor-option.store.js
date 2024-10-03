import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useEditorStore = create(
  persist(
    (set) => ({
      // fontSize: 12,
      renderWhitespace: 'none',
      renderSideBySide: true,

      hasRoles: true, // ver roles y permisos al final del código
      onDiffEditor: false, // activar o desactivar comparación de código

      updateRenderWhitespace: (value) => set({ renderWhitespace: value }),
      updateRenderSideBySide: (state) => set({ renderSideBySide: state }),
      updateRoles: (state) => set({ hasRoles: state }),
      updateDiffEditor: (state) => set({ onDiffEditor: state }),
    }),
    {
      name: 'options',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
