import { BusquedaRecienteHttpManagerService } from '@busqueda-reciente/application/busqueda-reciente-http-manager.service'
import { DeleteBusquedaRecienteUseCase, GetAllBusquedasRecientesUseCase } from '@busqueda-reciente/application/use-cases'
import { MSSQLBusquedaRecienteRepositoryAdapter } from '@busqueda-reciente/infrastructure/adapters/drivens/mssql-busqueda-reciente-repository.adapter'
import { MssqlSysObjectRepositoryAdapter } from '@busqueda-reciente/infrastructure/adapters/drivens/mssql-sysobject-repository.adapter'

import { DeleteBusquedaRecienteController } from './delete-busqueda-reciente/delete-busqueda-reciente.controller'
import { GetAllBusquedaRecienteController } from './get-all-busqueda-reciente/get-all-busqueda-reciente.controller'

/*************************************
 * Inyección de dependencias API-REST
 *************************************/
const compositionRoot = () => {
  // DRIVENS
  const brRepository = new MSSQLBusquedaRecienteRepositoryAdapter() // repositorio de busquedas recientes
  const sysobjectRepository = new MssqlSysObjectRepositoryAdapter()

  // USE CASES
  const deleteBusquedaRecienteUC = new DeleteBusquedaRecienteUseCase(brRepository)
  const getAllBusquedaRecienteUC = new GetAllBusquedasRecientesUseCase(brRepository, sysobjectRepository)

  // SERVICE ORCHESTRATOR
  const service = new BusquedaRecienteHttpManagerService(getAllBusquedaRecienteUC, deleteBusquedaRecienteUC)

  // CONTROLLERS
  const getAllBusquedaRecienteController = new GetAllBusquedaRecienteController(service)
  const deleteBusquedaRecienteController = new DeleteBusquedaRecienteController(service)

  return { getAllBusquedaRecienteController, deleteBusquedaRecienteController }
}

export const { getAllBusquedaRecienteController, deleteBusquedaRecienteController } = compositionRoot()
