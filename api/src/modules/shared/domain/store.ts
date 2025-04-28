/**
 * Representa la información de conexión a un store (base de datos).
 */
export interface StoreUserSchema {
  /** El host o dirección del servidor donde se encuentra la base de datos. */
  host: string

  /** El nombre de la base de datos a la que se desea conectar. */
  database: string

  /** El nombre de usuario utilizado para autenticar la conexión a la base de datos. */
  user: string

  /** La contraseña del usuario para la autenticación en la base de datos. */
  password: string
}
