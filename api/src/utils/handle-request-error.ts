import { RequestError } from 'mssql'

import { REQUEST_ERROR, REQUEST_ERROR_CODES } from '@/constants'
import { MyCustomError } from '@/models/schemas'

export function handleRequestError(error: RequestError) {
  const { number, message } = error

  if (error.code === REQUEST_ERROR.EREQUEST)
    throw new MyCustomError({ ...REQUEST_ERROR_CODES.EREQUEST, originalError: { number, message } })
  if (error.code === REQUEST_ERROR.ETIMEOUT)
    throw new MyCustomError({ ...REQUEST_ERROR_CODES.ETIMEOUT, originalError: { number, message } })
  if (error.code === REQUEST_ERROR.EARGS) throw new MyCustomError({ ...REQUEST_ERROR_CODES.EARGS, originalError: { number, message } })
  if (error.code === REQUEST_ERROR.EINJECT) throw new MyCustomError({ ...REQUEST_ERROR_CODES.EINJECT, originalError: { number, message } })
  if (error.code === REQUEST_ERROR.ENOCONN) throw new MyCustomError({ ...REQUEST_ERROR_CODES.ENOCONN, originalError: { number, message } })
}
