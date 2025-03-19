import sql from 'mssql'

import { Credential } from '../../shared/domain/credential'
import { connection } from '../../shared/infrastructure/mssql/connection'
import { PrimitiveUser, User } from '../domain/user'
import { UserRepository } from '../domain/user-repository'

export class MSSQLUserRepository implements UserRepository {
  private readonly credentials: Credential

  constructor() {
    this.credentials = {
      host: 'DESKTOP-M41N',
      database: 'SI_BDSqlSnapMonitor',
      user: 'yz9hO83Q*qV9zbdnkdtJuWvwV4s+XBQ==*p98xaB83A92gmJVr1gAkIQ==*0bSQ+CYxdFjTs4PNZVQdXA==',
      password: 'lTnCxA==*qiuFuItQK/Y5vfwAItAtqg==*XJpgFR+3Kvtg0A0UiVY9sA==*uPlKtg7CGlY7pudIVjviCg==',
    }
  }
  create(user: User): Promise<void> {
    // code
    // return null
  }

  async getById(id: number): Promise<User | null> {
    const conn = await connection(this.credentials)
    const request = conn.request()

    const stmt = `
      SELECT * FROM Usuario WHERE idUsuario = @idUsuario
    `
    request.input('idUsuario', sql.Int, id)

    const res = await request.query(stmt)

    if (res && res.rowsAffected[0] !== 1) return null

    const userData = res.recordset[0]
    // mapeo
    const primitiveUser: PrimitiveUser = {
      id: userData.idUsuario,
      hashUsernameUID: userData.cHashUsuarioUID,
      user: userData.cUsuario,
      server: userData.cServer,
      aliasServer: userData.cAliasServer,
    }

    return new User(primitiveUser)
  }
}
