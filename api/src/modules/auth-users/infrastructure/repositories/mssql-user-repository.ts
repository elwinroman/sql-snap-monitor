import { PrimitiveUser, User } from '@auth-users/domain/user'
import { DatabaseName, getStaticDatabaseCredentials, MSSQLDatabaseConnection } from '@shared/database/infrastructure/mssql'
import sql from 'mssql'

import { UserRepository } from '@/modules/auth-users/domain/user.repository'
import { Credential } from '@/modules/shared/database/domain/credential'

export class MSSQLUserRepository implements UserRepository {
  private readonly credentials: Credential

  constructor(private readonly msqlDatabaseConnection: MSSQLDatabaseConnection) {
    this.credentials = getStaticDatabaseCredentials(DatabaseName.APP)
  }

  async create(user: User): Promise<void> {
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

    if (res.rowsAffected[0] !== 1) throw new Error('No se pudo crear el usuario. El número de filas afectadas es incorrecto.')
  }

  async findByHashId(hashId: string): Promise<boolean> {
    const conn = await this.msqlDatabaseConnection.connect(this.credentials)
    const request = conn.request()

    const stmt = 'SELECT TOP 1 * FROM Usuario WHERE cHashUsuarioUID = @cHashId'
    request.input('cHashId', sql.VarChar(32), hashId)

    const res = await request.query(stmt)

    if (res && res.rowsAffected[0] === 1) return true
    return false
  }

  async getById(id: number): Promise<User | null> {
    const conn = await this.msqlDatabaseConnection.connect(this.credentials)
    const request = conn.request()

    const stmt = 'SELECT * FROM Usuario WHERE idUsuario = @idUsuario'
    request.input('idUsuario', sql.Int, id)

    const res = await request.query(stmt)

    if (res && res.rowsAffected[0] !== 1) return null

    const userData = res.recordset[0]
    // mapeo
    const primitiveUser: PrimitiveUser = {
      id: userData.idUsuario,
      hashId: userData.cHashUsuarioUID,
      user: userData.cUsuario,
      server: userData.cServer,
      aliasServer: userData.cAliasServer,
    }

    return new User(primitiveUser)
  }
}
