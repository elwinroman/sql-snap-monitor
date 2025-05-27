import { DomainError } from '@shared/domain/domain-error'

export class InvalidCredentialsException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: '[AUTH] Credenciales inválidas' })
    this.title = 'Autenticación fallida'
    this.detail =
      'No se pudo conectar al servidor con las credenciales proporcionadas. Verifique el usuario, la contraseña, el host y/o la base de datos.'
  }
}
