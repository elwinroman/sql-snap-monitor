/**
 * Port (interfaz) para el servicio de criptografía
 * Define qué operaciones debe cumplir cualquier implementación de crypto
 */
export interface ForCryptoPort {
  /**
   * Encripta un texto plano
   * @param plainText - Texto a encriptar
   * @returns Texto encriptado en formato base64 con salt, iv y tag
   */
  encrypt(plainText: string): string

  /**
   * Desencripta un texto encriptado
   * @param encryptedText - Texto encriptado en formato base64
   * @returns Texto plano desencriptado o undefined si falla
   */
  decrypt(encryptedText: string): string | undefined
}
