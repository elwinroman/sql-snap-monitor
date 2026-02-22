import { useState } from 'react'

import useFetchAndLoad from '@/hooks/useFetchAndLoad'
import type { Credential } from '@/models'
import { listDatabasesService } from '@/services'

export const useListDatabases = () => {
  const { callEndpoint, loading, error } = useFetchAndLoad<string[]>()
  const [databases, setDatabases] = useState<string[]>([])

  const fetchDatabases = async (credentials: Omit<Credential, 'dbname'>) => {
    const response = await callEndpoint(listDatabasesService(credentials))
    setDatabases(response.data)
  }

  return { databases, loading, error, fetchDatabases }
}
