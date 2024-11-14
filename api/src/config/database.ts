import sql, { ConnectionPool } from 'mssql'

import { CONN_ERROR, CONN_ERROR_CODES } from '@/constants'
import { Credentials, MyCustomError } from '@/models/schemas'
import { decrypt } from '@/utils'

interface PoolStack {
  [key: string]: ConnectionPool
}

const pools: PoolStack = {} // almacena múltiples instancias (Advanced Pool Management)

/**
 * Crea y conecta un nuevo pool de conexiones a la base de datos.
 * @param config - Credenciales para la conexión.
 * @returns La instancia de ConnectionPool conectada.
 * @throws MyCustomError - Si ocurre un error de conexión específico.
 */
async function createPool(config: Credentials): Promise<ConnectionPool> {
  const key = JSON.stringify(config)

  const existingPool = await getPool(key)
  if (existingPool) throw new Error('El pool ya existe')

  const newConfig = {
    user: config.username,
    password: decrypt(config.password),
    database: config.dbname,
    server: config.server,
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
  } catch (error) {
    if (!(error instanceof sql.ConnectionError)) throw error
    if (error.code === CONN_ERROR.ELOGIN) throw new MyCustomError(CONN_ERROR_CODES.ELOGIN)
    if (error.code === CONN_ERROR.ETIMEOUT) throw new MyCustomError(CONN_ERROR_CODES.ETIMEOUT)
    if (error.code === CONN_ERROR.ESOCKET) throw new MyCustomError(CONN_ERROR_CODES.ESOCKET)
    if (error.code === CONN_ERROR.EDRIVER) throw new MyCustomError(CONN_ERROR_CODES.EDRIVER)

    throw error
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
