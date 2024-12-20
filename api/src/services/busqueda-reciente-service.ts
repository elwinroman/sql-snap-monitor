import { format } from '@formkit/tempo'
import sql from 'mssql'

import { connection } from '@/config/database'
import { COMMON_ERROR_CODES } from '@/constants'
import {
  BusquedaReciente,
  BusquedaRecienteGetInput,
  BusquedaRecienteInput,
  BusquedaRecienteRes,
  BusquedaRecienteResponse,
  Credentials,
  CredentialsFromEnv,
  ForRetrievingBusquedaReciente,
  MyCustomError,
  Pagination,
  PaginationInput,
} from '@/models'
import { throwRequestError } from '@/utils'

export class BusquedaRecienteService implements ForRetrievingBusquedaReciente {
  private credentials: Credentials

  constructor() {
    this.credentials = { ...CredentialsFromEnv }
  }

  // Registra uan nueva búsqueda reciente
  public async registrarBusquedaReciente(busquedaReciente: BusquedaRecienteInput): Promise<BusquedaReciente | undefined> {
    const conn = await connection(this.credentials)
    const request = conn.request()

    try {
      const stmt = `
        INSERT INTO dbo.BusquedaReciente (idUsuario, idTipoAccion, cDatabase, cSchema, cNombreObjeto, dFecha, lVigente)
        OUTPUT INSERTED.*
        VALUES (@idUsuario, @idTipoAccion, @cDatabase, @cSchema, @cNombreObjeto, GETUTCDATE(), 1)
      `
      request.input('idUsuario', sql.Int, busquedaReciente.idUsuario)
      request.input('idTipoAccion', sql.Int, busquedaReciente.idTipoAccion)
      request.input('cDatabase', sql.VarChar(64), busquedaReciente.cDatabase)
      request.input('cSchema', sql.VarChar(64), busquedaReciente.cSchema)
      request.input('cNombreObjeto', sql.VarChar(128), busquedaReciente.cNombreObjeto)

      const res = await request.query(stmt)

      if (res && res.rowsAffected[0] !== 1) return undefined // no se ha insertado correctamente

      // insertado correctamente
      const data = {
        idBusquedaReciente: res.recordset[0].idBusquedaReciente,
        idUsuario: res.recordset[0].idUsuario,
        idTipoAccion: res.recordset[0].idTipoAccion,
        cDatabase: res.recordset[0].cDatabase,
        cSchema: res.recordset[0].cSchema,
        cNombreObjeto: res.recordset[0].cNombreObjeto,
        dFecha: format(res.recordset[0].dFecha, 'DD-MM-YYYY HH:mm:ss'),
        lVigente: res.recordset[0].lVigente,
      }

      return data
    } catch (err) {
      if (!(err instanceof sql.RequestError)) throw err
      throwRequestError(err)
    }
  }

  // Busca la búsqueda reciente
  public async encontrarBusquedaReciente(busquedaReciente: BusquedaRecienteInput): Promise<number | undefined> {
    const conn = await connection(this.credentials)
    const request = conn.request()

    try {
      const stmt = `
        SELECT idBusquedaReciente FROM dbo.BusquedaReciente 
        WHERE idUsuario     = @idUsuario
          AND idTipoAccion  = @idTipoAccion
          AND cDatabase     = @cDatabase 
          AND cSchema       = @cSchema
          AND cNombreObjeto = @cNombreObjeto
      `
      request.input('idUsuario', sql.Int, busquedaReciente.idUsuario)
      request.input('idTipoAccion', sql.Int, busquedaReciente.idTipoAccion)
      request.input('cDatabase', sql.VarChar(64), busquedaReciente.cDatabase)
      request.input('cSchema', sql.VarChar(64), busquedaReciente.cSchema)
      request.input('cNombreObjeto', sql.VarChar(128), busquedaReciente.cNombreObjeto)

      const res = await request.query(stmt)

      // se encontró
      if (res && res.rowsAffected[0] === 1) return res.recordset[0].idBusquedaReciente

      // no se encontró
      return undefined
    } catch (err) {
      if (!(err instanceof sql.RequestError)) throw err
      throwRequestError(err)
    }
  }

