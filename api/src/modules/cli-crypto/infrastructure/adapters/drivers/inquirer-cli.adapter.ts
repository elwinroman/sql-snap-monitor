import inquirer from 'inquirer'
import picocolors from 'picocolors'

import { CRYPTO_OPERATIONS, type CryptoOperationInput, type ForCliInterfacePort } from '../../../domain/ports'

/**
 * Adapter para la interfaz de usuario usando Inquirer (prompts interactivos)
 * Implementa el puerto ForCliInterfacePort
 */
export class InquirerCliAdapter implements ForCliInterfacePort {
  showMessage(message: string): void {
    console.log(picocolors.green(`\n✓ ${message}\n`))
  }

  showError(error: string): void {
    console.error(picocolors.red(`\n✗ Error: ${error}\n`))
  }

  async promptOperation(): Promise<CryptoOperationInput> {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'operation',
        message: '¿Qué operación deseas realizar?',
        choices: [
          { name: '🔒 Encriptar texto', value: CRYPTO_OPERATIONS.ENCRYPT },
          { name: '🔓 Desencriptar texto', value: CRYPTO_OPERATIONS.DECRYPT },
          { name: '👋 Salir', value: CRYPTO_OPERATIONS.EXIT },
        ],
      },
    ])

    if (answers.operation === CRYPTO_OPERATIONS.EXIT) {
      return { operation: CRYPTO_OPERATIONS.EXIT, text: '' }
    }

    const textAnswer = await inquirer.prompt([
      {
        type: 'input',
        name: 'text',
        message: answers.operation === CRYPTO_OPERATIONS.ENCRYPT ? 'Ingresa el texto a encriptar:' : 'Ingresa el texto a desencriptar:',
        validate: (input: string) => {
          if (!input || input.trim().length === 0) {
            return 'El texto no puede estar vacío'
          }
          return true
        },
      },
    ])

    return {
      operation: answers.operation,
      text: textAnswer.text,
    }
  }

  async promptContinue(): Promise<boolean> {
    const answer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'continue',
        message: '¿Deseas realizar otra operación?',
        default: true,
      },
    ])

    return answer.continue
  }
}
