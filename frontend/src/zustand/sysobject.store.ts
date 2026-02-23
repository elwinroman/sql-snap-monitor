import { isAxiosError } from 'axios'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { FullSysObject, TypeViews, ViewMode } from '@/models/sysobject'
import { BearSysObjectState } from '@/models/zustand'
import { getProdSysObjectService, getSysObjectByIdService } from '@/services/sysobject.service'

const initialState: Pick<BearSysObjectState, 'viewMode' | 'sysobject' | 'prodSysobject'> = {
  viewMode: TypeViews.FullView,
  sysobject: null,
  prodSysobject: null,
}

export const useSysObjectStore = create<BearSysObjectState>()(
  persist(
    (set, get) => ({
      ...initialState,
      currentEditorCode: '',
      isLoadingObject: false,
      isLoadingProdObject: false,
      errorProdObject: null,

      fetchSysObject: async (id: number) => {
        set({ isLoadingObject: true })
        try {
          const { call } = getSysObjectByIdService(id)
          const response = await call
          // resetea el objeto de pre-producción al cambiar de objeto
          set({ sysobject: response.data, prodSysobject: null, errorProdObject: null })
        } catch (err) {
          console.error('Error al obtener el objeto: ', err)
        } finally {
          set({ isLoadingObject: false })
        }
      },

      fetchProdSysObject: async () => {
        const { sysobject, prodSysobject, errorProdObject } = get()
        if (!sysobject) return

        // si ya hay resultado (éxito o error), no repetir la llamada
        if (prodSysobject || errorProdObject) return

        set({ isLoadingProdObject: true })
        try {
          const { call } = getProdSysObjectService({
            name: sysobject.name,
            schema: sysobject.schemaName,
            actionType: 1,
          })
          const response = await call
          set({ prodSysobject: response.data })
        } catch (err) {
          if (isAxiosError(err) && err.response) {
            const { data } = err.response
            set({
              errorProdObject: {
                title: data.error?.title ?? 'Error desconocido',
                detail: data.error?.detail ?? 'Error desconocido',
              },
            })
          } else {
            set({
              errorProdObject: {
                title: 'Error de red',
                detail: 'No se pudo conectar al servidor o el servidor no está disponible.',
              },
            })
          }
        } finally {
          set({ isLoadingProdObject: false })
        }
      },

      createSysObject: (sysobject: FullSysObject | null) => set({ sysobject, prodSysobject: null, errorProdObject: null }),
      updateViewMode: (mode: ViewMode) => set({ viewMode: mode }),
      updateCurrentEditorCode: (code: string) => set({ currentEditorCode: code }),
      reset: () => {
        set({
          ...initialState,
          currentEditorCode: '',
          isLoadingObject: false,
          isLoadingProdObject: false,
          errorProdObject: null,
        })
      },
    }),
    {
      name: 'app.sysobject.session',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
