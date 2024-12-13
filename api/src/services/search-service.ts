import sql from 'mssql'

import { connection } from '@/config/database'
import { TYPE_ACTION } from '@/constants'
import { Credentials, ForRetrievingSearch, GetObjectIds, SearchResponse, SuggestionSearch } from '@/models/'
import { throwRequestError } from '@/utils'

export class SearchService implements ForRetrievingSearch {
  private credentials: Credentials

  constructor(credentials: Credentials) {
    this.credentials = { ...credentials }
  }

  // Retorna sugerencias de búsqueda de objetos según su tipo, si no existe tipo busca cualquier objeto
  public async obtenerSugerencias(name: string, type: string): Promise<SearchResponse | undefined> {
    const conn = await connection(this.credentials)
    const request = conn.request()

    let andType = ''
    if (type === TYPE_ACTION.sqldefinition.name) andType = `AND type IN('P','FN','R','RF','TR','IF','TF','V')`
    else if (type === TYPE_ACTION.usertable.name) andType = `AND type IN('U')`

    try {
      const stmt = `
        SELECT 
          TOP 100
          object_id,
          name,
          SCHEMA_NAME(schema_id) AS schema_name,
          CASE 
            WHEN name LIKE CONCAT(@name, '%') THEN 1
            WHEN name LIKE CONCAT('%', @name, '%') THEN 2
            ELSE 3
          END AS peso
        FROM sys.objects
        WHERE name LIKE CONCAT('%', @name, '%') ${andType}
        ORDER BY peso,name
      `

      request.input('name', sql.VarChar(128), name)
      const res = await request.query(stmt)

      const data = res.recordset.map((obj): SuggestionSearch => {
        return {
          id: obj.object_id,
          name: obj.name,
          schemaName: obj.schema_name,
        }
      })

      return { data, meta: { length: res.recordset.length } }
    } catch (error) {
      if (!(error instanceof sql.RequestError)) throw error
      throwRequestError(error)
    }
  }

  // Obtiene los IDs de un objeto a través de su schema_name.object_name
  public async getIdsInBulk(objects: GetObjectIds[]): Promise<number[] | undefined> {
    const conn = await connection(this.credentials)
    const request = conn.request()

    try {
      let insertValuesCad = ''
      for (const obj of objects) {
        insertValuesCad += `('${obj.schema_name}', '${obj.object_name}'),`
      }
      // reemplazar la última coma por punto y coma
      insertValuesCad = insertValuesCad.slice(0, -1) + ';'

      const stmt = `
        BEGIN TRY
          -- Crear tabla temporal
          CREATE TABLE #TemporalInputObjects (
            schema_name VARCHAR(255),
            object_name VARCHAR(255)
          )

          INSERT INTO #TemporalInputObjects (schema_name, object_name)
          VALUES ${insertValuesCad}

          SELECT 
            OBJECT_ID(CONCAT(schema_name, '.', object_name)) AS object_id
          FROM #TemporalInputObjects
        END TRY

        BEGIN CATCH
          --Errores
          PRINT 'Ocurrió un error. Código de error: ' + CAST(ERROR_NUMBER() AS VARCHAR) 
          + ' - ' + ERROR_MESSAGE();
        END CATCH

        -- Eliminar la tabla temporal
        IF OBJECT_ID('tempdb..#TemporalInputObjects') IS NOT NULL
          DROP TABLE #TemporalInputObjects;
      `

      const res = await request.query(stmt)
      const data = res.recordset.map(obj => obj.object_id)

      return data
    } catch (err) {
      if (!(err instanceof sql.RequestError)) throw err
      throwRequestError(err)
    }
  }
}
