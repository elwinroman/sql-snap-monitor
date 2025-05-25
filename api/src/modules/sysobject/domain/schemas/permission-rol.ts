/**
 * Representa un permiso asociado a un rol o entidad de seguridad dentro de la base de datos.
 * Cada permiso describe una acción permitida o denegada sobre un objeto SQL.
 */
export interface PermissionRol {
  /** Descripción del estado del permiso. Ejemplos comunes: 'GRANT', 'DENY', 'REVOKE', 'GRANT_WITH_GRANT_OPTION'. */
  stateDesc: string

  /** Nombre del permiso otorgado o denegado. Ejemplo: 'SELECT', 'EXECUTE', 'UPDATE', etc. */
  permissionName: string

  /** Nombre de la entidad de seguridad a la que se aplica el permiso. Puede ser un usuario, rol, o grupo definido en la base de datos. */
  name: string
}
