import { DomainError } from '@shared/domain/domain-error'

export class InvalidCredentialsException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: 'Credenciales inválidas.' })
    this.title = this.message
    this.detail =
      'No se pudo conectar al servidor con las credenciales proporcionadas. Verifique el usuario, la contraseña, el host y la base de datos.'
  }
}
