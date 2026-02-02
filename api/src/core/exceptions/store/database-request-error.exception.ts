import { InfrastructureError } from '@core/infrastructure-error.exception'

export class DatabaseRequestErrorException extends InfrastructureError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor(code: string, message: string) {
    super({ message: `Error en la consulta. ${code} - ${message}` })
    this.title = this.message
    this.detail = `Hubo un error relacionado con la ejecución de consultas y procedimientos almacenados. ${code} - ${message}`
  }
}
