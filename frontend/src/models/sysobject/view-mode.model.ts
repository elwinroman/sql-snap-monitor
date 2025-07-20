/**
 * Enumeración de los diferentes modos de visualización disponibles
 * para representar un objeto SQL en la interfaz. Cada modo controla
 * qué secciones del objeto se muestran al usuario.
 */
export const TypeViews = {
  /** Vista completa que incluye el objeto SQL y los roles asociados. */
  FullView: 'vm-full-view',

  /** Muestra únicamente la definición del objeto SQL. */
  ObjectOnly: 'vm-object-only',

  /** Muestra únicamente los roles asociados al objeto. */
  RolesOnly: 'vm-roles-only',

  /** Muestra únicamente los parámetros definidos del procedimiento u objeto. */
  ParametersOnly: 'vm-parameters-only',
} as const

/**
 * Tipo que representa las posibles opciones de vista disponibles
 * para un objeto SQL dentro de la aplicación.
 */
export type ViewMode = (typeof TypeViews)[keyof typeof TypeViews]
