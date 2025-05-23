import { DomainError } from '@shared/domain/domain-error'
import { DecryptionException, InternalServerErrorException, ValidationException } from '@shared/domain/exceptions'
import { httpErrorMap } from '@shared/infrastructure/http/http-error-map'
import { logger } from '@shared/infrastructure/logger/pino-instance'
import { mapMSSQLError } from '@shared/infrastructure/store/map-mssql-error'
import { NextFunction, Request, Response } from 'express'
import sql from 'mssql'
import { ZodError } from 'zod'

import { MyCustomError } from '@/models'

import { reportErrorToSentry } from '../sentry/sentryScopeError'

export function handleErrorMiddleware(err: unknown, req: Request, res: Response, _next: NextFunction) {
  let mappedError: DomainError
  let invalidParams = undefined

  // soporte VERSION anterior (se eliminará completaco la migración)
  if (err instanceof MyCustomError) {
    logger.info(err.name, { err })
    const { status, statusCode, message, originalError } = err
    return res.status(statusCode).json({ status, statusCode, message, originalError })
  }

  /** Manejo de errores por tipo */
  switch (true) {
    // errores de validación
    case err instanceof ZodError:
      invalidParams = err.errors
      mappedError = new ValidationException()
      logger.info(mappedError.name, { err: mappedError })
      break

    // errores de node-mssql package
    case err instanceof sql.ConnectionError:
    case err instanceof sql.RequestError:
    case err instanceof sql.PreparedStatementError:
    case err instanceof sql.TransactionError:
      reportErrorToSentry(err, req)
      // impresión en consola del error detallado
      logger.debug(err.name, { err })

      // mapea el error para el envío al servicio de logs (online)
      mappedError = mapMSSQLError(err)
      logger.error(mappedError.name, { err: mappedError })

      // reemplaza el error específico con un error genérico para el cliente
      mappedError = new InternalServerErrorException()
      break

    // errores de dominio
    case err instanceof DomainError:
      mappedError = err

      if (err instanceof DecryptionException) {
        reportErrorToSentry(err, req)
        logger.error(mappedError.name, { err: mappedError })
      } else logger.info(mappedError.name, { err: mappedError })
      break

    // otro tipo de errores
    default:
      if (err instanceof Error) {
        reportErrorToSentry(err, req)
        logger.error(err.name, { err })
      } else {
        reportErrorToSentry(err, req)
        logger.error('UnknownError', { err })
      }

      mappedError = new InternalServerErrorException()
      logger.info(mappedError.name, { err: mappedError })
      break
  }

  /** Valida si la excepción está mapeada */
  const errorConfig = httpErrorMap[mappedError.type]
  if (!errorConfig) {
    logger.warn(`Excepción no mapeada => ${mappedError.type}`)
    mappedError = new InternalServerErrorException()
  }

  const { status, errorCode } = httpErrorMap[mappedError.type] || {
    status: 500, // fallback si InternalServerErrorException no está mapeado
    errorCode: 'UNKNOWN', // fallback si InternalServerErrorException no está mapeado
  }

  const errorApiResponse = {
    correlationId: req.correlationId,
    error: {
      type: mappedError.type,
      title: mappedError.title,
      status,
      detail: mappedError.detail,
      errorCode,
      invalidParams,
    },
  }

  // soporte VERSION anterior (se eliminará completaco la migración)
  const legacyErrorApiResponse = {
    status: 'error',
    statusCode: status,
    message: errorApiResponse.error.title,
    originalError: 'None',
    ...errorApiResponse,
  }

  return res.status(status).json(legacyErrorApiResponse)
}
