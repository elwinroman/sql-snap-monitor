import { InfrastructureError } from '@shared/infrastructure/infrastructure-error.exception'

export class DatabasePreparedStatementErrorException extends InfrastructureError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor(code: string, message: string) {
    super({ message: `Error en la sentencia preparada. ${code} - ${message}` })
    this.title = this.message
    this.detail = `Hubo un error relacionado con las sentencias preparadas. ${code} - ${message}`
  }
}
