import { createContext, type ReactNode } from 'react'

import type { Credential } from '@/models'

import { useListDatabases } from '../hooks/useListDatabases'
import { useLogin } from '../hooks/useLogin'

interface ErrorState {
  title: string
  detail: string
}

export interface LoginContextType {
  loading: boolean
  error: ErrorState | null
  login(credential: Credential): Promise<void>
  databases: string[]
  databasesLoading: boolean
  databasesError: ErrorState | null
  fetchDatabases(credentials: Omit<Credential, 'dbname'>): Promise<void>
}

// crea el contexto
export const LoginContext = createContext<LoginContextType | null>(null)

// proveedor
export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const { loading, error, login } = useLogin()
  const { databases, loading: databasesLoading, error: databasesError, fetchDatabases } = useListDatabases()

  return (
    <LoginContext.Provider value={{ loading, error, login, databases, databasesLoading, databasesError, fetchDatabases }}>
      {children}
    </LoginContext.Provider>
  )
}
