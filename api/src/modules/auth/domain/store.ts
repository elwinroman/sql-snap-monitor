/**
 * Representa la información básica de una base de datos, incluyendo su nombre,
 * compatibilidad, descripción y detalles sobre el servidor en el que está alojada.
 */
export interface StoreInfoSchema {
  /** Nombre de la base de datos. */
  name: string

  /** Versión de compatibilidad. */
  compatibility: string

  /** Descripción general de la base de datos */
  description: string | null

  /** Nombre o dirección del servidor donde se encuentra alojada la base de datos. */
  server: string
}

/**
 * Representa la información relacionada con los permisos de un usuario en el sistema.
 */
export interface PermissionStoreSchema {
  /** Fecha que obtiene del repositorio (base de datos). */
  date: Date

  /** Bandera para comprobar si el usuario tiene acceso de tipo VIEW DEFINITION (puede fallar si la BD es vacía o no tiene objetos de definición SQL). */
  viewdefinitionPermission: boolean
}
