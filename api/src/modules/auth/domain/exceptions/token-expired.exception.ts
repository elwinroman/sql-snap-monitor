import { DomainError } from '@shared/domain/domain-error'

export class TokenExpiredException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor(type: string) {
    super({ message: 'Token expirado' })
    this.title = this.message
    this.detail = `El ${type} ha expirado.`
  }
}
