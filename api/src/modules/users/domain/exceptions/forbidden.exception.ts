import { DomainError } from '@shared/core/domain/domain-error'

export class ForbiddenException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: 'Acceso prohibido.' })
    this.title = this.message
    this.detail =
      'No tienes autorización para acceder a este recurso. Si crees que esto es un error, por favor contacta con el administrador.'
  }
}
