import sql from 'mssql'

import { Credentials, CustomError, DatabaseInfo, ForAuthenticating } from '@/models/schemas'
import { handleRequestError } from '@/utils/handle-request-error'

import { connection } from '../config/database'

export class AuthModel implements ForAuthenticating {
  private credentials: Credentials

  constructor(credentials: Credentials) {
    this.credentials = { ...credentials }
  }

  async login(): Promise<DatabaseInfo | CustomError | undefined> {
    const conn = await connection(this.credentials)
    const request = await conn?.request()

    try {
      const stmt = `SELECT
                      name,
                      cmptlevel,
                      value = (SELECT TOP 1 value FROM sys.extended_properties WHERE class = 0),
                      @@SERVERNAME AS server_name
                    FROM sys.sysdatabases
                    WHERE dbid = DB_ID()
                  `
      const res = await request?.query(stmt)

      return res?.recordset[0]
    } catch (error) {
      if (!(error instanceof sql.RequestError)) throw error

      handleRequestError(error)
    } finally {
      conn?.close()
    }
  }
}
