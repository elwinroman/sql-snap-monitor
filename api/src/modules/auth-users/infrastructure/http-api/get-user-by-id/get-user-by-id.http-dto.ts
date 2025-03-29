import { z } from 'zod'

export const GetUserByIdSchema = z.object({
  id: z
    .string()
    .transform(val => Number(val))
    .pipe(z.number({ message: 'El campo ruta [id] debe ser un número' })),
})

export type GetUserByIdHttpDto = z.infer<typeof GetUserByIdSchema>
