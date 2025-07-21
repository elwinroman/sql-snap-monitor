import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { FullSysObject, TypeViews, ViewMode } from '@/models/sysobject'
import { BearAligmentState } from '@/models/zustand'

const initialState: Pick<BearAligmentState, 'viewMode' | 'hideMenu' | 'sysobject'> = {
  viewMode: TypeViews.FullView,
  hideMenu: false,
  sysobject: null,
}

export const useAligmentStore = create<BearAligmentState>()(
  persist(
    (set) => ({
      ...initialState,

      createSysObject: (sysobject: FullSysObject | null) => set({ sysobject }),
      updateViewMode: (mode: ViewMode) => set({ viewMode: mode }),
      updateHideMenu: (state: boolean) => set({ hideMenu: state }),
      reset: () => {
        // TODO: resetear estados
      },
    }),
    {
      name: 'aligment', // nombre del storage
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
