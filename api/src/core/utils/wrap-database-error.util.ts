import { InvalidCredentialsException } from '@auth/domain/exceptions'
import sql from 'mssql'

import { DatabaseError } from '../exceptions'

/**
 * Verifica si un error es de tipo MSSQL (tiene las propiedades mínimas requeridas).
 */
function isMSSQLError(err: unknown): err is sql.RequestError | sql.PreparedStatementError | sql.TransactionError | sql.ConnectionError {
  return err instanceof Error && 'code' in err && 'message' in err && 'name' in err
}

/**
 * Envuelve el error original en `DatabaseError` **solo** cuando proviene de MSSQL.
 *
 * La librería `node-mssql` genera errores internos cuyo `stacktrace`
 * apunta a código propio de la librería y no a la línea real donde se
 * ejecuta la consulta.
 *
 * Este wrapper permite:
 * - Preservar el contexto del error original.
 * - Normalizar el tipo de excepción.
 * - Facilitar el rastreo (trace) hasta el punto real de la consulta.
 *
 * Si el error no corresponde a MSSQL, se lanza una excepción descriptiva.
 */
export function wrapDatabaseError(err: unknown): DatabaseError {
  if (err instanceof InvalidCredentialsException) throw err

  if (isMSSQLError(err)) {
    return new DatabaseError(err)
  } else {
    // lanza un error claro indicando que se recibió un tipo incorrecto
    throw new Error(
      `Se esperaba un error de MSSQL, pero se recibió: ${typeof err}. ` +
        `Mensaje original: ${err instanceof Error ? err.message : String(err)}`,
    )
  }
}
