import { InfrastructureError } from '@core/infrastructure-error.exception'

export class CacheCredentialNotFoundException extends InfrastructureError {
  readonly type = 'CacheCredentialNotFoundException'
  static readonly title = 'Credenciales no encontradas en caché'
  readonly detail: string
  static readonly metadata = { status: 500, errorCode: 5101 }

  constructor(userId: number) {
    super(`[cache] Credenciales no encontradas para usuario: ${userId}`)
    this.detail =
      `No se encontraron las credenciales de base de datos para el usuario con ID '${userId}' en la caché. ` +
      `Este es un error interno inesperado y puede deberse a una limpieza involuntaria o una falla en el mecanismo de almacenamiento en caché.`
  }
}
