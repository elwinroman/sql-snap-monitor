import { ApplicationError } from '@shared/application/application-error'

export class UnauthorizedException extends ApplicationError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: '[AUTH] Acceso denegado por falta de autorización' })
    this.title = 'Acceso denegado'
    this.detail = 'No tienes los permisos necesarios para acceder a este recurso. Por favor, inicia sesión para continuar.'
  }
}
