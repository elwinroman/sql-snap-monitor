import { DomainError } from './domain-error'

export class ValidationException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: 'Error en la validación' })
    this.title = this.message
    this.detail = 'Ha ocurrido un error en la validación de los datos. Ingrese correctamente por favor'
  }
}
