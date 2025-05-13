import { z } from 'zod'

export const LoginUserSchema = z.object({
  host: z.string(),
  database: z.string(),
  user: z.string(),
  password: z.string(),
})

export type LoginUserHttpDto = z.infer<typeof LoginUserSchema>
