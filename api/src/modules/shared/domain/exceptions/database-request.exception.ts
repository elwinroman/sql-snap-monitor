import { DomainError } from './domain-error'

export class DatabaseRequestException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: 'Error en la consulta.' })
    this.title = this.message
    this.detail = 'Existe un error en la consulta, verifique la consulta de su repositorio'
  }
}
