import { ForFavoritoRepositoryPort } from '@favorito/domain/ports/drivens/for-favorito-repository.port'
import { Criteria, Favorito, FavoritoFilterRepo, FavoritoRepoInput, FavoritoRepoResponse } from '@favorito/domain/schemas/favorito'
import { Meta } from '@shared/domain/schemas/meta'
import { DatabaseName, getStaticDatabaseCredentials, MSSQLDatabaseConnection } from '@shared/infrastructure/store'
import { wrapDatabaseError } from '@shared/infrastructure/utils'
import sql from 'mssql'

export class MSSQLFavoritoRepositoryAdapter implements ForFavoritoRepositoryPort {
  private connection = new MSSQLDatabaseConnection()
  private db = getStaticDatabaseCredentials(DatabaseName.APP)

  async createOrUpdate(favoritoRepoInput: FavoritoRepoInput): Promise<{ data: FavoritoRepoResponse; action: 'INSERT' | 'UPDATE' } | null> {
    try {
      const conn = await this.connection.connect(this.db.credentials, this.db.type)
      const request = conn.request()

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

      const action = res.recordset[0].accion

      return { data, action }
    } catch (err) {
      throw wrapDatabaseError(err)
    }
  }

  async findMany(filter: FavoritoFilterRepo, limit: number): Promise<{ data: FavoritoRepoResponse[]; meta: Meta }> {
    try {
      const conn = await this.connection.connect(this.db.credentials, this.db.type)
      const request = conn.request()

      const stmt = `
        ;WITH FavoritosCTE AS (
          SELECT 
            idFavorito,
            cSchema,
            cNombreObjeto,
            cType,
            dFecha
          FROM dbo.Favorito
          WHERE idUsuario = @idUser
            AND cType     IN (${filter.type})
            AND cDatabase = @database
            AND lVigente  = 1
        ),
        TotalRegistrosCTE AS (
            SELECT COUNT(*) AS nTotal FROM FavoritosCTE
        )
        SELECT TOP (@limit)
          A.idFavorito,
          A.cSchema,
          A.cNombreObjeto,
          A.cType,
          A.dFecha,
          C.nTotal
        FROM FavoritosCTE A
        CROSS JOIN TotalRegistrosCTE C
        ORDER BY A.dFecha DESC
      `
      request.input('idUser', sql.Int, filter.idUser)
      request.input('database', sql.VarChar(64), filter.database)
      request.input('limit', sql.Int, limit)

      const res = await request.query(stmt)

      const data =
        res.recordset.map((row): FavoritoRepoResponse => {
          return {
            id: row.idFavorito,
            schema: row.cSchema,
            objectName: row.cNombreObjeto,
            type: row.cType,
            date: row.dFecha,
          }
        }) ?? []

      const meta = {
        total: res.recordset[0]?.nTotal ?? 0,
        limit,
      }
      return { data, meta }
    } catch (err) {
      throw wrapDatabaseError(err)
    }
  }

  async deleteById(id: number): Promise<boolean> {
    try {
      const conn = await this.connection.connect(this.db.credentials, this.db.type)
      const request = conn.request()

      const stmt = `
        UPDATE Favorito SET lVigente = 0 
        WHERE idFavorito = @id AND lVigente = 1
      `
      request.input('id', sql.Int, id)

      const res = await request.query(stmt)

      if (res && res.rowsAffected[0] === 1) return true // deshabilitado correctamente

      return false // no se ha encontrado el ID de búsqueda reciente para deshabilitar
    } catch (err) {
      throw wrapDatabaseError(err)
    }
  }

  async getById(id: number): Promise<Favorito | null> {
    try {
      const conn = await this.connection.connect(this.db.credentials, this.db.type)
      const request = conn.request()

      const stmt = `
        SELECT * FROM dbo.Favorito 
        WHERE idFavorito = @id
      `
      request.input('id', sql.Int, id)

      const res = await request.query(stmt)

      // no se encontró
      if (res && res.rowsAffected[0] === 0) return null

      // adapter
      const data: Favorito = {
        id: res.recordset[0].idFavorito,
        idUser: res.recordset[0].idUsuario,
        database: res.recordset[0].cDatabase,
        schema: res.recordset[0].cSchema,
        objectName: res.recordset[0].cNombreObjeto,
        date: res.recordset[0].dFecha,
        type: res.recordset[0].cType,
        isActive: res.recordset[0].lVigente,
      }

      return data
    } catch (err) {
      throw wrapDatabaseError(err)
    }
  }

  async existsByCriteria(criteria: Criteria): Promise<boolean> {
    try {
      const conn = await this.connection.connect(this.db.credentials, this.db.type)
      const request = conn.request()

      const stmt = `
        SELECT TOP 1 idFavorito 
        FROM dbo.Favorito 
        WHERE idUsuario     = @idUser
          AND cDatabase     = @database
          AND cSchema       = @schema
          AND cNombreObjeto = @objectName
          AND lVigente      = 1
      `
      request.input('idUser', sql.Int, criteria.idUser)
      request.input('database', sql.VarChar(64), criteria.database)
      request.input('schema', sql.VarChar(64), criteria.schema)
      request.input('objectName', sql.VarChar(128), criteria.objectName)

      const res = await request.query(stmt)

      // no existe el favorito
      if (res && res.rowsAffected[0] === 0) return false

      // existe el favorito
      return true
    } catch (err) {
      throw wrapDatabaseError(err)
    }
  }
}
