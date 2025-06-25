import { ForStoreRepositoryPort } from '@auth/domain/ports/drivens'
import { PermissionStore, StoreInfo } from '@auth/domain/schemas/store'
import { StoreUserSchema } from '@shared/domain/store'
import { MSSQLDatabaseConnection } from '@shared/infrastructure/store'
import { UserTypeEnum } from '@shared/infrastructure/store'
import { wrapDatabaseError } from '@shared/infrastructure/utils'

export class MssqlStoreRepositoryAdapter implements ForStoreRepositoryPort {
  private connection = new MSSQLDatabaseConnection()

  async getDetails(credential: StoreUserSchema): Promise<StoreInfo> {
    const conn = await this.connection.connect(credential, UserTypeEnum.External)
    const request = conn.request()

    try {
      const stmt = `
        SELECT
          name,
          cmptlevel,
          value = (SELECT TOP 1 value FROM sys.extended_properties WHERE class = 0),
          @@SERVERNAME AS server_name
        FROM sys.sysdatabases
        WHERE dbid = DB_ID()
      `
      const res = await request.query(stmt)

      const data: StoreInfo = {
        name: res.recordset[0].name,
        compatibility: res.recordset[0].cmptlevel,
        description: res.recordset[0].value,
        server: res.recordset[0].server_name,
      }

      return data
    } catch (err: unknown) {
      throw wrapDatabaseError(err)
    }
  }

  async getPermission(credential: StoreUserSchema): Promise<PermissionStore> {
    const conn = await this.connection.connect(credential, UserTypeEnum.External)
    const request = conn.request()

    try {
      const stmt = `
        SELECT 
          GETUTCDATE() AS date,
          viewdefinition_permission = COALESCE((SELECT TOP 1 IIF(definition IS NULL, 0, 1) FROM sys.sql_modules), 0),
          definition_counts = (SELECT COUNT(*) FROM sys.sql_modules)
      `
      const res = await request.query(stmt)

      // si no existen SPs, views: por defecto asumimos que tiene permisos (lo cual no es necesariamente correcto)
      const definitionCounts = res.recordset[0].definition_counts

      const data: PermissionStore = {
        date: res.recordset[0].date,
        viewdefinitionPermission: definitionCounts > 0 ? Boolean(res.recordset[0].viewdefinition_permission) : true,
      }
      return data
    } catch (err) {
      throw wrapDatabaseError(err)
    }
  }
}
