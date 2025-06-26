import { ForProxyManagingBusquedaRecientePort } from '@busqueda-reciente/domain/ports/drivers/for-proxy-managing-busqueda-reciente.port'
import { BusquedaRecienteInput } from '@busqueda-reciente/domain/schemas/busqueda-reciente'

import { RegisterBusquedaRecienteUseCase } from './use-cases/register-busqueda-reciente.use-case'

export class ProxyBusquedaRecienteService implements ForProxyManagingBusquedaRecientePort {
  constructor(private readonly registerBusquedaRecienteUC: RegisterBusquedaRecienteUseCase) {}

  async registerBusquedaReciente(busquedaRecienteInput: BusquedaRecienteInput): Promise<void> {
    await this.registerBusquedaRecienteUC.execute(busquedaRecienteInput)
  }
}
