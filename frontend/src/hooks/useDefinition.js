import { useObjectStore } from '@/stores/object.store'

export function useDefinition() {
  const fetchObject = useObjectStore((state) => state.fetchObject)
  const fetchDefinition = useObjectStore((state) => state.fetchDefinition)

  const getDefinitionObject = async ({ name }) => {
    try {
      await fetchObject({ name })

      await fetchDefinition()
    } catch (error) {
      throw new Error(error)
    }
  }

  return { getDefinitionObject }
}
