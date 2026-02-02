import { InfrastructureError } from '@core/infrastructure-error.exception'

export class DatabaseConnectionErrorException extends InfrastructureError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor(code: string, message: string) {
    super({ message: `Error de conexión. ${code} - ${message}` })
    this.title = this.message
    this.detail = `Hubo un error relacionado con la conexión y el pool de conexiones. ${code} - ${message}`
  }
}
