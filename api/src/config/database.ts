import sql from 'mssql'

export async function connection ({ credentials } = { credentials: null }) {
  let server = process.env.DB_SERVER
  let database = process.env.DB_NAME
  let user = process.env.DB_USER
  let password = process.env.DB_PWD

  if (credentials) {
    server = credentials.server
    database = credentials.dbname
    user = credentials.username
    password = credentials.password
  }
  const config = {
    user,
    password,
    database,
    server,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 10000
    },
    options: {
      encrypt: false, // para Azure
      trustServerCertificate: true // cambiar true para el entorno local dev / certificados autofirmados
    }
  }

  const conn = await sql.connect(config)

  // si falla la conexión se lanza un error y se captura en el modelo y pasa al controlador
  return { conn, sql }
}
