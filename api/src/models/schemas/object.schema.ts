import { CustomError } from './custom-error.schema'

// Para objetos que requiren obtener su definición SQL

/**
 * @typedef {Object} SQLDefinitionObjects - Objetos encontrados que requieren obtener su definición SQL.
 * @property {number} id - ID del objeto.
 * @property {string} name - Nombre del objeto.
 * @property {string} schema - Nombre del esquema. Es único en la base de datos.
 */
export interface SQLDefinitionObjects {
  id: number
  name: string
  schema: string
}

export interface ResponseSQLDefinitionObjects {
  data: SQLDefinitionObjects[]
  meta: {
    length: number
  }
}

/**
 * @typedef {Object} PermissionRol - Roles y permisos de un objeto.
 * @property {string} stateDesc - Descripción del estado del permiso (DENY, GRANT, REVOKE, GRANT_WITH_GRANT_OPTION) de un rol.
 * @property {string} permissionName - Nombre del permiso.
 * @property {string} name - Nombre de la entidad de seguridad, único en la base de datos.
 */
export interface PermissionRol {
  stateDesc: string
  permissionName: string
  name: string
}

/**
 * @typedef {Object} SQLDefinitionRecordObject
 * @property {number} id - ID del objeto.
 * @property {string} name - Nombre del objeto.
 * @property {string} type - Tipo del objeto.
 * @property {string} typeDesc - Descripción del tipo de objeto.
 * @property {string} schema - Nombre del esquema. Es único en la base de datos.
 * @property {number} schemaId - Identificador del esquema en el que se encuentra el objeto.
 * @property {Date | string} createDate - Fecha de creación del objeto.
 * @property {Date | string} modifyDate - Fecha en que el objeto se modificó por última vez mediante una ALTER instrucción.
 * @property {string} definition - Texto SQL que define este módulo. NULL = Cifrado.
 * @property {PermissionRol[]} permission - Roles y permisos de un objeto.
 * @property {boolean} isAligmentObject - Indica si el objeto es un objeto de alineación (pre-producción).
 */
export interface SQLDefinitionRecordObject {
  id: number
  name: string
  type: string
  typeDesc: string
  schema: string
  schemaId: number
  createDate: Date | string
  modifyDate: Date | string
  definition: string
  permission: PermissionRol[]
  isAligmentObject: boolean
}

export interface ResponseSQLDefinitionRecordObject {
  data: SQLDefinitionRecordObject
}

// Para objetos que son tablas de usuario

export type UserTableObjects = SQLDefinitionObjects

export interface ResponseUserTableObjects {
  data: UserTableObjects[]
  meta: {
    length: number
  }
}

/**
 * @typedef {Object} ExtendedProperty - Propiedades extendidas de las columnas.
 * @property {string} propertyValue - Valor de la propiedad extendida.
 * @property {string} propertyName - Nombre de propiedad, único con class, major_id y minor_id.
 */
export interface ExtendedProperty {
  propertyValue: string
  propertyName: string
}

/**
 * @typedef {Object} Column - Columnas de las tablas de usuario.
 * @property {number} id - Identificador de la columna. Es único en el objeto. Los Id. de columna no tienen que ser secuenciales.
 * @property {string} name - Nombre de la columna. Es único en el objeto.
 * @property {string} type - Tipo de dato de la columna (incluye max_length, precision y scale).
 * @property {boolean} isNullable - (1: Columna admite valores NULL, 0: Columna no admite valores NULL).
 * @property {boolean} isIdentity - (1: La columna tiene valores de identidad).
 * @property {ExtendedProperty[]} extendedProperties - Propiedades extendidas de la columna.
 */
export interface Column {
  id: number
  name: string
  type: string
  isNullable: boolean
  isIdentity: boolean
  extendedProperties: ExtendedProperty[]
}

export type UserTableRecordObject = Omit<SQLDefinitionRecordObject, 'definition' | 'permission'>

/**
 * @typedef {Object} Index - Indice de la tabla.
 * @property {string} columnId - Id de la columna a la que pertenece.
 * @property {string} name - Nombre del índice. 'name' es único solo dentro del objeto.
 * @property {string} typeDesc - Descripción del tipo de índice.
 * @property {boolean} isPrimaryKey - (1: El índice forma parte de una restricción PRIMARY KEY). Siempre es 0 para los índices clúster de almacén de columnas.
 * @property {boolean} isUnique - (1: El índice es exclusivo. 0: El índice no es exclusivo.)
 */
export interface Index {
  columnId: number
  name: string
  typeDesc: string
  isPrimaryKey: boolean
  isUnique: boolean
}

/**
 * @typedef {Object} ForeignKey - Claves foránea de la tabla.
 * @property {string} columnId - Id de la columna a la que pertenece.
 * @property {string} referencedSchema - Esquema del objecto al que se hace referencia.
 * @property {boolean} referencedObjectId - Id. del objeto al que se hace referencia, que tiene la clave candidata.
 * @property {boolean} referencedObjectName - Nombre del objeto al que se hace referencia.
 * @property {boolean} referencedColumnId - Id. de la columna a la que se hace referencia (columna de clave candidata).
 * @property {boolean} referencedColumn - Nombre de la columna a la que se hace referencia.
 */
export interface ForeignKey {
  columnId: number
  referencedSchema: string
  referencedObjectId: number
  referencedObject: string
  referencedColumnId: number
  referencedColumn: string
}

/**
 * @typedef {Object} FullUserTableObject - Tablas de usuario con toda la información.
 * @property {string[]} propertyValue - Valor de la propiedad extendida de la tabla.
 * @property {Column[]} columns - Columnas de la tabla.
 * @property {Index[]} indexes - Índices de la tabla.
 * @property {ForeignKey[]} foreignKeys - Claves foráneas de la tabla.
 */
export interface FullUserTableObject extends UserTableRecordObject {
  extendedProperties: ExtendedProperty[]
  columns: Column[]
  indexes: Index[]
  foreignKeys: ForeignKey[]
}

export interface ResponseUserTableRecordObject {
  data: FullUserTableObject
}

export interface SearchResponse {
  data: string[]
  meta: {
    length: number
  }
}

export interface ForRetrievingObject {
  findSQLDefinitionByName(name: string): Promise<ResponseSQLDefinitionObjects | CustomError | undefined>
  getSQLDefinitionById(id: number): Promise<ResponseSQLDefinitionRecordObject | CustomError | undefined>
  findUserTableByName(name: string): Promise<ResponseUserTableObjects | CustomError | undefined>
  getUserTableById(id: number): Promise<ResponseUserTableRecordObject | CustomError | undefined>
  getSQLDefinitionAligmentById(name: string, schemaName: string): Promise<ResponseSQLDefinitionRecordObject | CustomError | undefined>
  searchByName(name: string, type?: string): Promise<SearchResponse | CustomError | undefined>
}
