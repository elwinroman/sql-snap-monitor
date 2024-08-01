import sql from 'mssql'

export async function connection ({
  user = process.env.DB_USER,
  password = process.env.DB_PWD,
  database = process.env.DB_NAME,
  server = process.env.DB_SERVER
} = {}) {
  const config = {
    user,
    password,
    database,
    server,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: false, // para Azure
      trustServerCertificate: true // cambiar true para el entorno local dev / certificados autofirmados
    }
  }

  const conn = await sql.connect(config)
  const request = conn.request()
  return { request, sql }
}
