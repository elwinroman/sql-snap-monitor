export const ERROR_CODES = {
  EREQUEST: {
    status: 'error',
    statusCode: 400,
    error: {
      code: 'EREQUEST',
      message: 'Error en la consulta'
    }
  },
  NOT_FOUND: {
    status: 'error',
    statusCode: 404,
    error: {
      code: 'NOT_FOUND',
      message: 'No se ha encontrado el objeto, vuelva a intentarlo'
    }
  },
  INTERNAL_SERVER_ERROR: {
    status: 'error',
    statusCode: 500,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Error interno del servidor'
    }
  },
  AMBIGUOUS_RESULTS: {
    code: 'AMBIGUOUS_RESULTS',
    message: 'Se ha encontrado multiples coincidencias del objeto, agrege el schema como prefijo para evitar la ambiguedad, ejemplo: dbo.objectName'
  },
  NOT_FOUND_SQUEMA: {
    code: 'NOT_FOUND_SQUEMA',
    message: 'No se ha encontrado el schema, vuelva a intentarlo'
  },
  NOT_FOUND_DESCRIPTION: {
    status: 'error',
    statusCode: 404,
    error: {
      code: 'NOT_FOUND_DESCRIPTION',
      message: 'No se ha encontrado ninguna descripción para el objeto'
    }
  }
}
