import { Criteria, Favorito, FavoritoFilterRepo, FavoritoRepoInput, FavoritoRepoResponse } from '@favorito/domain/schemas/favorito'
import { Meta } from '@shared/domain/schemas/meta'

/**
 * Puerto de repositorio para la persistencia de objetos favoritos.
 * Define las operaciones necesarias para almacenar, eliminar y consultar favoritos
 * en la fuente de datos correspondiente (base de datos, memoria, etc.).
 */
export interface ForFavoritoRepositoryPort {
  /**
   * Crea un nuevo favorito o actualiza uno existente si ya fue registrado previamente
   * por el mismo usuario y con las mismas propiedades clave
   * (usuario + base de datos + esquema + nombre de objeto).
   *
   * @param favoritoRepoInput - Datos del favorito a registrar o actualizar.
   * @returns Un objeto con los datos persistidos y la acción realizada (`INSERT` o `UPDATE`),
   *          o `null` si no se realizó ningún cambio.
   */
  createOrUpdate(favoritoRepoInput: FavoritoRepoInput): Promise<{ data: FavoritoRepoResponse; action: 'INSERT' | 'UPDATE' } | null>

  /**
   * Recupera una lista paginada de favoritos según los criterios de búsqueda.
   *
   * @param filter - Filtros a aplicar (usuario, tipo de objeto, etc.).
   * @param limit - Cantidad máxima de resultados a retornar.
   * @returns Un objeto que contiene:
   *          - `data`: lista de favoritos encontrados.
   *          - `meta`: metainformación como total de registros o página actual.
   */
  findMany(filter: FavoritoFilterRepo, limit: number): Promise<{ data: FavoritoRepoResponse[]; meta: Meta }>

  /**
   * Elimina un favorito identificado por su ID único.
   *
   * @param id - Identificador del favorito a eliminar.
   * @returns `true` si se eliminó exitosamente, `false` si no se encontró o falló la eliminación.
   */
  deleteById(id: number): Promise<boolean>

  /**
   * Recupera un favorito por su ID.
   *
   * @param id - ID del favorito a recuperar.
   * @returns Un objeto `Favorito` si se encuentra, o `null` si no existe.
   */
  getById(id: number): Promise<Favorito | null>

  /**
   * Verifica si existe un favorito que coincida con los criterios proporcionados.
   *
   * @param criteria - Criterios de búsqueda que incluyen propiedades clave como:
   *                   `idUser`, `schema` y `objectName`.
   * @returns `true` si existe al menos un favorito que coincida con los criterios;
   *          `false` en caso contrario.
   */
  existsByCriteria(criteria: Criteria): Promise<boolean>
}
