import { TypeSysObject } from '@sysobject/domain/schemas/sysobject'

/**
 * Representa un objeto marcado como favorito por un usuario dentro del sistema.
 */
export interface Favorito {
  /** Identificador único del favorito */
  id: number

  /** Identificador del usuario que marcó el objeto como favorito */
  idUser: number

  /** Nombre de la base de datos donde se encuentra el objeto */
  database: string

  /** Nombre del esquema dentro de la base de datos */
  schema: string

  /** Nombre del objeto referenciado */
  objectName: string

  /** Tipo del objeto (por ejemplo: 'T' para tabla, 'V' para vista, etc.) */
  type: string

  /** Fecha y hora en que se marcó como favorito o se accedió por última vez */
  date: Date | string

  /**
   * Indica si el favorito está activo.
   * Se utiliza para ocultar o restaurar favoritos sin eliminarlos permanentemente.
   */
  isActive: boolean
}

/**
 * Datos requeridos para registrar un nuevo favorito.
 * Excluye el identificador interno (`id`) y el `objectId`, que puede inferirse.
 */
export type FavoritoInput = Omit<Favorito, 'id' | 'date' | 'isActive'>

export type FavoritoRepoInput = Omit<Favorito, 'id'>

/**
 * Criterios de filtrado para recuperar favoritos desde la capa de aplicación.
 */
export type FavoritoFilter = Pick<Favorito, 'idUser' | 'database'> & {
  /** Tipo de objeto a filtrar */
  type: TypeSysObject
}

/**
 * Filtro de recuperación utilizado a nivel de repositorio,
 * incluyendo usuario, base de datos y tipo de objeto.
 */
export type FavoritoFilterRepo = Pick<Favorito, 'idUser' | 'database' | 'type'>

/**
 * Representa una entrada de favorito devuelta por el repositorio
 */
export type FavoritoRepoResponse = Pick<Favorito, 'id' | 'schema' | 'objectName' | 'date' | 'type'>

/**
 * Respuesta extendida para recuperación de favoritos,
 * incluyendo el identificador del objeto referenciado.
 */
export type FavoritoResponse = FavoritoRepoResponse & {
  /** Identificador del objeto */
  objectId: number
}

/**
 * Contexto de ejecución para operaciones relacionadas con búsquedas recientes.
 * Contiene información mínima necesaria para identificar al usuario y la base de datos donde se ejecuta la operación.
 */
export type Context = Pick<Favorito, 'idUser' | 'database'>

/**
 * Criterios mínimos para verificar la existencia de un favorito.
 * Se basa en los atributos clave que definen la unicidad de un favorito:
 * usuario, base de datos, esquema y nombre del objeto.
 */
export type Criteria = Pick<Favorito, 'idUser' | 'database' | 'schema' | 'objectName'>
