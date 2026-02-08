import { ApplicationError } from '@shared/application/application-error'

export class UserAlreadyAuthenticatedException extends ApplicationError {
  readonly type = 'UserAlreadyAuthenticatedException'
  static readonly title = 'Sesión ya iniciada'
  readonly detail = 'Ya tienes una sesión activa. Cierra la sesión actual antes de iniciar una nueva.'
  static readonly metadata = { status: 409, errorCode: 2001 }

  constructor() {
    super('[auth] Usuario ya autenticado')
  }
}
