import { z } from 'zod'

export const DeleteFavoritoParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
})

export type DeleteFavoritoParams = z.infer<typeof DeleteFavoritoParamsSchema>
