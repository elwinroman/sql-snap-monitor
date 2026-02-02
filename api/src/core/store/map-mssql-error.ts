import {
  DatabaseConnectionErrorException,
  DatabasePreparedStatementErrorException,
  DatabaseRequestErrorException,
  DatabaseTransactionErrorException,
} from '@core/exceptions'
import { InfrastructureError } from '@core/infrastructure-error.exception'
import sql from 'mssql'

/**
 * Mapea un error de MSSQL a un error de dominio específico.
 *
 * @param err - Instancia del error de MSSQL (RequestError, PreparedStatementError o TransactionError).
 * @returns Una instancia de un error de dominio correspondiente.
 */
export function mapMSSQLError(
  err: sql.RequestError | sql.PreparedStatementError | sql.TransactionError | sql.ConnectionError,
): InfrastructureError {
  const errorMap: { [key: string]: new (code: string, message: string) => InfrastructureError } = {
    ConnectionError: DatabaseConnectionErrorException,
    RequestError: DatabaseRequestErrorException,
    PreparedStatementError: DatabasePreparedStatementErrorException,
    TransactionError: DatabaseTransactionErrorException,
  }

  const errorClass = errorMap[err.constructor.name] || InfrastructureError
  return new errorClass(err.code, err.message)
}
