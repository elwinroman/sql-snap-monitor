import { DomainError } from './domain-error'

export class DatabaseTimeoutException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: 'Error de conexión con el servidor.' })
    this.title = this.message
    this.detail = 'No se ha podido conectar con el servidor. Tiempo de espera agotado.'
  }
}
