import { CustomError } from '@/models/schemas'

export enum ConnErrorCode {
  ELOGIN = 'ELOGIN',
  ETIMEOUT = 'ETIMEOUT',
  ESOCKET = 'ESOCKET',
  EALREADYCONNECTED = 'EALREADYCONNECTED',
  EALREADYCONNECTING = 'EALREADYCONNECTING',
  EINSTLOOKUP = 'EINSTLOOKUP',
}

type CustomErrorList = {
  [key: string]: CustomError
}

export const CONN_ERROR_CODES: CustomErrorList = {
  elogin: {
    status: 'error',
    statusCode: 401,
    message: 'Error de autenticación',
  },
  etimeout: {
    status: 'error',
    statusCode: 408,
    message: 'Tiempo de espera agotado, el servidor no responde o no existe',
  },
  esocket: {
    status: 'error',
    statusCode: 400,
    message: 'Error de conexión con el servidor',
  },
  ealreadyconnected: {
    status: 'error',
    statusCode: 400,
    message: 'La base de datos ya está conectada',
  },
  ealreadyconnecting: {
    status: 'error',
    statusCode: 400,
    message: 'Ya se está conectando a la base de datos',
  },
  einstlookup: {
    status: 'error',
    statusCode: 400,
    message: 'Error en la búsqueda de instancias',
  },
}
