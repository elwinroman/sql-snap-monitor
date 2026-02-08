import { InfrastructureError } from '@core/infrastructure-error.exception'

export class CacheConnectionErrorException extends InfrastructureError {
  readonly type = 'CacheConnectionErrorException'
  static readonly title = 'Error de conexión a caché'
  readonly detail: string
  static readonly metadata = { status: 500, errorCode: 5100 }

  constructor(errorMessage?: string, cause?: Error) {
    super(`[cache] Conexión fallida con ioValkey: ${errorMessage ?? 'desconocido'}`, cause)
    this.detail = `Ha ocurrido un error al intentar conectar con el sistema de caché${errorMessage ? `: ${errorMessage}` : '.'}`
  }
}
