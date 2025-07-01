import {
  BusquedaReciente,
  BusquedaRecienteFilterRepo,
  BusquedaRecienteInput,
  BusquedaRecienteRepoResponse,
} from '@busqueda-reciente/domain/schemas/busqueda-reciente'
import { Meta } from '@shared/domain/schemas/meta'

/**
 * Puerto (interfaz) para el repositorio de búsquedas recientes.
 * Define las operaciones de persistencia que deben implementarse.
 */
export interface ForBusquedaRecienteRepositoryPort {
  /**
   * Crea o actualiza una búsqueda reciente.
   * @param busquedaRecienteInput - Datos de entrada de la búsqueda reciente.
   * @returns `true` si la operación fue exitosa, `false` si no lo fue.
   */
  createOrUpdate(busquedaRecienteInput: BusquedaRecienteInput): Promise<boolean>

  /**
   * Elimina una búsqueda reciente por su ID.
   * @param id - ID de la búsqueda reciente a eliminar.
   * @returns `true` si se eliminó correctamente, `false` si no existía.
   */
  deleteById(id: number): Promise<boolean>

  /**
   * Recupera múltiples búsquedas recientes según un filtro y un límite.
   *
   * @param filter - Criterios de búsqueda, como ID de usuario, base de datos y tipo.
   * @param limit - Número máximo de resultados a retornar.
   * @returns Un objeto con el array de búsquedas recientes y metainformación de paginación.
   */
  findMany(filter: BusquedaRecienteFilterRepo, limit: number): Promise<{ data: BusquedaRecienteRepoResponse[]; meta: Meta }>

  /**
   * Recupera una búsqueda reciente por su ID.
   *
   * @param id - ID de la búsqueda reciente a recuperar.
   * @returns Un objeto `BusquedaReciente` si se encuentra, o `null` si no existe.
   */
  getById(id: number): Promise<BusquedaReciente | null>
}
