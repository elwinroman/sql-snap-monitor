import { PrimitiveUser, User } from '@auth-users/domain/user'
import { UserRepository } from '@auth-users/domain/user-repository'
import { DatabaseName, getDatabaseCredentials, MSSQLDatabaseConnection } from '@shared/database/infrastructure/mssql'
import sql from 'mssql'

import { Credential } from '@/modules/shared/database/domain/credential'

export class MSSQLUserRepository implements UserRepository {
  private readonly credentials: Credential

  constructor(private readonly msqlDatabaseConnection: MSSQLDatabaseConnection) {
    this.credentials = getDatabaseCredentials(DatabaseName.APP)
  }

  async create(user: User): Promise<void> {
    // code
  }

  async getById(id: number): Promise<User | null> {
    const conn = await this.msqlDatabaseConnection.connect(this.credentials)
    const request = conn.request()

    const stmt = `
      SELECTs * FROM Usuario WHERE idUsuario = @idUsuario
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
