// deprecated

export interface Permission {
  stateDesc: string
  permissionName: string
  name: string // rol_name
}

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

export const UserTableInitialState = {
  userTableColumnList: [],
  userTableExtendedPropertieList: [],
  userTableIndexList: [],
  userTableForeignKeyList: [],
}
