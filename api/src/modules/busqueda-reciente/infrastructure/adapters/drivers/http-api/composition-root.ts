import { BusquedaRecienteHttpManagerService } from '@busqueda-reciente/application/busqueda-reciente-http-manager.service'
import { DeleteBusquedaRecienteUseCase } from '@busqueda-reciente/application/use-cases'
import { MSSQLBusquedaRecienteRepositoryAdapter } from '@busqueda-reciente/infrastructure/adapters/drivens/mssql-busqueda-reciente-repository.adapter'

import { DeleteBusquedaRecienteController } from './delete-busqueda-reciente/delete-busqueda-reciente.controller'

/*************************************
 * Inyección de dependencias API-REST
 *************************************/
const compositionRoot = () => {
  // DRIVENS
  const repository = new MSSQLBusquedaRecienteRepositoryAdapter() // repositorio

  // USE CASES
  const deleteBusquedaRecienteUC = new DeleteBusquedaRecienteUseCase(repository)

  // SERVICE ORCHESTRATOR
  const httpService = new BusquedaRecienteHttpManagerService(deleteBusquedaRecienteUC)

  // CONTROLLERS
  const deleteBusquedaRecienteController = new DeleteBusquedaRecienteController(httpService)

  return { deleteBusquedaRecienteController }
}

export const { deleteBusquedaRecienteController } = compositionRoot()
