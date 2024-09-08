import sql from 'mssql'

import { connection } from '@/config/database'
import { COMMON_ERROR_CODES } from '@/constants'
import { handleRequestError } from '@/utils/handle-request-error'

import { Credentials, CustomError, ForRetrievingObject, ListDefinitionObject, MyCustomError, RecordObject } from './schemas'

//https://learn.microsoft.com/es-es/sql/relational-databases/system-catalog-views/sys-sql-modules-transact-sql

export class ObjectModel implements ForRetrievingObject {
  private credentials: Credentials

  constructor(credentials: Credentials) {
    this.credentials = { ...credentials }
  }

  // Busca un objecto por su nombre que tiene una definición SQL
  async getSQLDefinitionByName(name: string): Promise<ListDefinitionObject | CustomError | undefined> {
    const conn = await connection(this.credentials)
    const request = await conn?.request()

    try {
      const stmt = `
        SELECT  
          A.object_id,  
          A.name, 
          A.type, 
          A.type_desc,
          B.schema_id,  
          B.name AS schema_name,  
          A.create_date, 
          A.modify_date, 
          C.definition
        FROM sys.objects          A
        INNER JOIN sys.schemas    B ON B.schema_id = A.schema_id
        LEFT JOIN sys.sql_modules C ON C.object_id = A.object_id
        WHERE type IN('P','FN','R','RF','TR','IF','TF','V')
          AND A.name = @name
      `

      await request?.input('name', sql.VarChar, name)
      const res = await request?.query(stmt)

      if (res?.rowsAffected[0] === 0) throw new MyCustomError(COMMON_ERROR_CODES.NOTFOUND)

      // adapter
      const data =
        res?.recordset.map((obj): RecordObject => {
          return {
            id: obj.object_id,
            name: obj.name,
            type: obj.type,
            typeDesc: obj.type_desc,
            schemaId: obj.schema_id,
            schema: obj.schema_name,
            createDate: obj.create_date,
            modifyDate: obj.modify_date,
            definition: obj.definition,
          }
        }) ?? []

      return { data, meta: { length: data?.length } }
    } catch (error) {
      if (!(error instanceof sql.RequestError)) throw error
      handleRequestError(error)
    } finally {
      conn?.close()
    }
  }
}
