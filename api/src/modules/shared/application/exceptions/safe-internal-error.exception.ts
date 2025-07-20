import { ApplicationError } from '../application-error'

export class SafeInternalServerErrorException extends ApplicationError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: '[INTERNAL_SAFE] Error interno encapsulado' })
    this.title = 'Error interno del sistema'
    this.detail = 'Ha ocurrido un error inesperado.'
  }
}