  // Actualizar la búsqueda reciente
  public async actualizarBusquedaRecienteById(id: number): Promise<BusquedaReciente | undefined> {
    const conn = await connection(this.credentials)
    const request = conn.request()

    try {
      const stmt = `
        UPDATE dbo.BusquedaReciente 
        SET dFecha = GETUTCDATE(), lVigente = 1
        WHERE idBusquedaReciente = @id
      `
      request.input('id', sql.Int, id)

      const res = await request.query(stmt)

      if (res && res.rowsAffected[0] !== 1) return undefined // no se ha updateado correctamente

      const stmtRecovery = `SELECT * FROM dbo.BusquedaReciente WHERE idBusquedaReciente = ${id}`
      const resRecovery = await request.query(stmtRecovery)

      const data = {
        idBusquedaReciente: resRecovery.recordset[0].idBusquedaReciente,
        idUsuario: resRecovery.recordset[0].idUsuario,
        idTipoAccion: resRecovery.recordset[0].idTipoAccion,
        cDatabase: resRecovery.recordset[0].cDatabase,
        cSchema: resRecovery.recordset[0].cSchema,
        cNombreObjeto: resRecovery.recordset[0].cNombreObjeto,
        dFecha: format(resRecovery.recordset[0].dFecha, 'DD-MM-YYYY HH:mm:ss'),
        lVigente: resRecovery.recordset[0].lVigente,
      }

      return data
    } catch (err) {
      if (!(err instanceof sql.RequestError)) throw err
      throwRequestError(err)
    }
  }

  // Elimnar una búsqueda reciente por id (desactivar)
  public async eliminarBusquedaReciente(id: number): Promise<boolean | undefined> {
    const conn = await connection(this.credentials)
    const request = conn.request()

    try {
      const stmt = `
        UPDATE dbo.BusquedaReciente 
        SET lVigente = 0
        WHERE idBusquedaReciente = @id
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

  // Recuperar las busquedas recietnes (incluye paginación)
  public async obtenerBusquedasRecientes(
    busquedaReciente: BusquedaRecienteGetInput,
    pagination: PaginationInput,
  ): Promise<BusquedaRecienteResponse | undefined> {
    const conn = await connection(this.credentials)
    const request = conn.request()
    const DEFAULT_MAX_PAGINATION = 10000

    try {
      const stmt = `
        ;WITH BusquedasRecientesCTE AS (
          SELECT 
            idBusquedaReciente,
            cSchema,
            cNombreObjeto,
            dFecha
          FROM dbo.BusquedaReciente
          WHERE idUsuario = @idUsuario
            AND idTipoAccion = @idTipoAccion
            AND cDatabase = @cDatabase
            AND lVigente = 1
        ),
        TotalRegistrosCTE AS (
          SELECT COUNT(*) AS total FROM BusquedasRecientesCTE
        )
        SELECT
          A.idBusquedaReciente,
          A.cSchema,
          A.cNombreObjeto,
          A.dFecha,
          B.total
        FROM BusquedasRecientesCTE A
        CROSS JOIN TotalRegistrosCTE B
        ORDER BY A.dFecha DESC
        OFFSET COALESCE(@start, 0) ROWS
        FETCH NEXT COALESCE(@limit, ${DEFAULT_MAX_PAGINATION}) ROWS ONLY
      `

      request.input('idUsuario', sql.Int, busquedaReciente.idUsuario)
      request.input('idTipoAccion', sql.Int, busquedaReciente.idTipoAccion)
      request.input('cDatabase', sql.VarChar(64), busquedaReciente.cDatabase)
      request.input('start', sql.Int, pagination.start)
      request.input('limit', sql.Int, pagination.limit)

      const res = await request.query(stmt)

      // no se ha encontrado resultados
      if (res && res.rowsAffected[0] === 0) throw new MyCustomError(COMMON_ERROR_CODES.notfound)

      const data = res.recordset.map((obj): BusquedaRecienteRes => {
        return {
          idBusquedaReciente: obj.idBusquedaReciente,
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

  // Elimina todas las búsquedas recientes
  public async eliminarTodoBusquedasRecientes(busquedaReciente: BusquedaRecienteGetInput): Promise<boolean | undefined> {
    const conn = await connection(this.credentials)
    const request = conn.request()

    try {
      const stmt = `
        UPDATE dbo.BusquedaReciente 
        SET lVigente = 0 
        WHERE idUsuario = @idUsuario 
          AND idTipoAccion = @idTipoAccion
          AND cDatabase = @cDatabase
      `
      request.input('idUsuario', sql.Int, busquedaReciente.idUsuario)
      request.input('idTipoAccion', sql.Int, busquedaReciente.idTipoAccion)
      request.input('cDatabase', sql.VarChar(64), busquedaReciente.cDatabase)

      const res = await request.query(stmt)

      if (res && res.rowsAffected[0] !== 0) return true
      return false
    } catch (err) {
      if (!(err instanceof sql.RequestError)) throw err
      throwRequestError(err)
    }
  }
}
