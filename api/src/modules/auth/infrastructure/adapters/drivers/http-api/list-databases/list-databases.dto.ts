import { z } from 'zod'

export const ListDatabasesSchema = z.object({
  host: z.string().min(1).max(64),
  user: z.string().min(1).max(64),
  password: z.string().max(64), // en una conexión SQL (sql server) existe la posibilidad de que la password sea vacía
})

export type ListDatabasesHttpDto = z.infer<typeof ListDatabasesSchema>
