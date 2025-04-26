import { DomainError } from '@shared/domain/domain-error'

export class DatabaseConnectionErrorException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor(code: string, message: string) {
    super({ message: 'Error de conexión.' })
    this.title = this.message
    this.detail = `Hubo un error relacionado con la conexión y el pool de conexiones. ${code} - ${message}`
  }
}
