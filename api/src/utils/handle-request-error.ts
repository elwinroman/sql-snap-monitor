import { RequestError } from 'mssql'

import { REQUEST_ERROR, REQUEST_ERROR_CODES } from '@/constants'
import { MyCustomError } from '@/models/schemas'

/**
 * Mapea un `RequestError` de MSSQL a un error personalizado o devuelve una respuesta por defecto para errores desconocidos.
 *
 * @param {RequestError} error - Instancia MSSQL `RequestError`.
 * @returns {object} - Un objeto de error personalizado o una descripción de error.
 */
const mapRequestErrorToCustomError = (error: RequestError) => {
  const originalError = {
    code: error.code,
    number: error.number,
    message: error.message,
  }
  if (error.code === REQUEST_ERROR.EREQUEST) return new MyCustomError({ ...REQUEST_ERROR_CODES.EREQUEST, originalError })
  if (error.code === REQUEST_ERROR.ETIMEOUT) return new MyCustomError({ ...REQUEST_ERROR_CODES.ETIMEOUT, originalError })
  if (error.code === REQUEST_ERROR.EARGS) return new MyCustomError({ ...REQUEST_ERROR_CODES.EARGS, originalError })
  if (error.code === REQUEST_ERROR.EINJECT) return new MyCustomError({ ...REQUEST_ERROR_CODES.EINJECT, originalError })
  if (error.code === REQUEST_ERROR.ENOCONN) return new MyCustomError({ ...REQUEST_ERROR_CODES.ENOCONN, originalError })

  // Por si acaso (no están registrados todos los errores)
  return {
    status: 'error',
    statusCode: 400,
    message: 'Error desconocido al consultar la base de datos',
    originalError,
  }
}

/**
 * Maneja un `RequestError` mapeándolo a un `MyCustomError` y genera un throw (api response).
 *
 * @param {RequestError} error - Instancia MSSQL `RequestError`.
 * @throws {MyCustomError} - El error personalizado asignado.
 */
export function throwRequestError(error: RequestError) {
  const customError = mapRequestErrorToCustomError(error)
  throw new MyCustomError(customError)
}

/**
 * Registra una versión mapeada de un `RequestError` en la consola (log error interno).
 *
 * @param {RequestError} error - Instancia MSSQL `RequestError`.
 */
export function printRequestError(error: RequestError) {
  const customError = mapRequestErrorToCustomError(error)
  console.log(customError)
}
