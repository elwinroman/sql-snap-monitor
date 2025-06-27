import { FavoritoManagerService } from '@favorito/application/favorito-manager.service'
import { DeleteFavoritoUseCase } from '@favorito/application/use-cases/delete-favorito.use-case'
import { GetAllFavoritosUseCase } from '@favorito/application/use-cases/get-all-favorito.use-case'
import { RegisterFavoritoUseCase } from '@favorito/application/use-cases/register-favorito.use-case'
import { MSSQLFavoritoRepositoryAdapter } from '@favorito/infrastructure/adapters/drivens/mssql-favorito-repository.adapter'
import { MSSQLSysObjectRepositoryAdapter } from '@favorito/infrastructure/adapters/drivens/mssql-sysobject-repository.adapter'

import { GetAllFavoritosController } from './controllers/get-all-favoritos/get-all-favoritos.controller'
import { RegisterFavoritoController } from './controllers/register-favorito/register-favorito.controller'

/*************************************
 * Inyección de dependencias API-REST
 *************************************/
const compositionRoot = () => {
  // DRIVENS
  const repository = new MSSQLFavoritoRepositoryAdapter() // repositorio de favorito
  const sysobjectRepository = new MSSQLSysObjectRepositoryAdapter()

  // USE CASES
  const registerFavoritoUC = new RegisterFavoritoUseCase(repository)
  const getAllFavoritosUC = new GetAllFavoritosUseCase(repository, sysobjectRepository)
  const deleteFavoritoUC = new DeleteFavoritoUseCase(repository)

  // SERVICE ORCHESTRATOR
  const service = new FavoritoManagerService(registerFavoritoUC, getAllFavoritosUC, deleteFavoritoUC)

  // CONTROLLERS
  const registerFavoritoController = new RegisterFavoritoController(service)
  const getAllFavoritosController = new GetAllFavoritosController(service)

  return { registerFavoritoController, getAllFavoritosController }
}

export const { registerFavoritoController, getAllFavoritosController } = compositionRoot()
