import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { COMMON_ERROR_CODES, TYPE_ACTION, VALIDATION_ERROR } from '@/constants/'
import { Credentials, MyCustomError, SearchResponse } from '@/models'
import { SearchService } from '@/services'

export class SearchController {
  obtenerSugerencias = async (req: Request, res: Response, next: NextFunction) => {
    const { search, type } = req.query
    const { credentials, isSessionActive } = req.session

    if (!isSessionActive) return next(new MyCustomError(COMMON_ERROR_CODES.notauthorized))

    // Validación
    try {
      const SearchSuggestionSchema = z.object({
        search: z
          .string({ required_error: VALIDATION_ERROR.required })
          .trim()
          .min(3, { message: VALIDATION_ERROR.min })
          .max(128, { message: VALIDATION_ERROR.max }),
        type: z
          .string({ required_error: VALIDATION_ERROR.required })
          .transform(val => val.trim())
          .refine(val => Object.values(TYPE_ACTION).some(({ name }) => name === val), {
            message: `Se espera que este campo reciba 'sqldefinition' o 'usertable'`,
          }),
      })

      SearchSuggestionSchema.parse({ search, type })
    } catch (err) {
      return next(err)
    }

    // Funcionalidad
    try {
      const searchService = new SearchService(credentials as Credentials)
      const { data, meta } = (await searchService.obtenerSugerencias(search as string, type as string)) as SearchResponse

      res.status(200).json({ status: 'success', statusCode: 200, data, meta })
    } catch (err) {
      next(err)
    }
  }
}
