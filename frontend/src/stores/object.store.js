import { create } from 'zustand'
import { getDefinition } from '@/services/definition.service'
import { getObject } from '@/services/object.service'

function toObjectNull({ object }) {
  return {
    id: null,
    name: null,
    type: null,
    typeDesc: null,
    schema: null,
    createDate: null,
    modifyDate: null,
  }
}
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

    fetchObject: async ({ name }) => {
      const res = await getObject({ name })
      const object = get().object

      if (res.error) {
        set({ errorObject: JSON.stringify(res.error) })
        set({ object: toObjectNull({ object }) })
        return
      }

      if (res.meta.length > 1) {
        set({ listObjects: res.objects })
        return
      }

      set({ object: res.objects[0] })
      set({ errorObject: null })
    },

    fetchDefinition: async () => {
      const object = get().object

      if (object.id === null) return

      const res = await getDefinition({ id: object.id })

      if (res.error) {
        set({ errorObject: JSON.stringify(res.error) })
        set({ definitionCode: null })
        return
      }

      set({ definitionCode: res.definition })
    },
  }
})
