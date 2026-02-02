import { SysObjectService } from '@sysobject/application/sysobject.service'
import { TypeSysObject } from '@sysobject/domain/schemas/sysobject'
import { NextFunction, Request, Response } from 'express'

import { SearchSuggestionHttpDto, SearchSuggestionQuerySchema } from './search-suggestion.http-dto'

export class SearchSuggestionsController {
  constructor(private readonly sysObjectService: SysObjectService) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const { name, type } = req.query

    try {
      const validateData: SearchSuggestionHttpDto = SearchSuggestionQuerySchema.parse({ name, type })
      const result = await this.sysObjectService.searchSuggestions(validateData.name, validateData.type as TypeSysObject)

      return res.status(200).json({ correlationId: req.correlationId, data: result })
    } catch (err) {
      next(err)
    }
  }
}
