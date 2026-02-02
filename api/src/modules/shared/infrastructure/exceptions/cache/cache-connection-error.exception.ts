import { InfrastructureError } from '@shared/infrastructure/infrastructure-error.exception'

export class CacheConnectionErrorException extends InfrastructureError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor(msg?: string) {
    super({ message: '[cache] Conexión fallida con el sistema de caché ioValkey' })
    this.title = this.message

    this.detail = `Ha ocurrido un error al intentar conectar con ioValkey '${msg}'`
  }
}
