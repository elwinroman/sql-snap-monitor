import { DatabaseInfo } from '@auth-users/domain/database-info'
import { DatabaseInfoRepository } from '@auth-users/domain/database-info-repository'
import { DatabaseName, getDatabaseCredentials, MSSQLDatabaseConnection } from '@shared/database/infrastructure/mssql'

import { Credential } from '@/modules/shared/database/domain/credential'

export class MSSQLDatabaseInfoRepository implements DatabaseInfoRepository {
  private readonly credentials: Credential

  constructor(private readonly msqlDatabaseConnection: MSSQLDatabaseConnection) {
    this.credentials = getDatabaseCredentials(DatabaseName.APP)
  }

  async getInfo(): Promise<DatabaseInfo> {
    const conn = await this.msqlDatabaseConnection.connect(this.credentials)
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

    const details = res.recordset[0]
    // mapeo
    const databaseInfoMapped: DatabaseInfo = {
      description: details.value,
      name: details.name,
      server: details.server_name,
      compatibility: details.value,
    }

    return databaseInfoMapped
  }
}
