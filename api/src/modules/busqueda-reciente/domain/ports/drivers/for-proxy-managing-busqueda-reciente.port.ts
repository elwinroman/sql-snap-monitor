import { BusquedaRecienteInput } from '@busqueda-reciente/domain/schemas/busqueda-reciente'

/**
 * Puerto de proxy para la gestión de búsquedas recientes.
 * Se encarga de registrar o actualizar la fecha de una búsqueda reciente.
 */
export interface ForProxyManagingBusquedaRecientePort {
  /**
   * Registra una nueva búsqueda reciente. Si ya existe una igual, actualiza su fecha.
   * @param busquedaRecienteInput - Datos de la búsqueda reciente a registrar o actualizar.
   */
  registerBusquedaReciente(busquedaRecienteInput: BusquedaRecienteInput): Promise<void>
}
