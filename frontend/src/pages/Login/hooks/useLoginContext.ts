import { useContext } from 'react'

import { LoginContext, LoginContextType } from '../contexts/login.context'

export const useLoginContext = (): LoginContextType => {
  const context = useContext(LoginContext)
  if (!context) throw new Error('useLoginContext debe usarse dentro de <LoginProvider>')

  return context
}
