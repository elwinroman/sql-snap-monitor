import type { ForCryptoPort } from '../../domain/ports'

/**
 * Use Case: Desencriptar una credencial
 * Responsabilidad: Orquestar la desencriptación de un texto encriptado
 */
export class DecryptCredentialUseCase {
  constructor(private readonly cryptoService: ForCryptoPort) {}

  execute(encryptedText: string): string {
    if (!encryptedText || encryptedText.trim().length === 0) {
      throw new Error('El texto a desencriptar no puede estar vacío')
    }

    const decrypted = this.cryptoService.decrypt(encryptedText)

    if (decrypted === undefined) {
      throw new Error('No se pudo desencriptar el texto. Verifica que el texto esté correctamente encriptado.')
    }

    return decrypted
  }
}
