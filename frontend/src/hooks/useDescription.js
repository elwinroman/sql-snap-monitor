import { useObjectStore } from '@/stores/object.store'

export function useDescription() {
  const fetchObject = useObjectStore((state) => state.fetchObject)
  const fetchDescription = useObjectStore((state) => state.fetchDescription)

  const getDescriptionObject = async ({ name }) => {
    try {
      await fetchObject({ name })

      await fetchDescription()
    } catch (error) {
      throw new Error(error)
    }
  }

  return { getDescriptionObject }
}
