import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { AligmentObjectInitialState } from '@/models/object.model'
import { SELECT_ACTION, VIEW_MODE } from '@/pages/Aligment/constants/select-actions'
import { getSQLDefinitionAligmentObject } from '@/services'

export const useAligmentStore = create(
  persist(
    (set, get) => ({
      search: '',
      action: SELECT_ACTION.objeto, // acción de recuperación
      viewMode: VIEW_MODE.objeto_mas_roles, // forma de ver el objeto recuperado
      object: { ...AligmentObjectInitialState },
      error: null,
      loading: null,

      // validation
      validate: true,
      validationError: '',

      updateSearch: ({ search }) => set({ search }),
      updateAction: ({ action }) => set({ action }),
      updateViewMode: ({ viewMode }) => set({ viewMode }),
      updateValidate: ({ state }) => set({ validate: state }),
      updateValidationError: ({ msg }) => set({ validationError: msg }),

      // Obtiene el objeto de definición
      getObject: async () => {
        const name = get().search
        const sanitizedName = name.trim()
        set({ loading: true })

        // por ahora, el esquema id de la consulta es 'dbo' por defecto
        const res = await getSQLDefinitionAligmentObject({ name: sanitizedName, schemaId: 1 })

        if (res.status === 'error') {
          set({ loading: false })
          set({ object: { ...AligmentObjectInitialState } })
          set({
            error: {
              statusCode: res.statusCode,
              message: res.message,
              originalError: res.originalError,
            },
          })

          return
        }

        set({ object: { ...res.data } })
        set({ loading: false })
        set({ error: null })
      },

      reset: () => {
        set({ object: { ...AligmentObjectInitialState } })
        set({ error: null })
      },
    }),
    {
      name: 'aligment', // nombre en el storage
      storage: createJSONStorage(() => sessionStorage),

      // excluye de la persistencia, algunos estados del store
      partialize: (state) =>
        Object.fromEntries(Object.entries(state).filter(([key]) => !['error', 'loading', 'validate', 'validationError'].includes(key))),
    },
  ),
)
