import { z } from 'zod'

export const GetSysUsertableParamsSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .refine(n => n > 0),
})

export type GetSysUsertableHttpDto = z.infer<typeof GetSysUsertableParamsSchema>
