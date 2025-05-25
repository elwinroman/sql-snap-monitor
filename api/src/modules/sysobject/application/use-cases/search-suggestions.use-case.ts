import { ForSysObjectRepositoryPort } from '@sysobject/domain/ports/drivens/for-sysobject-repository.port'
import { SearchSysObject } from '@sysobject/domain/ports/drivers/for-sysobject-retrieval.port'

export class SearchSuggestionsUseCase {
  constructor(private readonly sysObjectRepository: ForSysObjectRepositoryPort) {}

  async execute(name: string, type: string): Promise<SearchSysObject[]> {
    const suggestions = await this.sysObjectRepository.findByNameAndType(name, type)

    return suggestions
  }
}
