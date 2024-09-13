import { useObjectStore } from '@/stores/object.store'

export function useDefinition() {
  const searchSQLDefinitionObject = useObjectStore(
    (state) => state.searchSQLDefinitionObject,
  )
  const fetchSQLDefinition = useObjectStore((state) => state.fetchSQLDefinition)

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
