import { z } from 'zod'

export const SwitchDatabaseSchema = z.object({
  database: z.string().min(1).max(128),
})

export type SwitchDatabaseHttpDto = z.infer<typeof SwitchDatabaseSchema>
