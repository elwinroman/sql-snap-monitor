import { AsyncLocalStorage } from 'node:async_hooks'

/**
 * Interfaz que define el contexto de la solicitud para el logger, es decir, que agrega información extra en el logger.
 *
 * @property correlationId - Identificador único para rastrear solicitudes.
 * @property method - Método HTTP de la solicitud (por ejemplo, GET, POST).
 * @property url - URL de la solicitud.
 */
export interface LoggerRequestContext {
  correlationId?: string
  method?: string
  url?: string
}

/** Almacenamiento local asíncrono para manejar el contexto de la solicitud del logger. */
export const loggerRequestContext = new AsyncLocalStorage<LoggerRequestContext>()

/**
 * Establece el contexto de la solicitud para el logger y ejecuta un callback dentro de ese contexto.
 *
 * @param context - El contexto de la solicitud que se desea establecer.
 * @param callback - La función que se ejecutará dentro del contexto establecido.
 */
export function setLoggerRequestContext(context: LoggerRequestContext, callback: () => void): void {
  loggerRequestContext.run(context, callback)
}

/**
 * Obtiene el contexto actual de la solicitud del logger.
 *
 * @returns El contexto de la solicitud o `undefined` si no hay un contexto activo.
 */
export function getLoggerRequestContext(): LoggerRequestContext | undefined {
  return loggerRequestContext.getStore()
}
