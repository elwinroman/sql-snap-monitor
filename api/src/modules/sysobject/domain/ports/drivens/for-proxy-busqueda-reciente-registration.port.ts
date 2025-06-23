import { BusquedaRecienteInput } from '@busqueda-reciente/domain/schemas/busqueda-reciente-input'

export interface ForProxyBusquedaRecienteRegistrationPort {
  send(busquedaReciente: BusquedaRecienteInput): Promise<void>
}
