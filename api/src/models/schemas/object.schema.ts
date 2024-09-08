import { CustomError } from './custom-error.schema'

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
