/**
 * Contexto de autenticación que almacena información esencial
 * sobre el usuario y la conexión a la base de datos en la sesión actual.
 * Utilizado para gestionar el estado de autenticación en la store.
 */
export interface AuthContext {
  /** Nombre de usuario autenticado. */
  username: string

  /** Nombre de la base de datos activa en la sesión. */
  database: string

  /** Nombre o dirección del servidor actual de base de datos. */
  server: string

  /** Servidor original desde donde se inició la sesión, puede diferir de `server`. */
  originalServer: string

  /** Nombre de la base de datos de producción asociada al usuario. */
  prodDatabase: string
}
