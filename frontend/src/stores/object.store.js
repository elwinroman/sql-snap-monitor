import { create } from 'zustand'
import {
  getDefinition,
  getDescription,
  getObject,
} from '@/services/object.service'
import { JSONtoTextCode, resetObjectPropertiesTuNull } from '@/utilities'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useObjectStore = create(
  persist(
    (set, get) => ({
      // definición de objetos
      definitionObject: {
        id: null,
        name: null,
        type: null,
        typeDesc: null,
        schema: null,
        createDate: null,
        modifyDate: null,
      },
      definitionCode: null,
      definitionError: null,
      definitionObjectList: [],

      updateDefinitionObject: ({ object }) => {
        set({ definitionObject: object })
      },

      fetchDefinitionObject: async ({ name }) => {
        const res = await getObject({ name })
        const object = get().definitionObject

        if (res.error) {
          set({ definitionError: JSONtoTextCode({ json: res }) })
          set({ definitionObject: resetObjectPropertiesTuNull({ object }) })
          set({ definitionObjectList: [] })
          set({ definitionCode: null })
          return
        }

        if (res.meta.length > 1) {
          set({ definitionObjectList: res.objects })
          set({ definitionCode: null })
          set({ definitionObject: resetObjectPropertiesTuNull({ object }) })
          set({ definitionError: null })
          return
        }

        set({ definitionObject: res.objects[0] })
        set({ definitionError: null })
        set({ definitionObjectList: [] })
      },

      fetchDefinition: async () => {
        const object = get().definitionObject

        if (object.id === null) return

        const res = await getDefinition({ id: object.id })

        if (res.error) {
          set({ definitionError: JSONtoTextCode({ json: res }) })
          set({ definitionCode: null })
          set({ definitionObjectList: [] })
          return
        }

        set({ definitionCode: res.definition })
        set({ definitionError: null })
        set({ definitionObjectList: [] })
      },

      // descripción de objetos
      descriptionObject: {
        id: null,
        name: null,
        type: null,
        typeDesc: null,
        schema: null,
        createDate: null,
        modifyDate: null,
      },
      descriptionError: null,
      descriptionTableList: [],
      descriptionColumnList: [],
      descriptionObjectList: [],

      updateDescriptionObject: ({ object }) => {
        set({ descriptionObject: object })
      },

      fetchDescriptionObject: async ({ name }) => {
        const res = await getObject({ name })
        const object = get().descriptionObject

        if (res.error) {
          set({ descriptionError: JSONtoTextCode({ json: res }) })
          set({ descriptionObject: resetObjectPropertiesTuNull({ object }) })
          set({ descriptionObjectList: [] })
          set({ descriptionColumnList: [] })
          set({ descriptionTableList: [] })
          return
        }

        if (res.meta.length > 1) {
          set({ descriptionObjectList: res.objects })
          set({ descriptionObject: resetObjectPropertiesTuNull({ object }) })
          set({ descriptionError: null })
          set({ descriptionColumnList: [] })
          set({ descriptionTableList: [] })
          return
        }

        set({ descriptionObject: res.objects[0] })
        set({ descriptionError: null })
        set({ descriptionObjectList: [] })
      },

      fetchDescription: async () => {
        const object = get().descriptionObject

        if (object.id === null) return

        const res = await getDescription({ id: object.id })

        if (res.error) {
          set({ descriptionError: JSONtoTextCode({ json: res }) })
          set({ descriptionTableList: [] })
          set({ descriptionColumnList: [] })
          set({ descriptionObjectList: [] })
          return
        }
        set({ descriptionTableList: res.data.objectDescription })
        set({ descriptionColumnList: res.data.columnDescription })
        set({ descriptionError: null })
        set({ descriptionObjectList: [] })
      },

      // clearObjectStore: () => {
      //   set({ object: resetObjectPropertiesTuNull({ object: get().object }) })
      //   set({ definitionCode: null })
      //   set({ errorObject: null })
      //   set({ listObjects: [] })
      //   set({ listDescriptionTable: [] })
      //   set({ listDescriptionColumns: [] })
      // },
    }),
    {
      name: 'objects', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
