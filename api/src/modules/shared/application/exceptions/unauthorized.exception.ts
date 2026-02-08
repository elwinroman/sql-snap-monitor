import { ApplicationError } from '../application-error'

export class UnauthorizedException extends ApplicationError {
  readonly type = 'UnauthorizedException'
  static readonly title = 'Acceso denegado'
  readonly detail: string
  static readonly metadata = { status: 401, errorCode: 1004 }

  constructor(detail = 'No tienes los permisos necesarios para acceder a este recurso. Por favor, inicia sesión para continuar.') {
    super('[auth] Acceso denegado por falta de autorización')
    this.detail = detail
  }
}
