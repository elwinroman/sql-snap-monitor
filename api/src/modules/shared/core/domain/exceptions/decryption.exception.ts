import { DomainError } from '../domain-error'

export class DecryptionException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: 'Error en la desencriptación.' })
    this.title = this.message
    this.detail = 'Ha ocurrido un error en la desencriptación.'
  }
}
