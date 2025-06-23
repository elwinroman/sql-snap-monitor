import { getAuthContext } from '@auth/infrastructure/auth-context'
import { StoreUserSchema } from '@shared/domain/store'
import { CacheCredentialNotFoundException } from '@shared/infrastructure/exceptions/cache/cache-credential-not-found.exception'
import { getCacheDatabaseCredentials, UserType } from '@shared/infrastructure/store'

/**
 * Representa el contexto completo del usuario autenticado
 * para acceder a una tienda o entorno dinámico del sistema.
 *
 * Se compone de:
 * - El contexto de autenticación (por ejemplo, userId, roles).
 * - Las credenciales de acceso a la tienda o espacio del usuario.
 */
export interface StoreAuthContext {
  /**
   * Contexto de autenticación actual del usuario (obtenido del token o sesión).
   */
  authContext: {
    userId: number
    email?: string
    roles?: string[]
    // Extensible según tu modelo de autenticación
  }

  /**
   * Información de la tienda o entorno del usuario, incluyendo tipo de usuario.
   */
  store: {
    credentials: StoreUserSchema
    type: UserType
  }
}

/**
 * Recupera y construye el contexto completo del usuario autenticado
 * para acceder a su tienda o entorno de datos.
 *
 * Este contexto unificado se utiliza en escenarios como:
 * - Conexión dinámica a bases de datos según el usuario.
 * - Registro de logs con trazabilidad por tienda y usuario.
 * - Validaciones o autorización basada en datos cacheados.
 *
 * @throws {Error} Si no se puede recuperar el contexto de autenticación.
 * @throws {CacheCredentialNotFoundException} Si las credenciales no están disponibles en caché.
 *
 * @returns {Promise<StoreAuthContext>} El contexto unificado de autenticación y acceso a tienda.
 */
export async function buildStoreAuthContext(): Promise<StoreAuthContext> {
  const authContext = getAuthContext()
  if (!authContext) throw new Error('No se pudo recuperar el contexto de autenticación')

  const cached = await getCacheDatabaseCredentials(authContext.userId)
  if (!cached) throw new CacheCredentialNotFoundException(authContext.userId)

  return {
    authContext,
    store: {
      credentials: { ...cached.credentials },
      type: cached.type,
    },
  }
}
