import { AsyncLocalStorage } from 'node:async_hooks'

/**
 * Almacenamiento local asíncrono para el usuario autenticado
 * Por el momento el ID será el hashID generado (user,server)
 */
export const userContextStorage = new AsyncLocalStorage<{ userId: string }>()

/** Establece el ID de usuario en el contexto local. */
export function setUserId(userId: string, callback: () => void): void {
  userContextStorage.run({ userId }, callback)
}

/** Obtiene el ID del usuario desde el contexto. */
export function getUserId(): string | undefined {
  return userContextStorage.getStore()?.userId
}
