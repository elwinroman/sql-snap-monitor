import { ForFavoritoManagingPort } from '@favorito/domain/ports/drivers/for-favorito-managing.port'
import { FavoritoFilter, FavoritoInput, FavoritoRepoResponse, FavoritoResponse } from '@favorito/domain/schemas/favorito'
import { Meta } from '@shared/domain/schemas/meta'

import { DeleteFavoritoUseCase } from './use-cases/delete-favorito.use-case'
import { GetAllFavoritosUseCase } from './use-cases/get-all-favorito.use-case'
import { RegisterFavoritoUseCase } from './use-cases/register-favorito.use-case'

export class FavoritoManagerService implements ForFavoritoManagingPort {
  constructor(
    private readonly registerFavoritoUC: RegisterFavoritoUseCase,
    private readonly getAllFavoritosUC: GetAllFavoritosUseCase,
    private readonly deleteFavoritoUC: DeleteFavoritoUseCase,
  ) {}

  async registerFavorito(
    favoritoInput: FavoritoInput,
  ): Promise<{ data: FavoritoRepoResponse; action: 'INSERT' | 'UPDATE'; message: string }> {
    return this.registerFavoritoUC.execute(favoritoInput)
  }

  async getAllFavoritos(filter: FavoritoFilter, limit: number): Promise<{ data: FavoritoResponse[]; meta: Meta }> {
    return this.getAllFavoritosUC.execute(filter, limit)
  }

  async deleteFavorito(id: number, idUser: number): Promise<string> {
    return this.deleteFavoritoUC.execute(id, idUser)
  }
}
