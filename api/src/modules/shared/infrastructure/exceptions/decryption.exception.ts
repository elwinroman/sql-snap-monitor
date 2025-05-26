import { InfrastructureError } from '@shared/infrastructure/infrastructure-error.exception'

export class DecryptionException extends InfrastructureError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor(encryptedPreview: string, visibleStart = 3, visibleEnd = 2, hint = '[No disponible - Preview corto]') {
    if (encryptedPreview.length > 5) {
      const start = encryptedPreview.slice(0, visibleStart)
      const end = encryptedPreview.slice(-visibleEnd)
      const masked = '*'.repeat(4)
      hint = `${start}${masked}${end}`
    }

    super({ message: `Desencriptación fallida para '${hint}'` })
    this.title = this.message
    this.detail = `No se pudo completar la operación de desencriptación. Probablemente no se está encriptando correctamente las variables de entorno. Preview: "${hint}"`
  }
}
