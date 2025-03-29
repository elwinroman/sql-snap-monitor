import { DomainError } from '@shared/core/domain/domain-error'
import { InternalServerErrorException, ValidationException } from '@shared/core/domain/exceptions'
import { mapMSSQLError } from '@shared/database/infrastructure/mssql'
import { logger } from '@shared/logger/infrastructure/pino-instance'
import { NextFunction, Request, Response } from 'express'
import sql from 'mssql'
import { ZodError } from 'zod'

import { httpErrorMap } from '../http/httpErrorMap'

export function handleError(err: unknown, req: Request, res: Response, _next: NextFunction) {
  let mappedError: DomainError
  let invalidParams = undefined

  /** Manejo de errores por tipo */
  switch (true) {
    // errores de validación
    case err instanceof ZodError:
      invalidParams = err.errors
      mappedError = new ValidationException()
      logger.error(mappedError.name, { mappedError })
      break

    // errores de node-mssql package
    case err instanceof sql.ConnectionError:
    case err instanceof sql.RequestError:
    case err instanceof sql.PreparedStatementError:
    case err instanceof sql.TransactionError:
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
      logger.error(mappedError.name, { err })
      break

    // otro tipo de errores
    default:
      mappedError = new InternalServerErrorException()
      logger.error(mappedError.name, { mappedError })
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

  return res.status(status).json(errorApiResponse)
}
