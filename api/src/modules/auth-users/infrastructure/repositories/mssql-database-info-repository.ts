import { DatabaseInfo } from '@auth-users/domain/database-info'
import { DatabaseInfoRepository } from '@auth-users/domain/database-info-repository'

import { Credential } from '@/modules/shared/database/domain/credential'
import { connection } from '@/modules/shared/repository/connection'

export class MSSQLDatabaseInfoRepository implements DatabaseInfoRepository {
  private readonly credentials: Credential

  constructor() {
    this.credentials = {
      host: 'DESKTOP-M41N',
      database: 'SI_BDSqlSnapMonitor',
      user: 'yz9hO83Q*qV9zbdnkdtJuWvwV4s+XBQ==*p98xaB83A92gmJVr1gAkIQ==*0bSQ+CYxdFjTs4PNZVQdXA==',
      password: 'lTnCxA==*qiuFuItQK/Y5vfwAItAtqg==*XJpgFR+3Kvtg0A0UiVY9sA==*uPlKtg7CGlY7pudIVjviCg==',
    }
  }

  async getInfo(): Promise<DatabaseInfo> {
    const conn = await connection(this.credentials)
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
