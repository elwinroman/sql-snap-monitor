import { BusquedaRecienteInput } from '@busqueda-reciente/domain/schemas/busqueda-reciente'
import { registerBusquedaRecienteProxy } from '@busqueda-reciente/infrastructure/adapters/drivers/proxies/composition-root'
import { ForProxyBusquedaRecienteRegistrationPort } from '@sysobject/domain/ports/drivens/for-proxy-busqueda-reciente-registration.port'

export class RegisterBusquedaRecienteProxyAdapter implements ForProxyBusquedaRecienteRegistrationPort {
  async send(busquedaReciente: BusquedaRecienteInput): Promise<void> {
    await registerBusquedaRecienteProxy.run(busquedaReciente)
  }
}
