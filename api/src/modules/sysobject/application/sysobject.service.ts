import { ForSysObjectRetrievalPort, SearchSysObject } from '@sysobject/domain/ports/drivers/for-sysobject-retrieval.port'
import { LogObjectContext, LogProdObjectContext } from '@sysobject/domain/schemas/log-object-context'
import { PermissionRol } from '@sysobject/domain/schemas/permission-rol'
import { SysObject } from '@sysobject/domain/schemas/sysobject'
import { Usertable } from '@sysobject/domain/schemas/usertable'

import { GetProdSysObjectUseCase } from './use-cases/get-prod-sysobject.use-case'
import { GetSysObjectUseCase } from './use-cases/get-sysobject.use-case'
import { GetSysUsertableUseCase } from './use-cases/get-sysusertable.use-case'
import { SearchSuggestionsUseCase } from './use-cases/search-suggestions.use-case'
export class SysObjectService implements ForSysObjectRetrievalPort {
  constructor(
    private readonly getSysObjectUC: GetSysObjectUseCase,
    private readonly searchSuggestionsUC: SearchSuggestionsUseCase,
    private readonly getSysUsertableUC: GetSysUsertableUseCase,
    private readonly getProdSysObjectUC: GetProdSysObjectUseCase,
  ) {}

  async getSysObject(id: number, log: LogObjectContext): Promise<SysObject & { permission: PermissionRol[] }> {
    return this.getSysObjectUC.execute(id, log)
  }

  async searchSuggestions(name: string, type: string): Promise<SearchSysObject[]> {
    return this.searchSuggestionsUC.execute(name, type)
  }

  async getSysUsertable(id: number, log: LogObjectContext): Promise<Usertable> {
    return this.getSysUsertableUC.execute(id, log)
  }

  async getProdSysObject(
    name: string,
    schema: string,
    actionType: number,
    log: LogProdObjectContext,
  ): Promise<SysObject & { permission: PermissionRol[] }> {
    return this.getProdSysObjectUC.execute(name, schema, actionType, log)
  }
}
