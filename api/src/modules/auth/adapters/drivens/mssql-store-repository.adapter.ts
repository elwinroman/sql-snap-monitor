import { PermissionStoreSchema, StoreInfoSchema } from '@auth/domain/store'
import { ForStoreRepositoryPort } from '@auth/ports/drivens/for-store-repository.port'
import { StoreUserSchema } from '@shared/domain/store'

import { MSSQLDatabaseConnection } from '@/modules/shared/infrastructure/store'

export class MssqlStoreRepositoryAdapter implements ForStoreRepositoryPort {
  private connection = new MSSQLDatabaseConnection()

  async getDetails(user: StoreUserSchema): Promise<StoreInfoSchema> {
    const conn = await this.connection.connect(user)
    const request = conn.request()

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

    const data: StoreInfoSchema = {
      name: res.recordset[0].name,
      compatibility: res.recordset[0].cmptlevel,
      description: res.recordset[0].value,
      server: res.recordset[0].server_name,
    }

    return data
  }

  async getPermission(user: StoreUserSchema): Promise<PermissionStoreSchema> {
    const conn = await this.connection.connect(user)
    const request = conn.request()

    const stmt = `
      SELECT 
        GETUTCDATE() AS date,
        viewdefinition_permission = COALESCE((SELECT TOP 1 IIF(definition IS NULL, 0, 1) FROM sys.sql_modules), 0),
        definition_counts = (SELECT COUNT(*) FROM sys.sql_modules)
    `
    const res = await request.query(stmt)

    // si no existen SPs, views: por defecto asumimos que tiene permisos (lo cual no es necesariamente correcto)
    const definitionCounts = res.recordset[0].definition_counts

    const data: PermissionStoreSchema = {
      date: res.recordset[0].date,
      viewdefinitionPermission: definitionCounts > 0 ? Boolean(res.recordset[0].viewdefinition_permission) : true,
    }

    return data
  }
}
