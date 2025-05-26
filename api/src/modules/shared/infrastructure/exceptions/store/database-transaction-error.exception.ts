import { InfrastructureError } from '@shared/infrastructure/infrastructure-error.exception'

export class DatabaseTransactionErrorException extends InfrastructureError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor(code: string, message: string) {
    super({ message: `Error en la transacción. ${code} - ${message}` })
    this.title = this.message
    this.detail = `Hubo un error relacionados con la creación, confirmación y anulación de transacciones. ${code} - ${message}`
  }
}
