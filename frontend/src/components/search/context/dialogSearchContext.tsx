import { createContext, ReactNode, useContext } from 'react'

import { useOpenDialog } from '../hooks/useOpenDialog'

interface ContextProps {
  children: ReactNode
}

export interface DialogSearchContextType {
  open: boolean
  updateOpen(state: boolean): void
}

// crea contexto
export const DialogSearchContext = createContext<DialogSearchContextType | null>(null)

// provider
export const DialogSearchProvider = ({ children }: ContextProps) => {
  const { open, updateOpen } = useOpenDialog()

  return <DialogSearchContext.Provider value={{ open, updateOpen }}>{children}</DialogSearchContext.Provider>
}

export const dialogSearchContext = () => {
  const context = useContext(DialogSearchContext)
  if (!context) throw new Error(`${dialogSearchContext.name} debe usarse dentro de <DialogSearchProvider>`)

  return context
}
