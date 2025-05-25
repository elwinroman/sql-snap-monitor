import { ApplicationError } from '@shared/application/application-error'

export class NotProvidedTokenException extends ApplicationError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor(type: string) {
    super({ message: '[AUTH] Token no proporcionado' })
    this.title = 'Token de autenticación requerido'
    this.detail = `Debes proporcionar el '${type}' para acceder a este recurso.`
  }
}
