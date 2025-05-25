import { ApplicationError } from '@shared/application/application-error'

export class TokenExpiredException extends ApplicationError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor(type: string) {
    super({ message: '[AUTH] Token expirado' })
    this.title = 'Autenticación expirada'
    this.detail = `El ${type} ha expirado.`
  }
}
