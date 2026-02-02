import { PermissionStore, StoreInfo } from './store'

/**
 * Representa a un usuario autenticado dentro del sistema,
 * incluyendo su información básica, tokens de autenticación
 * y detalles del entorno de base de datos al que tiene acceso.
 */
export interface AuthenticatedUser {
  /** Identificador numérico único del usuario. */
  id: number

  /** Nombre de usuario utilizado para autenticarse. */
  user: string

  // /** Rol asignado al usuario dentro del sistema. */
  // role: UserRole

  /** Conjunto de tokens utilizados para autenticación y renovación de sesión. */
  token: {
    /** Token de acceso utilizado para autenticar solicitudes del usuario. */
    accessToken: string

    /** Token de actualización utilizado para renovar el acceso. */
    refreshToken: string
  }

  /** Nombre o alias del host asociado a la sesión del usuario. */
  aliasHost: string

  /**
   * Información de la base de datos y permisos asociados al entorno del usuario.
   * Combina los detalles de la base de datos (`StoreInfo`) y los permisos (`PermissionStore`).
   */
  storeDetails: StoreInfo & PermissionStore
}
