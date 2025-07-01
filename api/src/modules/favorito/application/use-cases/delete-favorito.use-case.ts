import { FavoritoNotFoundException } from '@favorito/domain/exceptions/favorito-not-found.exception'
import { ForFavoritoRepositoryPort } from '@favorito/domain/ports/drivens/for-favorito-repository.port'
import { Context } from '@favorito/domain/schemas/favorito'

export class DeleteFavoritoUseCase {
  constructor(private readonly repository: ForFavoritoRepositoryPort) {}

  async execute(id: number, context: Context): Promise<string> {
    // comprueba si el "favorito" está eliminado
    const favorito = await this.repository.getById(id)
    if (!favorito || !favorito.isActive) throw new FavoritoNotFoundException(id)

    // comprueba si pertenece al usuario y a la base de datos
    if (favorito.idUser !== context.idUser || favorito.database.toLowerCase() !== context.database.toLowerCase())
      throw new FavoritoNotFoundException(id)

    const deleteAction = await this.repository.deleteById(id)

    if (!deleteAction) throw new Error(`Ha ocurrido un error inesperado en la eliminación (update) del favorito con id '${id}'`)

    return `Se ha eliminado correctamente el favorito con id '${id}'.`
  }
}
