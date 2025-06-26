import { FavoritoManagerService } from '@favorito/application/favorito-manager.service'
import { DeleteFavoritoUseCase } from '@favorito/application/use-cases/delete-favorito.use-case'
import { GetAllFavoritosUseCase } from '@favorito/application/use-cases/get-all-favorito.use-case'
import { RegisterFavoritoUseCase } from '@favorito/application/use-cases/register-favorito.use-case'
import { MSSQLFavoritoRepositoryAdapter } from '@favorito/infrastructure/adapters/drivens/mssql-favorito-repository.adapter'

import { RegisterFavoritoController } from './controllers/register-favorito/register-favorito.controller'

/*************************************
 * Inyección de dependencias API-REST
 *************************************/
const compositionRoot = () => {
  // DRIVENS
  const repository = new MSSQLFavoritoRepositoryAdapter() // repositorio de favorito

  // USE CASES
  const registerFavoritoUC = new RegisterFavoritoUseCase(repository)
  const getAllFavoritosUC = new GetAllFavoritosUseCase(repository)
  const deleteFavoritoUC = new DeleteFavoritoUseCase(repository)

  // SERVICE ORCHESTRATOR
  const service = new FavoritoManagerService(registerFavoritoUC, getAllFavoritosUC, deleteFavoritoUC)

  // CONTROLLERS
  const registerFavoritoController = new RegisterFavoritoController(service)

  return { registerFavoritoController }
}

export const { registerFavoritoController } = compositionRoot()
