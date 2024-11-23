import { CustomError } from '@/models'

export enum RequestErrorCode {
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
  erequest: {
    status: 'error',
    statusCode: 400,
    message: 'Error en la consulta',
  },
  etimeout: {
    status: 'error',
    statusCode: 408,
    message: 'Tiempo de espera agotado en la consulta',
  },
  eargs: {
    status: 'error',
    statusCode: 400,
    message: 'Error en los argumentos de la consulta',
  },
  einject: {
    status: 'error',
    statusCode: 400,
    message: 'Error al inyectar dependencias',
  },
  enoconn: {
    status: 'error',
    statusCode: 400,
    message: 'Error en la conexión',
  },
}
