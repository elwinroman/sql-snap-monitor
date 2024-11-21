import { RequestError } from 'mssql'

import { REQUEST_ERROR, REQUEST_ERROR_CODES } from '@/constants'
import { MyCustomError } from '@/models/schemas'

export function handleRequestError(error: RequestError) {
  const originalError = {
    code: error.code,
    number: error.number,
    message: error.message,
  }
  if (error.code === REQUEST_ERROR.EREQUEST) throw new MyCustomError({ ...REQUEST_ERROR_CODES.EREQUEST, originalError })
  if (error.code === REQUEST_ERROR.ETIMEOUT) throw new MyCustomError({ ...REQUEST_ERROR_CODES.ETIMEOUT, originalError })
  if (error.code === REQUEST_ERROR.EARGS) throw new MyCustomError({ ...REQUEST_ERROR_CODES.EARGS, originalError })
  if (error.code === REQUEST_ERROR.EINJECT) throw new MyCustomError({ ...REQUEST_ERROR_CODES.EINJECT, originalError })
  if (error.code === REQUEST_ERROR.ENOCONN) throw new MyCustomError({ ...REQUEST_ERROR_CODES.ENOCONN, originalError })

  // Por si acaso (no están registrados todos los errores)
  throw new MyCustomError({
    status: 'error',
    statusCode: 400,
    message: 'Error desconocido al consultar la base de datos',
    originalError,
  })
}
