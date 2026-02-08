import { DomainError } from '@shared/domain/domain-error'

export class PermissionDenyException extends DomainError {
  readonly type = 'PermissionDenyException'
  static readonly title = 'Acceso denegado'
  readonly detail: string
  static readonly metadata = { status: 403, errorCode: 2005 }

  constructor(
    detail = 'Tu cuenta está inactiva. No puedes acceder al sistema. Por favor, contacta al administrador para más información o para reactivar tu cuenta.',
  ) {
    super('[auth] Usuario sin permisos')
    this.detail = detail
  }
}
