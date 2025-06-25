import { BusquedaRecienteInput } from '@busqueda-reciente/domain/schemas/busqueda-reciente'

export interface ForProxyBusquedaRecienteRegistrationPort {
  send(busquedaReciente: BusquedaRecienteInput): Promise<void>
}
