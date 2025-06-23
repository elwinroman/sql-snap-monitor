/**
 * Puerto HTTP para gestionar búsquedas recientes desde la API.
 * Define operaciones expuestas vía HTTP relacionadas a búsquedas recientes.
 */
export interface ForHttpManagingBusquedaRecientePort {
  /**
   * Elimina una búsqueda reciente por su ID.
   * @param id - ID de la búsqueda reciente a eliminar.
   * @returns Mensaje de confirmación o estado como string.
   */
  deleteBusquedaReciente(id: number): Promise<string>
}
