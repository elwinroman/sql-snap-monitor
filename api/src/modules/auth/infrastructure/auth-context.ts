import { AsyncLocalStorage } from 'node:async_hooks'

export interface AuthContext {
  userId: number
}

const authContextStorage = new AsyncLocalStorage<AuthContext>()

export function setAuthContext(authContext: AuthContext) {
  authContextStorage.enterWith({ userId: authContext.userId })
}

export function getAuthContext(): AuthContext | undefined {
  const authContext = authContextStorage.getStore()

  return authContext
}
