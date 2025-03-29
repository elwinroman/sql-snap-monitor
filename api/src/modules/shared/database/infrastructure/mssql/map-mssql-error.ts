import { DomainError } from '@shared/core/domain/domain-error'
import {
  DatabaseConnectionErrorException,
  DatabasePreparedStatementErrorException,
  DatabaseRequestErrorException,
  DatabaseTransactionErrorException,
} from '@shared/database/domain/exceptions'
import sql from 'mssql'

/**
 * Mapea un error de MSSQL a un error de dominio específico.
 *
 * @param err - Instancia del error de MSSQL (RequestError, PreparedStatementError o TransactionError).
 * @returns Una instancia de un error de dominio correspondiente.
 */
export function mapMSSQLError(
  err: sql.RequestError | sql.PreparedStatementError | sql.TransactionError | sql.ConnectionError,
): DomainError {
  const errorMap: { [key: string]: new (code: string, message: string) => DomainError } = {
    ConnectionError: DatabaseConnectionErrorException,
    RequestError: DatabaseRequestErrorException,
    PreparedStatementError: DatabasePreparedStatementErrorException,
    TransactionError: DatabaseTransactionErrorException,
  }

  const errorClass = errorMap[err.constructor.name] || DomainError
  return new errorClass(err.code, err.message)
}
