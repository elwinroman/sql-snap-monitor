// todo. añadir jsdocs
export interface LogAcceso {
  idLogAcceso: number
  idUsuario: number
  cDatabase: string
  dFechaAcceso: Date
}

export type LogAccesoInput = Omit<LogAcceso, 'idLogAcceso' | 'dFechaAcceso'>

export interface LogBusqueda {
  idLogBusqueda: number
  idUsuario?: number | undefined
  idTipoAccion: number
  cDatabase: string
  cSchema: string
  cBusqueda: string
  lProduccion: boolean
  dFechaBusqueda: Date
}

export type LogBusquedaInput = Omit<LogBusqueda, 'idLogBusqueda' | 'dFechaBusqueda' | 'lVigente'>

export interface ForRetrievingLog {
  registrarAcceso(log: LogAccesoInput): Promise<boolean | undefined>
  registrarBusqueda(log: LogBusquedaInput): Promise<boolean | undefined>
}
