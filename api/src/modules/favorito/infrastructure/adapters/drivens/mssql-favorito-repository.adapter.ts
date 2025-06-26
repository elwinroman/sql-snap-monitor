import { ForFavoritoRepositoryPort } from '@favorito/domain/ports/drivens/for-favorito-repository.port'
import { FavoritoFilterRepo, FavoritoRepoInput, FavoritoRepoResponse } from '@favorito/domain/schemas/favorito'
import { Meta } from '@shared/domain/schemas/meta'
import { DatabaseName, getStaticDatabaseCredentials, MSSQLDatabaseConnection } from '@shared/infrastructure/store'
import { wrapDatabaseError } from '@shared/infrastructure/utils'
import sql from 'mssql'

export class MSSQLFavoritoRepositoryAdapter implements ForFavoritoRepositoryPort {
  private connection = new MSSQLDatabaseConnection()
  private db = getStaticDatabaseCredentials(DatabaseName.APP)

  async createOrUpdate(favoritoRepoInput: FavoritoRepoInput): Promise<{ data: FavoritoRepoResponse; action: 'INSERT' | 'UPDATE' } | null> {
    const conn = await this.connection.connect(this.db.credentials, this.db.type)
    const request = conn.request()

    try {
      const stmt = `
        MERGE INTO dbo.Favorito AS target
        USING (
          SELECT 
            @idUser     AS idUsuario      , @database AS databaseName, 
            @schema     AS schemaName     , @objectName AS objectName,
            @type       AS type           , @date AS fecha,
            @isActive   AS vigente
        ) AS source
        ON target.idUsuario         = source.idUsuario
          AND target.cDatabase      = source.databaseName 
          AND target.cSchema        = source.schemaName 
          AND target.cNombreObjeto  = source.objectName
        WHEN MATCHED THEN
          --============================================================
          -- Si el existe un favorito registrado, updatea la fecha y
          -- reactiva si está deshabilitado (lVigente = 0)
          --============================================================
          UPDATE SET 
            target.dFecha   = source.fecha,
            target.lVigente = source.vigente
        WHEN NOT MATCHED THEN
          --============================================================
          -- Si no existe la búsqueda reciente, realiza la inserción
          --============================================================
          INSERT (idUsuario, cDatabase, cSchema, cNombreObjeto, cType, dFecha, lVigente)
          VALUES (source.idUsuario, source.databaseName, source.schemaName, source.objectName, source.type, source.fecha, source.vigente)
        OUTPUT  INSERTED.idUsuario, INSERTED.cDatabase, INSERTED.cSchema,
                INSERTED.cNombreObjeto, INSERTED.dFecha, INSERTED.lVigente,
                $action AS accion;
      `
      request.input('idUser', sql.Int, favoritoRepoInput.idUser)
      request.input('database', sql.VarChar(64), favoritoRepoInput.database)
      request.input('schema', sql.VarChar(64), favoritoRepoInput.schema)
      request.input('objectName', sql.VarChar(128), favoritoRepoInput.objectName)
      request.input('type', sql.Char(2), favoritoRepoInput.type)
      request.input('date', sql.DateTime, favoritoRepoInput.date)
      request.input('isActive', sql.Bit, favoritoRepoInput.isActive)

      const res = await request.query(stmt)

      if (res && res.rowsAffected[0] === 0) return null

      // adapter
      const data: FavoritoRepoResponse = {
        id: res.recordset[0].idFavorito,
        schema: res.recordset[0].cSchema,
        objectName: res.recordset[0].cNombreObjeto,
        type: res.recordset[0].cType,
        date: res.recordset[0].dFecha,
      }

      const action = res.recordset[0].action

      return { data, action }
    } catch (err) {
      throw wrapDatabaseError(err)
    }
  }

  async findMany(filter: FavoritoFilterRepo, limit: number): Promise<{ data: FavoritoRepoResponse[]; meta: Meta }> {
    return {
      data: [],
      meta: {
        total: 0,
        limit: 0,
      },
    }
  }

  async deleteById(id: number): Promise<boolean> {
    return true
  }
}
