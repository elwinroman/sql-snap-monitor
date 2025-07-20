/**
 * Credenciales necesarias para autenticación o conexión a una base de datos.
 * Se envían en el cuerpo (body) de una solicitud para iniciar sesión o validar acceso.
 */
export interface Credential {
  /** Dirección o nombre del servidor de base de datos. */
  server: string

  /** Nombre de la base de datos a la que se desea conectar. */
  dbname: string

  /** Nombre de usuario utilizado para la autenticación. */
  username: string

  /** Contraseña asociada al usuario para la autenticación. */
  password: string
}
