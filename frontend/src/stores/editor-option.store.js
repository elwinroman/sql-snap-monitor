import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { EDITOR_OPTIONS } from '@/constants'

export const useEditorStore = create(
  persist(
    (set, get) => ({
      fontSize: 13,
      renderWhitespace: 'none',
      renderSideBySide: true,
      theme: 'oceanicnext',

      hasRoles: true, // ver roles y permisos al final del código
      // onDiffEditor: false, // activar o desactivar comparación de código

      updateFontSize: (size) => {
        if (size >= EDITOR_OPTIONS.MIN_FONT_SIZE && size <= EDITOR_OPTIONS.MAX_FONT_SIZE) set({ fontSize: size })
      },
      updateRenderWhitespace: (value) => set({ renderWhitespace: value }),
      updateRenderSideBySide: (state) => set({ renderSideBySide: state }),
      updateRoles: (state) => set({ hasRoles: state }),
      // updateDiffEditor: (state) => set({ onDiffEditor: state }),
      updateTheme: (themeName) => set({ theme: themeName }),
    }),
    {
      name: 'options',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const useDiffEditorStore = create(
  persist(
    (set) => ({
      onDiffEditor: false, //  activar o desactivar comparación de código

      updateDiffEditor: (state) => set({ onDiffEditor: state }),
    }),
    {
      name: 'diffEditor',
      storage: createJSONStorage(() => sessionStorage), // Almacena en sessionStorage
    },
  ),
)
