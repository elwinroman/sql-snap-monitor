import { z } from 'zod'

export const DeleteBusquedaRecienteParamsSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .refine(n => n > 0),
})

export type DeleteBusquedaRecienteHttpDto = z.infer<typeof DeleteBusquedaRecienteParamsSchema>
