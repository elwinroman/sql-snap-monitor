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
  SESSIONALREADYCLOSED: {
    status: 'error',
    statusCode: 403,
    message: 'La sesión ya no está activa',
  },
}
