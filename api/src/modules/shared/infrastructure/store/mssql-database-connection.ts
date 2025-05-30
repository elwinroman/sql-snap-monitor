import { InvalidCredentialsException } from '@auth/domain/exceptions'
import { StoreUserSchema } from '@shared/domain/store'
import CryptoCode from '@shared/infrastructure/utils/cryptocode.util'
import sql, { ConnectionPool } from 'mssql'

import { NODE_ENV } from '@/config/enviroment'
import { MODE } from '@/constants'

/** Mapa de conexiones activas, donde la clave es una representación en cadena */
interface PoolStack {
  [key: string]: ConnectionPool
}

/** Enum para el tipo de usuario que hace la consulta (externo o interno) */
export enum UserTypeEnum {
  Internal = 'internal',
  External = 'external',
}

/** Tipo que deriva de los valores del enum UserType */
export type UserType = UserTypeEnum

export class MSSQLDatabaseConnection {
  private pools: PoolStack = {} // Almacena múltiples conexiones

  /**
   * Obtiene una conexión de la base de datos. Si no existe, la crea.
   * @param config Credenciales de conexión.
   * @returns Pool de conexión.
   * TODO: Implementar MSSQLQueryRunner, para capturar los errores sin usar try, catch en las querys
   */
  async connect(config: StoreUserSchema, userType: UserType): Promise<ConnectionPool> {
    const key = JSON.stringify(config)
    if (this.pools[key]) return this.pools[key]

    return this.createPool(config, key, userType)
  }

  /**
   * Crea y conecta un nuevo pool de conexiones.
   * @param config - Credenciales de conexión.
   * @param key - Clave única del pool.
   * @returns ConnectionPool conectado.
   */
  private async createPool(config: StoreUserSchema, key: string, userType: UserType): Promise<ConnectionPool> {
    const user = NODE_ENV === MODE.development ? config.user : CryptoCode.decrypt(config.user)
    const password = NODE_ENV === MODE.development ? config.password : CryptoCode.decrypt(config.password)

    const newConfig = {
      user: user,
      password: password,
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

    try {
      this.pools[key] = await new sql.ConnectionPool(newConfig).connect()
      return this.pools[key]
    } catch (err) {
      // Caso especial, si el usuario sql es el que usa el sistema significa que su login es invalido o que ha cambiado de contraseña
      if (err instanceof sql.ConnectionError && userType === UserTypeEnum.External) throw new InvalidCredentialsException()

      throw err
    }
  }
}
