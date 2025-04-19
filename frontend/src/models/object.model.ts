export interface Permission {
  stateDesc: string
  permissionName: string
  name: string // rol_name
}

export type PermissionRecord = Permission[]

export interface IObjectSQLDefinition {
  id: number | null
  name: string | null
  type: string | null
  typeDesc: string | null
  schemaId: number | null
  schemaName: string | null
  createDate: Date | null
  modifyDate: Date | null
  permission: Permission | []
}

export type IObjectSqlDefinitionAligment = Omit<IObjectSQLDefinition, 'schemaName'> & {
  schema: string | null
  definition: string | null
}

export const ObjectInitialState: IObjectSQLDefinition = {
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

export const AligmentObjectInitialState: IObjectSqlDefinitionAligment = {
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
