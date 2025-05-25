import { SysObjectService } from '@sysobject/application/sysobject.service'
import { GetSysObjectUseCase } from '@sysobject/application/use-cases/get-sysobject.use-case'
import { SearchSuggestionsUseCase } from '@sysobject/application/use-cases/search-suggestions.use-case'
import { MssqlSysObjectRepositoryAdapter } from '@sysobject/infrastructure/adapters/drivens/mssql-sysobject-repository.adapter'

import { GetSysObjectController } from './get-sysobject/get-sysobject.controller'
import { SearchSuggestionsController } from './search-suggestions/search-suggestions.controller'

/*************************************
 * Inyección de dependencias API-REST
 *************************************/
const compositionMock = () => {
  // DRIVENS
  const sysObjectRepository = new MssqlSysObjectRepositoryAdapter()

  // USE CASES
  const getSysObjectUseCase = new GetSysObjectUseCase(sysObjectRepository)
  const searchSuggestionsUseCase = new SearchSuggestionsUseCase(sysObjectRepository)

  // SERVICE ORCHESTRATOR
  const sysObjectService = new SysObjectService(getSysObjectUseCase, searchSuggestionsUseCase)

  // CONTROLLERS
  const searchSuggestionsController = new SearchSuggestionsController(sysObjectService)
  const getSysObjectController = new GetSysObjectController(sysObjectService)

  return {
    getSysObjectController,
    searchSuggestionsController,
  }
}
export const { getSysObjectController, searchSuggestionsController } = compositionMock()
