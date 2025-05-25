import { ApplicationError } from '../application-error'

export class ValidationException extends ApplicationError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor(errors: string[]) {
    super({ message: `[Validation] Parámetros inválidos en el payload: ${errors.join('; ')}` })
    this.title = 'Parámetros inválidos'
    this.detail = 'Algunos campos no cumplen con el formato esperado. Por favor, revise los campos y vuelva a intentarlo.'
  }
}
