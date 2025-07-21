import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { MAX_FONT_SIZE, MIN_FONT_SIZE } from '@/enviroment/enviroment'
import { BearEditorOptionsState } from '@/models/zustand'

const initialState: Pick<BearEditorOptionsState, 'fontSize' | 'renderWhitespace' | 'renderSideBySide' | 'theme'> = {
  fontSize: 13,
  renderWhitespace: 'none',
  renderSideBySide: true,
  theme: 'oceanicnext',
}

export const useEditorOptionsStore = create<BearEditorOptionsState>()(
  persist(
    (set) => ({
      ...initialState,

      updateFontSize: (size) => {
        if (size >= MIN_FONT_SIZE && size <= MAX_FONT_SIZE) set({ fontSize: size })
      },
      updateRenderWhitespace: (value) => set({ renderWhitespace: value }),
      updateRenderSideBySide: (state) => set({ renderSideBySide: state }),
      updateTheme: (theme) => set({ theme }),
    }),
    {
      name: 'editor-options',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
