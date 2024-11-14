import sql from 'mssql'

import { Credentials, CustomError, DatabaseInfo, ForAuthenticating, LoginResult } from '@/models/schemas'
import { handleRequestError } from '@/utils/handle-request-error'

import { connection } from '../config/database'

export class AuthModel implements ForAuthenticating {
  private credentials: Credentials

  constructor(credentials: Credentials) {
    this.credentials = { ...credentials }
  }

  async login(): Promise<LoginResult | undefined> {
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

      const data: DatabaseInfo = {
        name: res.recordset[0].name,
        compatibility: res.recordset[0].cmptlevel,
        description: res.recordset[0].value,
        server: res.recordset[0].server_name,
      }

      return { data }
    } catch (error) {
      if (!(error instanceof sql.RequestError)) throw error

      handleRequestError(error)
    }
  }

  async checkLogin(): Promise<string | CustomError | undefined> {
    const conn = await connection(this.credentials)
    const request = await conn?.request()

    try {
      const stmt = 'SELECT GETDATE() AS date'
      const res = await request?.query(stmt)

      const date = await res?.recordset[0].date
      return date
    } catch (error) {
      if (!(error instanceof sql.RequestError)) throw error
      handleRequestError(error)
    }
  }
}
