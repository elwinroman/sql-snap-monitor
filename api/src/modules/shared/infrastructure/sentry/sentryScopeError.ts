import * as Sentry from '@sentry/node'
import { DomainError } from '@shared/domain/domain-error'
import { Request } from 'express'

export function reportErrorToSentry(err: unknown, req: Request) {
  Sentry.withScope(scope => {
    // Datos del request manuales (sin sensibles)
    const requestData = {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      headers: {
        'user-agent': req.headers['user-agent'] ?? 'N/A',
        host: req.headers['host'] ?? 'N/A',
      },
      data: req.body ? sanitizeRequestBody(req.body) : undefined,
    }

    scope.addEventProcessor(event => {
      event.request = requestData
      return event
    })

    // Establece correlationId como tag y como trace id
    const correlationId = req.correlationId || 'N/A'

    scope.setTag('correlationId', correlationId)
    scope.setTransactionName(req.originalUrl)
    // Inyecta el correlationId como trace id para que se muestre como Trace ID en Sentry
    scope.setContext('trace_id', { id: correlationId })

    if (err instanceof DomainError) scope.setExtra('descripcion', err.detail)

    Sentry.captureException(err)
  })
}

function sanitizeRequestBody(body: Record<string, unknown>) {
  const sanitized = { ...body }
  delete sanitized.password
  delete sanitized.token
  return sanitized
}
