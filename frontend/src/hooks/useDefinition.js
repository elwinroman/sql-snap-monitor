import { useSQLDefinitionStore } from '@/stores/sqldefinition.store'

export function useDefinition() {
  const searchSQLDefinitionObject = useSQLDefinitionStore(
    (state) => state.searchSQLDefinitionObject,
  )
  const fetchSQLDefinition = useSQLDefinitionStore(
    (state) => state.fetchSQLDefinition,
  )

  const getDefinitionObject = async ({ name }) => {
    try {
      await searchSQLDefinitionObject({ name })

      await fetchSQLDefinition()
    } catch (error) {
      throw new Error(error)
    }
  }

  return { getDefinitionObject }
}
