import { SysObjectService } from '@sysobject/application/sysobject.service'
import { GetSysObjectUseCase } from '@sysobject/application/use-cases/get-sysobject.use-case'
import { GetSysUsertableUseCase } from '@sysobject/application/use-cases/get-sysusertable.use-case'
import { SearchSuggestionsUseCase } from '@sysobject/application/use-cases/search-suggestions.use-case'
import { MssqlSysObjectRepositoryAdapter } from '@sysobject/infrastructure/adapters/drivens/mssql-sysobject-repository.adapter'
import { MssqlSysUsertableRepositoryAdapter } from '@sysobject/infrastructure/adapters/drivens/mssql-sysusertable-repositorey.adapter'

import { GetSysObjectController } from './get-sysobject/get-sysobject.controller'
import { GetSysUsertableController } from './get-sysusertable/get-sysusertable.controller'
import { SearchSuggestionsController } from './search-suggestions/search-suggestions.controller'

/*************************************
 * Inyección de dependencias API-REST
 *************************************/
const compositionMock = () => {
  // DRIVENS
  const sysObjectRepository = new MssqlSysObjectRepositoryAdapter()
  const sysUsertableRepository = new MssqlSysUsertableRepositoryAdapter()

  // USE CASES
  const getSysObjectUseCase = new GetSysObjectUseCase(sysObjectRepository)
  const searchSuggestionsUseCase = new SearchSuggestionsUseCase(sysObjectRepository)
  const getSysUsertableUseCase = new GetSysUsertableUseCase(sysUsertableRepository)

  // SERVICE ORCHESTRATOR
  const sysObjectService = new SysObjectService(getSysObjectUseCase, searchSuggestionsUseCase, getSysUsertableUseCase)

  // CONTROLLERS
  const searchSuggestionsController = new SearchSuggestionsController(sysObjectService)
  const getSysObjectController = new GetSysObjectController(sysObjectService)
  const getSysUsertableController = new GetSysUsertableController(sysObjectService)

  return {
    getSysObjectController,
    searchSuggestionsController,
    getSysUsertableController,
  }
}
export const { getSysObjectController, searchSuggestionsController, getSysUsertableController } = compositionMock()
