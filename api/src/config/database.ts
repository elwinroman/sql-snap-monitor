import sql from 'mssql'

import { CONN_ERROR, CONN_ERROR_CODES } from '@/constants'
import { Credentials, MyCustomError } from '@/models/schemas'
import { decrypt } from '@/utils'

export async function connection(credentials: Credentials) {
  const config = {
    user: credentials.username,
    password: decrypt(credentials.password),
    database: credentials.dbname,
    server: credentials.server,
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
    const conn = await sql.connect(config)
    return conn
  } catch (error) {
    if (!(error instanceof sql.ConnectionError)) throw error
    if (error.code === CONN_ERROR.ELOGIN) {
      throw new MyCustomError(CONN_ERROR_CODES.ELOGIN)
    }
    if (error.code === CONN_ERROR.ETIMEOUT) {
      throw new MyCustomError(CONN_ERROR_CODES.ETIMEOUT)
    }
    if (error.code === CONN_ERROR.ESOCKET) {
      throw new MyCustomError(CONN_ERROR_CODES.ESOCKET)
    }
    if (error.code === CONN_ERROR.EDRIVER) {
      throw new MyCustomError(CONN_ERROR_CODES.EDRIVER)
    }
  }
}
