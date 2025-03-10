import { NextFunction, Request, Response } from 'express'

import { DomainError } from '../../domain/exceptions/domain-error'
import { InternalServerErrorException } from '../../domain/exceptions/internal-server-error.exception'
import { httpErrorMap } from '../http/httpErrorMap'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function handleError(err: DomainError, req: Request, res: Response, _next: NextFunction) {
  let domainError: DomainError

  domainError = err instanceof DomainError ? err : new InternalServerErrorException()

  // valida si la excepción está mapeada
  const errorConfig = httpErrorMap[domainError.type]
  if (!errorConfig) {
    console.error(`❌ Excepción no mapeada: ${domainError.type}`)
    domainError = new InternalServerErrorException()
  }

  const { status, errorCode } = httpErrorMap[domainError.type] || {
    status: 500, // fallback si InternalServerErrorException no está mapeado
    errorCode: 'UNKNOWN', // fallback si InternalServerErrorException no está mapeado
  }
  console.error(`🚨 ERROR: ${domainError.title} | Status: ${status} | Código: ${errorCode}`)

  const errorApiResponse = {
    correlationId: req.correlationId,
    error: {
      type: domainError.type,
      title: domainError.title,
      status,
      detail: domainError.detail,
      errorCode,
    },
  }

  return res.status(status).json(errorApiResponse)
}
