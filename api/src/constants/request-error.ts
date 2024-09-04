import { CustomError } from '@/models/schemas'

export enum REQUEST_ERROR {
  EREQUEST = 'EREQUEST',
  ETIMEOUT = 'ETIMEOUT',
  EARGS = 'EARGS',
  EINJECT = 'EINJECT',
  ENOCONN = 'ENOCONN',
}

type CustomErrorList = {
  [key: string]: CustomError
}

export const REQUEST_ERROR_CODES: CustomErrorList = {
  EREQUEST: {
    status: 'error',
    statusCode: 400,
    message: 'Error en la consulta',
  },
  ETIMEOUT: {
    status: 'error',
    statusCode: 408,
    message: 'Tiempo de espera agotado en la consulta',
  },
  EARGS: {
    status: 'error',
    statusCode: 400,
    message: 'Error en los argumentos de la consulta',
  },
  EINJECT: {
    status: 'error',
    statusCode: 400,
    message: 'Error al inyectar dependencias',
  },
  ENOCONN: {
    status: 'error',
    statusCode: 400,
    message: 'Error en la conexión',
  },
}
