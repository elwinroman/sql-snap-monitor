import { InfrastructureError } from '@core/infrastructure-error.exception'

export class CacheCredentialNotFoundException extends InfrastructureError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor(id: number) {
    super({ message: '[AUTH] Credentiales no encontradas en caché' })
    this.title = this.message
    this.detail =
      `No se encontraron las credenciales de base de datos para el usuario con ID '${id}' en la caché. ` +
      `Este es un error interno inesperado y puede deberse a una limpieza involuntaria o una falla en el mecanismo de almacenamiento en caché.`
  }
}
