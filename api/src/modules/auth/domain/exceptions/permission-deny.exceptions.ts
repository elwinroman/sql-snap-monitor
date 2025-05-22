import { DomainError } from '@shared/domain/domain-error'

export class PermissionDenyException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: 'Usuario inactivo' })
    this.title = this.message
    this.detail =
      'No puedes acceder al sistema porque tu usuario no se encuentra activo. Por favor, contacta al administrador del sistema para más información o para reactivar tu cuenta.'
  }
}
