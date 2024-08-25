import { create } from 'zustand'
import {
  getDefinition,
  getDescription,
  getObject,
} from '@/services/object.service'
import { persist, createJSONStorage } from 'zustand/middleware'
import {
  DefinitionInitialState,
  DescriptionInitialState,
  ObjectInitialState,
} from '@/models/object.model'

export const useObjectStore = create(
  persist(
    (set, get) => ({
      loading: false,

      // definición de objetos
      definitionObject: { ...ObjectInitialState },
      ...DefinitionInitialState,

      // updatea el objecto de definición cuando existen coincidencias
      updateDefinitionObject: ({ object }) => {
        set({ definitionObject: object })
      },

      fetchDefinitionObject: async ({ name }) => {
        set({ loading: true })

        const res = await getObject({ name })

        if (res.error) {
          set({ ...DefinitionInitialState })
          set({ definitionObject: { ...ObjectInitialState } })
          set({ definitionError: res })

          set({ loading: false })
          return
        }

        if (res.meta.length > 1) {
          set({ ...DefinitionInitialState })
          set({ definitionObject: { ...ObjectInitialState } })
          set({ definitionObjectList: res.objects })

          set({ loading: false })
          return
        }

        set({ ...DefinitionInitialState })
        set({ definitionObject: res.objects[0] })
        set({ loading: false })
      },

      fetchDefinition: async () => {
        const object = get().definitionObject

        if (object.id === null) return

        const res = await getDefinition({ id: object.id })

        if (res.error) {
          set({ ...DefinitionInitialState })
          set({ definitionError: res })
          return
        }

        set({ ...DefinitionInitialState })
        set({ definitionCode: res.definition })
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
        const res = await getObject({ name })

        if (res.error) {
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

        const res = await getDescription({ id: object.id })

        if (res.error) {
          set({ ...DescriptionInitialState })
          set({ descriptionError: res })
          return
        }

        set({ ...DescriptionInitialState })
        set({ descriptionTableList: res.data.objectDescription })
        set({ descriptionColumnList: res.data.columnDescription })
      },

      reset: () => {
        set({ definitionObject: { ...ObjectInitialState } })
        set({ descriptionObject: { ...ObjectInitialState } })
        set({ ...DefinitionInitialState })
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
