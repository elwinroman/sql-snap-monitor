import { getAuthContext } from '@auth/infrastructure/auth-context'
import { format } from '@formkit/tempo'
import { StoreUserSchema } from '@shared/domain/store'
import { getCacheDatabaseCredentials, MSSQLDatabaseConnection, UserType } from '@shared/infrastructure/store'
import { ForSysObjectRepositoryPort } from '@sysobject/domain/ports/drivens/for-sysobject-repository.port'
import { SearchSysObject } from '@sysobject/domain/ports/drivers/for-sysobject-retrieval.port'
import { PermissionRol } from '@sysobject/domain/schemas/permission-rol'
import sql from 'mssql'

import { SysObject, TypeSysObject, TypeSysObjectEnum } from '@/modules/sysobject/domain/schemas/sysobject'

export class MssqlSysObjectRepositoryAdapter implements ForSysObjectRepositoryPort {
  private connection = new MSSQLDatabaseConnection()

  /**
   * Obtiene las credenciales de la base de datos del usuario actual desde el contexto de autenticación y la caché.
   *
   * @throws {Error} Cuando no se puede recuperar el contexto de autenticación.
   * @returns {Promise<{ credentials: StoreUserSchema; type: UserType }>} Un objeto que contiene las credenciales del usuario y el tipo de usuario (External por defecto).
   */
  private async fetchUserDbCredentials(): Promise<{ credentials: StoreUserSchema; type: UserType }> {
    const authContext = getAuthContext()
    if (!authContext) throw new Error('Error en la recuperación del contexto de autenticación')
    const cachedCredentials = await getCacheDatabaseCredentials(authContext.userId)

    return cachedCredentials
  }

  async getById(id: number): Promise<SysObject | null> {
    const dbUser = await this.fetchUserDbCredentials()
    const conn = await this.connection.connect(dbUser.credentials, dbUser.type)
    const request = conn.request()

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
      WHERE type IN('P','FN','TR','TF','V')
        AND A.object_id = @id
    `

    request.input('id', sql.Int, id)
    const res = await request.query(stmt)

    if (res && res.rowsAffected[0] === 0) return null

    // adapter
    const data: SysObject = {
      id: res.recordset[0].object_id,
      name: res.recordset[0].name,
      type: res.recordset[0].type.trim(),
      typeDesc: res.recordset[0].type_desc,
      schemaId: res.recordset[0].schema_id,
      schemaName: res.recordset[0].schema_name,
      createDate: format(res.recordset[0].create_date, 'DD-MM-YYYY'),
      modifyDate: format(res.recordset[0].modify_date, 'DD-MM-YYYY'),
      definition: res.recordset[0].definition,
    }

    return data
  }

  async getRolesById(id: number): Promise<PermissionRol[]> {
    const dbUser = await this.fetchUserDbCredentials()
    const conn = await this.connection.connect(dbUser.credentials, dbUser.type)
    const request = conn.request()

    const stmt = `
      SELECT 
        A.state_desc,
        A.permission_name, 
        C.name AS rol
      FROM sys.database_permissions		    A
      INNER JOIN sys.objects				      B ON B.object_id = A.major_id
      INNER JOIN sys.database_principals	C ON C.principal_id = A.grantee_principal_id
      WHERE B.object_id = @id
    `
    request.input('id', sql.Int, id)
    const res = await request.query(stmt)

    const roles: PermissionRol[] =
      res.recordset.map((obj): PermissionRol => {
        return {
          stateDesc: obj.state_desc,
          permissionName: obj.permission_name,
          name: obj.rol,
        }
      }) ?? []

    return roles
  }

  async findByNameAndType(name: string, type: TypeSysObject): Promise<SearchSysObject[]> {
    // búsqueda según el tipo de objeto
    let andTypeDesc = ''
    if (type === TypeSysObjectEnum.ALL_EXCEPT_USERTABLE)
      andTypeDesc = `AND type IN('P','FN','TR','TF','V')` // excluye USER_TABLE
    else if (type === TypeSysObjectEnum.ALL)
      andTypeDesc = `AND type IN('P','FN','TR','TF','V','U')` // incluye USER_TABLE
    else andTypeDesc = `AND type = '${type}'`

    const dbUser = await this.fetchUserDbCredentials()
    const conn = await this.connection.connect(dbUser.credentials, dbUser.type)
    const request = conn.request()

    const stmt = `
      SELECT TOP 100
        object_id,
        name,
        SCHEMA_NAME(schema_id) AS schema_name,
        type_desc,
        CASE 
          WHEN name LIKE CONCAT(@name, '%') THEN 1
          WHEN name LIKE CONCAT('%', @name, '%') THEN 2
          ELSE 3
        END AS peso
      FROM sys.objects
      WHERE name LIKE CONCAT('%', @name, '%') ${andTypeDesc}
      ORDER BY peso,name
    `

    request.input('name', sql.VarChar(128), name)
    const res = await request.query(stmt)

    // adapter
    const data =
      res.recordset.map((obj): SearchSysObject => {
        return {
          id: obj.object_id,
          name: obj.name,
          schemaName: obj.schema_name,
          typeDesc: obj.type_desc.trim(),
        }
      }) ?? []

    return data
  }
}
