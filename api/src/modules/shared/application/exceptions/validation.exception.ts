import { ApplicationError } from '../application-error'

export class ValidationException extends ApplicationError {
  readonly type = 'ValidationException'
  static readonly title = 'Parámetros inválidos'
  readonly detail: string
  static readonly metadata = { status: 422, errorCode: 1000 }

  constructor(errors: string[]) {
    super(`[validation] Parámetros inválidos en el payload: ${errors.join('; ')}`)
    this.detail = 'Algunos campos no cumplen con el formato esperado. Por favor, revise los campos y vuelva a intentarlo.'
  }
}
