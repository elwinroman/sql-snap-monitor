import sql from 'mssql'

export class DatabaseError extends Error {
  public originalError: sql.RequestError | sql.PreparedStatementError | sql.TransactionError | sql.ConnectionError

  constructor(originalError: DatabaseError['originalError']) {
    // Usa `cause` para encadenar el error original (ES2022)
    // Sentry mostrará: stack del wrapper + stack del error MSSQL original
    super(originalError.message, { cause: originalError })
    //super(originalError.message)
    this.name = this.constructor.name
    this.originalError = originalError

    // Captura stack desde el punto donde se lanzó el wrapper
    // El error original se preserva en `cause` con su stack intacto
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DatabaseError)
    }
  }
}
