import { FavoritoFilterRepo, FavoritoInput, FavoritoRepoResponse } from '@favorito/domain/schemas/favorito'
import { Meta } from '@shared/domain/schemas/meta'

/**
 * Puerto de repositorio para la persistencia de objetos favoritos.
 * Define las operaciones necesarias para almacenar, eliminar y consultar favoritos
 * en la fuente de datos correspondiente (base de datos, memoria, etc.).
 */
export interface ForFavoritoRepositoryPort {
  /**
   * Crea un nuevo favorito o actualiza uno existente si ya fue registrado previamente
   * por el mismo usuario y con las mismas propiedades clave (por ejemplo, database + objectName).
   *
   * @param favoritoInput - Datos del favorito a registrar o actualizar.
   * @returns `true` si la operación fue exitosa, `false` en caso contrario.
   */
  createOrUpdate(favoritoInput: FavoritoInput): Promise<boolean>

  /**
   * Recupera una lista paginada de favoritos según los criterios de búsqueda.
   *
   * @param filter - Filtros a aplicar (usuario, base de datos, tipo de objeto, etc.).
   * @param limit - Cantidad máxima de resultados a retornar.
   * @returns Un objeto con los resultados (`data`) y metainformación (`meta`).
   */
  findMany(filter: FavoritoFilterRepo, limit: number): Promise<{ data: FavoritoRepoResponse[]; meta: Meta }>

  /**
   * Elimina un favorito identificado por su ID único.
   *
   * @param id - Identificador del favorito a eliminar.
   * @returns `true` si la eliminación fue exitosa, `false` si no se encontró o falló.
   */
  deleteById(id: number): Promise<boolean>
}
