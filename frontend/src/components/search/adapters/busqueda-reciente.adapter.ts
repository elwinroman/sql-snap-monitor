import { BusquedaReciente, BusquedaRecienteApiResponse } from '../models'

export const busquedaRecienteAdapter = (apiResponse: BusquedaRecienteApiResponse): BusquedaReciente[] => {
  return apiResponse.data.map((recent) => ({
    id: recent.id,
    objectId: recent.objectId,
    objectName: recent.objectName,
    schema: recent.schema,
    type: recent.type,
    date: recent.date,
  }))
}
