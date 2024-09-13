import { create } from 'zustand'
import {
  findSQLDefinitionObject,
  findUserTable,
  getSQLDefinitionObject,
  getUserTable
} from '@/services/object.service'
import { persist, createJSONStorage } from 'zustand/middleware'
import {
  SQLDefinitionInitialState,
  DescriptionInitialState,
  ObjectInitialState,
} from '@/models/object.model'

export const useObjectStore = create(
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
          set({ SQLDefinitionError: { message: res.message, originalError: res.originalError } })

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
          set({ SQLDefinitionError: { message: res.message, originalError: res.originalError } })
          return
        }

        set({ ...SQLDefinitionInitialState })
        set({ SQLDefinitionCode: res.data.definition })
      },

      // descripción de objetos
      descriptionObject: { ...ObjectInitialState },
      ...DescriptionInitialState,

      // updatea el objecto de descripción cuando existen coincidencias
      updateDescriptionObject: ({ object }) => {
        set({ descriptionObject: object })
      },

      fetchDescriptionObject: async ({ name }) => {
        set({ loading: true })
        const res = await findUserTable({ name })

        if (res.status === 'error') {
          set({ ...DescriptionInitialState })
          set({ descriptionObject: { ...ObjectInitialState } })
          set({ descriptionError: res })

          set({ loading: false })
          return
        }

        if (res.meta.length > 1) {
          set({ ...DescriptionInitialState })
          set({ descriptionObject: { ...ObjectInitialState } })
          set({ descriptionObjectList: res.objects })
          set({ loading: false })
          return
        }

        set({ ...DescriptionInitialState })
        set({ descriptionObject: res.objects[0] })

        set({ loading: false })
      },

      fetchDescription: async () => {
        const object = get().descriptionObject
        if (object.id === null) return

        const res = await getUserTable({ id: object.id })

        if (res.status === 'error') {
          set({ ...DescriptionInitialState })
          set({ descriptionError: res })
          return
        }

        set({ ...DescriptionInitialState })
        set({ descriptionTableList: res.data.objectDescription })
        set({ descriptionColumnList: res.data.columnDescription })
      },

      reset: () => {
        set({ SQLDefinitionObject: { ...ObjectInitialState } })
        set({ descriptionObject: { ...ObjectInitialState } })
        set({ ...SQLDefinitionInitialState })
        set({ ...DescriptionInitialState })
      },
    }),
    {
      name: 'objects', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      // skipHydration: true,
    },
  ),
)
