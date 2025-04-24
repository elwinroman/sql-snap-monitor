import { Credential } from '@shared/domain/credential'
import sql, { ConnectionPool } from 'mssql'

/** Mapa de conexiones activas, donde la clave es una representación en cadena */
interface PoolStack {
  [key: string]: ConnectionPool
}

export class MSSQLDatabaseConnection {
  private pools: PoolStack = {} // Almacena múltiples conexiones

  /**
   * Obtiene una conexión de la base de datos. Si no existe, la crea.
   * @param config Credenciales de conexión.
   * @returns Pool de conexión.
   */
  async connect(config: Credential): Promise<ConnectionPool> {
    const key = JSON.stringify(config)
    if (this.pools[key]) return this.pools[key]

    return this.createPool(config, key)
  }

  /**
   * Crea y conecta un nuevo pool de conexiones.
   * @param config - Credenciales de conexión.
   * @param key - Clave única del pool.
   * @returns ConnectionPool conectado.
   */
  private async createPool(config: Credential, key: string): Promise<ConnectionPool> {
    const newConfig = {
      user: config.user,
      password: config.password,
      database: config.database,
      server: config.host,
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 10000,
      },
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    }

    this.pools[key] = await new sql.ConnectionPool(newConfig).connect()
    return this.pools[key]
  }
}
