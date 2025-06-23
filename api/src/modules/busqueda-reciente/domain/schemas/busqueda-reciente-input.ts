/**
 * Datos de entrada para registrar una búsqueda reciente.
 */
export interface BusquedaRecienteInput {
  /** ID del usuario que realizó la búsqueda */
  idUser: number

  /** Nombre de la base de datos donde se realizó la búsqueda */
  database: string

  /** Esquema dentro de la base de datos */
  schema: string

  /** Nombre del objeto buscado (tabla, vista, procedimiento, etc.) */
  objectName: string

  /** Tipo del objeto buscado (ej. 'T' para tabla, 'V' para vista) */
  type: string

  /** Fecha y hora en que se realizó la búsqueda */
  dateSearch: Date | string

  /** Indica si la búsqueda está activa (usada reactivar una búsqueda reciente) */
  isActive: boolean
}
