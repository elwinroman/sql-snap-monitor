import { DomainError } from '@shared/core/domain/domain-error'
import { InternalServerErrorException, ValidationException } from '@shared/core/domain/exceptions'
import { logger } from '@shared/logger/infrastructure/pino-instance'
import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

import { httpErrorMap } from '../http/httpErrorMap'

export function handleError(err: unknown, req: Request, res: Response, _next: NextFunction) {
  let domainError: DomainError
  let invalidParams = undefined

  // error de tipo validación (Zod)
  if (err instanceof ZodError) {
    invalidParams = err.errors
    domainError = new ValidationException()
  } else {
    domainError = err instanceof DomainError ? err : new InternalServerErrorException()
  }

  // valida si la excepción está mapeada
  const errorConfig = httpErrorMap[domainError.type]
  if (!errorConfig) {
    logger.warn('Excepción no mapeada')
    domainError = new InternalServerErrorException()
  }

  const { status, errorCode } = httpErrorMap[domainError.type] || {
    status: 500, // fallback si InternalServerErrorException no está mapeado
    errorCode: 'UNKNOWN', // fallback si InternalServerErrorException no está mapeado
  }
  logger.error(domainError.name, { err })

  const errorApiResponse = {
    correlationId: req.correlationId,
    error: {
      type: domainError.type,
      title: domainError.title,
      status,
      detail: domainError.detail,
      errorCode,
      invalidParams,
    },
  }

  return res.status(status).json(errorApiResponse)
}
