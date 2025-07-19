export function getDetailsAdapter(response) {
  if (!response.data) return { ...response }
  return {
    ...response,
    data: {
      dbName: response.data.storeDetails.name,
      compatiblity: response.data.storeDetails.compatibility,
      description: response.data.storeDetails.description,
      serverName: response.data.storeDetails.server,
      aliasServerName: response.data.aliasHost,
      dbprodName: 'DB_PRODUCCIÓN',
    },
  }
}
