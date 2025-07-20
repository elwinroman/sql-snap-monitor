/**
 * Representa la estructura de respuesta enviada por la API
 * al verificar el estado de la sesión actual.
 * Incluye información sobre la conexión a la base de datos,
 * permisos de visualización y fecha de creación de la sesión.
 */
export interface CheckSessionApiResponse {
  correlationId: string
  data: {
    databaseConnection: string
    viewdefinitionPermission: boolean
    createdAt: Date | string
  }
}
