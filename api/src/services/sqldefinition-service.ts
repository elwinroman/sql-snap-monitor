import { format } from '@formkit/tempo'
import sql from 'mssql'

import { connection } from '@/config/database'
import { COMMON_ERROR_CODES } from '@/constants'
import {
  Credentials,
  ForRetrievingObject,
  MyCustomError,
  PermissionRol,
  ResponseSQLDefinitionObjects,
  SQLDefinitionObjects,
  SQLDefinitionRecordObject,
} from '@/models/'
import { throwRequestError } from '@/utils'

export class SQLDefinitionService implements ForRetrievingObject {
  private credentials: Credentials

  constructor(credentials: Credentials) {
    this.credentials = { ...credentials }
  }

  // Busca uno o varios objectos por su nombre que tienen una definición SQL
  public async findSQLDefinitionByName(name: string): Promise<ResponseSQLDefinitionObjects | undefined> {
    const conn = await connection(this.credentials)
    const request = conn.request()

    try {
      const stmt = `
        SELECT  
          A.object_id,  
          A.name, 
          B.name AS schema_name
        FROM sys.objects            A
        INNER JOIN sys.schemas      B ON B.schema_id = A.schema_id
        WHERE type IN('P','FN','R','RF','TR','IF','TF','V')
          AND A.name = @name
      `

      request.input('name', sql.VarChar(128), name)
      const res = await request.query(stmt)

      if (res && res.rowsAffected[0] === 0) throw new MyCustomError(COMMON_ERROR_CODES.notfound)

      // todo: adapter
      const data = res.recordset.map((obj): SQLDefinitionObjects => {
        return {
          id: obj.object_id,
          name: obj.name,
          schema: obj.schema_name,
        }
      })

      return { data, meta: { length: data.length } }
    } catch (error) {
      if (!(error instanceof sql.RequestError)) throw error
      throwRequestError(error)
    }
  }

  // Obtiene un objecto por su id que tiene una definición SQL
  public async getSQLDefinitionById(id: number): Promise<SQLDefinitionRecordObject | undefined> {
    const conn = await connection(this.credentials)
    const request = conn.request()

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
        FROM sys.objects            A
        INNER JOIN sys.schemas      B ON B.schema_id = A.schema_id
        INNER JOIN sys.sql_modules  C ON C.object_id = A.object_id
        WHERE type IN('P','FN','R','RF','TR','IF','TF','V')
          AND A.object_id = @id
      `

      request.input('id', sql.Int, id)
      const res = await request.query(stmt)

      if (res && res.rowsAffected[0] === 0) throw new MyCustomError(COMMON_ERROR_CODES.notfound)

      // obtener permisos (roles)
      const stmtRoles = `
        SELECT 
          A.state_desc,
          A.permission_name, 
          C.name AS rol
        FROM sys.database_permissions		A
        INNER JOIN sys.objects				B ON B.object_id = A.major_id
        INNER JOIN sys.database_principals	C ON C.principal_id = A.grantee_principal_id
        WHERE B.object_id = @id2
      `
      request.input('id2', sql.Int, id)
      const resRoles = await request.query(stmtRoles)

      const roles: PermissionRol[] = resRoles.recordset.map((obj): PermissionRol => {
        return {
          stateDesc: obj.state_desc,
          permissionName: obj.permission_name,
          name: obj.rol,
        }
      })

      // adapter
      const data: SQLDefinitionRecordObject = {
        id: res.recordset[0].object_id,
        name: res.recordset[0].name,
        type: res.recordset[0].type.trim(),
        typeDesc: res.recordset[0].type_desc,
        schemaId: res.recordset[0].schema_id,
        schema: res.recordset[0].schema_name,
        createDate: format(res.recordset[0].create_date, 'DD-MM-YYYY'),
        modifyDate: format(res.recordset[0].modify_date, 'DD-MM-YYYY'),
        definition: res.recordset[0].definition,
        permission: roles,
        isAligmentObject: false,
      }

      return data
    } catch (error) {
      if (!(error instanceof sql.RequestError)) throw error
      throwRequestError(error)
    }
  }

  public async getSQLDefinitionAligmentById(name: string, schemaName: string): Promise<SQLDefinitionRecordObject | undefined> {
    const conn = await connection(this.credentials)
    const request = conn.request()
    const request2 = conn.request()

    try {
      request.input('object_name', sql.VarChar(128), name).input('schema_name', sql.VarChar(64), schemaName)
      const res = await request.execute('SYS_ObtenerDefinicionSQL_SP')

      if (res && res.recordset.length === 0) throw new MyCustomError(COMMON_ERROR_CODES.notfound)

      const objectId = res.recordset[0].object_id

      request2.input('id', sql.Int, objectId)
      const resRoles = await request2.execute('SYS_ObtenerRoles_SP')

      const roles: PermissionRol[] = resRoles.recordset.map((obj): PermissionRol => {
        return {
          stateDesc: obj.state_desc,
          permissionName: obj.permission_name,
          name: obj.rol,
        }
      })

      // adapter
      const data: SQLDefinitionRecordObject = {
        id: res.recordset[0].object_id,
        name: res.recordset[0].name,
        type: res.recordset[0].type.trim(),
        typeDesc: res.recordset[0].type_desc,
        schemaId: res.recordset[0].schema_id,
        schema: res.recordset[0].schema_name,
        createDate: format(res.recordset[0].create_date, 'DD-MM-YYYY'),
        modifyDate: format(res.recordset[0].modify_date, 'DD-MM-YYYY'),
        definition: res.recordset[0].definition,
        permission: roles,
        isAligmentObject: true,
      }

      return data
    } catch (error) {
      if (!(error instanceof sql.RequestError)) throw error
      throwRequestError(error)
    }
  }
}
