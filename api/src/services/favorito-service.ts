import { format } from '@formkit/tempo'
import sql from 'mssql'

import { connection } from '@/config/database'
import { COMMON_ERROR_CODES } from '@/constants'
import {
  Credentials,
  CredentialsFromEnv,
  FavoritoGetInput,
  FavoritoInput,
  FavoritoRes,
  FavoritoResponse,
  ForRetrievingFavorito,
  MyCustomError,
  Pagination,
  PaginationInput,
} from '@/models'
import { throwRequestError } from '@/utils'

export class FavoritoService implements ForRetrievingFavorito {
  private credentials: Credentials

  constructor() {
    this.credentials = { ...CredentialsFromEnv }
  }

  // Registra búsqueda favorita
  public async registrarFavorito(Favorito: FavoritoInput): Promise<boolean | undefined> {
    const conn = await connection(this.credentials)
    const request = conn.request()

    try {
      const stmt = `
        INSERT INTO dbo.Favorito (idUsuario, idTipoAccion, cDatabase, cSchema, cNombreObjeto, dFecha, lVigente)
        VALUES (@idUsuario, @idTipoAccion, @cDatabase, @cSchema, @cNombreObjeto, GETUTCDATE(), 1)
      `
      request.input('idUsuario', sql.Int, Favorito.idUsuario)
      request.input('idTipoAccion', sql.Int, Favorito.idTipoAccion)
      request.input('cDatabase', sql.VarChar(64), Favorito.cDatabase)
      request.input('cSchema', sql.VarChar(64), Favorito.cSchema)
      request.input('cNombreObjeto', sql.VarChar(128), Favorito.cNombreObjeto)

      const res = await request.query(stmt)

      if (res && res.rowsAffected[0] === 1) return true // se ha insertado correctamente (1 fila afectada)
      return false
    } catch (err) {
      if (!(err instanceof sql.RequestError)) throw err
      throwRequestError(err)
    }
  }

  // Busca una búsqueda favorita
  public async encontrarFavorito(favorito: FavoritoInput): Promise<number | undefined> {
    const conn = await connection(this.credentials)
    const request = conn.request()

    try {
      const stmt = `
        SELECT idFavorito FROM dbo.Favorito 
        WHERE idUsuario     = @idUsuario
          AND idTipoAccion  = @idTipoAccion
          AND cDatabase     = @cDatabase 
          AND cSchema       = @cSchema
          AND cNombreObjeto = @cNombreObjeto
      `
      request.input('idUsuario', sql.Int, favorito.idUsuario)
      request.input('idTipoAccion', sql.Int, favorito.idTipoAccion)
      request.input('cDatabase', sql.VarChar(64), favorito.cDatabase)
      request.input('cSchema', sql.VarChar(64), favorito.cSchema)
      request.input('cNombreObjeto', sql.VarChar(128), favorito.cNombreObjeto)

      const res = await request.query(stmt)

      // se encontró
      if (res && res.rowsAffected[0] === 1) return res.recordset[0].idFavorito

      // no se encontró
      return undefined
    } catch (err) {
      if (!(err instanceof sql.RequestError)) throw err
      throwRequestError(err)
    }
  }

  // Actualizar la búsqueda favorita
  public async actualizarFavoritoById(id: number): Promise<boolean | undefined> {
    const conn = await connection(this.credentials)
    const request = conn.request()

    try {
      const stmt = `
        UPDATE dbo.Favorito 
        SET dFecha = GETUTCDATE(), lVigente = 1
        WHERE idFavorito = @id
      `
      request.input('id', sql.Int, id)

      const res = await request.query(stmt)

      if (res && res.rowsAffected[0] === 1) return true // se ha updateado correctamente (1 fila afectada)
      return false
    } catch (err) {
      if (!(err instanceof sql.RequestError)) throw err
      throwRequestError(err)
    }
  }

  // Eliminar una búsqueda favorita por id (desactivar)
  public async eliminarFavorito(id: number): Promise<boolean | undefined> {
    const conn = await connection(this.credentials)
    const request = conn.request()

    try {
      const stmt = `
        UPDATE dbo.Favorito 
        SET lVigente = 0
        WHERE idFavorito = @id
      `
      request.input('id', sql.Int, id)

      const res = await request.query(stmt)

      if (res && res.rowsAffected[0] === 1) return true // se ha eliminado,updateado correctamente (1 fila afectada)
      return false
    } catch (err) {
      if (!(err instanceof sql.RequestError)) throw err
      throwRequestError(err)
    }
  }

  // Recuperar las busquedas favoritas (incluye paginación)
  public async obtenerFavoritos(favorito: FavoritoGetInput, pagination: PaginationInput): Promise<FavoritoResponse | undefined> {
    const conn = await connection(this.credentials)
    const request = conn.request()
    const DEFAULT_MAX_PAGINATION = 10000

    try {
      const stmt = `
        ;WITH FavoritosCTE AS (
          SELECT 
            idFavorito,
            cSchema,
            cNombreObjeto,
            dFecha
          FROM dbo.Favorito
          WHERE idUsuario = @idUsuario
            AND idTipoAccion = @idTipoAccion
            AND cDatabase = @cDatabase
            AND lVigente = 1
        ),
        TotalRegistrosCTE AS (
          SELECT COUNT(*) AS total FROM FavoritosCTE
        )
        SELECT
          A.idFavorito,
          A.cSchema,
          A.cNombreObjeto,
          A.dFecha,
          B.total
        FROM FavoritosCTE A
        CROSS JOIN TotalRegistrosCTE B
        ORDER BY A.dFecha DESC
        OFFSET COALESCE(@start, 0) ROWS
        FETCH NEXT COALESCE(@limit, ${DEFAULT_MAX_PAGINATION}) ROWS ONLY
      `

      request.input('idUsuario', sql.Int, favorito.idUsuario)
      request.input('idTipoAccion', sql.Int, favorito.idTipoAccion)
      request.input('cDatabase', sql.VarChar(64), favorito.cDatabase)
      request.input('start', sql.Int, pagination.start)
      request.input('limit', sql.Int, pagination.limit)

      const res = await request.query(stmt)

      // no se ha encontrado resultados
      if (res && res.rowsAffected[0] === 0) throw new MyCustomError(COMMON_ERROR_CODES.notfound)

      const data = res.recordset.map((obj): FavoritoRes => {
        return {
          idFavorito: obj.idFavorito,
          cSchema: obj.cSchema,
          cNombreObjeto: obj.cNombreObjeto,
          dFecha: format(obj.dFecha, 'DD-MM-YYYY HH:mm:ss'),
        }
      })

      // formateo de meta info
      const total = res.recordset[0].total
      let limit = undefined
      if (pagination.limit) limit = pagination.limit > total ? total : pagination.limit

      const meta = {
        pagination: {
          start: pagination.start || 0,
          limit: limit ?? total,
          total,
        } as Pagination,
      }

      return { data, meta }
    } catch (err) {
      if (!(err instanceof sql.RequestError)) throw err
      throwRequestError(err)
    }
  }
}
