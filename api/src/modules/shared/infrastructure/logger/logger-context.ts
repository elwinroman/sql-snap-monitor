import { AsyncLocalStorage } from 'node:async_hooks'

import { Request } from 'express'

/**
 * Interfaz que define el contexto de la solicitud para el logger, es decir, que agrega información extra en el logger.
 *
 * @property correlationId - Identificador único para rastrear solicitudes.
 * @property method - Método HTTP de la solicitud (por ejemplo, GET, POST).
 * @property url - URL de la solicitud.
 */
export interface LoggerRequestContext {
  correlationId: string
  method: string
  url: string
  userAgent: string // Navegador o cliente que hace la petición
  ip: string // Dirección IP del cliente
  userId?: number
  role?: string // Rol del usuario
  jti?: string // ID del token
  request: Request // contexto del todo el request para su en servicios asincronos (sentry)
}

/** Almacenamiento local asíncrono para manejar el contexto de la solicitud del logger. */
export const loggerRequestContext = new AsyncLocalStorage<LoggerRequestContext>()

/**
 * Establece el contexto de la solicitud para el logger y ejecuta un callback dentro de ese contexto.
 *
 * @param newContext - Parte del contexto a agregar o actualizar.
 */
export function setLoggerRequestContext(newContext: Partial<LoggerRequestContext>): void {
  const currentContext = loggerRequestContext.getStore()

  if (!currentContext) throw new Error('No hay contexto activo para logger. Usa el middleware inicial para crear uno.')

  const mergedContext = { ...currentContext, ...newContext }
  loggerRequestContext.enterWith(mergedContext)
}

/**
 * Obtiene el contexto actual de la solicitud del logger.
 *
 * @returns El contexto de la solicitud o `undefined` si no hay un contexto activo.
 */
export function getLoggerRequestContext(): LoggerRequestContext | undefined {
  const loggerContext = loggerRequestContext.getStore()
  return loggerContext
}
