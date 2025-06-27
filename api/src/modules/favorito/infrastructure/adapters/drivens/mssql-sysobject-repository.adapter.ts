import { ForSysObjectRepositoryPort, SysObject } from '@favorito/domain/ports/drivens/for-sysobject-repository.port'
import { MSSQLDatabaseConnection } from '@shared/infrastructure/store'
import { buildStoreAuthContext, wrapDatabaseError } from '@shared/infrastructure/utils'

export class MSSQLSysObjectRepositoryAdapter implements ForSysObjectRepositoryPort {
  private connection = new MSSQLDatabaseConnection()

  async findIDsByNameAndSchema(sysObjects: SysObject[]): Promise<number[]> {
    const { store } = await buildStoreAuthContext()
    const conn = await this.connection.connect(store.credentials, store.type)
    const request = conn.request()

    let sqlValues = ''
    sysObjects.forEach((row, index) => {
      sqlValues += `(${index}, '${row.schema}', '${row.name}'),`
    })
    // reemplaza la última coma por punto y coma
    sqlValues = sqlValues.slice(0, -1) + ';'

    try {
      const stmt = `
        IF OBJECT_ID('tempdb..#TemporalObjects') IS NOT NULL
        BEGIN
          DROP TABLE #TemporalObjects
        END

        --==================================
        --Tabla temporal de los objetos
        --==================================
        CREATE TABLE #TemporalObjects (
          id INT,
          schema_name VARCHAR(255),
          object_name VARCHAR(255)
        )

        INSERT INTO #TemporalObjects (id, schema_name, object_name)
        VALUES ${sqlValues}

        SELECT 
          OBJECT_ID(CONCAT(schema_name, '.', object_name)) AS object_id
        FROM #TemporalObjects
        ORDER BY id ASC
        
        DROP TABLE #TemporalObjects
      `

      const res = await request.query(stmt)
      const data = res.recordset.map(obj => obj.object_id)

      return data
    } catch (err) {
      throw wrapDatabaseError(err)
    }
  }
}
