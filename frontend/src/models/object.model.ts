export const ObjectInitialState = {
  id: null,
  name: null,
  type: null,
  typeDesc: null,
  schemaId: null,
  schemaName: null,
  createDate: null,
  modifyDate: null,
  permission: [],
}

export const AligmentObjectInitialState = {
  id: null,
  name: null,
  type: null,
  typeDesc: null,
  schemaId: null,
  schema: null,
  createDate: null,
  modifyDate: null,
  definition: null,
  permission: [],
}

export const SQLDefinitionInitialState = {
  SQLDefinitionCode: null,
  SQLDefinitionError: null,
}

export const UserTableInitialState = {
  userTableColumnList: [],
  userTableExtendedPropertieList: [],
  userTableIndexList: [],
  userTableForeignKeyList: [],
}

export interface ObjectSQLDefinition {
  id: number
  name: string
  type: string
  typeDesc: string
  schemaId: number
  schemaName: string
  createDate: Date
  modifyDate: Date
  // permission?: any[] // Uncommented and made optional for consistency
}
