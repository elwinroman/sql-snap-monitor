import { DomainError } from '@shared/core/domain/domain-error'

export class UnauthorizedException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: 'Acceso no autorizado.' })
    this.title = this.message
    this.detail = 'No tiene los permisos necesarios para acceder a este recurso. Verifica tu autenticación o contacta al administrador.'
  }
}
