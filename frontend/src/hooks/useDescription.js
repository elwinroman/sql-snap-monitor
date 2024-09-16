import { useObjectStore } from '@/stores/object.store'

export function useDescription() {
  const searchUserTable = useObjectStore((state) => state.searchUserTable)
  const fetchUserTable = useObjectStore((state) => state.fetchUserTable)

  const getDescriptionObject = async ({ name }) => {
    try {
      await searchUserTable({ name })

      await fetchUserTable()
    } catch (error) {
      throw new Error(error)
    }
  }

  return { getDescriptionObject }
}
