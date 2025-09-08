import { format } from '@formkit/tempo'
import { DatabaseName, getStaticDatabaseCredentials, MSSQLDatabaseConnection } from '@shared/infrastructure/store'
import { wrapDatabaseError } from '@shared/infrastructure/utils'
import { ForProdSysObjectRepositoryPort } from '@sysobject/domain/ports/drivens/for-prod-sysobject-repository.port'
import { PermissionRol } from '@sysobject/domain/schemas/permission-rol'
import { SysObject } from '@sysobject/domain/schemas/sysobject'
import sql from 'mssql'

export class MssqlProdSysObjectRepositoryAdapter implements ForProdSysObjectRepositoryPort {
  private connection = new MSSQLDatabaseConnection()
  private db = getStaticDatabaseCredentials(DatabaseName.PREPROD)

  async getByNameAndSchema(name: string, schema: string): Promise<SysObject | null> {
    try {
      const conn = await this.connection.connect(this.db.credentials, this.db.type)
      const request = conn.request()

      request.input('object_name', sql.VarChar(128), name).input('schema_name', sql.VarChar(64), schema)
      const res = await request.execute('SYS_ObtenerDefinicionSQL_SP')

      if (res && res.recordset.length === 0) return null

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
    } catch (err) {
      throw wrapDatabaseError(err)
    }
  }

  async getRolesById(id: number): Promise<PermissionRol[]> {
    try {
      const conn = await this.connection.connect(this.db.credentials, this.db.type)
      const request = conn.request()

      request.input('id', sql.Int, id)
      const res = await request.execute('SYS_ObtenerRoles_SP')

      const data: PermissionRol[] =
        res.recordset.map((obj): PermissionRol => {
          return {
            stateDesc: obj.state_desc,
            permissionName: obj.permission_name,
            name: obj.rol,
          }
        }) ?? []

      return data
    } catch (err) {
      throw wrapDatabaseError(err)
    }
  }
}
