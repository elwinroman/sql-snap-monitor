import { FullSysObject, TypeViews, ViewMode } from '@/models/sysobject'
import { formatPermissionRoles } from '@/utilities'

/**
 * Formatea el código de un sysobject según el modo de vista especificado.
 * @param sysobject El objeto que contiene la definición, permisos y demás datos.
 * @param viewMode El modo de vista para determinar cómo formatear el código.
 * @returns El código formateado según el modo de vista.
 */
export function getFormattedCodeForViewMode(sysobject: FullSysObject, viewMode: ViewMode): string {
  // Formatea los roles
  const roles = formatPermissionRoles({
    permission: sysobject.permission,
    schemaName: sysobject.schemaName,
    objectName: sysobject.name,
  })

  // Define el mensaje de roles (si está vacío, muestra un mensaje de advertencia)
  const rolesMessage = roles === '' ? 'WARNING: El objeto existe pero no tiene roles asignados' : roles

  // Genera el código basado en el viewMode
  switch (viewMode) {
    case TypeViews.FullView:
      return sysobject.definition + roles
    case TypeViews.ObjectOnly:
      return sysobject.definition
    case TypeViews.RolesOnly:
      return rolesMessage
    default:
      return sysobject.definition + roles
  }
}
