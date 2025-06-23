import { TIPO_ACCION } from '@sysobject/application/constants/action-type.constant'
import { z } from 'zod'
const allowedActionTypes = Object.values(TIPO_ACCION)

export const GetProdSysObjectParamsSchema = z.object({
  name: z.string().trim().min(3).max(128),
  schema: z.string().trim().min(1).max(64),
  actionType: z.coerce.number().refine(val => allowedActionTypes.includes(val), { message: 'Tipo de acción inválido' }),
})

export type GetProdSysObjectHttpDto = z.infer<typeof GetProdSysObjectParamsSchema>
