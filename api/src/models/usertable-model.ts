import { SQLDefinitionObjects, SQLDefinitionRecordObject } from './sqldefinition-model'

// Para objetos que son tablas de usuario
export type UsertableObjects = SQLDefinitionObjects

export interface ResponseUsertableObjects {
  data: UsertableObjects[]
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
 * @property {string | null} defaultDefinition - Expresión SQL que define el valor por defecto (si no tiene devuelve null).
 * @property {ExtendedProperty[]} extendedProperties - Propiedades extendidas de la columna.
 */
export interface Column {
  id: number
  name: string
  type: string
  isNullable: boolean
  isIdentity: boolean
  defaultDefinition: string | null
  extendedProperties: ExtendedProperty[]
}

export type UsertableRecordObject = Omit<SQLDefinitionRecordObject, 'definition' | 'permission'>

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
 * @typedef {Object} FullUsertableObject - Tablas de usuario con toda la información.
 * @property {string[]} propertyValue - Valor de la propiedad extendida de la tabla.
 * @property {Column[]} columns - Columnas de la tabla.
 * @property {Index[]} indexes - Índices de la tabla.
 * @property {ForeignKey[]} foreignKeys - Claves foráneas de la tabla.
 */
export interface FullUsertableObject extends UsertableRecordObject {
  extendedProperties: ExtendedProperty[]
  columns: Column[]
  indexes: Index[]
  foreignKeys: ForeignKey[]
}

export interface ResponseUsertableRecordObject {
  data: FullUsertableObject
}

export interface ForRetrievingUsertable {
  buscarUsertableByName(name: string): Promise<ResponseUsertableObjects | undefined>
  obtenerUsertableById(id: number): Promise<ResponseUsertableRecordObject | undefined>
}
