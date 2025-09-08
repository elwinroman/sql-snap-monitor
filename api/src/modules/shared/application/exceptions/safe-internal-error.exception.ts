import { ApplicationError } from '../application-error'

export class SafeInternalServerErrorException extends ApplicationError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor({ detail }: { detail: string } = { detail: 'No pudimos completar la operación. Por favor, contacta con el administrador.' }) {
    super({ message: '[INTERNAL_SAFE] Error interno encapsulado' })
    this.title = 'Error interno del sistema'
    this.detail = detail
  }
}
