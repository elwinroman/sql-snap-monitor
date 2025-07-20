import { createContext, ReactNode } from 'react'

import { Credential } from '@/models'

import { useLogin } from '../hooks/useLogin'

export interface LoginContextType {
  loading: boolean
  error: {
    title: string
    detail: string
  } | null
  login(credential: Credential): Promise<void>
}

// crea el contexto
export const LoginContext = createContext<LoginContextType | null>(null)

// proveedor
export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const { loading, error, login } = useLogin()

  return <LoginContext.Provider value={{ loading, error, login }}>{children}</LoginContext.Provider>
}
