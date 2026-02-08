import { ApplicationError } from '@shared/application/application-error'

export class TokenExpiredException extends ApplicationError {
  readonly type = 'TokenExpiredException'
  static readonly title = 'Autenticación expirada'
  readonly detail: string
  static readonly metadata = { status: 401, errorCode: 2003 }

  constructor(tokenType: string) {
    super(`[auth] Token expirado: ${tokenType}`)
    this.detail = `El ${tokenType} ha expirado.`
  }
}
