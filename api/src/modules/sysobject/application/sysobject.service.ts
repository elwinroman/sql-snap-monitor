import { ForSysObjectRetrievalPort, SearchSysObject } from '@sysobject/domain/ports/drivers/for-sysobject-retrieval.port'
import { PermissionRol } from '@sysobject/domain/schemas/permission-rol'
import { SysObject } from '@sysobject/domain/schemas/sysobject'
import { Usertable } from '@sysobject/domain/schemas/usertable'

import { GetSysObjectUseCase } from './use-cases/get-sysobject.use-case'
import { GetSysUsertableUseCase } from './use-cases/get-sysusertable.use-case'
import { SearchSuggestionsUseCase } from './use-cases/search-suggestions.use-case'

export class SysObjectService implements ForSysObjectRetrievalPort {
  constructor(
    private readonly getSysObjectUC: GetSysObjectUseCase,
    private readonly searchSuggestionsUC: SearchSuggestionsUseCase,
    private readonly getSysUsertableUC: GetSysUsertableUseCase,
  ) {}

  async getSysObject(id: number): Promise<SysObject & { permission: PermissionRol[] }> {
    return this.getSysObjectUC.execute(id)
  }

  async searchSuggestions(name: string, type: string): Promise<SearchSysObject[]> {
    return this.searchSuggestionsUC.execute(name, type)
  }

  async getSysUsertable(id: number): Promise<Usertable> {
    return this.getSysUsertableUC.execute(id)
  }
}
