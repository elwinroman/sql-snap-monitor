import { DomainError } from '../domain-error'

export class DecryptionException extends DomainError {
  readonly type = this.constructor.name
  readonly title: string
  readonly detail: string

  constructor(encryptedPreview: string, visibleStart = 3, visibleEnd = 2, hint = '[No disponible - Preview corto]') {
    super({ message: 'Error en la desencriptación' })
    this.title = this.message

    if (encryptedPreview.length > 5) {
      const start = encryptedPreview.slice(0, visibleStart)
      const end = encryptedPreview.slice(-visibleEnd)
      const masked = '*'.repeat(encryptedPreview.length - visibleStart - visibleEnd)
      hint = `${start}${masked}${end}`
    }

    this.detail = `No se pudo completar la operación de desencriptación. Preview: "${hint}"`
  }
}
