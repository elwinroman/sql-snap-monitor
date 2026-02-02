import sql from 'mssql'

export class DatabaseError extends Error {
  public originalError: sql.RequestError | sql.PreparedStatementError | sql.TransactionError | sql.ConnectionError

  constructor(originalError: DatabaseError['originalError']) {
    super(originalError.message)

    this.name = this.constructor.name
    this.originalError = originalError

    // reemplaza el stack trace por el del wrapper (para el rastro)
    Error.captureStackTrace(this, DatabaseError)
  }
}
