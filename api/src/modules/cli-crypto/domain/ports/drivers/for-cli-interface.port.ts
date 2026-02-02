/**
 * Port (interfaz) para la interfaz de usuario de la CLI
 * Define qué operaciones debe cumplir cualquier implementación de CLI
 */

export const CRYPTO_OPERATIONS = {
  ENCRYPT: 'encrypt',
  DECRYPT: 'decrypt',
  EXIT: 'exit',
} as const

export type CryptoOperation = (typeof CRYPTO_OPERATIONS)[keyof typeof CRYPTO_OPERATIONS]

export interface CryptoOperationInput {
  operation: CryptoOperation
  text: string
}

export interface ForCliInterfacePort {
  /** Muestra un mensaje al usuario */
  showMessage(message: string): void

  /** Muestra un error al usuario */
  showError(error: string): void

  /** Solicita al usuario que seleccione una operación y provea el texto */
  promptOperation(): Promise<CryptoOperationInput>

  /** Pregunta al usuario si desea continuar */
  promptContinue(): Promise<boolean>
}
