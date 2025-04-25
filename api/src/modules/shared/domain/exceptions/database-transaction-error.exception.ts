import { DomainError } from '@shared/domain/domain-error'

export class DatabaseTransactionErrorException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor(code: string, message: string) {
    super({ message: 'Error en la transacción.' })
    this.title = this.message
    this.detail = `Hubo un error relacionados con la creación, confirmación y anulación de transacciones. ${code} - ${message}`
  }
}
