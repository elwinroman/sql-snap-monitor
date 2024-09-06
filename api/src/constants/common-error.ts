import { CustomError } from '@/models/schemas'

type CustomErrorList = {
  [key: string]: CustomError
}

export const COMMON_ERROR_CODES: CustomErrorList = {
  NOTFOUND: {
    status: 'error',
    statusCode: 404,
    message: 'No se ha encontrado el objeto, vuelva a intentarlo',
  },
  NOTFOUNDDESCRIPTION: {
    status: 'error',
    statusCode: 404,
    message: 'No se ha encontrado ninguna descripción para el objeto',
  },
  TOKENINVALID: {
    status: 'error',
    statusCode: 401,
    message: 'Error de autenticación, no está autorizado para acceder a este recurso',
  },
}
