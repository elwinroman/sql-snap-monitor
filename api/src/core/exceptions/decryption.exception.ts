import { InfrastructureError } from '@core/infrastructure-error.exception'

export class DecryptionException extends InfrastructureError {
  readonly type = 'DecryptionException'
  static readonly title = 'Error de desencriptación'
  readonly detail: string
  static readonly metadata = { status: 500, errorCode: 5200 }

  constructor(encryptedPreview: string, visibleStart = 3, visibleEnd = 2) {
    let hint = '[No disponible - Preview corto]'

    if (encryptedPreview.length > 5) {
      const start = encryptedPreview.slice(0, visibleStart)
      const end = encryptedPreview.slice(-visibleEnd)
      const masked = '*'.repeat(4)
      hint = `${start}${masked}${end}`
    }

    super(`[crypto] Desencriptación fallida para '${hint}'`)
    this.detail = `No se pudo completar la operación de desencriptación. Probablemente no se está encriptando correctamente las variables de entorno. Preview: "${hint}"`
  }
}
