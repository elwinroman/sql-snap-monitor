/**
 * Representa el contexto mínimo necesario para registrar logs relacionados
 * con operaciones que involucran acceso o recuperación de objetos.
 *
 * Este contexto incluye información relevante sobre el usuario que realiza la acción
 * y la base de datos en la que se está operando, permitiendo asociar los logs
 * con un origen específico y facilitar la auditoría o trazabilidad.
 */
export interface LogObjectContext {
  /** Identificador único del usuario que realiza la operación. */
  idUser: number

  /** Nombre de la base de datos donde se ejecuta la operación. */
  databaseName: string
}

export interface LogProdObjectContext {
  /** Identificador único del usuario que realiza la operación (para objetos de producción puede ser anónimo). */
  idUser: number | null

  /** Nombre de la base de datos donde se ejecuta la operación (nombre de bd de producción). */
  databaseName: string
}
