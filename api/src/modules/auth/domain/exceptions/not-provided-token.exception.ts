import { DomainError } from '@shared/domain/domain-error'

export class NotProvidedTokenException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor(type: string) {
    super({ message: 'Token no proporcionado' })
    this.title = this.message
    this.detail = `No se ha proporcionado el ${type}.`
  }
}
