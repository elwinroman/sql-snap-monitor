import { useObjectStore } from '@/stores/object.store'

export function useDefinition() {
  const fetchDefinitionObject = useObjectStore(
    (state) => state.fetchDefinitionObject,
  )
  const fetchDefinition = useObjectStore((state) => state.fetchDefinition)

  const getDefinitionObject = async ({ name }) => {
    try {
      await fetchDefinitionObject({ name })

      await fetchDefinition()
    } catch (error) {
      throw new Error(error)
    }
  }

  return { getDefinitionObject }
}
