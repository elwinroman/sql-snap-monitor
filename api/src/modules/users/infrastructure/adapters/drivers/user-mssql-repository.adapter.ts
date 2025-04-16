import { DatabaseName, getStaticDatabaseCredentials, MSSQLDatabaseConnection } from '@shared/database/infrastructure/mssql'
import { ExternalUser, PrimitiveUser } from '@users/domain/schemas'
import { User } from '@users/domain/user'
import { ForRepoQuerying } from '@users/ports/drivens/for-repo-querying'
import sql from 'mssql'

import { Credential } from '@/modules/shared/database/domain/credential'

export class UserMSSQLRepositoryAdapter implements ForRepoQuerying {
  private readonly credentials: Credential

  constructor(private readonly msqlDatabaseConnection: MSSQLDatabaseConnection) {
    this.credentials = getStaticDatabaseCredentials(DatabaseName.APP)
  }

  async create(user: User): Promise<PrimitiveUser | null> {
    const conn = await this.msqlDatabaseConnection.connect(this.credentials)
    const request = conn.request()

    const newUser = user.toValue()

    const stmt = `
        INSERT INTO dbo.Usuario (cHashUsuarioUID, cUsuario, cServer, cAliasServer, dFechaRegistro, lVigente)
        VALUES (@hashId, @user, @server, @aliasServer, @createdAt, @active)
      `
    request.input('hashId', sql.Char(32), newUser.hashId)
    request.input('user', sql.VarChar(64), newUser.user)
    request.input('server', sql.VarChar(64), newUser.server)
    request.input('aliasServer', sql.VarChar(64), newUser.aliasServer)
    request.input('createdAt', sql.DateTime, newUser.createdAt)
    request.input('active', sql.Bit, newUser.active)

    const res = await request.query(stmt)

    if (res.rowsAffected[0] !== 1) return null

    return newUser
  }

  async getByHashId(hashId: string): Promise<PrimitiveUser | null> {
    const conn = await this.msqlDatabaseConnection.connect(this.credentials)
    const request = conn.request()

    const stmt = 'SELECT * FROM Usuario WHERE cHashUsuarioUID = @cHashId'
    request.input('cHashUsuarioUID', sql.VarChar(32), hashId)

    const res = await request.query(stmt)

    if (res && res.rowsAffected[0] !== 1) return null

    const userData = res.recordset[0]
    // mapeo
    const mappedUser: PrimitiveUser = {
      id: userData.idUsuario,
      hashId: userData.cHashUsuarioUID,
      user: userData.cUsuario,
      server: userData.cServer,
      aliasServer: userData.cAliasServer,
      createdAt: userData.dFechaRegistro,
      active: userData.lVigente,
    }

    return mappedUser
  }

  async getById(id: number): Promise<PrimitiveUser | null> {
    const conn = await this.msqlDatabaseConnection.connect(this.credentials)
    const request = conn.request()

    const stmt = 'SELECT * FROM Usuario WHERE idUsuario = @idUsuario'
    request.input('idUsuario', sql.Int, id)

    const res = await request.query(stmt)

    if (res && res.rowsAffected[0] !== 1) return null

    const userData = res.recordset[0]
    // mapeo
    const mappedUser: PrimitiveUser = {
      id: userData.idUsuario,
      hashId: userData.cHashUsuarioUID,
      user: userData.cUsuario,
      server: userData.cServer,
      aliasServer: userData.cAliasServer,
      createdAt: userData.dFechaRegistro,
      active: userData.lVigente,
    }

    return mappedUser
  }

  // private mappedUser(userData): PrimitiveUser {
  //   return {
  //     id: userData.idUsuario,
  //     hashId: userData.cHashUsuarioUID,
  //     user: userData.cUsuario,
  //     server: userData.cServer,
  //     aliasServer: userData.cAliasServer,
  //     createdAt: userData.dFechaRegistro,
  //     active: userData.lVigente,
  //   }
  // }
}
