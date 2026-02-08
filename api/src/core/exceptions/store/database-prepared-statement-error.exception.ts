import { InfrastructureError } from '@core/infrastructure-error.exception'

export class DatabasePreparedStatementErrorException extends InfrastructureError {
  readonly type = 'DatabasePreparedStatementErrorException'
  static readonly title = 'Error en sentencia preparada'
  readonly detail: string
  static readonly metadata = { status: 500, errorCode: 5003 }

  constructor(code: string, message: string, cause?: Error) {
    super(`[db] Error en sentencia preparada: ${code} - ${message}`, cause)
    this.detail = `Hubo un error relacionado con las sentencias preparadas. ${code} - ${message}`
  }
}
