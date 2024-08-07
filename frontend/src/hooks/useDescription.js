import { useObjectStore } from '@/stores/object.store'

export function useDescription() {
  const fetchDescriptionObject = useObjectStore(
    (state) => state.fetchDescriptionObject,
  )
  const fetchDescription = useObjectStore((state) => state.fetchDescription)

  const getDescriptionObject = async ({ name }) => {
    try {
      await fetchDescriptionObject({ name })

      await fetchDescription()
    } catch (error) {
      throw new Error(error)
    }
  }

  return { getDescriptionObject }
}
