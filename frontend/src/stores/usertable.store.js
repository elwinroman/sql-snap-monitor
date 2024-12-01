import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { ObjectInitialState, UserTableInitialState } from '@/models/object.model'
import { getUserTable } from '@/services'

export const useUserTableStore = create(
  persist(
    (set, get) => ({
      loading: false,
      userTableError: null,
      updateUsertableError: ({ state }) => {
        set({ userTableError: state })
      },

      // descripción de objetos
      userTableObject: { ...ObjectInitialState },
      ...UserTableInitialState,

      // updatea el objecto de descripción cuando existen coincidencias
      updateObjectUserTable: ({ object }) => {
        set({ userTableObject: object })
      },

      fetchUserTable: async ({ id }) => {
        set({ loading: true })

        const res = await getUserTable({ id })

        if (res.status === 'error') {
          set({ ...UserTableInitialState })
          set({
            userTableError: {
              message: res.message,
              originalError: res.originalError,
            },
          })
          set({ loading: false })
          return
        }

        set({ ...UserTableInitialState })
        set({
          userTableObject: {
            id: res.data.id,
            name: res.data.name,
            type: res.data.type,
            typeDesc: res.data.typeDesc,
            schema: res.data.schema,
            createDate: res.data.createDate,
            modifyDate: res.data.modifyDate,
          },
        })
        set({ userTableExtendedPropertieList: res.data.extendedProperties })
        set({ userTableColumnList: res.data.columns })
        set({ userTableIndexList: res.data.indexes })
        set({ userTableForeignKeyList: res.data.foreignKeys })
        set({ loading: false })
      },

      reset: () => {
        set({ userTableObject: { ...ObjectInitialState } })
        set({ ...UserTableInitialState })
      },
    }),
    {
      name: 'usertable', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      // skipHydration: true,

      // excluye de la persistencia, algunos estados del store
      partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => !['userTableError'].includes(key))),
    },
  ),
)
