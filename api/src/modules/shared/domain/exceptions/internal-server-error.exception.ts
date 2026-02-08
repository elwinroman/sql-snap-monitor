import { DomainError } from '../domain-error'

export class InternalServerErrorException extends DomainError {
  readonly type = 'InternalServerErrorException'
  static readonly title = 'Error interno del sistema'
  readonly detail: string
  static readonly metadata = { status: 500, errorCode: 1002 }

  constructor(detail = 'Ha ocurrido un error inesperado. Intente nuevamente más tarde o contacte con soporte si el problema persiste.') {
    super('[internal] Error interno del sistema')
    this.detail = detail
  }
}
