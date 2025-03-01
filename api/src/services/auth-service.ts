import { format } from '@formkit/tempo'
import sql from 'mssql'

import { Credentials, DatabaseDetails, ForAuthenticating, Health } from '@/models'
import { throwRequestError } from '@/utils'

import { connection } from '../config/database'

export class AuthService implements ForAuthenticating {
  private credentials: Credentials

  constructor(credentials: Credentials) {
    this.credentials = { ...credentials }
  }

  async login(): Promise<DatabaseDetails | undefined> {
    const conn = await connection(this.credentials)
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

      const data: DatabaseDetails = {
        name: res.recordset[0].name,
        compatibility: res.recordset[0].cmptlevel,
        description: res.recordset[0].value,
        server: res.recordset[0].server_name,
      }

      return data
    } catch (error) {
      if (!(error instanceof sql.RequestError)) throw error
      throwRequestError(error)
    }
  }

  async checkLogin(): Promise<Health | undefined> {
    const conn = await connection(this.credentials)
    const request = conn.request()

    try {
      const stmt = `
        SELECT 
          GETUTCDATE() AS date,
          viewdefinition_permission = COALESCE((SELECT TOP 1 IIF(definition IS NULL, 0, 1) FROM sys.sql_modules), 0),
          definition_counts = (SELECT COUNT(*) FROM sys.sql_modules)
      `
      const res = await request.query(stmt)

      // si no existen SPs, Views por defecto asumimos que tiene permisos (lo cual no es necesariamente correcto)
      const definitionCounts = res.recordset[0].definition_counts

      const data: Health = {
        date: format(res.recordset[0].date, 'DD-MM-YYYY HH:mm:ss'),
        viewdefinition_permission: definitionCounts > 0 ? Boolean(res.recordset[0].viewdefinition_permission) : true,
      }
      return data
    } catch (error) {
      if (!(error instanceof sql.RequestError)) throw error
      throwRequestError(error)
    }
  }
}
