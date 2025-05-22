import { DomainError } from '@shared/domain/domain-error'

export class UserAlreadyAuthenticatedException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: 'Sesión activa' })
    this.title = this.message
    this.detail = 'Ya existe una sesión activa con tu cuenta.'
  }
}
