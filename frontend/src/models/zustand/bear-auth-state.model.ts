import { AuthContext } from '@/models'

/**
 * Estado global de autenticación gestionado en la aplicación,
 * que almacena el contexto del usuario, el token de sesión,
 * y el estado de conexión con la API.
 *
 * Proporciona métodos para crear y limpiar sesiones,
 * así como para actualizar el token y el estado de error de conexión.
 */
export interface BearAuthState {
  /** Contexto de autenticación del usuario; `null` si no hay sesión activa. */
  authContext: AuthContext | null

  /** Token de acceso utilizado para autenticar solicitudes; `null` si no hay sesión activa. */
  token: string | null

  /** Indicador que señala si hay un error en la conexión con la API. */
  errorApiConnection: boolean

  /**
   * Crea una nueva sesión estableciendo el contexto de autenticación y el token.
   * @param payload - Información del contexto de autenticación del usuario.
   * @param token - Token de acceso para la sesión (access_token).
   */
  createSession: (payload: AuthContext, token: string) => void

  /** Limpia la sesión actual, reseteando el contexto y el token a `null`. */
  clearSession: () => void

  /**
   * Actualiza el token de acceso en el estado.
   * @param token - Nuevo token de acceso.
   */
  updateToken: (token: string) => void

  /**
   * Actualiza el estado que indica si existe un error de conexión con la API.
   * @param state - Estado booleano del error de conexión.
   */
  updateErrorApiConnection: (state: boolean) => void

  /**
   * Actualiza el nombre de la base de datos activa en el contexto de autenticación.
   * @param database - Nuevo nombre de la base de datos.
   */
  updateDatabase: (database: string) => void
}
