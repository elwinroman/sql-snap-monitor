import { ProxyBusquedaRecienteService } from '@busqueda-reciente/application/busqueda-reciente-proxy-manager.service'
import { RegisterBusquedaRecienteUseCase } from '@busqueda-reciente/application/use-cases'
import { MSSQLBusquedaRecienteRepositoryAdapter } from '@busqueda-reciente/infrastructure/adapters/drivens/mssql-busqueda-reciente-repository.adapter'

import { RegisterBusquedaRecienteProxy } from './register-busqueda-reciente-proxy.adapter'

/*************************************
 * Inyección de dependencias PROXY
 *************************************/
const compositionRoot = () => {
  // DRIVENS
  const repository = new MSSQLBusquedaRecienteRepositoryAdapter() // repositorio

  // USE CASES
  const registerBusquedaRecienteUseCase = new RegisterBusquedaRecienteUseCase(repository)

  // SERVICE ORCHESTRATOR
  const service = new ProxyBusquedaRecienteService(registerBusquedaRecienteUseCase)

  // PROXY ADAPTER
  const registerBusquedaRecienteProxy = new RegisterBusquedaRecienteProxy(service)

  return { registerBusquedaRecienteProxy }
}

export const { registerBusquedaRecienteProxy } = compositionRoot()
