import { BusquedaRecienteFilterRepo, BusquedaRecienteResponse, Meta } from '@busqueda-reciente/domain/schemas/busqueda-reciente'

/**
 * Puerto HTTP para gestionar búsquedas recientes desde la API.
 * Define operaciones expuestas vía HTTP relacionadas a búsquedas recientes.
 */
export interface ForHttpManagingBusquedaRecientePort {
  /**
   * Recupera una lista de búsquedas recientes filtradas según los criterios proporcionados.
   *
   * @param filter - Filtros para aplicar a la búsqueda (usuario, base de datos, tipo de objeto, etc.).
   * @param limit - Límite máximo de resultados a devolver.
   * @returns Una promesa que resuelve a un objeto con la lista de búsquedas recientes (`data`)
   *          y metainformación como el total de registros (`meta`).
   */
  getAllBusquedaReciente(filter: BusquedaRecienteFilterRepo, limit: number): Promise<{ data: BusquedaRecienteResponse[]; meta: Meta }>

  /**
   * Elimina una búsqueda reciente por su ID.
   * @param id - ID de la búsqueda reciente a eliminar.
   * @returns Mensaje de confirmación o estado como string.
   */
  deleteBusquedaReciente(id: number): Promise<string>
}
