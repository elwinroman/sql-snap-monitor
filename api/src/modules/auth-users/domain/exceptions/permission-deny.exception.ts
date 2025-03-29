import { DomainError } from '@shared/core/domain/domain-error'

export class PermissionDenyException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: 'PermissionDeny' })
    this.title = this.message
    this.detail = 'No tienes permitido el acceso al sistema. Si crees que es un error, contacta con tu administrador.'
  }
}
