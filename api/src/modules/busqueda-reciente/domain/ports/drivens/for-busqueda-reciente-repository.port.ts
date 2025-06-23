import { BusquedaRecienteInput } from '@busqueda-reciente/domain/schemas/busqueda-reciente-input'

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
}
