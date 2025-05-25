import { ApplicationError } from '@shared/application/application-error'

export class UserAlreadyAuthenticatedException extends ApplicationError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: '[AUTH] Sesión activa' })
    this.title = 'Sesión ya iniciada'
    this.detail = 'Ya tienes una sesión activa. Cierra la sesión actual antes de iniciar una nueva.'
  }
}
