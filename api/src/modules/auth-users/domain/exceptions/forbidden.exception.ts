import { DomainError } from '@shared/core/domain/domain-error'

export class ForbiddenException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: 'Forbidden' })
    this.title = this.message
    this.detail = 'No tienes permitido acceder a este recurso.'
  }
}
