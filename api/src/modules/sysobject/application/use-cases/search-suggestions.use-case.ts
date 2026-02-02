import { logger } from '@core/logger/pino-instance'
import { parseSqlObjectTypeCondition } from '@core/utils'
import { ForSysObjectRepositoryPort } from '@sysobject/domain/ports/drivens/for-sysobject-repository.port'
import { SearchSysObject } from '@sysobject/domain/ports/drivers/for-sysobject-retrieval.port'
import { TypeSysObject } from '@sysobject/domain/schemas/sysobject'

export class SearchSuggestionsUseCase {
  constructor(private readonly sysObjectRepository: ForSysObjectRepositoryPort) {}

  async execute(name: string, type: TypeSysObject): Promise<SearchSysObject[]> {
    const typeFormatCondition = parseSqlObjectTypeCondition(type) // formatea el tipo de objeto para inyectarse en sql
    const suggestions = await this.sysObjectRepository.findByNameAndType(name, typeFormatCondition)

    logger.info('[sysobject] Resultados de búsqueda de objetos obtenidos', {
      actionDetails: {
        searchTerm: name,
        type,
        resultsCount: suggestions.length,
      },
    })

    return suggestions
  }
}
