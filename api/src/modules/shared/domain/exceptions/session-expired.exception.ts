import { DomainError } from '../domain-error'

export class SessionExpiredException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string
  readonly statusCode: number

  constructor() {
    super({ message: 'La sesión ya no está activa' })
    this.title = this.message
    this.detail = 'Tu sesión ha expirado o ha sido cerrada. Por favor, vuelve a iniciar sesión para continuar.'
    this.statusCode = 403
  }
}
