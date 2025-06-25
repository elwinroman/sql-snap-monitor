import { format } from '@formkit/tempo'
import { MSSQLDatabaseConnection } from '@shared/infrastructure/store'
import { buildStoreAuthContext, wrapDatabaseError } from '@shared/infrastructure/utils'
import {
  ForSysUsertableRepositoryPort,
  RawColumn,
  RawExtendedProperty,
} from '@sysobject/domain/ports/drivens/for-sysusertable-repository.port'
import { Column, ExtendedProperty, ForeignKey, Index, UsertableSysObject } from '@sysobject/domain/schemas/usertable'
import { formatSQLDataType } from '@sysobject/infrastructure/utils/format-sql-data-type.util'
import sql from 'mssql'

export class MssqlSysUsertableRepositoryAdapter implements ForSysUsertableRepositoryPort {
  private connection = new MSSQLDatabaseConnection()

  async getById(id: number): Promise<UsertableSysObject | null> {
    const { store } = await buildStoreAuthContext()
    const conn = await this.connection.connect(store.credentials, store.type)
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
          A.modify_date
        FROM sys.objects        A
        INNER JOIN sys.schemas  B ON B.schema_id = A.schema_id
        WHERE type IN('U') AND A.object_id = @id
      `

      request.input('id', sql.Int, id)
      const res = await request.query(stmt)

      if (res && res.rowsAffected[0] === 0) return null

      // adapter
      const data: UsertableSysObject = {
        id: res.recordset[0].object_id,
        name: res.recordset[0].name,
        type: res.recordset[0].type.trim(),
        typeDesc: res.recordset[0].type_desc,
        schemaId: res.recordset[0].schema_id,
        schemaName: res.recordset[0].schema_name,
        createDate: format(res.recordset[0].create_date, 'DD-MM-YYYY'),
        modifyDate: format(res.recordset[0].modify_date, 'DD-MM-YYYY'),
      }

      return data
    } catch (err) {
      throw wrapDatabaseError(err)
    }
  }

  async getColumnsById(id: number): Promise<Column[]> {
    const { store } = await buildStoreAuthContext()
    const conn = await this.connection.connect(store.credentials, store.type)
    const request = conn.request()

    try {
      // columnas
      const stmt = `
        --======================================================================
        -- Obtener columnas => recordset[0]
        --======================================================================
        SELECT
          A.column_id,
          A.name,
          B.name AS type_name,
          A.max_length,
          A.precision,
          A.scale,
          A.is_nullable,
          A.is_identity,
          C.definition AS default_definition
        FROM sys.columns      A
        INNER JOIN sys.types  B ON B.user_type_id = A.user_type_id
        LEFT JOIN sys.default_constraints C ON C.parent_column_id = A.column_id AND C.parent_object_id = @id
        WHERE A.object_id = @id
        ORDER BY A.column_id;
  
        --======================================================================
        -- Obtener propiedades extendidas de las columnas => recordset[1]
        --======================================================================
        SELECT 
          A.column_id,
          CAST(B.value AS NVARCHAR(200)) COLLATE Latin1_General_CI_AS_KS_WS AS value,
          B.name
        FROM sys.columns A
        INNER JOIN sys.extended_properties B ON B.major_id = A.object_id AND B.minor_id = A.column_id
        WHERE B.class = 1 -- (1: OBJECT_OR_COLUMN)
          AND A.object_id = @id
      `
      request.input('id', sql.Int, id)
      const res = await request.query(stmt)

      // tipando los resultados del recordsets (se usa unknown para decirle a typescript que confie en lo que se está haciendo)
      const recordsets = res.recordsets as unknown as [RawColumn[], RawExtendedProperty[]]

      const columnsRaw = recordsets[0]
      const extendedPropsRaw = recordsets[1]

      const columns =
        columnsRaw.map((obj): Column => {
          return {
            id: obj.column_id,
            name: obj.name,
            type: formatSQLDataType(obj.type_name, obj.max_length, obj.precision, obj.scale),
            isNullable: obj.is_nullable,
            isIdentity: obj.is_identity,
            defaultDefinition: obj.default_definition,
            extendedProperties:
              extendedPropsRaw
                .filter(prop => prop.column_id === obj.column_id)
                .map(prop => ({
                  propertyValue: prop.value,
                  propertyName: prop.name,
                })) ?? [],
          }
        }) ?? []

      return columns
    } catch (err) {
      throw wrapDatabaseError(err)
    }
  }

  async getForeignKeysById(id: number): Promise<ForeignKey[]> {
    const { store } = await buildStoreAuthContext()
    const conn = await this.connection.connect(store.credentials, store.type)
    const request = conn.request()

    try {
      const stmt = `
        SELECT 
          A.column_id,
          SCHEMA_NAME(C.schema_id) AS referenced_schema,
          B.referenced_object_id,
          C.name AS referenced_object,
          B.referenced_column_id,
          D.name AS referenced_column
        FROM sys.columns A
        INNER JOIN sys.foreign_key_columns	B ON B.parent_column_id = A.column_id AND B.parent_object_id = A.object_id
        INNER JOIN sys.objects				      C ON C.object_id = B.referenced_object_id
        INNER JOIN sys.columns				      D ON D.column_id = B.referenced_column_id AND D.object_id = B.referenced_object_id
        WHERE A.object_id = ${id}
      `
      request.input('id', sql.Int, id)
      const res = await request.query(stmt)

      const data =
        res.recordset.map(
          (obj): ForeignKey => ({
            columnId: obj.column_id,
            referencedObjectId: obj.referenced_object_id,
            referencedObject: obj.referenced_object,
            referencedSchema: obj.referenced_schema,
            referencedColumnId: obj.referenced_column_id,
            referencedColumn: obj.referenced_column,
          }),
        ) ?? []

      return data
    } catch (err) {
      throw wrapDatabaseError(err)
    }
  }

  async getIndexesById(id: number): Promise<Index[]> {
    const { store } = await buildStoreAuthContext()
    const conn = await this.connection.connect(store.credentials, store.type)
    const request = conn.request()

    try {
      const stmt = `
        SELECT 
          A.column_id,
          C.name,
          C.type_desc,
          C.is_primary_key,
          C.is_unique
        FROM sys.columns              A
        INNER JOIN sys.index_columns  B ON B.column_id = A.column_id AND B.object_id = A.object_id
        INNER JOIN sys.indexes        C ON C.index_id = B.index_id AND C.object_id = A.object_id
        WHERE A.object_id = @id
      `
      request.input('id', sql.Int, id)
      const res = await request.query(stmt)

      const data =
        res.recordset.map((obj): Index => {
          return {
            columnId: obj.column_id,
            name: obj.name,
            typeDesc: obj.type_desc,
            isPrimaryKey: obj.is_primary_key,
            isUnique: obj.is_unique,
          }
        }) ?? []

      return data
    } catch (err) {
      throw wrapDatabaseError(err)
    }
  }

  async getUsertableExtendedPropertieById(id: number): Promise<ExtendedProperty[]> {
    const { store } = await buildStoreAuthContext()
    const conn = await this.connection.connect(store.credentials, store.type)
    const request = conn.request()

    try {
      const stmt = `
        SELECT 
          CAST(value AS NVARCHAR(200)) COLLATE Latin1_General_CI_AS_KS_WS AS value, 
          name 
        FROM sys.extended_properties
        WHERE major_id = @id AND minor_id = 0
      `
      request.input('id', sql.Int, id)
      const res = await request.query(stmt)

      const data =
        res.recordset.map((obj): ExtendedProperty => {
          return {
            propertyValue: obj.value,
            propertyName: obj.name,
          }
        }) ?? []

      return data
    } catch (err) {
      throw wrapDatabaseError(err)
    }
  }
}
