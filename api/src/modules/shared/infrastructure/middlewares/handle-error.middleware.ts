import { ApplicationError } from '@shared/application/application-error'
import { SafeInternalServerErrorException, ValidationException } from '@shared/application/exceptions'
import { DomainError } from '@shared/domain/domain-error'
import { httpErrorMap } from '@shared/infrastructure/http/http-error-map'
import { InfrastructureError } from '@shared/infrastructure/infrastructure-error.exception'
import { logger } from '@shared/infrastructure/logger/pino-instance'
import { mapMSSQLError } from '@shared/infrastructure/store/map-mssql-error'
import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

import { DatabaseConnectionErrorException, DatabaseError } from '../exceptions'
import { sentryScopeError } from '../sentry/sentryScopeError'
import { formatZodErrors } from '../utils/format-zod-errors.util'

export function handleErrorMiddleware(err: unknown, req: Request, res: Response, _next: NextFunction) {
  let mappedError: DomainError | InfrastructureError | ApplicationError
  let invalidParams = undefined

  /** Manejo de errores por tipo */
  switch (true) {
    // errores de validación
    case err instanceof ZodError: {
      invalidParams = err.errors

      const messages = formatZodErrors(err.errors)
      mappedError = new ValidationException(messages)
      logger.warn(mappedError.name, { err: mappedError })
      break
    }
    // errores de node-mssql package
    case err instanceof DatabaseError:
      sentryScopeError(err)
      mappedError = mapMSSQLError(err.originalError)
      logger.error(mappedError.name, { err: mappedError })

      // reemplaza el error específico con un error genérico para el cliente
      if (mappedError.type === DatabaseConnectionErrorException.name) {
        mappedError = new SafeInternalServerErrorException({
          detail:
            'No se pudo conectar con el servidor de base de datos. Si el problema persiste, contacte con el administrador del sistema.',
        })
      } else mappedError = new SafeInternalServerErrorException()
      break

    // errores de dominio o aplicación
    case err instanceof DomainError || err instanceof ApplicationError:
      logger.warn(err.name, { err })
      mappedError = err
      break

    // errores de infraestructura
    case err instanceof InfrastructureError:
      sentryScopeError(err)
      logger.error(err.name, { err })

      mappedError = new SafeInternalServerErrorException()
      break
    // otro tipo de errores
    default: {
      sentryScopeError(err)
      if (err instanceof Error) logger.error(err.name, { err })
      else logger.error('UnknownError', { err })
      mappedError = new SafeInternalServerErrorException()
      break
    }
  }

  /** Valida si la excepción está mapeada */
  const errorConfig = httpErrorMap[mappedError.type]
  if (!errorConfig) {
    logger.warn(`Excepción no mapeada => ${mappedError.type}`)
    mappedError = new SafeInternalServerErrorException()
  }

  const { status, errorCode } = httpErrorMap[mappedError.type] || {
    status: 500, // fallback si SafeInternalServerErrorException no está mapeado
    errorCode: 'UNKNOWN', // fallback si SafeInternalServerErrorException no está mapeado
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

  return res.status(status).json(errorApiResponse)
}
