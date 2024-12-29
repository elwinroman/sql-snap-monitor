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
  if (permission == null || !permission.length) return ''

  let cad = ''
  const openGo = 'GO\n'
  const middleGo = '\nGO\n'
  const closeGo = '\nGO'

  for (const [index, role] of permission.entries()) {
    const roleText = `${role.stateDesc} ${role.permissionName} ON [${schema}].[${objectName}] TO [${role.name}]`

    index < permission.length - 1 ? (cad += `${roleText}${middleGo}`) : (cad += roleText)
  }

  return `${openGo}${cad}${closeGo}`
}
