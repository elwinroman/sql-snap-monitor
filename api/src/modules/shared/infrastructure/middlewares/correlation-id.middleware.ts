import { setLoggerRequestContext } from '@shared/domain/logger-context'
import { randomUUID } from 'crypto'
import { NextFunction, Request, Response } from 'express'

const CORRELATION_ID_HEADER = 'X-Correlation-Id'

/**
 * Middleware para manejar el ID de correlación en las solicitudes (traceId).
 *
 * - Obtiene el `X-Correlation-Id` de los headers de la solicitud.
 * - Si no existe, genera un nuevo UUID.
 * - Asigna el ID a `req.CORRELATION_ID_HEADER` para su uso en la aplicación.
 * - Agrega el ID a los headers de la respuesta.
 *
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 * @param next - Función para continuar con el siguiente middleware.
 */
export function correlationIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const correlationId = req.get(CORRELATION_ID_HEADER) || randomUUID()
  req.correlationId = correlationId
  res.set(CORRELATION_ID_HEADER, correlationId)

  /** agrega el contexto de la petición al logger para usar en cualquier lugar */
  setLoggerRequestContext({ correlationId: req.correlationId, method: req.method, url: req.url }, next)
}
