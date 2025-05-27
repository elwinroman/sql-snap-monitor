import { DomainError } from '@shared/domain/domain-error'

export class PermissionDenyException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: '[AUTH] Usuario inactivo' })
    this.title = 'Acceso denegado'
    this.detail =
      'Tu cuenta está inactiva. No puedes acceder al sistema. Por favor, contacta al administrador para más información o para reactivar tu cuenta.'
  }
}
