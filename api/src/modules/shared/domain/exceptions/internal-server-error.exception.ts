import { DomainError } from '../domain-error'

export class InternalServerErrorException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: '[INTERNAL] Error interno del sistema' })
    this.title = 'Error interno del sistema'
    this.detail = 'Ha ocurrido un error inesperado. Intente nuevamente más tarde o contacte con soporte si el problema persiste.'
  }
}
