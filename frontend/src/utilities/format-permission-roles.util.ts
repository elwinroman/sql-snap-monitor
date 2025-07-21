import { Permission } from '@/models/object.model'

interface Props {
  permission: Permission[]
  schemaName: string
  objectName: string
}

/**
 * Genera un script SQL que asigna permisos a roles sobre un objeto de base de datos.
 *
 * El formato sigue el estándar de SQL Server con sentencias `GRANT` y delimitadores `GO`.
 *
 * @param {Object} params - Parámetros de entrada
 * @param {Permission[]} params.permission - Lista de permisos por rol. Cada permiso debe contener:
 *   - `stateDesc`: descripción de la acción (por ejemplo, 'GRANT')
 *   - `permissionName`: tipo de permiso (por ejemplo, 'EXECUTE')
 *   - `name`: nombre del rol (por ejemplo, 'Rol_Admin')
 * @param {string} params.schemaName - Nombre del esquema (por ejemplo, `'dbo'`)
 * @param {string} params.objectName - Nombre del objeto (por ejemplo, `'CRE_ActualizarCliente_SP'`)
 *
 * @returns {string} Script SQL formateado con los permisos. Devuelve una cadena vacía si no hay permisos.
 *
 * @example
 * // Entrada:
 * formatPermissionRoles({
 *   permission: [
 *     { stateDesc: 'GRANT', permissionName: 'EXECUTE', name: 'Rol_Fin' },
 *     { stateDesc: 'GRANT', permissionName: 'EXECUTE', name: 'Rol_Admin' }
 *   ],
 *   schemaName: 'dbo',
 *   objectName: 'CRE_NombreProcedimiento_SP'
 * })
 *
 * // Salida:
 * GO
 * GRANT EXECUTE ON [dbo].[CRE_NombreProcedimiento_SP] TO [Rol_Fin]
 * GO
 * GRANT EXECUTE ON [dbo].[CRE_NombreProcedimiento_SP] TO [Rol_Admin]
 * GO
 */
export function formatPermissionRoles({ permission, schemaName, objectName }: Props): string {
  if (permission == null || !permission.length) return ''

  let cad = ''
  const openGo = 'GO\n'
  const middleGo = '\nGO\n'
  const closeGo = '\nGO'

  for (const [index, role] of permission.entries()) {
    const roleText = `${role.stateDesc} ${role.permissionName} ON [${schemaName}].[${objectName}] TO [${role.name}]`

    if (index < permission.length - 1) cad += `${roleText}${middleGo}`
    else cad += roleText
  }

  return `${openGo}${cad}${closeGo}`
}
