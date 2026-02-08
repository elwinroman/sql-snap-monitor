import { InfrastructureError } from '@core/infrastructure-error.exception'

export class RegisterSearchLogErrorException extends InfrastructureError {
  readonly type = 'RegisterSearchLogErrorException'
  static readonly title = 'Error de registro de log'
  readonly detail: string
  static readonly metadata = { status: 500, errorCode: 5001 }

  constructor(name: string, schema: string, cause?: Error) {
    super(`[sysobject] Error al registrar log de búsqueda: ${schema}.${name}`, cause)
    this.detail = `No se ha podido registrar el log de búsqueda para '${schema}.${name}'.`
  }
}
