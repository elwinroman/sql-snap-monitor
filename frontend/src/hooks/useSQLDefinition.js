import { useSQLDefinitionStore } from '@/stores'

export function useSQLDefinition() {
  const searchSQLDefinitionObject = useSQLDefinitionStore((state) => state.searchSQLDefinitionObject)
  const fetchSQLDefinition = useSQLDefinitionStore((state) => state.fetchSQLDefinition)

  const getSQLDefinitionObject = async ({ name }) => {
    try {
      await searchSQLDefinitionObject({ name })

      await fetchSQLDefinition()
    } catch (error) {
      throw new Error(error)
    }
  }

  return { getSQLDefinitionObject }
}
