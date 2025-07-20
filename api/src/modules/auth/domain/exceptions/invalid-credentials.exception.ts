import { DomainError } from '@shared/domain/domain-error'

export class InvalidCredentialsException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: '[AUTH] Credenciales inválidas' })
    this.title = 'Autenticación fallida'
    this.detail = 'No se pudo conectar con el servidor. Verifique sus credenciales.'
  }
}
