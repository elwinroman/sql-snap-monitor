import { useUserTableStore } from '@/stores/usertable.store'

export function useDescription() {
  const searchUserTable = useUserTableStore((state) => state.searchUserTable)
  const fetchUserTable = useUserTableStore((state) => state.fetchUserTable)

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
