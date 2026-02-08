import { InfrastructureError } from '@core/infrastructure-error.exception'

export class DatabaseTransactionErrorException extends InfrastructureError {
  readonly type = 'DatabaseTransactionErrorException'
  static readonly title = 'Error en transacción de base de datos'
  readonly detail: string
  static readonly metadata = { status: 500, errorCode: 5004 }

  constructor(code: string, message: string, cause?: Error) {
    super(`[db] Error en transacción: ${code} - ${message}`, cause)
    this.detail = `Hubo un error relacionado con la creación, confirmación y anulación de transacciones. ${code} - ${message}`
  }
}
