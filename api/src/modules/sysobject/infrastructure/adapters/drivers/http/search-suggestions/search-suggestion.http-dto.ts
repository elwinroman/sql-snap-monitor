import { TypeSysObject, TypeSysObjectEnum } from '@sysobject/domain/schemas/sysobject'
import { z } from 'zod'

export const SearchSuggestionQuerySchema = z.object({
  name: z.string().trim().min(3).max(128),
  type: z
    .string()
    .transform(val => val.toUpperCase())
    .refine(val => Object.values(TypeSysObjectEnum).includes(val as TypeSysObject), {
      message: `Type must be one of: ${Object.values(TypeSysObjectEnum).join(', ')}`,
    }),
})

export type SearchSuggestionHttpDto = z.infer<typeof SearchSuggestionQuerySchema>
