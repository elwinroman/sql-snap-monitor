import type { Favorito, FavoritoApiResponse } from '../models/favorito.model'

export const favoritoAdapter = (apiResponse: FavoritoApiResponse): Favorito[] => {
  return apiResponse.data.map((fav) => ({
    id: fav.id,
    objectId: fav.objectId,
    objectName: fav.objectName,
    schema: fav.schema,
    type: fav.type,
    date: fav.date,
  }))
}
