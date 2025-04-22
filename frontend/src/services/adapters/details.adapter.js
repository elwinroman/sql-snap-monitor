export function getDetailsAdapter(response) {
  if (!response.data) return { ...response }
  return {
    ...response,
    data: {
      dbName: response.data.name,
      compatiblity: response.data.compatiblity,
      description: response.data.description,
      serverName: response.data.server,
      aliasServerName: response.data.aliasServer,
      dbprodName: response.data.dbprod_name,
    },
  }
}
