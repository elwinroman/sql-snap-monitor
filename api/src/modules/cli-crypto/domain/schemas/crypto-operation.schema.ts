import { z } from 'zod'

import { CRYPTO_OPERATIONS } from '../ports/drivers'

export const cryptoOperationInputSchema = z.object({
  operation: z.enum([CRYPTO_OPERATIONS.ENCRYPT, CRYPTO_OPERATIONS.DECRYPT, CRYPTO_OPERATIONS.EXIT]),
  text: z.string().min(1, 'El texto no puede estar vacío'),
})

export type CryptoOperationInputValidated = z.infer<typeof cryptoOperationInputSchema>
