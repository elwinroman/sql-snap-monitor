import { ForProxyManagingBusquedaRecientePort } from '@busqueda-reciente/domain/ports/drivers/for-proxy-managing-busqueda-reciente.port'
import { BusquedaRecienteInput } from '@busqueda-reciente/domain/schemas/busqueda-reciente-input'

export class RegisterBusquedaRecienteProxy {
  constructor(private readonly service: ForProxyManagingBusquedaRecientePort) {}

  async run(dto: BusquedaRecienteInput) {
    return this.service.registerBusquedaReciente(dto)
  }
}
