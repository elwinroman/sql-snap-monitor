import { BusquedaRecienteFilterRepo, BusquedaRecienteResponse, Context } from '@busqueda-reciente/domain/schemas/busqueda-reciente'
import { Meta } from '@shared/domain/schemas/meta'

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
   *
   * @param id - ID de la búsqueda reciente a eliminar.
   * @param context - Contexto de ejecución que incluye el ID del usuario y la base de datos.
   * @returns Una promesa que resuelve a un string con un mensaje de confirmación o estado.
   */
  deleteBusquedaReciente(id: number, context: Context): Promise<string>
}
