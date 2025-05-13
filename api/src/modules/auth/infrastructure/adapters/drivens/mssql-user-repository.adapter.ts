import { ForUserRepositoryPort } from '@auth/domain/ports/drivens/for-user-repository.port'
import { PrimitiveUser, RepoUser, User } from '@auth/domain/schemas/user'
import { DatabaseName, MSSQLDatabaseConnection } from '@shared/infrastructure/store'
import { getStaticDatabaseCredentials } from '@shared/infrastructure/store/get-store-credentials'
import sql from 'mssql'

export class MssqlUserRepositoryAdapter implements ForUserRepositoryPort {
  private connection = new MSSQLDatabaseConnection()
  private credential = getStaticDatabaseCredentials(DatabaseName.APP)

  async getOrCreate(user: PrimitiveUser): Promise<RepoUser | null> {
    const conn = await this.connection.connect(this.credential)
    const request = conn.request()

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
  }
}
