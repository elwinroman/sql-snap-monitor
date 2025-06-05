import { DatabaseName, getStaticDatabaseCredentials, MSSQLDatabaseConnection } from '@shared/infrastructure/store'
import { wrapDatabaseError } from '@shared/infrastructure/utils/ensure-mssql-error.util'
import { ForLogRepositoryPort, SearchLog } from '@sysobject/domain/ports/drivens/for-log-repository.port'
import sql from 'mssql'

export class MssqlLogRepositoryAdapter implements ForLogRepositoryPort {
  private connection = new MSSQLDatabaseConnection()
  private db = getStaticDatabaseCredentials(DatabaseName.APP)

  async createSearchLog(logSearch: SearchLog): Promise<boolean> {
    const conn = await this.connection.connect(this.db.credentials, this.db.type)
    const request = conn.request()

    try {
      const stmt = `
        INSERT INTO dbo.LogBusqueda (idUsuario, idTipoAccion, cDatabase, cSchema, cBusqueda, lProduccion, dFechaBusqueda)
        VALUES (@idUser, @actionType, @database, @schema, @search, @isProduction, @createdAt)
      `
      request.input('idUser', sql.Int, logSearch.idUser)
      request.input('actionType', sql.Int, logSearch.actionType)
      request.input('database', sql.VarChar(64), logSearch.database)
      request.input('schema', sql.VarChar(64), logSearch.schema)
      request.input('search', sql.VarChar(128), logSearch.search)
      request.input('isProduction', sql.Bit, logSearch.isProduction)
      request.input('createdAt', sql.Bit, logSearch.createdAt)

      const res = await request.query(stmt)

      if (res.rowsAffected[0] === 1) return true // se ha insertado correctamente (1 fila afectada)
      return false
    } catch (err) {
      throw wrapDatabaseError(err)
    }
  }
}
