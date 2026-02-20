import { z } from 'zod'

export const DeleteBusquedaRecienteParamsSchema = z.object({
  id: z.string().length(32),
})

export type DeleteBusquedaRecienteHttpDto = z.infer<typeof DeleteBusquedaRecienteParamsSchema>
