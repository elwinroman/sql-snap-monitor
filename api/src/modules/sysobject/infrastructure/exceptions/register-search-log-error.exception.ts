import { InfrastructureError } from '@core/infrastructure-error.exception'

export class RegisterSearchLogErrorException extends InfrastructureError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor(name: string, schema: string) {
    super({ message: '[SYSOBJECT] Register search log error' })
    this.title = this.message
    this.detail = `No se ha podido registrar el log de búsqueda para '${schema}.${name}'.`
  }
}
