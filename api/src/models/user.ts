// import { format } from '@formkit/tempo'
import sql from 'mssql'

import { connection } from '@/config/database'
import { encryptString } from '@/utils'
import { printRequestError } from '@/utils'

import { Credentials, ForRetrievingUser, ResponseUser, UserInput } from './schemas'

export class UserModel implements ForRetrievingUser {
  private credentials: Credentials

  constructor() {
    this.credentials = {
      server: process.env.LOG_DB_SERVER || '',
      dbname: process.env.LOG_DB_NAME || '',
      username: process.env.LOG_DB_USERNAME || '',
      password: encryptString(process.env.LOG_DB_PASSWORD || ''),
    }
  }

  // Registra un usuario cuando no existe
  public async registrarUsuario(user: UserInput): Promise<boolean | undefined> {
    const conn = await connection(this.credentials)
    const request = conn.request()

    try {
      const stmt = `
        INSERT INTO dbo.Usuario (cHashUsuarioUID, cUsuario, cServer, cAliasServer, dFechaRegistro)
        VALUES (@cHashUsuarioUID, @cUsuario, @cServer, @cAliasServer, GETDATE() AT TIME ZONE 'SA Pacific Standard Time')
      `
      request.input('cHashUsuarioUID', sql.Char(32), user.cHashUsuarioUID)
      request.input('cUsuario', sql.VarChar(64), user.cUsuario)
      request.input('cServer', sql.VarChar(64), user.cServer)
      request.input('cAliasServer', sql.VarChar(64), user.cAliasServer)

      const res = await request.query(stmt)

      if (res.rowsAffected[0] === 1) return true // se ha insertado correctamente (1 fila afectada)
      return false
    } catch (err) {
      if (!(err instanceof sql.RequestError)) {
        console.log(err)
        return
      }
      printRequestError(err)
    }
  }

  // Busca al usuario por su cHashUsuarioUID
  public async buscarUsuarioByUsername(usernameHash: string): Promise<ResponseUser | undefined> {
    const conn = await connection(this.credentials)
    const request = conn.request()

    try {
      const stmt = `
        SELECT 
          idUsuario, 
          cUsuario,
          lVigente
        FROM Usuario WHERE cHashUsuarioUID = @usernameHash
      `
      request.input('usernameHash', sql.VarChar(32), usernameHash)

      const res = await request.query(stmt)

      if (res.rowsAffected[0] === 1) return res.recordset[0]
      else return undefined
    } catch (err) {
      if (!(err instanceof sql.RequestError)) {
        console.log(err)
        return
      }
      printRequestError(err)
    }
  }
}
