import type { ForCryptoPort } from '../../domain/ports'

/**
 * Use Case: Encriptar una credencial
 * Responsabilidad: Orquestar la encriptación de un texto plano
 */
export class EncryptCredentialUseCase {
  constructor(private readonly cryptoService: ForCryptoPort) {}

  execute(plainText: string): string {
    if (!plainText || plainText.trim().length === 0) {
      throw new Error('El texto a encriptar no puede estar vacío')
    }

    return this.cryptoService.encrypt(plainText)
  }
}
