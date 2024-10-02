/**
 * Formatea los roles de permisos en código SQL
 * @param {Array} permission - Roles de permisos
 * @param {String} schema - Nombre del esquema del objeto
 * @param {String} objectName - Nombre del objeto
 * @returns {String} Roles de permisos formateados
 * @example
 *    GO
 *    GRANT EXECUTE ON [dbo].[CRE_NombreProcedimiento_SP] TO [Rol_Fin]
 *    GO
 */
export function formatPermissionRoles(permission, schema, objectName) {
  if (!permission.length) return ''

  let cad = ''
  const openGo = '\nGO\n'
  const closeGo = '\nGO'

  for (const role of permission) {
    cad += `${openGo}${role.stateDesc} ${role.permissionName} ON [${schema}].[${objectName}] TO [${role.name}]`
  }

  return `${cad}${closeGo}`
}
