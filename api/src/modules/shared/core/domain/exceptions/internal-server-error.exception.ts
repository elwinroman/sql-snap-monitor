import { DomainError } from '../domain-error'

export class InternalServerErrorException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: 'Error interno del sistema.' })
    this.title = this.message
    this.detail = 'Ha ocurrido un error inesperado. Intente nuevamente más tarde o contacte con soporte si el problema persiste.'
  }
}
