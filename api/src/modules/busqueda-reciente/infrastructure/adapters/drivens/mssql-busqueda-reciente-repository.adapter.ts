import { ForBusquedaRecienteRepositoryPort } from '@busqueda-reciente/domain/ports/drivens/for-busqueda-reciente-repository.port'
import {
  BusquedaRecienteFilterRepo,
  BusquedaRecienteInput,
  BusquedaRecienteRepoResponse,
  Meta,
} from '@busqueda-reciente/domain/schemas/busqueda-reciente'
import { DatabaseName, getStaticDatabaseCredentials, MSSQLDatabaseConnection } from '@shared/infrastructure/store'
import { wrapDatabaseError } from '@shared/infrastructure/utils/ensure-mssql-error.util'
import sql from 'mssql'

export class MSSQLBusquedaRecienteRepositoryAdapter implements ForBusquedaRecienteRepositoryPort {
  private connection = new MSSQLDatabaseConnection()
  private db = getStaticDatabaseCredentials(DatabaseName.APP)

  async createOrUpdate(busquedaRecienteInput: BusquedaRecienteInput): Promise<boolean> {
    const conn = await this.connection.connect(this.db.credentials, this.db.type)
    const request = conn.request()

    try {
      const stmt = `
        MERGE INTO dbo.BusquedaReciente AS target
        USING (
          SELECT 
            @idUser     AS idUsuario      , @database AS databaseName, 
            @schema     AS schemaName     , @objectName AS objectName,
            @type       AS type           , @dateSearch AS fechaBusqueda,
            @isActive   AS vigente
        ) AS source
        ON target.idUsuario         = source.idUsuario
          AND target.cDatabase      = source.databaseName 
          AND target.cSchema        = source.schemaName 
          AND target.cNombreObjeto  = source.objectName
        WHEN MATCHED THEN
          --============================================================
          -- Si el existe la búsqueda reciente, updatea la fecha y
          -- reactiva si está deshabilitado (lVigente = 0)
          --============================================================
          UPDATE SET 
            target.dFecha   = source.fechaBusqueda,
            target.lVigente = source.vigente
        WHEN NOT MATCHED THEN
          --============================================================
          -- Si no existe la búsqueda reciente, realiza la inserción
          --============================================================
          INSERT (idUsuario, cDatabase, cSchema, cNombreObjeto, cType, dFecha, lVigente)
          VALUES (source.idUsuario, source.databaseName, source.schemaName, source.objectName, source.type, source.fechaBusqueda, source.vigente)
        OUTPUT  INSERTED.idUsuario, INSERTED.cDatabase, INSERTED.cSchema,
                INSERTED.cNombreObjeto, INSERTED.dFecha, INSERTED.lVigente;
      `
      request.input('idUser', sql.Int, busquedaRecienteInput.idUser)
      request.input('database', sql.VarChar(64), busquedaRecienteInput.database)
      request.input('schema', sql.VarChar(64), busquedaRecienteInput.schema)
      request.input('objectName', sql.VarChar(128), busquedaRecienteInput.objectName)
      request.input('type', sql.Char(2), busquedaRecienteInput.type)
      request.input('dateSearch', sql.DateTime, busquedaRecienteInput.dateSearch)
      request.input('isActive', sql.Bit, busquedaRecienteInput.isActive)

      const res = await request.query(stmt)

      if (res && res.rowsAffected[0] === 1) return true // se ha updateado o insertado correctamente

      return false // no se ha actualizado o insertado ninguna fila u otro tipo de error
    } catch (err) {
      throw wrapDatabaseError(err)
    }
  }

  async deleteById(id: number): Promise<boolean> {
    const conn = await this.connection.connect(this.db.credentials, this.db.type)
    const request = conn.request()

    try {
      const stmt = `
        UPDATE BusquedaReciente SET lVigente = 0 
        WHERE idBusquedaReciente = @id AND lVigente = 1
      `
      request.input('id', sql.Int, id)

      const res = await request.query(stmt)

      if (res && res.rowsAffected[0] === 1) return true // deshabilitado correctamente

      return false // no se ha encontrado el ID de búsqueda reciente para deshabilitar
    } catch (err) {
      throw wrapDatabaseError(err)
    }
  }

  async findMany(filter: BusquedaRecienteFilterRepo, limit: number): Promise<{ data: BusquedaRecienteRepoResponse[]; meta: Meta }> {
    const conn = await this.connection.connect(this.db.credentials, this.db.type)
    const request = conn.request()

    try {
      const stmt = `
        ;WITH BusquedasRecientesCTE AS (
          SELECT 
            idBusquedaReciente,
            cSchema,
            cNombreObjeto,
            dFecha
          FROM dbo.BusquedaReciente
          WHERE idUsuario = @idUser
            AND cType     IN (${filter.type})
            AND cDatabase = @database
            AND lVigente  = 1
        ),
        TotalRegistrosCTE AS (
            SELECT COUNT(*) AS nTotal FROM BusquedasRecientesCTE
        )
        SELECT TOP (@limit)
          A.idBusquedaReciente,
          A.cSchema,
          A.cNombreObjeto,
          A.dFecha,
          lFavorito = IIF(B.idFavorito IS NULL, 0, 1),
          C.nTotal
        FROM BusquedasRecientesCTE A
        --=============================================
        -- Si la búsqueda reciente es un favorito
        --=============================================
        LEFT JOIN dbo.Favorito B 
          ON B.idUsuario      = @idUser
          AND B.cType         IN (${filter.type})
          AND B.cDatabase     = @database
          AND B.cSchema       = A.cSchema
          AND B.cNombreObjeto = A.cNombreObjeto
          AND B.lVigente      = 1
        CROSS JOIN TotalRegistrosCTE C
        ORDER BY A.dFecha DESC
      `
      request.input('idUser', sql.Int, filter.idUser)
      request.input('database', sql.VarChar(64), filter.database)
      request.input('limit', sql.Int, limit)

      const res = await request.query(stmt)

      const data =
        res.recordset.map((obj): BusquedaRecienteRepoResponse => {
          return {
            id: obj.idBusquedaReciente,
            schema: obj.cSchema,
            objectName: obj.cNombreObjeto,
            dateSearch: obj.dFecha,
            isFavorite: Boolean(obj.lFavorito),
          }
        }) ?? []

      const meta = {
        total: res.recordset[0].nTotal ?? 0,
        limit,
      }

      return { data, meta }
    } catch (err) {
      throw wrapDatabaseError(err)
    }
  }
}
