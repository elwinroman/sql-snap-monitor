import { InfrastructureError } from '@core/infrastructure-error.exception'

export class DatabaseConnectionErrorException extends InfrastructureError {
  readonly type = 'DatabaseConnectionErrorException'
  static readonly title = 'Error de conexión a base de datos'
  readonly detail: string
  static readonly metadata = { status: 500, errorCode: 5000 }

  constructor(code: string, message: string, cause?: Error) {
    super(`[db] Error de conexión: ${code} - ${message}`, cause)
    this.detail = `Hubo un error relacionado con la conexión y el pool de conexiones. ${code} - ${message}`
  }
}
