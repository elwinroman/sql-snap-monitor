import { z } from 'zod'

export const GetSysObjectParamsSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .refine(n => n > 0),
})

export type GetSysObjectHttpDto = z.infer<typeof GetSysObjectParamsSchema>
