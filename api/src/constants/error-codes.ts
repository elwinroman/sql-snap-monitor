export const ERROR_CODES = {
  EREQUEST: {
    status: 'error',
    statusCode: 400,
    error: {
      code: 'EREQUEST',
      message: 'Error en la consulta',
    },
  },
  ESOCKET: {
    status: 'error',
    statusCode: 400,
    error: {
      code: 'ESOCKET',
      message: 'Error de conexión con el servidor',
    },
  },
  ELOGIN: {
    status: 'error',
    statusCode: 401,
    error: {
      code: 'ELOGIN',
      message: 'Error de autenticación',
    },
  },
  ETIMEOUT: {
    status: 'error',
    statusCode: 408,
    error: {
      code: 'ETIMEOUT',
      message: 'Tiempo de espera agotado, probablemente el servidor no responde o no existe',
    },
  },
  NOT_FOUND: {
    status: 'error',
    statusCode: 404,
    error: {
      code: 'NOT_FOUND',
      message: 'No se ha encontrado el objeto, vuelva a intentarlo',
    },
  },
  INTERNAL_SERVER_ERROR: {
    status: 'error',
    statusCode: 500,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Error interno del servidor',
    },
  },
  NOT_FOUND_SQUEMA: {
    code: 'NOT_FOUND_SQUEMA',
    message: 'No se ha encontrado el schema, vuelva a intentarlo',
  },
  NOT_FOUND_DESCRIPTION: {
    status: 'error',
    statusCode: 404,
    error: {
      code: 'NOT_FOUND_DESCRIPTION',
      message: 'No se ha encontrado ninguna descripción para el objeto',
    },
  },
}

export const AUTH_ERROR_CODES = {
  TOKEN_INVALID: {
    status: 'error',
    statusCode: 401,
    error: {
      code: 'UNAUTHORIZED',
      message: 'No estás autorizado para acceder a este recurso',
    },
  },
}
