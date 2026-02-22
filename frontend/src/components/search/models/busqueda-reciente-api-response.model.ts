import { BusquedaReciente } from './busqueda-reciente.model'

export interface BusquedaRecienteApiResponse {
  correlationId: string
  data: BusquedaReciente[]
}
