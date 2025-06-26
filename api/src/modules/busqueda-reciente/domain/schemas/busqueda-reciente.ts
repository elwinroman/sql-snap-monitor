import { TypeSysObject } from '@sysobject/domain/schemas/sysobject'

/**
 * Datos de entrada para registrar una búsqueda reciente.
 */
export interface BusquedaReciente {
  /** ID de la búsqueda reciente */
  id: number

  /** ID del usuario que realizó la búsqueda */
  idUser: number

  /** Nombre de la base de datos donde se realizó la búsqueda */
  database: string

  /** Esquema dentro de la base de datos */
  schema: string

  /** ID del objeto buscado (sysobject) */
  objectId: number

  /** Nombre del objeto buscado (tabla, vista, procedimiento, etc.) */
  objectName: string

  /** Tipo del objeto buscado (ej. 'T' para tabla, 'V' para vista) */
  type: string

  /** Fecha y hora en que se realizó la búsqueda */
  dateSearch: Date | string

  /** Indica si la búsqueda está activa (usada reactivar una búsqueda reciente) */
  isActive: boolean
}

/**
 * Datos de entrada para registrar una búsqueda reciente.
 */
export type BusquedaRecienteInput = Omit<BusquedaReciente, 'id' | 'objectId'>

/**
 * Filtro de búsqueda para la recuperación de Búsquedas Recientes.
 */
export type BusquedaRecienteFilter = Pick<BusquedaReciente, 'idUser' | 'database'> & {
  type: TypeSysObject
}

/**
 * Filtro de búsqueda para el repositorio en la recuperación de Búsquedas Recientes.
 */
export type BusquedaRecienteFilterRepo = Pick<BusquedaReciente, 'idUser' | 'database' | 'type'>

/**
 * Datos de respuesta del repositorio para obtener todas las búsquedas recientes (incluye si es favorito).
 */
export type BusquedaRecienteRepoResponse = Pick<BusquedaReciente, 'id' | 'schema' | 'objectName' | 'dateSearch'> & {
  isFavorite: boolean
}

/**
 * Datos de respuesta para obtener todas las búsquedas recientes (incluye si es favorito y el ID del objeto).
 */
export type BusquedaRecienteResponse = BusquedaRecienteRepoResponse & {
  objectId: number
}
