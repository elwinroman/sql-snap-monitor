import { ApplicationError } from '@shared/application/application-error'

export class NotProvidedTokenException extends ApplicationError {
  readonly type = 'NotProvidedTokenException'
  static readonly title = 'Token de autenticación requerido'
  readonly detail: string
  static readonly metadata = { status: 401, errorCode: 2004 }

  constructor(tokenType: string) {
    super(`[auth] Token no proporcionado: ${tokenType}`)
    this.detail = `Debes proporcionar el '${tokenType}' para acceder a este recurso.`
  }
}
