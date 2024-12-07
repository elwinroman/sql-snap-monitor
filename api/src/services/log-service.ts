import sql from 'mssql'

import { connection } from '@/config/database'
import { Credentials, CredentialsFromEnv, ForRetrievingLog, LogAccesoInput, LogBusquedaInput } from '@/models'
import { printRequestError } from '@/utils'

export class LogService implements ForRetrievingLog {
  private credentials: Credentials

  constructor() {
    this.credentials = { ...CredentialsFromEnv }
  }

  // Registra el acceso de un usuario en el log
  public async registrarAcceso(log: LogAccesoInput): Promise<boolean | undefined> {
    const conn = await connection(this.credentials)
    const request = conn.request()

    try {
      const stmt = `
        INSERT INTO dbo.LogAcceso (idUsuario, cDatabase, dFechaAcceso)
        VALUES (@idUsuario, @cDatabase, GETDATE() AT TIME ZONE 'SA Pacific Standard Time')
      `
      request.input('idUsuario', sql.Int, log.idUsuario)
      request.input('cDatabase', sql.VarChar(64), log.cDatabase)

      const res = await request.query(stmt)

      if (res.rowsAffected[0] === 1) return true // se ha insertado correctamente (1 fila afectada)
      return false
    } catch (err) {
      if (!(err instanceof sql.RequestError)) {
        console.log(err)
        return
      }
      printRequestError(err)
    }
  }

  // Registra la búsqueda de objetos
  public async registrarBusqueda(log: LogBusquedaInput): Promise<boolean | undefined> {
    const conn = await connection(this.credentials)
    const request = conn.request()

    try {
      const stmt = `
        INSERT INTO dbo.LogBusqueda (idUsuario, idTipoAccion, cDatabase, cSchema, cBusqueda, lProduccion, dFechaBusqueda)
        VALUES (@idUsuario, @idTipoAccion, @cDatabase, @cSchema, @cBusqueda, @lProduccion, GETDATE() AT TIME ZONE 'SA Pacific Standard Time')
      `
      request.input('idUsuario', sql.Int, log.idUsuario)
      request.input('idTipoAccion', sql.Int, log.idTipoAccion)
      request.input('cDatabase', sql.VarChar(64), log.cDatabase)
      request.input('cSchema', sql.VarChar(64), log.cSchema)
      request.input('cBusqueda', sql.VarChar(128), log.cBusqueda)
      request.input('lProduccion', sql.Bit, log.lProduccion)

      const res = await request.query(stmt)

      if (res.rowsAffected[0] === 1) return true // se ha insertado correctamente (1 fila afectada)
      return false
    } catch (err) {
      if (!(err instanceof sql.RequestError)) {
        console.log(err)
        return
      }
      printRequestError(err)
    }
  }
}
