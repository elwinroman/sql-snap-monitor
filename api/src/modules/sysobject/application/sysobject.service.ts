import { ForSysObjectRetrievalPort, SearchSysObject } from '@sysobject/domain/ports/drivers/for-sysobject-retrieval.port'
import { PermissionRol } from '@sysobject/domain/schemas/permission-rol'
import { SysObject } from '@sysobject/domain/schemas/sysobject'

import { GetSysObjectUseCase } from './use-cases/get-sysobject.use-case'
import { SearchSuggestionsUseCase } from './use-cases/search-suggestions.use-case'

export class SysObjectService implements ForSysObjectRetrievalPort {
  constructor(
    private readonly getSysObjectUC: GetSysObjectUseCase,
    private readonly searchSuggestionsUC: SearchSuggestionsUseCase,
  ) {}

  async getSysObject(id: number): Promise<SysObject & { permission: PermissionRol[] }> {
    return this.getSysObjectUC.execute(id)
  }

  async searchSuggestions(name: string, type: string): Promise<SearchSysObject[]> {
    return this.searchSuggestionsUC.execute(name, type)
  }

  // async getSysObjectFromPreprod(name: string, schema: string): Promise<SysObject> {
  //   // code
  // }
}
