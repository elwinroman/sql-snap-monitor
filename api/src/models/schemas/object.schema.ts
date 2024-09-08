import { CustomError } from './custom-error.schema'

// Para objetos que requiren obtener su definición SQL

/**
 * @typedef {Object} RecordObject
 * @property {number} id - ID del objeto.
 * @property {string} name - Nombre del objeto.
 * @property {string} type - Tipo del objeto.
 * @property {string} typeDesc - Descripción del tipo de objeto.
 * @property {string} schema - Nombre del esquema. Es único en la base de datos.
 * @property {number} schemaId - Identificador del esquema en el que se encuentra el objeto.
 * @property {Date} createDate - Fecha de creación del objeto.
 * @property {Date} modifyDate - Fecha en que el objeto se modificó por última vez mediante una ALTER instrucción.
 * @property {string} definition - Texto SQL que define este módulo. NULL = Cifrado.
 */
export interface RecordObject {
  id: number
  name: string
  type: string
  typeDesc: string
  schema: string
  schemaId: number
  createDate: Date
  modifyDate: Date
  definition: string
}

export interface ListDefinitionObject {
  data: RecordObject[]
  meta: {
    length: number
  }
}

// interface Column {
//   name: string
//   columnId: number
//   class: number
//   classDesc: string
//   value: string
//   propertyName: string
// }

// export interface DescriptionObject extends Omit<RecordObject, 'definition'> {
//   description: string
//   data: {
//     objectDescription: Column[]
//     columnDescription: Column[]
//   }
//   meta: {
//     lenghtObject: number
//     lengthColumn: number
//   }
// }

export interface ForRetrievingObject {
  getSQLDefinitionByName(name: string): Promise<ListDefinitionObject | CustomError | undefined>
}
