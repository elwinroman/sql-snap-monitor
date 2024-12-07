import { CustomError } from './custom-error-model'

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

export interface ForRetrievingObject {
  findSQLDefinitionByName(name: string): Promise<ResponseSQLDefinitionObjects | CustomError | undefined>
  getSQLDefinitionById(id: number): Promise<SQLDefinitionRecordObject | CustomError | undefined>
  getSQLDefinitionAligmentById(name: string, schemaName: string): Promise<SQLDefinitionRecordObject | CustomError | undefined>
}
