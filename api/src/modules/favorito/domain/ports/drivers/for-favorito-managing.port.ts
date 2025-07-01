import { Context, FavoritoFilterRepo, FavoritoInput, FavoritoRepoResponse, FavoritoResponse } from '@favorito/domain/schemas/favorito'
import { Meta } from '@shared/domain/schemas/meta'

/**
 * Puerto HTTP para gestionar objetos favoritos desde la API.
 * Define las operaciones expuestas vía HTTP relacionadas con la funcionalidad de favoritos sobre objetos SQL.
 */
export interface ForFavoritoManagingPort {
  /**
   * Crea o actualiza un objeto marcado como favorito para un usuario.
   * Si ya existe un favorito con la misma combinación de usuario, base de datos, esquema y objeto,
   * se actualiza la fecha y se reactiva si estaba inactivo.
   * En caso contrario, se registra un nuevo favorito.
   *
   * @param favoritoInput - Datos necesarios para registrar o actualizar un favorito
   *                        (usuario, base de datos, esquema, nombre del objeto, tipo, etc.).
   * @returns Una promesa que resuelve con un objeto que indica:
   *          - `data`: el favorito registrado o actualizado
   *          - `action`: la acción realizada ('INSERT' o 'UPDATE')
   *          - `message`: mensaje contextual según la acción realizada
   */
  registerFavorito(favoritoInput: FavoritoInput): Promise<{ data: FavoritoRepoResponse; action: 'INSERT' | 'UPDATE'; message: string }>

  /**
   * Recupera la lista de objetos SQL marcados como favoritos,
   * según los criterios de búsqueda indicados.
   *
   * @param filter - Filtros aplicables: usuario, nombre del objeto, tipo, base de datos, etc.
   * @param limit - Número máximo de resultados a devolver.
   * @returns Una promesa que resuelve con:
   *          - `data`: lista de favoritos encontrados
   *          - `meta`: metainformación útil para paginación o totales.
   */
  getAllFavoritos(filter: FavoritoFilterRepo, limit: number): Promise<{ data: FavoritoResponse[]; meta: Meta }>

  /**
   * Elimina un favorito registrado por su identificador único.
   *
   * @param id - ID del favorito a eliminar.
   * @param context - Contexto de ejecución que incluye el ID del usuario y la base de datos.
   * @returns Mensaje de confirmación o estado de la operación.
   */
  deleteFavorito(id: number, context: Context): Promise<string>
}
