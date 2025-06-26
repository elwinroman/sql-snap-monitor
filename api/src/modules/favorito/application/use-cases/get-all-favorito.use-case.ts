import { ForFavoritoRepositoryPort } from '@favorito/domain/ports/drivens/for-favorito-repository.port'
import { FavoritoFilter, FavoritoResponse } from '@favorito/domain/schemas/favorito'
import { Meta } from '@shared/domain/schemas/meta'

export class GetAllFavoritosUseCase {
  constructor(private readonly repository: ForFavoritoRepositoryPort) {}

  async execute(filter: FavoritoFilter, limit: number): Promise<{ data: FavoritoResponse[]; meta: Meta }> {
    const registeredFavorito = await this.repository.findMany(filter, limit)

    return { data: [], meta: registeredFavorito.meta }
  }
}
