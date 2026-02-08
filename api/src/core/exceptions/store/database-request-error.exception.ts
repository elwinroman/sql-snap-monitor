import { InfrastructureError } from '@core/infrastructure-error.exception'

export class DatabaseRequestErrorException extends InfrastructureError {
  readonly type = 'DatabaseRequestErrorException'
  static readonly title = 'Error en consulta de base de datos'
  readonly detail: string
  static readonly metadata = { status: 500, errorCode: 5002 }

  constructor(code: string, message: string, cause?: Error) {
    super(`[db] Error en consulta: ${code} - ${message}`, cause)
    this.detail = `Hubo un error relacionado con la ejecución de consultas y procedimientos almacenados. ${code} - ${message}`
  }
}
