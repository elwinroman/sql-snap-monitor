import sql, { ConnectionPool } from 'mssql'

import { Credential } from '../../domain/credential'
import { DatabaseGenericException } from '../../domain/exceptions/database-generic.exception'
import { DatabaseLoginException } from '../../domain/exceptions/database-login.exception'
import { DatabaseRequestException } from '../../domain/exceptions/database-request.exception'
import { DatabaseTimeoutException } from '../../domain/exceptions/database-timeout.exception'
// import { Credentials } from '@/models'
import cryptocode from '../utils/cryptocode.util'

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
  const key = JSON.stringify(config)
  const existingPool = await getPool(key)
  if (existingPool) throw new Error('El pool ya existe')

  console.table({
    user: config.user,
    password: config.password,
  })
  console.table({
    user: cryptocode.decrypt(config.user),
    password: cryptocode.decrypt(config.password),
  })

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

  try {
    pools[key] = await new sql.ConnectionPool(newConfig).connect()

    return pools[key]
  } catch (err) {
    if (!(err instanceof sql.ConnectionError)) throw err

    if (err.code === RequestErrorCode.ELOGIN) throw DatabaseLoginException
    if (err.code === RequestErrorCode.ETIMEOUT) throw DatabaseTimeoutException
    if (err.code === RequestErrorCode.EREQUEST) throw DatabaseRequestException

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
export async function connection(config: Credentials): Promise<ConnectionPool> {
  const key = JSON.stringify(config)

  const pool = await getPool(key)
  if (pool) return pool

  return createPool(config)
}
