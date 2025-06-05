import { authenticatorProxyAdapter } from '@auth/infrastructure/adapters/drivers/proxies/composition-root'
import { getAuthContext } from '@auth/infrastructure/auth-context'
import { DatabaseName, getStaticDatabaseCredentials } from '@shared/infrastructure/store'
import { SysObjectService } from '@sysobject/application/sysobject.service'
import { GetProdSysObjectUseCase } from '@sysobject/application/use-cases/get-prod-sysobject.use-case'
import { GetSysObjectUseCase } from '@sysobject/application/use-cases/get-sysobject.use-case'
import { GetSysUsertableUseCase } from '@sysobject/application/use-cases/get-sysusertable.use-case'
import { RegisterSearchLogUseCase } from '@sysobject/application/use-cases/register-search-log.use-case'
import { SearchSuggestionsUseCase } from '@sysobject/application/use-cases/search-suggestions.use-case'
import { MssqlLogRepositoryAdapter } from '@sysobject/infrastructure/adapters/drivens/mssql-log-repository.adapter'
import { MssqlProdSysObjectRepositoryAdapter } from '@sysobject/infrastructure/adapters/drivens/mssql-prod-sysobject-repository.adapter'
import { MssqlSysObjectRepositoryAdapter } from '@sysobject/infrastructure/adapters/drivens/mssql-sysobject-repository.adapter'
import { MssqlSysUsertableRepositoryAdapter } from '@sysobject/infrastructure/adapters/drivens/mssql-sysusertable-repositorey.adapter'

import { GetProdSysObjectController } from './get-prod-sysobject/get-prod-sysobject.controller'
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
  const prodSysObjectRepository = new MssqlProdSysObjectRepositoryAdapter()
  const logRepository = new MssqlLogRepositoryAdapter()

  // USE CASES
  const registerSearchLogUseCase = new RegisterSearchLogUseCase(logRepository)

  const getSysObjectUseCase = new GetSysObjectUseCase(sysObjectRepository, registerSearchLogUseCase, getAuthContext) // se pasa el contexto para el registro de LOGs de búsqueda
  const searchSuggestionsUseCase = new SearchSuggestionsUseCase(sysObjectRepository)
  const getSysUsertableUseCase = new GetSysUsertableUseCase(sysUsertableRepository)

  const getProdSysObjectUseCase = new GetProdSysObjectUseCase(
    prodSysObjectRepository,
    registerSearchLogUseCase,
    getStaticDatabaseCredentials(DatabaseName.PREPROD).credentials.database, // nombre de la BD de pre-producción
  )

  // SERVICE ORCHESTRATOR
  const sysObjectService = new SysObjectService(
    getSysObjectUseCase,
    searchSuggestionsUseCase,
    getSysUsertableUseCase,
    getProdSysObjectUseCase,
  )

  // CONTROLLERS
  const searchSuggestionsController = new SearchSuggestionsController(sysObjectService)
  const getSysObjectController = new GetSysObjectController(sysObjectService)
  const getSysUsertableController = new GetSysUsertableController(sysObjectService)
  const getProdSysObjectController = new GetProdSysObjectController(sysObjectService, authenticatorProxyAdapter)

  return {
    getSysObjectController,
    searchSuggestionsController,
    getSysUsertableController,
    getProdSysObjectController,
  }
}
export const { getSysObjectController, searchSuggestionsController, getSysUsertableController, getProdSysObjectController } =
  compositionMock()
