import { BusquedaRecienteHttpManagerService } from '@busqueda-reciente/application/busqueda-reciente-http-manager.service'
import { DeleteBusquedaRecienteUseCase, GetAllBusquedasRecientesUseCase } from '@busqueda-reciente/application/use-cases'
import { MssqlSysObjectRepositoryAdapter } from '@busqueda-reciente/infrastructure/adapters/drivens/mssql-sysobject-repository.adapter'
import { ValkeyCacheBusquedaRecienteRepositoryAdapter } from '@busqueda-reciente/infrastructure/adapters/drivens/valkey-busqueda-reciente-repository.adapter'

import { DeleteBusquedaRecienteController } from './delete-busqueda-reciente/delete-busqueda-reciente.controller'
import { GetAllBusquedaRecienteController } from './get-all-busqueda-reciente/get-all-busqueda-reciente.controller'

/*************************************
 * Inyección de dependencias API-REST
 *************************************/
const compositionRoot = () => {
  // DRIVENS
  const brRepository = new ValkeyCacheBusquedaRecienteRepositoryAdapter()
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
