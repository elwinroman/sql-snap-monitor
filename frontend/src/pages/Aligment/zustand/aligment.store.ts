import { BearAligmentState } from '@aligment/models/bear-aligment-state.model'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { FullSysObject, TypeViews, ViewMode } from '@/models/sysobject'

const initialState: Pick<BearAligmentState, 'viewMode' | 'hideMenu' | 'sysobject'> = {
  viewMode: TypeViews.FullView,
  hideMenu: false,
  sysobject: null,
}

export const useAligmentStore = create<BearAligmentState>()(
  persist(
    (set) => ({
      ...initialState,
      currentEditorCode: '',

      createSysObject: (sysobject: FullSysObject | null) => set({ sysobject }),
      updateViewMode: (mode: ViewMode) => set({ viewMode: mode }),
      updateHideMenu: (state: boolean) => set({ hideMenu: state }),
      updateCurrentEditorCode: (code: string) => set({ currentEditorCode: code }),
      reset: () => {
        // TODO: resetear estados
      },
    }),
    {
      name: 'app.aligment.session', // nombre del storage
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
