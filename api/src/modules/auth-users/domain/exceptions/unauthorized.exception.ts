import { DomainError } from '@shared/core/domain/domain-error'

export class UnauthorizedException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: 'Unauthorized' })
    this.title = this.message
    this.detail = 'No estás autorizado para acceder a este recurso.'
  }
}
