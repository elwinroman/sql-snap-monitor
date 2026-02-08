import { DomainError } from '@shared/domain/domain-error'

export class InvalidCredentialsException extends DomainError {
  readonly type = 'InvalidCredentialsException'
  static readonly title = 'Autenticación fallida'
  readonly detail: string
  static readonly metadata = { status: 401, errorCode: 2000 }

  constructor(msgReason: string) {
    super('[auth] Credenciales inválidas')
    this.detail = `No se pudo establecer conexión con el servidor. ${msgReason}`
  }
}
