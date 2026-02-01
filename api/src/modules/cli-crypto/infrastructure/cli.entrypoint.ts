import picocolors from 'picocolors'

import { DecryptCredentialUseCase, EncryptCredentialUseCase } from '../application'
import { CRYPTO_OPERATIONS } from '../domain'
import { CryptoCodeAdapter, InquirerCliAdapter } from './adapters'

/**
 * Punto de entrada de la CLI de criptografía
 * Responsabilidad: Orquestar el flujo principal de la aplicación
 */
export class CliCryptoEntrypoint {
  private readonly cliInterface: InquirerCliAdapter
  private readonly encryptUseCase: EncryptCredentialUseCase
  private readonly decryptUseCase: DecryptCredentialUseCase

  constructor() {
    // Instanciar adapters
    const cryptoAdapter = new CryptoCodeAdapter()
    this.cliInterface = new InquirerCliAdapter()

    // Instanciar use cases con dependency injection
    this.encryptUseCase = new EncryptCredentialUseCase(cryptoAdapter)
    this.decryptUseCase = new DecryptCredentialUseCase(cryptoAdapter)
  }

  async run(): Promise<void> {
    this.showWelcome()

    let shouldContinue = true

    while (shouldContinue) {
      try {
        const input = await this.cliInterface.promptOperation()

        if (input.operation === CRYPTO_OPERATIONS.EXIT) {
          this.showGoodbye()
          break
        }

        const result = this.processOperation(input.operation, input.text)
        this.cliInterface.showMessage(`Resultado:\n${picocolors.cyan(result)}`)

        shouldContinue = await this.cliInterface.promptContinue()
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
        this.cliInterface.showError(errorMessage)
        shouldContinue = await this.cliInterface.promptContinue()
      }
    }

    this.showGoodbye()
  }

  private processOperation(operation: string, text: string): string {
    switch (operation) {
      case CRYPTO_OPERATIONS.ENCRYPT:
        return this.encryptUseCase.execute(text)
      case CRYPTO_OPERATIONS.DECRYPT:
        return this.decryptUseCase.execute(text)
      default:
        throw new Error(`Operación no soportada: ${operation}`)
    }
  }

  private showWelcome(): void {
    console.log(picocolors.bold(picocolors.blue('\n🔐 CLI de Criptografía - CryptoCode')))
    console.log(picocolors.dim('Encripta y desencripta credenciales de forma segura\n'))
  }

  private showGoodbye(): void {
    console.log(picocolors.dim('\n👋 ¡Hasta luego!\n'))
  }
}
