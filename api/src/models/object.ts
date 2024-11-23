import { format } from '@formkit/tempo'
import sql from 'mssql'

import { connection } from '@/config/database'
import { COMMON_ERROR_CODES, TYPE_ACTION } from '@/constants'
import { formatSQLDataType, throwRequestError } from '@/utils'

import {
  Column,
  Credentials,
  CustomError,
  ExtendedProperty,
  ForeignKey,
  ForRetrievingObject,
  FullUserTableObject,
  Index,
  MyCustomError,
  PermissionRol,
  ResponseSQLDefinitionObjects,
  ResponseUserTableObjects,
  ResponseUserTableRecordObject,
  SearchResponse,
  SQLDefinitionObjects,
  SQLDefinitionRecordObject,
  UserTableObjects,
  UserTableRecordObject,
} from './schemas'

export class ObjectModel implements ForRetrievingObject {
  private credentials: Credentials

  constructor(credentials: Credentials) {
    this.credentials = { ...credentials }
  }

  // Busca uno o varios objectos por su nombre que tienen una definición SQL
  public async findSQLDefinitionByName(name: string): Promise<ResponseSQLDefinitionObjects | CustomError | undefined> {
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

      if (res && res.rowsAffected[0] === 0) throw new MyCustomError(COMMON_ERROR_CODES.NOTFOUND)

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
  public async getSQLDefinitionById(id: number): Promise<SQLDefinitionRecordObject | CustomError | undefined> {
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

      if (res && res.rowsAffected[0] === 0) throw new MyCustomError(COMMON_ERROR_CODES.NOTFOUND)

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

  // Busca uno o mas usertables por su nombre
  public async findUserTableByName(name: string): Promise<ResponseUserTableObjects | CustomError | undefined> {
    const conn = await connection(this.credentials)
    const request = conn.request()

    try {
      const stmt = `
        SELECT  
          A.object_id,  
          A.name,
          B.name AS schema_name
        FROM sys.objects        A
        INNER JOIN sys.schemas  B ON B.schema_id = A.schema_id
        WHERE type IN('U') AND A.name = @name
      `
      request.input('name', sql.VarChar(128), name)
      const res = await request.query(stmt)

      if (res && res.rowsAffected[0] === 0) throw new MyCustomError(COMMON_ERROR_CODES.NOTFOUND)

      // todo: adapter
      const data = res.recordset.map((obj): UserTableObjects => {
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

  // Obtiene un usertable por su id para obtener sus descripciones, columnas, etc.
  public async getUserTableById(id: number): Promise<ResponseUserTableRecordObject | CustomError | undefined> {
    const conn = await connection(this.credentials)
    const request = conn.request()

    try {
      // busca el usertable por su nombre
      const stmtSearch = `
        SELECT  
          A.object_id,  
          A.name, 
          A.type, 
          A.type_desc,
          B.schema_id,  
          B.name AS schema_name,  
          A.create_date, 
          A.modify_date
        FROM sys.objects        A
        INNER JOIN sys.schemas  B ON B.schema_id = A.schema_id
        WHERE type IN('U') AND A.object_id = @id
      `
      request.input('id', sql.Int, id)
      const res = await request.query(stmtSearch)

      // si no encuentra el usertable, lanza un error de no encontrado
      if (res && res.rowsAffected[0] === 0) throw new MyCustomError(COMMON_ERROR_CODES.NOTFOUND)

      // obtener columnas
      const stmtColumns = `
        SELECT
          A.column_id,
          A.name,
          B.name AS type_name,
          A.max_length,
          A.precision,
          A.scale,
          A.is_nullable,
          A.is_identity
        FROM sys.columns      A
        INNER JOIN sys.types  B ON B.user_type_id = A.user_type_id
        WHERE A.object_id = ${id}
      `
      const resColumns = await request.query(stmtColumns)

      // obtener las propiedades extendidas de las columnas
      const stmtExtendedProperties = `
        SELECT 
          A.column_id,
          CAST(B.value AS NVARCHAR(200)) COLLATE Latin1_General_CI_AS_KS_WS AS value,
          B.name
        FROM sys.columns A
        INNER JOIN sys.extended_properties B ON B.major_id = A.object_id AND B.minor_id = A.column_id
        WHERE B.class = 1 -- (1: OBJECT_OR_COLUMN)
          AND A.object_id = ${id}
      `
      const resExtendedProperties = await request.query(stmtExtendedProperties)

      const stmtIndexes = `
        SELECT 
          A.column_id,
          C.name,
          C.type_desc,
          C.is_primary_key,
          C.is_unique
        FROM sys.columns              A
        INNER JOIN sys.index_columns  B ON B.column_id = A.column_id AND B.object_id = A.object_id
        INNER JOIN sys.indexes        C ON C.index_id = B.index_id AND C.object_id = A.object_id
        WHERE A.object_id = ${id}
      `
      const resIndexes = await request.query(stmtIndexes)

      const stmtForeignKeys = `
        SELECT 
          A.column_id,
          SCHEMA_NAME(C.schema_id) AS referenced_schema,
          B.referenced_object_id,
          C.name AS referenced_object,
          B.referenced_column_id,
          D.name AS referenced_column
        FROM sys.columns A
        INNER JOIN sys.foreign_key_columns	B ON B.parent_column_id = A.column_id AND B.parent_object_id = A.object_id
        INNER JOIN sys.objects				C ON C.object_id = B.referenced_object_id
        INNER JOIN sys.columns				D ON D.column_id = B.referenced_column_id AND D.object_id = B.referenced_object_id
        WHERE A.object_id = ${id}
      `
      const resForeignKeys = await request.query(stmtForeignKeys)

      const stmtTableExtendedProperties = `
        SELECT 
          CAST(value AS NVARCHAR(200)) COLLATE Latin1_General_CI_AS_KS_WS AS value, 
          name 
        FROM sys.extended_properties
        WHERE major_id = ${id} AND minor_id = 0
      `
      const resTableExtendedProperties = await request.query(stmtTableExtendedProperties)

      //todo: adapter
      const recordObject: UserTableRecordObject = {
        id: res.recordset[0].object_id,
        name: res.recordset[0].name,
        type: res.recordset[0].type.trim(),
        typeDesc: res.recordset[0].type_desc,
        schemaId: res.recordset[0].schema_id,
        schema: res.recordset[0].schema_name,
        createDate: format(res.recordset[0].create_date, 'DD-MM-YYYY'),
        modifyDate: format(res.recordset[0].modify_date, 'DD-MM-YYYY'),
        isAligmentObject: false,
      }

      const tableExtendedProperties = resTableExtendedProperties.recordset.map((obj): ExtendedProperty => {
        return {
          propertyValue: obj.value,
          propertyName: obj.name,
        }
      })

      const columns = resColumns.recordset.map((obj): Column => {
        return {
          id: obj.column_id,
          name: obj.name,
          type: formatSQLDataType(obj.type_name, obj.max_length, obj.precision, obj.scale),
          isNullable: obj.is_nullable,
          isIdentity: obj.is_identity,
          extendedProperties: resExtendedProperties.recordset
            .filter(element => element.column_id === obj.column_id)
            .map(obj2 => ({
              propertyValue: obj2.value,
              propertyName: obj2.name,
            })),
        }
      })

      const indexes = resIndexes.recordset.map((obj): Index => {
        return {
          columnId: obj.column_id,
          name: obj.name,
          typeDesc: obj.type_desc,
          isPrimaryKey: obj.is_primary_key,
          isUnique: obj.is_unique,
        }
      })

      const foreignKeys = resForeignKeys.recordset.map(
        (obj): ForeignKey => ({
          columnId: obj.column_id,
          referencedObjectId: obj.referenced_object_id,
          referencedObject: obj.referenced_object,
          referencedSchema: obj.referenced_schema,
          referencedColumnId: obj.referenced_column_id,
          referencedColumn: obj.referenced_column,
        }),
      )

      const data: FullUserTableObject = { ...recordObject, extendedProperties: tableExtendedProperties, columns, indexes, foreignKeys }
      return { data }
    } catch (error) {
      if (!(error instanceof sql.RequestError)) throw error
      throwRequestError(error)
    }
  }

  public async getSQLDefinitionAligmentById(
    name: string,
    schemaName: string,
  ): Promise<SQLDefinitionRecordObject | CustomError | undefined> {
    const conn = await connection(this.credentials)
    const request = conn.request()
    const request2 = conn.request()

    try {
      request.input('object_name', sql.VarChar(128), name).input('schema_name', sql.VarChar(64), schemaName)
      const res = await request.execute('SYS_ObtenerDefinicionSQL_SP')

      if (res && res.recordset.length === 0) throw new MyCustomError(COMMON_ERROR_CODES.NOTFOUND)

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

  // Retorna sugerencias de búsqueda de objetos según su tipo, si no existe tipo busca cualquier objeto
  public async searchByName(name: string, type: string): Promise<SearchResponse | CustomError | undefined> {
    const conn = await connection(this.credentials)
    const request = conn.request()

    let andType = ''
    if (type === TYPE_ACTION.sqldefinition.name) andType = `AND type IN('P','FN','R','RF','TR','IF','TF','V')`
    else if (type === TYPE_ACTION.usertable.name) andType = `AND type IN('U')`

    try {
      const stmt = `
        SELECT 
          TOP 100
          name,
          CASE 
            WHEN name LIKE CONCAT(@name, '%') THEN 1
            WHEN name LIKE CONCAT('%', @name, '%') THEN 2
            ELSE 3
          END AS peso
        FROM sys.objects
        WHERE name LIKE CONCAT('%', @name, '%') ${andType}
        GROUP BY name
        ORDER BY peso,name
      `

      request.input('name', sql.VarChar(128), name)
      const res = await request.query(stmt)

      return { data: res.recordset, meta: { length: res.recordset.length } }
    } catch (error) {
      if (!(error instanceof sql.RequestError)) throw error
      throwRequestError(error)
    }
  }
}
