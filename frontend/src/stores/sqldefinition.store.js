import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { AligmentObjectInitialState, ObjectInitialState, SQLDefinitionInitialState } from '@/models/object.model'
import { getSQLDefinitionAligmentObject, getSQLDefinitionObject } from '@/services'
import { useDiffEditorStore } from '@/stores'

export const useSQLDefinitionStore = create(
  persist(
    (set, get) => ({
      loading: false, // indica si se está cargando la definición
      loadingAligment: false, // indica si se está cargando la definición de alineación
      errorAligment: null, // indica si hubo un error al obtener la definición de alineación
      updateErrorAligment: ({ state }) => {
        set({ errorAligment: state })
      },
      SQLDefinitionError: null, // error al obtener la definición
      updateSQLDefinitionError: ({ state }) => {
        set({ SQLDefinitionError: state })
      },

      hasAligmentObject: true, // indica si existe un objeto de alineación

      // definición de objetos
      SQLDefinitionObject: { ...ObjectInitialState },
      SQLDefinitionAligmentObject: { ...AligmentObjectInitialState },
      ...SQLDefinitionInitialState,

      // obtiene el objeto de definición de pre-producción
      getSQLDefinitionAligmentObject: async () => {
        const updateDiffEditor = useDiffEditorStore.getState().updateDiffEditor
        const { schemaName, name } = get().SQLDefinitionObject
        set({ loadingAligment: true })

        const res = await getSQLDefinitionAligmentObject({ name, schemaName, useCredentials: true, isComparisonMode: true })

        // error
        if (res.status === 'error') {
          set({ loadingAligment: false })
          set({
            errorAligment: {
              statusCode: res.statusCode,
              message: res.message,
              originalError: res.originalError,
            },
          })
          if (res.statusCode === 404) set({ hasAligmentObject: false })

          updateDiffEditor(false)
          return
        }

        // success
        set({ SQLDefinitionAligmentObject: { ...res.data } })
        set({ loadingAligment: false })
        set({ errorAligment: null })
        set({ SQLDefinitionError: null })
      },

      // obtener el objeto mediante su ID
      fetchSQLDefinition: async ({ id }) => {
        const updateDiffEditor = useDiffEditorStore.getState().updateDiffEditor
        set({ loading: true })

        const res = await getSQLDefinitionObject({ id })

        // error
        if (res.status === 'error') {
          set({ ...SQLDefinitionInitialState })
          set({
            SQLDefinitionError: {
              message: res.message,
              originalError: res.originalError,
            },
          })
          set({ loading: false })
          return
        }

        // success
        set({ hasAligmentObject: true })
        updateDiffEditor(false)
        set({ SQLDefinitionAligmentObject: { ...AligmentObjectInitialState } })
        set({
          SQLDefinitionObject: { ...res.data },
        })
        set({ ...AligmentObjectInitialState })
        set({ SQLDefinitionCode: res.data.definition })
        set({ loading: false })
      },

      reset: () => {
        set({ SQLDefinitionObject: { ...ObjectInitialState } })
        set({ SQLDefinitionAligmentObject: { ...AligmentObjectInitialState } })
        set({ ...SQLDefinitionInitialState })
        set({ errorAligment: null })
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
            ([key]) => !['SQLDefinitionError', 'errorAligment', 'loading', 'loadingAligment', 'hasAligmentObject'].includes(key),
          ),
        ),
    },
  ),
)
