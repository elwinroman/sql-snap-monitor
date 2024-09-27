import { useUserTableStore } from '@/stores'

export function useUsertable() {
  const searchUserTable = useUserTableStore((state) => state.searchUserTable)
  const fetchUserTable = useUserTableStore((state) => state.fetchUserTable)

  const getUsertableObject = async ({ name }) => {
    try {
      await searchUserTable({ name })

      await fetchUserTable()
    } catch (error) {
      throw new Error(error)
    }
  }

  return { getUsertableObject }
}
