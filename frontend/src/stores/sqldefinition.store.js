import { create } from 'zustand'
import {
  findSQLDefinitionObject,
  getSQLDefinitionObject,
} from '@/services/object.service'
import { persist, createJSONStorage } from 'zustand/middleware'
import {
  ObjectInitialState,
  SQLDefinitionInitialState,
} from '@/models/object.model'

export const useSQLDefinitionStore = create(
  persist(
    (set, get) => ({
      loading: false,

      // definición de objetos
      SQLDefinitionObject: { ...ObjectInitialState },
      ...SQLDefinitionInitialState,

      // updatea el objecto de definición cuando existen coincidencias
      updateSQLDefinitionObject: ({ object }) => {
        set({ SQLDefinitionObject: object })
      },

      searchSQLDefinitionObject: async ({ name }) => {
        set({ loading: true })

        const res = await findSQLDefinitionObject({ name })

        if (res.status === 'error') {
          set({ ...SQLDefinitionInitialState })
          set({ SQLDefinitionObject: { ...ObjectInitialState } })
          set({
            SQLDefinitionError: {
              message: res.message,
              originalError: res.originalError,
            },
          })

          set({ loading: false })
          return
        }

        if (res.meta.length > 1) {
          set({ ...SQLDefinitionInitialState })
          set({ SQLDefinitionObject: { ...ObjectInitialState } })
          set({ SQLDefinitionObjectList: res.data })

          set({ loading: false })
          return
        }

        set({ ...SQLDefinitionInitialState })
        set({ SQLDefinitionObject: res.data[0] })
        set({ loading: false })
      },

      fetchSQLDefinition: async () => {
        const object = get().SQLDefinitionObject

        if (object.id === null) return

        const res = await getSQLDefinitionObject({ id: object.id })

        if (res.status === 'error') {
          set({ ...SQLDefinitionInitialState })
          set({
            SQLDefinitionError: {
              message: res.message,
              originalError: res.originalError,
            },
          })
          return
        }

        set({ ...SQLDefinitionInitialState })
        set({
          SQLDefinitionObject: {
            id: res.data.id,
            name: res.data.name,
            type: res.data.type,
            typeDesc: res.data.typeDesc,
            schema: res.data.schema,
            createDate: res.data.createDate,
            modifyDate: res.data.modifyDate,
          },
        })
        set({ SQLDefinitionCode: res.data.definition })
      },

      reset: () => {
        set({ SQLDefinitionObject: { ...ObjectInitialState } })
        set({ ...SQLDefinitionInitialState })
      },
    }),
    {
      name: 'sqldefinition', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      // skipHydration: true,

      // excluye de la persistencia, algunos estados del store
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !['SQLDefinitionError'].includes(key),
          ),
        ),
    },
  ),
)
