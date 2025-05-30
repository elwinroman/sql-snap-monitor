import sql from 'mssql'

import { DatabaseError } from '../exceptions'

/**
 * Verifica si un error es de tipo MSSQL (tiene las propiedades mínimas requeridas).
 */
function isMSSQLError(err: unknown): err is sql.RequestError | sql.PreparedStatementError | sql.TransactionError | sql.ConnectionError {
  return err instanceof Error && 'code' in err && 'message' in err && 'name' in err
}

/**
 * Envuelve el error original en DatabaseError SOLO si es un error de MSSQL.
 * Si no lo es, lanza una excepción explicativa.
 */
export function wrapDatabaseError(err: unknown): DatabaseError {
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
