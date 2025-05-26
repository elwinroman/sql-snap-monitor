import { ApplicationError } from '../application-error'

export class SafeInternalErrorException extends ApplicationError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: '[INTERNAL_SAFE] Error interno encapsulado' })
    this.title = 'Error interno del sistema'
    this.detail = 'Ha ocurrido un error inesperado. Intente nuevamente más tarde o contacte con soporte si el problema persiste.'
  }
}
