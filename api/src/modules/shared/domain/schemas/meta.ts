/**
 * Metainformación útil para resultados paginados por límite.
 */
export interface Meta {
  /** Total de registros disponibles */
  total: number

  /** Límite de elementos por página */
  limit: number
}
