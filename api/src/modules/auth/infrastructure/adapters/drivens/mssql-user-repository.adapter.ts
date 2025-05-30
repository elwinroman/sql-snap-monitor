import { ForUserRepositoryPort, LogAccessInput } from '@auth/domain/ports/drivens'
import { PrimitiveUser, RepoUser, User } from '@auth/domain/schemas/user'
import { DatabaseName, MSSQLDatabaseConnection } from '@shared/infrastructure/store'
import { getStaticDatabaseCredentials } from '@shared/infrastructure/store/get-store-credentials'
import { wrapDatabaseError } from '@shared/infrastructure/utils/ensure-mssql-error.util'
import sql from 'mssql'

export class MssqlUserRepositoryAdapter implements ForUserRepositoryPort {
  private connection = new MSSQLDatabaseConnection()
  private db = getStaticDatabaseCredentials(DatabaseName.APP)

  async getOrCreate(user: PrimitiveUser, userDatabase: string): Promise<RepoUser | null> {
    const conn = await this.connection.connect(this.db.credentials, this.db.type)
    const transaction = new sql.Transaction(conn)

    try {
      await transaction.begin()
      const request = new sql.Request(transaction)

      const stmt = `
        MERGE INTO dbo.Usuario AS target
        USING (
            SELECT 
                @hashId AS hashId, @user AS usuario, @host AS server, 
                @aliasHost AS aliasServer, @createdAt AS fechaRegistro, 
                @isActive AS vigente
            ) AS source
        ON target.cHashUsuarioUID = source.hashId
        WHEN MATCHED THEN
            -- Si el registro existe, devuelve el registro existente
            UPDATE SET 
                target.cHashUsuarioUID = target.cHashUsuarioUID  -- No hay cambios reales
        WHEN NOT MATCHED THEN
            -- Si no existe, realiza la inserción
            INSERT (cHashUsuarioUID, cUsuario, cServer, cAliasServer, dFechaRegistro, lVigente)
            VALUES (source.hashId, source.usuario, source.server, source.aliasServer, source.fechaRegistro, source.vigente)
        OUTPUT INSERTED.idUsuario, INSERTED.cHashUsuarioUID, INSERTED.cUsuario, 
            INSERTED.cServer, INSERTED.cAliasServer, INSERTED.dFechaRegistro, INSERTED.lVigente;
      `

      request.input('hashId', sql.Char(32), user.hashId.getValue)
      request.input('user', sql.VarChar(64), user.user)
      request.input('host', sql.VarChar(64), user.host)
      request.input('aliasHost', sql.VarChar(64), user.aliasHost)
      request.input('createdAt', sql.DateTime, user.createdAt)
      request.input('isActive', sql.Bit, user.isActive)

      const res = await request.query(stmt)

      if (res.recordset && res.recordset.length === 1) {
        const userData = res.recordset[0]

        const user = User.create({
          id: userData.idUsuario,
          hashId: userData.cHashUsuarioUID,
          user: userData.cUsuario,
          host: userData.cServer,
          aliasHost: userData.cAliasServer,
          createdAt: userData.dFechaRegistro,
          isActive: userData.lVigente,
        }).toRepoUser()

        // insertar el log de acceso
        await this.insertAccessLog(
          {
            idUser: user.id,
            database: userDatabase,
            createdAt: user.createdAt,
          },
          transaction,
        )

        await transaction.commit()

        return user
      }

      await transaction.rollback()
      return null
    } catch (err: unknown) {
      await transaction.rollback()

      throw wrapDatabaseError(err)
    }
  }

  async getById(id: number): Promise<RepoUser | null> {
    const conn = await this.connection.connect(this.db.credentials, this.db.type)
    const request = conn.request()

    try {
      const stmt = 'SELECT * FROM dbo.Usuario WHERE idUsuario = @id'
      request.input('id', sql.Int, id)
      const res = await request.query(stmt)

      if (res.recordset && res.recordset.length === 1) {
        const userData = res.recordset[0]

        return User.create({
          id: userData.idUsuario,
          hashId: userData.cHashUsuarioUID,
          user: userData.cUsuario,
          host: userData.cServer,
          aliasHost: userData.cAliasServer,
          createdAt: userData.dFechaRegistro,
          isActive: userData.lVigente,
        }).toRepoUser()
      }

      return null
    } catch (err) {
      throw wrapDatabaseError(err)
    }
  }

  private async insertAccessLog(log: LogAccessInput, transaction: sql.Transaction): Promise<void> {
    const request = new sql.Request(transaction)

    const stmt = `
        INSERT INTO dbo.LogAcceso (idUsuario, cDatabase, dFechaAcceso)
        VALUES (@idUser, @database, @createdAt)
      `
    request.input('idUser', sql.Int, log.idUser)
    request.input('database', sql.VarChar(64), log.database)
    request.input('createdAt', sql.DateTime, log.createdAt)

    await request.query(stmt)
  }
}
