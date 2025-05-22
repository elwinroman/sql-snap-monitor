import { DomainError } from '../domain-error'

export class UnauthorizedException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: 'Acceso no autorizado' })
    this.title = this.message
    this.detail = 'No tienes los permisos necesarios para acceder a este recurso. Por favor, inicia sesión para continuar.'
  }
}
