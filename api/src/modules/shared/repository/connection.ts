import cryptocode from '@shared/core/infrastructure/utils/cryptocode.util'
import { Credential } from '@shared/database/domain/credential'
import {
  DatabaseGenericException,
  DatabaseLoginException,
  DatabaseRequestException,
  DatabaseTimeoutException,
} from '@shared/database/domain/exceptions'
import sql, { ConnectionPool } from 'mssql'

// Errores de MSSQL
enum RequestErrorCode {
  ELOGIN = 'ELOGIN',
  EREQUEST = 'EREQUEST',
  ETIMEOUT = 'ETIMEOUT',
  EARGS = 'EARGS',
  EINJECT = 'EINJECT',
  ENOCONN = 'ENOCONN',
}

interface PoolStack {
  [key: string]: ConnectionPool
}

const pools: PoolStack = {} // almacena múltiples instancias (Advanced Pool Management)

/**
 * Crea y conecta un nuevo pool de conexiones a la base de datos.
 * @param config - Credenciales para la conexión.
 * @returns La instancia de ConnectionPool conectada.
 * @throws Si ocurre un error de conexión específico.
 */
async function createPool(config: Credential): Promise<ConnectionPool> {
  console.log(config)
  const key = JSON.stringify(config)
  const existingPool = await getPool(key)
  if (existingPool) throw new Error('El pool ya existe')

  const newConfig = {
    user: cryptocode.decrypt(config.user),
    password: cryptocode.decrypt(config.password),
    database: config.database,
    server: config.host,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 10000,
    },
    options: {
      encrypt: false, // para Azure
      trustServerCertificate: true, // cambiar true para el entorno local dev / certificados autofirmados
    },
  }

  console.log(newConfig)

  try {
    pools[key] = await new sql.ConnectionPool(newConfig).connect()

    return pools[key]
  } catch (err) {
    if (!(err instanceof sql.ConnectionError)) throw new Error('Error desconocido en el connection pool.')

    if (err.code === RequestErrorCode.ELOGIN) throw new DatabaseLoginException()
    if (err.code === RequestErrorCode.ETIMEOUT) throw new DatabaseTimeoutException()
    if (err.code === RequestErrorCode.EREQUEST) throw new DatabaseRequestException()

    // Me da flojera mapear todos los errores, genérico y a por todas
    throw DatabaseGenericException
  }
}

/**
 * Obtiene un pool de conexión existente.
 * @param name - Clave que representa la configuración del pool.
 * @returns El pool de conexiones si existe, o null si no existe.
 */
async function getPool(name: string): Promise<ConnectionPool | null> {
  return pools[name] || null
}

/**
 * Obtiene un pool de conexiones, creándolo si no existe.
 * @param config - Credenciales para la conexión.
 * @returns El pool de conexiones si ya existe o uno nuevo si no.
 */
export async function connection(config: Credential): Promise<ConnectionPool> {
  const key = JSON.stringify(config)

  const pool = await getPool(key)
  if (pool) return pool

  return createPool(config)
}
