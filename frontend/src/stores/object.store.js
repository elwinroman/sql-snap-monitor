import { create } from 'zustand'
import { getDefinition } from '@/services/definition.service'
import { getObject } from '@/services/object.service'
import { JSONtoTextCode, resetObjectPropertiesTuNull } from '@/utilities'

export const useObjectStore = create((set, get) => {
  return {
    object: {
      id: null,
      name: null,
      type: null,
      typeDesc: null,
      schema: null,
      createDate: null,
      modifyDate: null,
    },
    definitionCode: null,
    errorObject: null,
    listObjects: [],

    setDefinitionCode: (definitionCode) => {
      set({ definition: definitionCode })
    },

    setObjectError: (error) => {
      set({ errorObject: error })
    },

    setObject: ({ object }) => {
      set({ object })
    },

    fetchObject: async ({ name }) => {
      const res = await getObject({ name })
      const object = get().object

      if (res.error) {
        set({ errorObject: JSONtoTextCode({ json: res }) })
        set({ object: resetObjectPropertiesTuNull({ object }) })
        set({ listObjects: [] })
        set({ definitionCode: null })
        return
      }

      if (res.meta.length > 1) {
        set({ listObjects: res.objects })
        set({ definitionCode: null })
        set({ errorObject: null })
        return
      }

      set({ object: res.objects[0] })
      set({ errorObject: null })
      set({ listObjects: [] })
    },

    fetchDefinition: async () => {
      const object = get().object

      if (object.id === null) return

      const res = await getDefinition({ id: object.id })

      if (res.error) {
        set({ errorObject: JSONtoTextCode({ json: res }) })
        set({ definitionCode: null })
        set({ listObjects: [] })
        return
      }

      set({ definitionCode: res.definition })
      set({ errorObject: null })
      set({ listObjects: [] })
    },
  }
})
