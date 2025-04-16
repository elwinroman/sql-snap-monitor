import { DatabaseInfo } from '@auth-users/domain/database-info'
import { getUserDatabaseCredentialsFromCache, MSSQLDatabaseConnection } from '@shared/database/infrastructure/mssql'

import { DatabaseInfoRepository } from '@/modules/auth-users/domain/database-info.repository'
import { Credential } from '@/modules/shared/database/domain/credential'

export class MSSQLDatabaseInfoRepository implements DatabaseInfoRepository {
  private constructor(
    private readonly msqlDatabaseConnection: MSSQLDatabaseConnection,
    private readonly credentials: Credential,
  ) {}

  /** Factory method, para asincronía */
  static async create(): Promise<MSSQLDatabaseInfoRepository> {
    const credentials = await getUserDatabaseCredentialsFromCache()
    const connection = new MSSQLDatabaseConnection()
    return new MSSQLDatabaseInfoRepository(connection, credentials)
  }

  async testConnection(): Promise<string> {
    const conn = await this.msqlDatabaseConnection.connect(this.credentials)
    const request = conn.request()

    const stmt = 'SELECT GETDATE()'
    const res = await request.query(stmt)

    return res.recordset[0]
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
