import { CustomError } from '@/models'

type CustomErrorList = {
  [key: string]: CustomError
}

// todo, convertir a minúscula los errores NOTFOUND a notfound
export const COMMON_ERROR_CODES: CustomErrorList = {
  notfound: {
    status: 'error',
    statusCode: 404,
    message: 'No se ha encontrado el objeto, vuelva a intentarlo',
  },
  notfoundescription: {
    status: 'error',
    statusCode: 404,
    message: 'No se ha encontrado ninguna descripción para el objeto',
  },
  sessionalreadyclosed: {
    status: 'error',
    statusCode: 403,
    message: 'La sesión ya no está activa',
  },
  notauthorized: {
    status: 'error',
    statusCode: 401,
    message: 'No está autorizado para acceder a este recurso',
  },
  permission_required: {
    status: 'error',
    statusCode: 403,
    message: 'No tienes permisos para usar esta aplicación. Contacta con un administrador para reactivar',
  },
}
