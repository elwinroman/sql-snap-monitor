import { Pagination, PaginationInput } from '@/models'

// todo. añadir jsdocs
export interface BusquedaReciente {
  idBusquedaReciente: number
  idUsuario: number
  idTipoAccion: number
  cDatabase: string
  cSchema: string
  cNombreObjeto: string
  dFecha: string | Date
  lVigente: boolean
}

export type BusquedaRecienteInput = Omit<BusquedaReciente, 'idBusquedaReciente' | 'dFecha' | 'lVigente'>
export type BusquedaRecienteGetInput = Pick<BusquedaReciente, 'idUsuario' | 'idTipoAccion' | 'cDatabase'>

export interface BusquedaRecienteFindResponse {
  id: number
}

export type BusquedaRecienteRes = Pick<BusquedaReciente, 'idBusquedaReciente' | 'cSchema' | 'cNombreObjeto' | 'dFecha'>

export interface BusquedaRecienteResponse {
  data: BusquedaRecienteRes[]
  meta: {
    pagination: Pagination
  }
}

export interface ForRetrievingBusquedaReciente {
  registrarBusquedaReciente(busquedaReciente: BusquedaRecienteInput): Promise<boolean | undefined>
  encontrarBusquedaReciente(busquedaReciente: BusquedaReciente): Promise<BusquedaRecienteFindResponse | undefined>
  eliminarBusquedaReciente(id: number): Promise<boolean | undefined>
  obtenerBusquedasRecientes(
    busquedaReciente: BusquedaRecienteGetInput,
    pagination: PaginationInput,
  ): Promise<BusquedaRecienteResponse | undefined>
}
