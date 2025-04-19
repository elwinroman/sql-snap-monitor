export function getSQLDefinitionByIdAdapter(response) {
  if (!response.data) return { ...response }
  return {
    ...response,
    data: {
      id: response.data.id,
      name: response.data.name,
      type: response.data.type,
      typeDesc: response.data.typeDesc,
      schemaId: response.data.schemaId,
      schemaName: response.data.schema,
      createDate: response.data.createDate,
      modifyDate: response.data.modifyDate,
      definition: response.data.definition,
      permission: response.data.permission,
      isAligmentObject: response.data.isAligmentObject,
    },
  }
}
