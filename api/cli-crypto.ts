#!/usr/bin/env node
import 'dotenv/config'

import { CliCryptoEntrypoint } from './src/modules/cli-crypto'

/**
 * Bootstrap de la CLI de criptografía
 * Este archivo es el punto de entrada para ejecutar la CLI
 */
async function main() {
  const cli = new CliCryptoEntrypoint()
  await cli.run()
  process.exit(0)
}

main().catch(error => {
  console.error('Error fatal:', error)
  process.exit(1)
})
