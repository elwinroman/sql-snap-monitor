export const ERROR_CODES = {
  EREQUEST: {
    code: 'EREQUEST',
    message: 'Error en la consulta, consulte con su administrador'
  },
  NOT_FOUND: {
    code: 'NOT_FOUND',
    message: 'No se ha encontrado el objeto, vuelva a intentarlo'
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
    code: 'NOT_FOUND_DESCRIPTION',
    message: 'No se ha encontrado ninguna descripción para el objeto'
  }
}
