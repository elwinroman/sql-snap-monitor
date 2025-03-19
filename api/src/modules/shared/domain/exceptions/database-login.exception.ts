import { DomainError } from './domain-error'

export class DatabaseLoginException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: 'Error de autenticación.' })
    this.title = this.message
    this.detail = 'El usuario SQL no se ha podido conectar.'
  }
}
