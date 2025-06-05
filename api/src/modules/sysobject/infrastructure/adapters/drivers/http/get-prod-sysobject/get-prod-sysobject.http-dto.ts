import { z } from 'zod'

export const GetProdSysObjectParamsSchema = z.object({
  name: z.string().trim().min(3).max(128),
  schema: z.string().trim().min(1).max(64),
  actionType: z.coerce.number().int().positive(),
})

export type GetProdSysObjectHttpDto = z.infer<typeof GetProdSysObjectParamsSchema>
