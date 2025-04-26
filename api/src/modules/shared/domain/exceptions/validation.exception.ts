import { DomainError } from '../domain-error'

export class ValidationException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: 'Error en la validación de datos.' })
    this.title = this.message
    this.detail = 'Los datos ingresados no son válidos. Por favor, revise los campos y vuelva a intentarlo.'
  }
}
