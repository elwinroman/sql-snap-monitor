import { DomainError } from '@shared/domain/domain-error'

export class DatabasePreparedStatementErrorException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor(code: string, message: string) {
    super({ message: 'Error en la sentencia preparada.' })
    this.title = this.message
    this.detail = `Hubo un error relacionado con las sentencias preparadas. ${code} - ${message}`
  }
}
