import { DomainError } from '@shared/domain/domain-error'

export class CacheConnectionErrorException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor() {
    super({ message: 'Error de conexión con el sistema de caché' })
    this.title = this.message
    this.detail = 'Ha ocurrido un error al intentar conectar con el sistema de caché.'
  }
}
