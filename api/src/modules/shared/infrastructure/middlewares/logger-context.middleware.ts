import { LoggerRequestContext, loggerRequestContext } from '@shared/infrastructure/logger/logger-context'
import { randomUUID } from 'crypto'
import { NextFunction, Request, Response } from 'express'

const CORRELATION_ID_HEADER = 'X-Correlation-Id'

/**
 * Middleware para agregar contexto al logger y su uso para servicios asyncronos
 */
export function loggerContextMiddleware(req: Request, res: Response, next: NextFunction) {
  // Genera un nuevo correlation_id
  const correlationId = req.get(CORRELATION_ID_HEADER) || randomUUID()
  req.correlationId = correlationId
  res.set(CORRELATION_ID_HEADER, correlationId)

  const context: LoggerRequestContext = {
    correlationId,
    source: {
      method: req.method,
      url: req.originalUrl,
      userAgent: req.headers['user-agent'] ?? 'N/A',
      ip: req.ip ?? 'N/A',
    },
    request: req,
  }

  // Al inicio de la petición en middleware se usa "run" para establecer un contexto global que persista incluso con asincronia
  loggerRequestContext.run(context, () => {
    next()
  })
}
