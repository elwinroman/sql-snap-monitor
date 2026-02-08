import { ApplicationError } from '../application-error'

export class ForbiddenException extends ApplicationError {
  readonly type = 'ForbiddenException'
  static readonly title = 'Acceso prohibido'
  readonly detail: string
  static readonly metadata = { status: 403, errorCode: 1005 }

  constructor(detail = 'Tu cuenta no tiene permisos suficientes para realizar esta acción o acceder a este recurso.') {
    super('[auth] Acceso prohibido por falta de permisos')
    this.detail = detail
  }
}
