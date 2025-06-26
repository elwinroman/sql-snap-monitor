import { FavoritoFilterRepo, FavoritoInput, FavoritoResponse } from '@favorito/domain/schemas/favorito'
import { Meta } from '@shared/domain/schemas/meta'

/**
 * Puerto HTTP para gestionar objetos favoritos desde la API.
 * Define las operaciones disponibles relacionadas con la funcionalidad de favoritos de objetos SQL.
 */
export interface ForFavoritoManagingPort {
  /**
   * Registra un nuevo objeto como favorito para un usuario.
   *
   * @param favoritoInput - Datos necesarios para crear un favorito (usuario, base de datos, objeto, etc.).
   * @returns Una promesa que resuelve cuando la operación ha sido completada.
   */
  registerFavorito(favoritoInput: FavoritoInput): Promise<void>

  /**
   * Recupera una lista de objetos marcados como favoritos,
   * filtrados según los criterios proporcionados.
   *
   * @param filter - Filtros a aplicar (usuario, base de datos, tipo de objeto, etc.).
   * @param limit - Límite máximo de resultados a devolver.
   * @returns Una promesa que resuelve a un objeto con la lista de favoritos (`data`)
   *          y metainformación de paginación (`meta`).
   */
  getAllFavoritos(filter: FavoritoFilterRepo, limit: number): Promise<{ data: FavoritoResponse[]; meta: Meta }>

  /**
   * Elimina un favorito registrado por su identificador único.
   *
   * @param id - ID del favorito a eliminar.
   * @returns Mensaje de confirmación o estado de la operación.
   */
  deleteFavorito(id: number): Promise<string>
}
