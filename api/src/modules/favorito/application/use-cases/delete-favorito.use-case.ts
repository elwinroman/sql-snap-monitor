import { FavoritoNotFoundException } from '@favorito/domain/exceptions/favorito-not-found.exception'
import { ForFavoritoRepositoryPort } from '@favorito/domain/ports/drivens/for-favorito-repository.port'

export class DeleteFavoritoUseCase {
  constructor(private readonly repository: ForFavoritoRepositoryPort) {}

  async execute(id: number): Promise<string> {
    const deletedFavorito = await this.repository.deleteById(id)

    if (!deletedFavorito) throw new FavoritoNotFoundException(id)

    return `Se ha eliminado correctamente el favorito con id '${id}'.`
  }
}
